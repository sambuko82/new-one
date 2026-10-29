import { fmt } from '../lib/election'

export default function StatusBanner({ results, large = false }) {
  const base = large ? 'text-[clamp(1.1rem,min(2vw,3.4vh),2.6rem)] px-[2vw] py-[1.4vh]' : 'text-sm md:text-base px-5 py-3'
  if (results.status === 'empty')
    return <div className={`rounded-2xl border border-white/15 bg-white/5 text-center font-semibold text-white/80 ${base}`}>Belum ada suara yang masuk</div>
  if (results.status === 'tie')
    return (
      <div className={`rounded-2xl border border-amber-300/60 bg-amber-400/15 text-center font-bold text-amber-200 ${base}`}>
        ⚖️ STATUS SERI — Paslon {results.leaders.map((l) => l.nomor).join(' & ')} sama-sama {fmt(results.leaders[0].votes)} suara
      </div>
    )
  const l = results.leaders[0]
  return (
    <div className={`rounded-2xl border border-gold-400/70 bg-gold-500/15 text-center font-bold text-gold-300 ${base}`}>
      🏆 SUARA TERBANYAK SEMENTARA — Paslon {l.nomor} · {l.ketua} &amp; {l.wakil}
    </div>
  )
}
