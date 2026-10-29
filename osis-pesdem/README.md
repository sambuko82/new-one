# PEMILIHAN CALON KETUA OSIS DAN WAKIL KETUA OSIS

> *"Satu Suara, Satu Pilihan, Masa Depan Sekolah!"*

Aplikasi **penghitungan suara manual oleh panitia** PESDEM (Pesta Demokrasi) OSIS. Ini **bukan** aplikasi voting langsung oleh siswa.

React + Tailwind CSS + Supabase (PostgreSQL, Auth, Realtime, Storage) + Recharts.

## Halaman

| URL | Untuk | Isi |
|---|---|---|
| `/#/` | Publik / guru / siswa | Dashboard: foto, nama, suara, persentase, grafik batang, diagram lingkaran, peringkat, status unggul / seri |
| `/#/proyektor` | Laptop proyektor / smart board | Layar penuh, angka besar, tanpa tombol pengelolaan, update otomatis |
| `/#/login` | Panitia | Login akun panitia |
| `/#/admin` | Panitia | Tombol (+)/(−), tambah suara, ubah total, riwayat, unduh PDF/Excel, atur tampil hasil, ganti foto, reset |

Mode proyektor bisa dibuka di laptop yang **berbeda** dari laptop panitia: cukup buka URL `/#/proyektor` (tidak perlu login).

## Setup (± 15 menit)

1. **Buat project Supabase** di https://supabase.com (gratis).
2. **SQL Editor → New query** → tempel isi `supabase/schema.sql` → **Run**.
3. **Buat akun panitia**: Authentication → Users → *Add user* (email + password, centang *Auto Confirm*). Lalu di SQL Editor:
   ```sql
   insert into public.admins (user_id, email, display_name)
   select id, email, 'Panitia 1' from auth.users where email = 'panitia1@sekolah.sch.id';
   ```
   Ulangi untuk setiap panitia.
4. **Konfigurasi**: salin `.env.example` → `.env`, isi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` (Project Settings → API).
5. **Jalankan**:
   ```bash
   npm install
   npm run dev        # lokal: http://localhost:5173
   npm run build      # hasil di folder dist/
   ```
6. **Deploy** folder `dist/` ke Vercel / Netlify / Cloudflare Pages / hosting statis apa pun (memakai hash-URL, tidak butuh konfigurasi rewrite). Di Vercel/Netlify isi juga 2 env var di atas.

> Tanpa `.env`, aplikasi berjalan dalam **MODE DEMO** (data di browser, sinkron antar-tab di 1 komputer). Akun demo: `panitia1@pesdem.local` / `pesdem2026`. Cocok untuk latihan panitia, **bukan** untuk hari-H.

## Foto paslon

Letakkan di `public/paslon/` dengan nama:

| File | Paslon | Foto |
|---|---|---|
| `01.jpg` | 01 — Aura Thufaila El-Hazima & Khaulah Arkana Putri | foto **pertama** (seragam SMP putih biru) |
| `02.jpg` | 02 — Kinara Aisyah Ramadhani & Bilal Hauzan Kamil | foto **ketiga** (jas almamater) |
| `03.jpg` | 03 — Aisy Zhafira Aqila & Tedy Kenzie Urdha | foto **kedua** (seragam Pramuka) |

Atau tanpa deploy ulang: **Panel Panitia → Pengaturan & Unduh → Ganti foto** (diunggah ke Supabase Storage, langsung muncul di semua layar). Selama foto belum ada, kartu menampilkan nomor urut.

## Keamanan & integritas data

- **Row Level Security**: anon/siswa hanya bisa *membaca*; tabel suara, log, dan pengaturan **tidak punya izin tulis** sama sekali untuk klien.
- Semua perubahan lewat fungsi database `apply_vote_change` / `reset_all_votes` / `update_settings` yang memeriksa akun ada di tabel `admins`.
- **Transaksi + row lock** (`SELECT … FOR UPDATE`): banyak panitia input bersamaan tidak saling hilang. Diuji: 2 sesi × 200 input paralel = tepat 400 suara & 400 log.
- **Anti-timpa**: "UBAH TOTAL SUARA" mengirim total yang dilihat panitia; jika panitia lain sudah mengubahnya, ditolak (CONFLICT) dan data dimuat ulang.
- Suara **tidak bisa negatif** (CHECK constraint + validasi fungsi).
- **Riwayat**: setiap perubahan mencatat waktu, email panitia, aksi, angka perubahan, sebelum→sesudah, dan alasan. Reset juga tercatat.
- **Sembunyikan hasil**: saat disembunyikan, data suara benar-benar tidak dikirim ke publik (RLS), bukan sekadar disembunyikan di tampilan. Bisa dijadwalkan tampil otomatis pada jam tertentu.

## Live & koneksi

- Supabase Realtime → angka, persentase, grafik, peringkat, dan proyektor berubah tanpa refresh.
- Indikator koneksi (LIVE / menyambung ulang / offline) + tombol **Sinkronkan**.
- Sinkron ulang otomatis saat internet kembali, saat tab dibuka lagi, saat Realtime tersambung ulang, dan polling cadangan tiap 20 detik.
- Saat offline, tombol input dinonaktifkan supaya tidak ada suara "seolah tersimpan".

## Struktur

```
src/
  lib/        api.js (Supabase + demo), election.js (persentase/peringkat/seri), export.js (PDF/Excel)
  context/    AuthContext, ElectionContext (realtime + resync)
  components/ CandidateCard, ProjectorCard, VoteControl, ResultsCharts, RankingTable, ...
  pages/      DashboardPage, ProjectorPage, LoginPage, AdminPage
supabase/schema.sql
```
