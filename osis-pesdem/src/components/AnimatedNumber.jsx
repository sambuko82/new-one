import { useEffect, useRef, useState } from 'react'
import { fmt } from '../lib/election'

// Angka yang "berlari" ke nilai baru + efek denyut saat berubah.
export default function AnimatedNumber({ value, className = '' }) {
  const [display, setDisplay] = useState(value)
  const [bump, setBump] = useState(0)
  const from = useRef(value)

  useEffect(() => {
    const start = from.current
    if (start === value) return
    setBump((b) => b + 1)
    const t0 = performance.now()
    const dur = 600
    let raf
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(start + (value - start) * eased))
      if (p < 1) raf = requestAnimationFrame(step)
      else from.current = value
    }
    raf = requestAnimationFrame(step)
    return () => {
      cancelAnimationFrame(raf)
      from.current = value
    }
  }, [value])

  return (
    <span key={bump} className={`inline-block tabular-nums ${bump ? 'animate-bump' : ''} ${className}`}>
      {fmt(display)}
    </span>
  )
}
