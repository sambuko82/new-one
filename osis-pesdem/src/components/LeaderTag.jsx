export default function LeaderTag({ row, large = false }) {
  const size = large ? 'text-sm md:text-lg px-4 py-1.5' : 'text-[11px] px-3 py-1'
  if (row.isLeader)
    return <span className={`rounded-full bg-gold-500 font-extrabold uppercase tracking-wide text-navy-950 shadow-gold ${size}`}>🏆 Suara Terbanyak Sementara</span>
  if (row.isTied)
    return <span className={`rounded-full bg-amber-300 font-extrabold uppercase tracking-wide text-navy-950 ${size}`}>⚖️ Seri</span>
  return null
}
