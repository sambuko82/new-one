import CandidatePhoto from './CandidatePhoto'
import AnimatedNumber from './AnimatedNumber'
import LeaderTag from './LeaderTag'
import { fmtPct } from '../lib/election'

// Kartu paslon untuk dashboard / proyektor (tanpa tombol pengelolaan).
export default function CandidateCard({ row, showVotes = true, large = false, children }) {
  const highlight = row.isLeader ? 'ring-2 ring-gold-400 shadow-gold' : row.isTied ? 'ring-2 ring-amber-300' : 'ring-1 ring-white/10'
  return (
    <article className={`relative flex flex-col overflow-hidden rounded-3xl bg-navy-800/80 backdrop-blur transition ${highlight}`}>
      <div className="relative">
        <CandidatePhoto candidate={row} className={`w-full ${large ? 'h-[26vh] min-h-40' : 'aspect-[4/3]'}`} />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy-950/95 to-transparent" />
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className={`rounded-2xl bg-gold-500 font-display font-extrabold text-navy-950 shadow-lg ${large ? 'px-[1vw] py-[.6vh] text-[clamp(1.6rem,4.5vh,3.5rem)]' : 'px-3 py-1.5 text-2xl'}`}>
            {row.nomor}
          </span>
        </div>
        {showVotes && (
          <div className="absolute right-3 top-3">
            <span className={`rounded-full bg-navy-950/80 font-bold text-white ${large ? 'px-4 py-1 text-[clamp(.9rem,2.2vh,1.6rem)]' : 'px-3 py-1 text-xs'}`}>
              Peringkat #{row.rank}
            </span>
          </div>
        )}
        {showVotes && (row.isLeader || row.isTied) && (
          <div className="absolute inset-x-0 bottom-3 flex justify-center px-2">
            <LeaderTag row={row} large={large} />
          </div>
        )}
      </div>

      <div className={`flex flex-1 flex-col ${large ? 'gap-[.8vh] px-[1.2vw] py-[1.4vh]' : 'gap-2 p-4'}`}>
        <p className={`font-semibold uppercase tracking-[0.2em] text-gold-400 ${large ? 'text-[clamp(.75rem,1.6vh,1.2rem)]' : 'text-[11px]'}`}>Paslon {row.nomor}</p>
        <div>
          <p className={`text-white/60 ${large ? 'text-[clamp(.75rem,1.6vh,1.2rem)]' : 'text-xs'}`}>Calon Ketua OSIS</p>
          <h3 className={`font-display font-bold leading-tight text-white ${large ? 'text-[clamp(1.1rem,3vh,2.4rem)]' : 'text-lg'}`}>{row.ketua}</h3>
        </div>
        <div>
          <p className={`text-white/60 ${large ? 'text-[clamp(.75rem,1.6vh,1.2rem)]' : 'text-xs'}`}>Calon Wakil Ketua OSIS</p>
          <h4 className={`font-display font-semibold leading-tight text-white/90 ${large ? 'text-[clamp(1rem,2.5vh,2rem)]' : 'text-base'}`}>{row.wakil}</h4>
        </div>

        {showVotes && (
          <div className={`mt-auto ${large ? 'pt-[.5vh]' : 'pt-3'}`}>
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className={`uppercase tracking-widest text-white/50 ${large ? 'text-[clamp(.7rem,1.4vh,1.1rem)]' : 'text-[10px]'}`}>Total Suara</p>
                <AnimatedNumber value={row.votes} className={`font-display font-extrabold text-white ${large ? 'text-[clamp(2.5rem,8vh,7rem)] leading-none' : 'text-4xl'}`} />
              </div>
              <p className={`font-display font-bold text-gold-300 ${large ? 'text-[clamp(1.4rem,4vh,3.5rem)]' : 'text-xl'}`}>{fmtPct(row.percent)}</p>
            </div>
            <div className={`overflow-hidden rounded-full bg-white/10 ${large ? 'mt-[1vh] h-[1.2vh] min-h-2' : 'mt-3 h-2.5'}`}>
              <div
                className="h-full rounded-full transition-[width] duration-700 ease-out"
                style={{ width: `${row.percent}%`, background: `linear-gradient(90deg, ${row.color}, #ecc865)` }}
              />
            </div>
          </div>
        )}
        {children}
      </div>
    </article>
  )
}
