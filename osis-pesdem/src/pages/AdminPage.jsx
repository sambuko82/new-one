import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Panel from '../components/Panel'
import Modal from '../components/Modal'
import VoteControl from '../components/VoteControl'
import StatusBanner from '../components/StatusBanner'
import CandidatePhoto from '../components/CandidatePhoto'
import AnimatedNumber from '../components/AnimatedNumber'
import { VoteBarChart } from '../components/ResultsCharts'
import { useToast } from '../components/Toast'
import { useAuth } from '../context/AuthContext'
import { useElection } from '../context/ElectionContext'
import { api, mode } from '../lib/api'
import { ACTION_LABELS } from '../lib/constants'
import { fmt, fmtTime, friendlyError, isResultsPublic } from '../lib/election'
import { enterProjector } from './ProjectorPage'

const TABS = [
  { id: 'count', label: 'Penghitungan' },
  { id: 'logs', label: 'Riwayat Perubahan' },
  { id: 'settings', label: 'Pengaturan & Unduh' },
]

function useLogs() {
  const { logVersion } = useElection()
  const [logs, setLogs] = useState([])
  const [error, setError] = useState(null)
  useEffect(() => {
    let alive = true
    api
      .fetchLogs()
      .then((d) => alive && (setLogs(d), setError(null)))
      .catch((e) => alive && setError(e))
    return () => {
      alive = false
    }
  }, [logVersion])
  return { logs, error }
}

function LogsTable({ logs, candidates }) {
  const [filter, setFilter] = useState('all')
  const name = (id) => candidates.find((c) => c.id === id)?.nomor ?? '—'
  const rows = filter === 'all' ? logs : logs.filter((l) => String(l.candidate_id) === filter)
  return (
    <>
      <div className="mb-3 flex flex-wrap gap-2">
        {[{ id: 'all', nomor: 'Semua' }, ...candidates.map((c) => ({ id: String(c.id), nomor: `Paslon ${c.nomor}` }))].map((o) => (
          <button
            key={o.id}
            onClick={() => setFilter(o.id)}
            className={`rounded-full px-3 py-1.5 text-xs font-bold ${filter === o.id ? 'bg-gold-500 text-navy-950' : 'bg-white/5 text-white hover:bg-white/10'}`}
          >
            {o.nomor}
          </button>
        ))}
      </div>
      {rows.length === 0 ? (
        <p className="py-8 text-center text-sm text-white/50">Belum ada perubahan suara.</p>
      ) : (
        <div className="max-h-[60vh] overflow-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="sticky top-0 bg-navy-900 text-xs uppercase tracking-wider text-gold-300">
              <tr>
                <th className="p-3">Waktu</th>
                <th className="p-3">Paslon</th>
                <th className="p-3">Aksi</th>
                <th className="p-3 text-right">Perubahan</th>
                <th className="p-3 text-right">Sebelum → Sesudah</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Alasan</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((l) => (
                <tr key={l.id} className="border-t border-white/5 odd:bg-white/[.02]">
                  <td className="whitespace-nowrap p-3 text-white/70">{fmtTime(l.created_at)}</td>
                  <td className="p-3 font-bold text-gold-300">{name(l.candidate_id)}</td>
                  <td className="p-3">{ACTION_LABELS[l.action] ?? l.action}</td>
                  <td className={`p-3 text-right font-bold tabular-nums ${l.delta > 0 ? 'text-emerald-400' : l.delta < 0 ? 'text-red-400' : 'text-white/60'}`}>
                    {l.delta > 0 ? '+' : ''}
                    {fmt(l.delta)}
                  </td>
                  <td className="whitespace-nowrap p-3 text-right tabular-nums text-white/80">
                    {fmt(l.before_votes)} → <b className="text-white">{fmt(l.after_votes)}</b>
                  </td>
                  <td className="p-3 text-white/70">{l.admin_email ?? '—'}</td>
                  <td className="p-3 text-white/80">{l.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}

// datetime-local ⇄ ISO (zona waktu perangkat)
const toLocalInput = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  const off = d.getTimezoneOffset()
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16)
}

function SettingsPanel() {
  const { settings, setSettingsLocal, results, candidates, resync } = useElection()
  const toast = useToast()
  const [visible, setVisible] = useState(true)
  const [showAt, setShowAt] = useState('')
  const [busy, setBusy] = useState(false)
  const [resetOpen, setResetOpen] = useState(false)
  const [resetConfirm, setResetConfirm] = useState('')
  const [resetReason, setResetReason] = useState('')
  const [uploading, setUploading] = useState(null)

  useEffect(() => {
    if (!settings) return
    setVisible(settings.results_visible)
    setShowAt(toLocalInput(settings.show_results_at))
  }, [settings])

  const save = async (nextVisible = visible, nextShowAt = showAt) => {
    setBusy(true)
    try {
      const row = await api.updateSettings(nextVisible, nextShowAt ? new Date(nextShowAt).toISOString() : null)
      if (row) setSettingsLocal(row)
      toast('Pengaturan tampilan hasil disimpan')
    } catch (e) {
      toast(friendlyError(e), 'error')
    } finally {
      setBusy(false)
    }
  }

  const doReset = async () => {
    setBusy(true)
    try {
      await api.resetAll(resetReason, resetConfirm)
      await resync()
      toast('Seluruh suara telah direset ke 0 (tercatat di riwayat)')
      setResetOpen(false)
      setResetConfirm('')
      setResetReason('')
    } catch (e) {
      toast(friendlyError(e), 'error')
    } finally {
      setBusy(false)
    }
  }

  const onPhoto = async (id, file) => {
    if (!file) return
    setUploading(id)
    try {
      await api.updatePhoto(id, file)
      await resync()
      toast('Foto paslon diperbarui')
    } catch (e) {
      toast(friendlyError(e), 'error')
    } finally {
      setUploading(null)
    }
  }

  const exporting = async (kind) => {
    try {
      const [logs, { exportExcel, exportPDF }] = await Promise.all([api.fetchLogs(10000), import('../lib/export')])
      kind === 'pdf' ? exportPDF(results, logs, candidates) : exportExcel(results, logs, candidates)
    } catch (e) {
      toast(friendlyError(e), 'error')
    }
  }

  const publicNow = isResultsPublic(settings)

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Panel title="Tampilan Hasil" subtitle="Atur kapan hasil terlihat di dashboard publik & proyektor">
        <div className="flex flex-col gap-4">
          <div className={`rounded-2xl p-3 text-sm font-semibold ${publicNow ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-400/15 text-amber-200'}`}>
            Status sekarang: {publicNow ? '👁 Hasil DITAMPILKAN ke publik' : '🔒 Hasil DISEMBUNYIKAN dari publik (panitia tetap bisa melihat)'}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button disabled={busy} onClick={() => save(true, '')} className={visible ? 'btn-gold' : 'btn-outline'}>
              Tampilkan Sekarang
            </button>
            <button disabled={busy} onClick={() => save(false, showAt)} className={!visible ? 'btn-gold' : 'btn-outline'}>
              Sembunyikan
            </button>
          </div>
          <label className="text-xs font-semibold text-white/70">
            Jadwal tampil otomatis (opsional, saat hasil disembunyikan)
            <input type="datetime-local" value={showAt} onChange={(e) => setShowAt(e.target.value)} className="input mt-1" />
          </label>
          <div className="flex gap-2">
            <button disabled={busy || !showAt} onClick={() => save(false, showAt)} className="btn-outline flex-1">
              Simpan Jadwal
            </button>
            <button disabled={busy || !settings?.show_results_at} onClick={() => save(visible, '')} className="btn-ghost">
              Hapus Jadwal
            </button>
          </div>
          {settings?.show_results_at && !settings.results_visible && (
            <p className="text-xs text-white/60">Hasil akan tampil otomatis pada {fmtTime(settings.show_results_at)}.</p>
          )}
        </div>
      </Panel>

      <Panel title="Unduh Hasil" subtitle="Rekap hasil + riwayat perubahan lengkap">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => exporting('pdf')} className="btn-gold">
            ⬇ PDF
          </button>
          <button onClick={() => exporting('xlsx')} className="btn-outline">
            ⬇ Excel (.xlsx)
          </button>
        </div>
        <p className="mt-3 text-xs text-white/60">
          Total saat ini: <b className="text-white">{fmt(results.total)}</b> suara. File berisi peringkat, persentase, dan seluruh log (waktu, admin, angka perubahan, alasan).
        </p>
      </Panel>

      <Panel title="Foto Pasangan Calon" subtitle="Pastikan sesuai nomor urut. Foto otomatis diperkecil.">
        <div className="grid grid-cols-3 gap-3">
          {candidates.map((c) => (
            <label key={c.id} className="group flex cursor-pointer flex-col gap-2 text-center">
              <div className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 group-hover:ring-gold-400">
                <CandidatePhoto candidate={c} className="aspect-[3/4] w-full [&>span:first-child]:text-3xl [&>span:last-child]:text-[9px]" />
                {uploading === c.id && <div className="absolute inset-0 grid place-items-center bg-navy-950/80 text-xs">Mengunggah…</div>}
              </div>
              <span className="text-xs font-bold text-gold-300">Paslon {c.nomor}</span>
              <span className="text-[11px] text-white/60 group-hover:text-white">Ganti foto</span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => onPhoto(c.id, e.target.files?.[0])} />
            </label>
          ))}
        </div>
      </Panel>

      <Panel title="Zona Berbahaya" subtitle="Mengatur ulang seluruh suara menjadi 0">
        <p className="mb-4 text-sm text-white/70">Reset tercatat di riwayat (nilai sebelum reset tetap tersimpan di log). Gunakan hanya untuk uji coba atau atas keputusan rapat panitia.</p>
        <button onClick={() => setResetOpen(true)} className="btn-danger w-full">
          RESET SELURUH SUARA
        </button>
      </Panel>

      <Modal open={resetOpen} title="Reset seluruh suara?" onClose={() => !busy && setResetOpen(false)}>
        <div className="flex flex-col gap-3">
          <p className="text-sm text-white/80">
            Semua paslon akan kembali ke <b>0 suara</b>. Total saat ini <b>{fmt(results.total)}</b> suara akan dihapus dari papan hasil.
          </p>
          <label className="text-xs font-semibold text-white/70">
            Alasan reset (wajib)
            <input value={resetReason} onChange={(e) => setResetReason(e.target.value)} className="input mt-1" placeholder="mis. Selesai simulasi, mulai penghitungan resmi" />
          </label>
          <label className="text-xs font-semibold text-white/70">
            Ketik <b className="text-red-300">RESET</b> untuk konfirmasi
            <input value={resetConfirm} onChange={(e) => setResetConfirm(e.target.value)} className="input mt-1" autoComplete="off" />
          </label>
          <div className="flex gap-2">
            <button onClick={() => setResetOpen(false)} disabled={busy} className="btn-outline flex-1">
              Batal
            </button>
            <button onClick={doReset} disabled={busy || resetConfirm !== 'RESET' || !resetReason.trim()} className="btn-danger flex-1">
              {busy ? 'Mereset…' : 'Ya, Reset'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default function AdminPage() {
  const { user, signOut } = useAuth()
  const { results, candidates, isPublic } = useElection()
  const navigate = useNavigate()
  const [tab, setTab] = useState('count')
  const { logs, error: logsError } = useLogs()
  const latest = useMemo(() => logs.slice(0, 5), [logs])

  return (
    <div className="min-h-screen">
      <Header
        right={
          <>
            <button onClick={() => enterProjector(navigate)} className="btn-gold !rounded-full !px-4 !py-2 !text-xs">
              ▣ MODE PROYEKTOR
            </button>
            <Link to="/" className="btn-ghost">
              Dashboard
            </Link>
            <button onClick={signOut} className="btn-ghost" title={user?.email}>
              Keluar
            </button>
          </>
        }
      />

      <main className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-6 pb-16">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-400">Panel Panitia</p>
            <h1 className="font-display text-2xl font-extrabold text-white md:text-3xl">Penghitungan Suara Manual</h1>
            <p className="text-sm text-white/60">
              Masuk sebagai <b className="text-white">{user?.email}</b>
              {mode === 'demo' && <span className="ml-2 rounded bg-gold-500/20 px-1.5 text-[11px] font-bold text-gold-300">MODE DEMO</span>}
              {!isPublic && <span className="ml-2 rounded bg-amber-400/20 px-1.5 text-[11px] font-bold text-amber-200">HASIL DISEMBUNYIKAN DARI PUBLIK</span>}
            </p>
          </div>
          <div className="rounded-2xl border border-gold-400/40 bg-gold-500/10 px-5 py-2 text-right">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-gold-300">Total Seluruh Suara</p>
            <AnimatedNumber value={results.total} className="font-display text-3xl font-extrabold text-white" />
          </div>
        </div>

        <StatusBanner results={results} />

        <nav className="flex gap-1 overflow-x-auto rounded-2xl border border-white/10 bg-navy-900/60 p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-bold transition ${tab === t.id ? 'bg-gold-500 text-navy-950' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
            >
              {t.label}
            </button>
          ))}
        </nav>

        {tab === 'count' && (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {results.rows.map((r) => (
                <VoteControl key={r.id} row={r} />
              ))}
            </div>
            <div className="grid gap-5 lg:grid-cols-5">
              <Panel title="Grafik Live" className="lg:col-span-3">
                <div className="h-64">
                  <VoteBarChart results={results} />
                </div>
              </Panel>
              <Panel title="Perubahan Terbaru" className="lg:col-span-2" actions={<button className="btn-ghost" onClick={() => setTab('logs')}>Lihat semua</button>}>
                {latest.length === 0 ? (
                  <p className="py-6 text-center text-sm text-white/50">Belum ada perubahan.</p>
                ) : (
                  <ul className="flex flex-col gap-2">
                    {latest.map((l) => (
                      <li key={l.id} className="flex items-center justify-between gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm">
                        <span className="min-w-0 truncate">
                          <b className="text-gold-300">{candidates.find((c) => c.id === l.candidate_id)?.nomor}</b> · {l.reason}
                          <span className="block text-[11px] text-white/50">
                            {new Date(l.created_at).toLocaleTimeString('id-ID')} · {l.admin_email}
                          </span>
                        </span>
                        <span className={`shrink-0 font-bold tabular-nums ${l.delta >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {l.delta > 0 ? '+' : ''}
                          {fmt(l.delta)}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Panel>
            </div>
          </>
        )}

        {tab === 'logs' && (
          <Panel title="Riwayat Perubahan Suara" subtitle="Setiap perubahan tercatat: waktu, akun panitia, angka perubahan, dan alasan. Tidak dapat dihapus dari aplikasi.">
            {logsError ? <p className="text-sm text-red-300">{friendlyError(logsError)}</p> : <LogsTable logs={logs} candidates={candidates} />}
          </Panel>
        )}

        {tab === 'settings' && <SettingsPanel />}
      </main>
    </div>
  )
}
