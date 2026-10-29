import { useState } from 'react'

// Foto paslon dengan cadangan (nomor urut) bila file foto belum tersedia.
export default function CandidatePhoto({ candidate, className = '' }) {
  const [failed, setFailed] = useState(false)
  const src = candidate.photo_url

  if (!src || failed) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-navy-700 to-navy-900 text-gold-400 ${className}`}>
        <span className="font-display text-6xl font-extrabold leading-none">{candidate.nomor}</span>
        <span className="mt-2 text-xs uppercase tracking-widest text-white/60">Foto belum diunggah</span>
      </div>
    )
  }
  return (
    <img
      key={src}
      src={src}
      alt={`Paslon ${candidate.nomor}: ${candidate.ketua} & ${candidate.wakil}`}
      onError={() => setFailed(true)}
      className={`object-cover object-top ${className}`}
      draggable={false}
    />
  )
}
