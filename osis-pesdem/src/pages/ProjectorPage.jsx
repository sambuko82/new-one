import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProjectorCard from '../components/ProjectorCard'
import StatusBanner from '../components/StatusBanner'
import ConnectionBadge from '../components/ConnectionBadge'
import ResultsHidden from '../components/ResultsHidden'
import AnimatedNumber from '../components/AnimatedNumber'
import { Logo } from '../components/Header'
import { VoteBarChart, VotePieChart } from '../components/ResultsCharts'
import { useElection } from '../context/ElectionContext'
import { APP_SLOGAN, APP_TITLE } from '../lib/constants'

// Panggil dari klik tombol (butuh gesture pengguna agar browser mengizinkan layar penuh).
export function enterProjector(navigate) {
  document.documentElement.requestFullscreen?.().catch(() => {})
  navigate('/proyektor')
}

function Clock() {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])
  return <span className="tabular-nums">{now.toLocaleTimeString('id-ID')}</span>
}

export default function ProjectorPage() {
  const { results, canSeeResults, settings, candidates, loaded } = useElection()
  const navigate = useNavigate()
  const [isFs, setIsFs] = useState(Boolean(document.fullscreenElement))
  const [showUi, setShowUi] = useState(true)
  const hideTimer = useRef()

  useEffect(() => {
    const onFs = () => setIsFs(Boolean(document.fullscreenElement))
    document.addEventListener('fullscreenchange', onFs)
    return () => document.removeEventListener('fullscreenchange', onFs)
  }, [])

  // Sembunyikan tombol & kursor setelah 3 detik tanpa gerakan mouse
  useEffect(() => {
    const wake = () => {
      setShowUi(true)
      clearTimeout(hideTimer.current)
      hideTimer.current = setTimeout(() => setShowUi(false), 3000)
    }
    wake()
    window.addEventListener('mousemove', wake)
    window.addEventListener('touchstart', wake)
    return () => {
      window.removeEventListener('mousemove', wake)
      window.removeEventListener('touchstart', wake)
      clearTimeout(hideTimer.current)
    }
  }, [])

  const toggleFs = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen?.().catch(() => {}))
  const exit = () => {
    if (document.fullscreenElement) document.exitFullscreen()
    navigate('/')
  }

  return (
    <div className={`flex min-h-screen flex-col gap-[1.5vh] px-[2vw] py-[2vh] md:h-screen md:overflow-hidden ${showUi ? '' : 'cursor-none'}`}>
      {/* Kontrol tampilan (bukan kontrol suara) — memudar otomatis */}
      <div className={`fixed bottom-4 right-4 z-50 flex gap-2 transition-opacity duration-500 ${showUi ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
        <button onClick={toggleFs} className="btn-ghost">{isFs ? '⤡ Keluar Layar Penuh' : '⤢ Layar Penuh'}</button>
        <button onClick={exit} className="btn-ghost">✕ Tutup Proyektor</button>
      </div>

      <header className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-4">
          <Logo className="h-[6vh] w-[6vh] min-h-12 min-w-12 shrink-0" />
          <div className="min-w-0">
            <h1 className="font-display text-[clamp(1.1rem,min(2.2vw,4vh),2.8rem)] font-extrabold leading-tight text-white">{APP_TITLE}</h1>
            <p className="font-display text-[clamp(.9rem,min(1.4vw,2.6vh),1.8rem)] italic text-gold-300">“{APP_SLOGAN}”</p>
          </div>
        </div>
        <div className="hidden shrink-0 flex-col items-end gap-1 md:flex">
          <ConnectionBadge compact />
          <p className="font-display text-[clamp(1rem,1.6vw,2rem)] font-bold text-white/80">
            <Clock />
          </p>
        </div>
      </header>

      {!loaded ? (
        <p className="m-auto text-3xl text-white/60">Memuat data…</p>
      ) : !canSeeResults ? (
        <ResultsHidden settings={settings} candidates={candidates} large />
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-[1.5vw]">
            <div className="rounded-3xl border border-gold-400/50 bg-gold-500/10 px-[2vw] py-[1vh]">
              <p className="text-[clamp(.8rem,1.1vw,1.4rem)] font-semibold uppercase tracking-widest text-gold-300">Total Seluruh Suara</p>
              <AnimatedNumber value={results.total} className="font-display text-[clamp(2.4rem,min(5vw,8vh),6.5rem)] font-extrabold leading-none text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <StatusBanner results={results} large />
            </div>
          </div>

          <div className="grid min-h-0 flex-1 gap-[1.2vw] lg:grid-cols-[2.4fr_1fr]">
            <div className="grid min-h-0 gap-[1.2vw] md:grid-cols-3">
              {results.rows.map((r) => (
                <ProjectorCard key={r.id} row={r} />
              ))}
            </div>
            <div className="grid min-h-0 gap-[1.2vw] md:grid-cols-2 lg:grid-cols-1 lg:grid-rows-2">
              <div className="flex min-h-64 flex-col rounded-3xl border border-white/10 bg-navy-800/60 p-[1vh] lg:min-h-0">
                <p className="px-2 text-[clamp(.7rem,min(1vw,1.8vh),1.4rem)] font-bold uppercase tracking-widest text-gold-300">Grafik Batang</p>
                <div className="min-h-0 flex-1">
                  <VoteBarChart results={results} large />
                </div>
              </div>
              <div className="flex min-h-64 flex-col rounded-3xl border border-white/10 bg-navy-800/60 p-[1vh] lg:min-h-0">
                <p className="px-2 text-[clamp(.7rem,min(1vw,1.8vh),1.4rem)] font-bold uppercase tracking-widest text-gold-300">Diagram Lingkaran</p>
                <div className="min-h-0 flex-1">
                  <VotePieChart results={results} large />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
