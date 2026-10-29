-- =====================================================================
-- PESDEM OSIS — Skema Database Supabase (PostgreSQL)
-- Jalankan seluruh file ini di Supabase Dashboard → SQL Editor → Run.
-- Aman dijalankan ulang (idempotent).
-- =====================================================================

-- ---------- 1. TABEL ----------------------------------------------------

-- Profil pasangan calon (selalu boleh dibaca publik)
create table if not exists public.candidates (
  id          smallint primary key,               -- 1, 2, 3
  nomor       text     not null,                  -- '01', '02', '03'
  ketua       text     not null,
  wakil       text     not null,
  photo_url   text,
  color       text     not null default '#d4a72c',
  updated_at  timestamptz not null default now()
);

-- Jumlah suara (dibaca publik HANYA jika hasil sudah ditampilkan)
create table if not exists public.vote_counts (
  candidate_id smallint primary key references public.candidates(id) on delete cascade,
  votes        integer  not null default 0 check (votes >= 0),
  version      bigint   not null default 0,
  updated_at   timestamptz not null default now()
);

-- Riwayat setiap perubahan suara (audit log, hanya admin)
create table if not exists public.vote_logs (
  id            bigserial primary key,
  candidate_id  smallint references public.candidates(id) on delete set null,
  action        text not null check (action in ('add','subtract','set','reset')),
  delta         integer not null,
  before_votes  integer not null,
  after_votes   integer not null,
  reason        text not null,
  admin_id      uuid,
  admin_email   text,
  created_at    timestamptz not null default now()
);
create index if not exists vote_logs_created_idx on public.vote_logs (created_at desc);

-- Pengaturan (satu baris)
create table if not exists public.settings (
  id               smallint primary key default 1 check (id = 1),
  results_visible  boolean not null default true,
  show_results_at  timestamptz,                   -- jadwal otomatis tampil (opsional)
  updated_at       timestamptz not null default now(),
  updated_by       text
);

-- Daftar akun panitia yang berhak mengubah suara
create table if not exists public.admins (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  email        text not null,
  display_name text,
  created_at   timestamptz not null default now()
);

-- ---------- 2. DATA AWAL ------------------------------------------------

insert into public.candidates (id, nomor, ketua, wakil, photo_url, color) values
  (1, '01', 'Aura Thufaila El-Hazima', 'Khaulah Arkana Putri', 'paslon/01.jpg', '#2563eb'),
  (2, '02', 'Kinara Aisyah Ramadhani', 'Bilal Hauzan Kamil',   'paslon/02.jpg', '#d4a72c'),
  (3, '03', 'Aisy Zhafira Aqila',      'Tedy Kenzie Urdha',    'paslon/03.jpg', '#059669')
on conflict (id) do update set
  nomor = excluded.nomor, ketua = excluded.ketua, wakil = excluded.wakil;

insert into public.vote_counts (candidate_id) values (1), (2), (3)
on conflict (candidate_id) do nothing;

insert into public.settings (id) values (1) on conflict (id) do nothing;

-- ---------- 3. FUNGSI BANTU ---------------------------------------------

create or replace function public.is_admin()
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

create or replace function public.results_public()
returns boolean
language sql stable security definer set search_path = public
as $$
  select coalesce(
    (select results_visible or (show_results_at is not null and now() >= show_results_at)
       from public.settings where id = 1),
    false);
$$;

-- ---------- 4. ROW LEVEL SECURITY ---------------------------------------

alter table public.candidates  enable row level security;
alter table public.vote_counts enable row level security;
alter table public.vote_logs   enable row level security;
alter table public.settings    enable row level security;
alter table public.admins      enable row level security;

drop policy if exists candidates_read  on public.candidates;
drop policy if exists votes_read       on public.vote_counts;
drop policy if exists logs_read        on public.vote_logs;
drop policy if exists settings_read    on public.settings;
drop policy if exists admins_read_self on public.admins;
drop policy if exists candidates_admin_update on public.candidates;

create policy candidates_read on public.candidates for select using (true);
create policy candidates_admin_update on public.candidates for update
  using (public.is_admin()) with check (public.is_admin());

-- Suara: publik hanya bila hasil ditampilkan; admin selalu
create policy votes_read on public.vote_counts for select
  using (public.results_public() or public.is_admin());

create policy logs_read on public.vote_logs for select using (public.is_admin());
create policy settings_read on public.settings for select using (true);
create policy admins_read_self on public.admins for select using (user_id = auth.uid());

-- TIDAK ada policy insert/update/delete untuk vote_counts, vote_logs, settings.
-- Artinya: perubahan suara HANYA bisa lewat fungsi RPC di bawah (yang memeriksa admin
-- dan selalu menulis log). Pengguna biasa / anon tidak dapat mengubah suara.
revoke insert, update, delete on public.vote_counts, public.vote_logs, public.settings, public.admins
  from anon, authenticated;

-- ---------- 5. RPC: PERUBAHAN SUARA (TRANSAKSI + ROW LOCK) ---------------
-- p_mode     : 'add' (tambah p_value) | 'subtract' (kurangi p_value) | 'set' (ubah total = p_value)
-- p_expected : (opsional) total yang dilihat admin sebelum mengubah. Jika berbeda dengan
--              data terbaru → ditolak (CONFLICT) supaya tidak menimpa input admin lain.

create or replace function public.apply_vote_change(
  p_candidate smallint,
  p_mode      text,
  p_value     integer,
  p_reason    text,
  p_expected  integer default null
)
returns public.vote_counts
language plpgsql security definer set search_path = public
as $$
declare
  v_row    public.vote_counts;
  v_new    integer;
  v_old    integer;
  v_email  text;
  v_reason text := nullif(trim(coalesce(p_reason, '')), '');
begin
  if not public.is_admin() then
    raise exception 'FORBIDDEN: hanya panitia yang dapat mengubah suara' using errcode = '42501';
  end if;
  if p_value is null or p_value < 0 then
    raise exception 'INVALID: angka suara harus bilangan bulat ≥ 0';
  end if;
  if p_mode in ('add','subtract') and p_value = 0 then
    raise exception 'INVALID: jumlah perubahan harus lebih dari 0';
  end if;
  if v_reason is null then
    raise exception 'INVALID: alasan perubahan wajib diisi';
  end if;

  -- Kunci baris → admin lain yang mengubah paslon yang sama akan menunggu (antre)
  select * into v_row from public.vote_counts where candidate_id = p_candidate for update;
  if not found then
    raise exception 'NOT_FOUND: paslon tidak ditemukan';
  end if;

  if p_expected is not null and p_expected <> v_row.votes then
    raise exception 'CONFLICT: total suara sudah diubah panitia lain (sekarang %). Muat ulang lalu coba lagi.', v_row.votes;
  end if;

  v_new := case p_mode
             when 'add'      then v_row.votes + p_value
             when 'subtract' then v_row.votes - p_value
             when 'set'      then p_value
             else null end;
  if v_new is null then
    raise exception 'INVALID: mode tidak dikenal';
  end if;
  if v_new < 0 then
    raise exception 'NEGATIVE: jumlah suara tidak boleh negatif (sekarang %)', v_row.votes;
  end if;

  select email into v_email from auth.users where id = auth.uid();
  v_old := v_row.votes;

  update public.vote_counts
     set votes = v_new, version = version + 1, updated_at = now()
   where candidate_id = p_candidate
   returning * into v_row;

  insert into public.vote_logs (candidate_id, action, delta, before_votes, after_votes, reason, admin_id, admin_email)
  values (p_candidate, p_mode, v_new - v_old, v_old, v_new, v_reason, auth.uid(), v_email);

  return v_row;
end;
$$;

-- ---------- 6. RPC: RESET SELURUH SUARA ----------------------------------
create or replace function public.reset_all_votes(p_reason text, p_confirm text)
returns void
language plpgsql security definer set search_path = public
as $$
declare
  r       record;
  v_email text;
  v_reason text := nullif(trim(coalesce(p_reason, '')), '');
begin
  if not public.is_admin() then
    raise exception 'FORBIDDEN: hanya panitia yang dapat mereset suara' using errcode = '42501';
  end if;
  if p_confirm is distinct from 'RESET' then
    raise exception 'INVALID: ketik RESET untuk konfirmasi';
  end if;
  if v_reason is null then
    raise exception 'INVALID: alasan reset wajib diisi';
  end if;
  select email into v_email from auth.users where id = auth.uid();

  for r in select * from public.vote_counts order by candidate_id for update loop
    insert into public.vote_logs (candidate_id, action, delta, before_votes, after_votes, reason, admin_id, admin_email)
    values (r.candidate_id, 'reset', -r.votes, r.votes, 0, v_reason, auth.uid(), v_email);
    update public.vote_counts set votes = 0, version = version + 1, updated_at = now()
     where candidate_id = r.candidate_id;
  end loop;
end;
$$;

-- ---------- 7. RPC: PENGATURAN TAMPIL HASIL ------------------------------
create or replace function public.update_settings(p_visible boolean, p_show_at timestamptz)
returns public.settings
language plpgsql security definer set search_path = public
as $$
declare
  v_row public.settings;
begin
  if not public.is_admin() then
    raise exception 'FORBIDDEN: hanya panitia' using errcode = '42501';
  end if;
  update public.settings
     set results_visible = p_visible,
         show_results_at = p_show_at,
         updated_at = now(),
         updated_by = (select email from auth.users where id = auth.uid())
   where id = 1
   returning * into v_row;
  return v_row;
end;
$$;

revoke all on function public.apply_vote_change(smallint, text, integer, text, integer) from public, anon;
revoke all on function public.reset_all_votes(text, text) from public, anon;
revoke all on function public.update_settings(boolean, timestamptz) from public, anon;
grant execute on function public.apply_vote_change(smallint, text, integer, text, integer) to authenticated;
grant execute on function public.reset_all_votes(text, text) to authenticated;
grant execute on function public.update_settings(boolean, timestamptz) to authenticated;
grant execute on function public.is_admin() to anon, authenticated;
grant execute on function public.results_public() to anon, authenticated;

-- ---------- 8. REALTIME --------------------------------------------------
do $$
begin
  begin alter publication supabase_realtime add table public.vote_counts; exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.settings;    exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.vote_logs;   exception when duplicate_object then null; end;
  begin alter publication supabase_realtime add table public.candidates;  exception when duplicate_object then null; end;
end $$;

-- ---------- 9. STORAGE: FOTO PASLON --------------------------------------
insert into storage.buckets (id, name, public) values ('paslon', 'paslon', true)
on conflict (id) do nothing;

drop policy if exists paslon_photo_read  on storage.objects;
drop policy if exists paslon_photo_write on storage.objects;
drop policy if exists paslon_photo_update on storage.objects;
create policy paslon_photo_read on storage.objects for select using (bucket_id = 'paslon');
create policy paslon_photo_write on storage.objects for insert to authenticated
  with check (bucket_id = 'paslon' and public.is_admin());
create policy paslon_photo_update on storage.objects for update to authenticated
  using (bucket_id = 'paslon' and public.is_admin());

-- ---------- 10. DAFTARKAN AKUN PANITIA -----------------------------------
-- 1) Buat user di Dashboard → Authentication → Users → Add user (email + password,
--    centang "Auto Confirm User").
-- 2) Jalankan (ganti email):
--
--   insert into public.admins (user_id, email, display_name)
--   select id, email, 'Panitia 1' from auth.users where email = 'panitia1@sekolah.sch.id'
--   on conflict (user_id) do nothing;
