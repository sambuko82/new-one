import CandidatePhoto from './CandidatePhoto'
import LeaderTag from './LeaderTag'
import { fmt, fmtPct } from '../lib/election'

export default function RankingTable({ results, large = false }) {
  return (
    <ol className="flex flex-col gap-3">
      {results.ranked.map((r) => (
        <li
          key={r.id}
          className={`flex items-center gap-3 rounded-2xl p-3 transition-all duration-500 ${r.isLeader ? 'bg-gold-500/15 ring-1 ring-gold-400/60' : r.isTied ? 'bg-amber-300/10 ring-1 ring-amber-300/50' : 'bg-white/5'}`}
        >
          <span className={`grid shrink-0 place-items-center rounded-xl font-display font-extrabold ${r.rank === 1 ? 'bg-gold-500 text-navy-950' : 'bg-white/10 text-white'} ${large ? 'h-14 w-14 text-3xl' : 'h-10 w-10 text-lg'}`}>
            {r.rank}
          </span>
          <CandidatePhoto candidate={r} className={`shrink-0 rounded-xl ${large ? 'h-16 w-16' : 'h-11 w-11'} [&>span:first-child]:text-xl [&>span:last-child]:hidden`} />
          <div className="min-w-0 flex-1">
            <p className={`truncate font-semibold text-white ${large ? 'text-xl' : 'text-sm'}`}>
              <span className="text-gold-400">{r.nomor}</span> · {r.ketua}
            </p>
            <p className={`truncate text-white/60 ${large ? 'text-base' : 'text-xs'}`}>{r.wakil}</p>
            {(r.isLeader || r.isTied) && !large && (
              <div className="mt-1">
                <LeaderTag row={r} />
              </div>
            )}
          </div>
          <div className="text-right">
            <p className={`font-display font-extrabold text-white tabular-nums ${large ? 'text-3xl' : 'text-lg'}`}>{fmt(r.votes)}</p>
            <p className={`font-semibold text-gold-300 ${large ? 'text-lg' : 'text-xs'}`}>{fmtPct(r.percent)}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}
