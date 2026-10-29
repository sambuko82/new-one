export default function Panel({ title, subtitle, actions, children, className = '' }) {
  return (
    <section className={`rounded-3xl border border-white/10 bg-navy-800/60 p-4 backdrop-blur md:p-6 ${className}`}>
      {(title || actions) && (
        <header className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            {title && <h2 className="font-display text-lg font-bold text-white md:text-xl">{title}</h2>}
            {subtitle && <p className="text-xs text-white/60 md:text-sm">{subtitle}</p>}
          </div>
          {actions}
        </header>
      )}
      {children}
    </section>
  )
}
