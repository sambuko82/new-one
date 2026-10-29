import { useElection } from '../context/ElectionContext'
import { mode } from '../lib/api'

const MAP = {
  live: { dot: 'bg-emerald-400', ring: 'bg-emerald-400/40', label: 'LIVE · Tersambung' },
  connecting: { dot: 'bg-amber-400', ring: 'bg-amber-400/40', label: 'Menyambungkan…' },
  reconnecting: { dot: 'bg-amber-400', ring: 'bg-amber-400/40', label: 'Menyambung ulang…' },
  error: { dot: 'bg-orange-500', ring: 'bg-orange-500/40', label: 'Gagal sinkron' },
  offline: { dot: 'bg-red-500', ring: 'bg-red-500/40', label: 'Offline · Tidak ada internet' },
}

export default function ConnectionBadge({ compact = false }) {
  const { connection, syncing, lastSync, resync } = useElection()
  const s = MAP[connection]
  return (
    <div className="flex items-center gap-2">
      <span
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white"
        title={lastSync ? `Sinkron terakhir: ${lastSync.toLocaleTimeString('id-ID')}` : ''}
      >
        <span className="relative flex h-2.5 w-2.5">
          {connection === 'live' && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${s.ring}`} />}
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${s.dot}`} />
        </span>
        {!compact && s.label}
        {mode === 'demo' && !compact && <span className="rounded bg-gold-500/20 px-1.5 text-[10px] text-gold-300">DEMO</span>}
      </span>
      {!compact && (
        <button
          onClick={resync}
          disabled={syncing}
          className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
          title="Sinkronkan ulang data dari server"
        >
          {syncing ? 'Sinkron…' : '⟳ Sinkronkan'}
        </button>
      )}
    </div>
  )
}
