import { useEffect } from 'react'

export default function Modal({ open, title, onClose, children }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose?.()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-navy-950/80 p-4 backdrop-blur-sm sm:items-center" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="w-full max-w-lg rounded-3xl border border-white/10 bg-navy-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-4 font-display text-xl font-bold text-white">{title}</h3>
        {children}
      </div>
    </div>
  )
}
