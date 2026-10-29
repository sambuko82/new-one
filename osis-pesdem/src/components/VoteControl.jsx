import { useState } from 'react'
import CandidatePhoto from './CandidatePhoto'
import AnimatedNumber from './AnimatedNumber'
import LeaderTag from './LeaderTag'
import Modal from './Modal'
import { useElection } from '../context/ElectionContext'
import { useToast } from './Toast'
import { fmt, fmtPct, friendlyError } from '../lib/election'

const parseCount = (v) => {
  if (v === '' || v === null) return null
  const n = Number(v)
  return Number.isInteger(n) && n >= 0 ? n : NaN
}

// Kartu pengelolaan suara untuk satu paslon (khusus panitia).
export default function VoteControl({ row }) {
  const { applyChange, connection, resync } = useElection()
  const toast = useToast()
  const [busy, setBusy] = useState(false)
  const [addValue, setAddValue] = useState('')
  const [setValue, setSetValue] = useState('')
  const [note, setNote] = useState('')
  const [confirmSet, setConfirmSet] = useState(null)
  const [setReason, setSetReason] = useState('')

  const offline = connection === 'offline'
  const disabled = busy || offline

  const run = async (args, okMsg) => {
    setBusy(true)
    try {
      await applyChange({ candidateId: row.id, ...args })
      toast(okMsg)
      return true
    } catch (e) {
      const msg = friendlyError(e)
      toast(msg, 'error')
      if (/CONFLICT/.test(e?.message)) resync()
      return false
    } finally {
      setBusy(false)
    }
  }

  const quick = (delta) =>
    run(
      {
        mode: delta > 0 ? 'add' : 'subtract',
        value: 1,
        reason: note.trim() || (delta > 0 ? '+1 suara (tombol cepat)' : '−1 suara (koreksi, tombol cepat)'),
      },
      `Paslon ${row.nomor}: ${delta > 0 ? '+1' : '−1'} suara`,
    )

  const submitAdd = async (e) => {
    e?.preventDefault()
    const n = parseCount(addValue)
    if (!n) return toast('Masukkan jumlah suara tambahan (bilangan bulat > 0).', 'warn')
    const ok = await run(
      { mode: 'add', value: n, reason: note.trim() || `Tambah ${n} suara (input panitia)` },
      `Paslon ${row.nomor}: +${fmt(n)} suara → total ${fmt(row.votes + n)}`,
    )
    if (ok) setAddValue('')
  }

  const askSet = (e) => {
    e?.preventDefault()
    const n = parseCount(setValue)
    if (n === null || Number.isNaN(n)) return toast('Total suara harus bilangan bulat ≥ 0 (tidak boleh negatif).', 'warn')
    setSetReason(note)
    setConfirmSet({ value: n, expected: row.votes })
  }

  const doSet = async () => {
    if (!setReason.trim()) return toast('Alasan perubahan total wajib diisi.', 'warn')
    const ok = await run(
      { mode: 'set', value: confirmSet.value, expected: confirmSet.expected, reason: setReason.trim() },
      `Paslon ${row.nomor}: total diubah menjadi ${fmt(confirmSet.value)}`,
    )
    if (ok) {
      setSetValue('')
      setConfirmSet(null)
    }
  }

  const ring = row.isLeader ? 'ring-2 ring-gold-400' : row.isTied ? 'ring-2 ring-amber-300' : 'ring-1 ring-white/10'

  return (
    <article className={`flex flex-col overflow-hidden rounded-3xl bg-navy-800/80 ${ring}`}>
      <div className="flex items-center gap-3 border-b border-white/10 p-4">
        <CandidatePhoto candidate={row} className="h-20 w-20 shrink-0 rounded-2xl [&>span:last-child]:hidden" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg bg-gold-500 px-2 py-0.5 font-display text-lg font-extrabold text-navy-950">PASLON {row.nomor}</span>
            <LeaderTag row={row} />
          </div>
          <p className="mt-1 truncate text-sm font-semibold text-white">{row.ketua}</p>
          <p className="truncate text-xs text-white/60">{row.wakil}</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Total Suara</p>
          <p className="font-display text-5xl font-extrabold text-white">
            <AnimatedNumber value={row.votes} />
          </p>
          <p className="text-sm font-semibold text-gold-300">
            {fmtPct(row.percent)} · Peringkat #{row.rank}
          </p>
        </div>

        {/* [ − ] [ total ] [ + ] */}
        <div className="grid grid-cols-[1fr_1.4fr_1fr] items-stretch gap-2">
          <button
            onClick={() => quick(-1)}
            disabled={disabled || row.votes <= 0}
            aria-label={`Kurangi 1 suara paslon ${row.nomor}`}
            className="rounded-2xl bg-red-500/90 py-4 font-display text-3xl font-extrabold text-white shadow transition active:scale-95 enabled:hover:bg-red-500 disabled:opacity-30"
          >
            −
          </button>
          <div className="grid place-items-center rounded-2xl border-2 border-gold-500/60 bg-navy-950 font-display text-3xl font-extrabold tabular-nums text-gold-300">
            {fmt(row.votes)}
          </div>
          <button
            onClick={() => quick(1)}
            disabled={disabled}
            aria-label={`Tambah 1 suara paslon ${row.nomor}`}
            className="rounded-2xl bg-emerald-500 py-4 font-display text-3xl font-extrabold text-navy-950 shadow transition active:scale-95 enabled:hover:bg-emerald-400 disabled:opacity-30"
          >
            +
          </button>
        </div>

        <form onSubmit={submitAdd} className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-white/70" htmlFor={`add-${row.id}`}>
            Masukkan suara tambahan
          </label>
          <input
            id={`add-${row.id}`}
            type="number"
            inputMode="numeric"
            min="1"
            step="1"
            value={addValue}
            onChange={(e) => setAddValue(e.target.value)}
            placeholder="contoh: 50"
            className="input"
          />
          <button type="submit" disabled={disabled} className="btn-gold w-full">
            TAMBAHKAN SUARA
          </button>
        </form>

        <form onSubmit={askSet} className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-white/70" htmlFor={`set-${row.id}`}>
            Ubah total suara menjadi
          </label>
          <input
            id={`set-${row.id}`}
            type="number"
            inputMode="numeric"
            min="0"
            step="1"
            value={setValue}
            onChange={(e) => setSetValue(e.target.value)}
            placeholder={`sekarang: ${row.votes}`}
            className="input"
          />
          <button type="submit" disabled={disabled} className="btn-outline w-full">
            UBAH TOTAL SUARA
          </button>
        </form>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-white/70" htmlFor={`note-${row.id}`}>
            Alasan / keterangan (dicatat di riwayat)
          </label>
          <input
            id={`note-${row.id}`}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="mis. Kotak suara kelas 8B"
            maxLength={200}
            className="input text-sm"
          />
        </div>
        {offline && <p className="rounded-xl bg-red-500/15 p-2 text-center text-xs font-semibold text-red-300">Offline — tombol dinonaktifkan sampai internet kembali.</p>}
      </div>

      <Modal open={!!confirmSet} title={`Ubah total suara Paslon ${row.nomor}?`} onClose={() => !busy && setConfirmSet(null)}>
        {confirmSet && (
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="rounded-2xl bg-white/5 p-3">
                <p className="text-xs text-white/60">Sebelum</p>
                <p className="font-display text-3xl font-extrabold text-white">{fmt(confirmSet.expected)}</p>
              </div>
              <div className="rounded-2xl bg-gold-500/15 p-3">
                <p className="text-xs text-gold-300">Sesudah</p>
                <p className="font-display text-3xl font-extrabold text-gold-300">{fmt(confirmSet.value)}</p>
              </div>
            </div>
            <p className="text-sm text-white/70">
              Perubahan: <b className="text-white">{confirmSet.value - confirmSet.expected > 0 ? '+' : ''}{fmt(confirmSet.value - confirmSet.expected)}</b> suara. Jika panitia lain mengubah suara
              paslon ini sebelum Anda menekan simpan, perubahan akan ditolak agar tidak saling menimpa.
            </p>
            <label className="text-xs font-semibold text-white/70">
              Alasan perubahan (wajib)
              <input autoFocus value={setReason} onChange={(e) => setSetReason(e.target.value)} placeholder="mis. Koreksi rekap kotak 3" className="input mt-1" maxLength={200} />
            </label>
            <div className="flex gap-2">
              <button onClick={() => setConfirmSet(null)} disabled={busy} className="btn-outline flex-1">
                Batal
              </button>
              <button onClick={doSet} disabled={busy || !setReason.trim()} className="btn-gold flex-1">
                {busy ? 'Menyimpan…' : 'Simpan Total'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </article>
  )
}
