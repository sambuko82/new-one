import CandidatePhoto from './CandidatePhoto'
import AnimatedNumber from './AnimatedNumber'
import { fmtPct } from '../lib/election'

// Kartu khusus proyektor: foto mengisi sisa tinggi, ukuran teks mengikuti layar (vw/vh).
export default function ProjectorCard({ row }) {
  const ring = row.isLeader ? 'ring-[3px] ring-gold-400 shadow-gold' : row.isTied ? 'ring-[3px] ring-amber-300' : 'ring-1 ring-white/10'
  return (
    <article className={`flex min-h-0 flex-col overflow-hidden rounded-3xl bg-navy-800/80 ${ring}`}>
      <div className="relative min-h-[18vh] flex-1">
        <CandidatePhoto candidate={row} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-950/95 to-transparent" />
        <span className="absolute left-[.8vw] top-[.8vw] rounded-2xl bg-gold-500 px-[.8vw] py-[.3vh] font-display text-[clamp(1.4rem,min(3vw,5.5vh),4.5rem)] font-extrabold text-navy-950 shadow-lg">
          {row.nomor}
        </span>
        <span className="absolute right-[.8vw] top-[.8vw] rounded-full bg-navy-950/85 px-[.8vw] py-[.3vh] text-[clamp(.75rem,min(1.1vw,2vh),1.6rem)] font-bold text-white">
          Peringkat #{row.rank}
        </span>
        {(row.isLeader || row.isTied) && (
          <span
            className={`absolute inset-x-[.8vw] bottom-[1vh] rounded-full py-[.5vh] text-center text-[clamp(.65rem,min(.95vw,1.8vh),1.4rem)] font-extrabold uppercase tracking-wide text-navy-950 ${row.isLeader ? 'bg-gold-500 shadow-gold' : 'bg-amber-300'}`}
          >
            {row.isLeader ? '🏆 Suara Terbanyak Sementara' : '⚖️ Seri'}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-[.4vh] px-[1vw] py-[1.2vh]">
        <p className="text-[clamp(.6rem,min(.8vw,1.5vh),1.1rem)] text-white/60">Ketua</p>
        <h3 className="font-display text-[clamp(.9rem,min(1.45vw,2.8vh),2.4rem)] font-bold leading-tight text-white">{row.ketua}</h3>
        <p className="text-[clamp(.6rem,min(.8vw,1.5vh),1.1rem)] text-white/60">Wakil</p>
        <h4 className="font-display text-[clamp(.8rem,min(1.2vw,2.3vh),2rem)] font-semibold leading-tight text-white/90">{row.wakil}</h4>
        <div className="mt-[.6vh] flex flex-wrap items-end justify-between gap-x-2">
          <AnimatedNumber value={row.votes} className="font-display text-[clamp(2rem,min(4.6vw,10vh),9rem)] font-extrabold leading-none text-white" />
          <span className="font-display text-[clamp(.9rem,min(1.7vw,3.6vh),3.4rem)] font-bold leading-none text-gold-300">{fmtPct(row.percent)}</span>
        </div>
        <div className="mt-[.6vh] h-[1.1vh] min-h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full transition-[width] duration-700 ease-out" style={{ width: `${row.percent}%`, background: `linear-gradient(90deg, ${row.color}, #ecc865)` }} />
        </div>
      </div>
    </article>
  )
}
