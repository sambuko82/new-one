import { Link } from 'react-router-dom'
import ConnectionBadge from './ConnectionBadge'
import { APP_SLOGAN, EVENT_NAME } from '../lib/constants'

export function Logo({ className = 'h-10 w-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <rect width="64" height="64" rx="16" fill="#d4a72c" />
      <rect x="12" y="26" width="40" height="28" rx="5" fill="#0a1633" />
      <rect x="22" y="10" width="20" height="24" rx="3" fill="#fff" />
      <path d="M26 22l4 4 8-9" stroke="#d4a72c" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="18" y="30" width="28" height="3" rx="1.5" fill="#d4a72c" />
    </svg>
  )
}

export default function Header({ right }) {
  return (
    <header className="border-b border-white/10 bg-navy-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <Logo />
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-gold-400">{EVENT_NAME}</p>
            <p className="truncate font-display text-sm font-bold text-white md:text-base">Live Counting Ketua &amp; Wakil Ketua OSIS</p>
          </div>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <ConnectionBadge />
          {right}
        </div>
      </div>
    </header>
  )
}

export function Hero({ title, compact = false }) {
  return (
    <div className={`text-center ${compact ? 'py-4' : 'py-8 md:py-12'}`}>
      <p className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-gold-500/10 px-4 py-1 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-300">
        <span className="h-1.5 w-1.5 rounded-full bg-gold-400" /> Hasil Penghitungan Suara
      </p>
      <h1 className="mx-auto max-w-5xl font-display text-2xl font-extrabold leading-tight text-white md:text-4xl lg:text-5xl">{title}</h1>
      <p className="mt-3 font-display text-base italic text-gold-300 md:text-xl">“{APP_SLOGAN}”</p>
    </div>
  )
}
