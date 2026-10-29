import AnimatedNumber from './AnimatedNumber'

export default function StatTiles({ results, lastSync, large = false }) {
  const leader = results.status === 'lead' ? `Paslon ${results.leaders[0].nomor}` : results.status === 'tie' ? 'SERI' : '—'
  const margin =
    results.status === 'lead' && results.ranked[1] ? results.ranked[0].votes - results.ranked[1].votes : 0
  const tiles = [
    { label: 'Total Seluruh Suara', value: <AnimatedNumber value={results.total} /> },
    { label: 'Unggul Sementara', value: leader },
    { label: 'Selisih Peringkat 1–2', value: <AnimatedNumber value={margin} /> },
    { label: 'Pembaruan Terakhir', value: lastSync ? lastSync.toLocaleTimeString('id-ID') : '—' },
  ]
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {tiles.map((t) => (
        <div key={t.label} className="rounded-2xl border border-white/10 bg-navy-800/60 p-4">
          <p className={`uppercase tracking-widest text-white/50 ${large ? 'text-sm' : 'text-[10px] md:text-xs'}`}>{t.label}</p>
          <p className={`mt-1 font-display font-extrabold text-white ${large ? 'text-4xl' : 'text-2xl md:text-3xl'}`}>{t.value}</p>
        </div>
      ))}
    </div>
  )
}
