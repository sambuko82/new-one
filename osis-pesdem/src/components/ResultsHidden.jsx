import { useEffect, useState } from 'react'
import CandidateCard from './CandidateCard'

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const ms = Math.max(0, new Date(target).getTime() - now)
  const h = Math.floor(ms / 3.6e6)
  const m = Math.floor((ms % 3.6e6) / 6e4)
  const s = Math.floor((ms % 6e4) / 1000)
  const p = (n) => String(n).padStart(2, '0')
  return <span className="font-display tabular-nums">{`${p(h)}:${p(m)}:${p(s)}`}</span>
}

export default function ResultsHidden({ settings, candidates, large = false }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="mx-auto max-w-2xl rounded-3xl border border-gold-400/40 bg-gold-500/10 p-6 text-center">
        <p className={`font-display font-extrabold text-gold-300 ${large ? 'text-4xl' : 'text-2xl'}`}>🔒 Hasil belum ditampilkan</p>
        <p className={`mt-2 text-white/80 ${large ? 'text-xl' : 'text-sm'}`}>Panitia sedang melakukan penghitungan suara. Hasil akan muncul otomatis di layar ini tanpa perlu refresh.</p>
        {settings?.show_results_at && (
          <p className={`mt-4 text-white ${large ? 'text-3xl' : 'text-lg'}`}>
            Ditampilkan dalam <Countdown target={settings.show_results_at} />
          </p>
        )}
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {candidates.map((c) => (
          <CandidateCard key={c.id} row={c} showVotes={false} large={large} />
        ))}
      </div>
    </div>
  )
}
