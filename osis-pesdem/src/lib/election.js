// Perhitungan turunan: total, persentase, peringkat, status pemimpin/seri.

export function isResultsPublic(settings, now = Date.now()) {
  if (!settings) return false
  if (settings.results_visible) return true
  if (settings.show_results_at && now >= new Date(settings.show_results_at).getTime()) return true
  return false
}

export function computeResults(candidates, counts) {
  const rows = candidates.map((c) => ({ ...c, votes: Number(counts?.[c.id] ?? 0) }))
  const total = rows.reduce((s, r) => s + r.votes, 0)
  const max = rows.reduce((m, r) => Math.max(m, r.votes), 0)
  const leaders = max > 0 ? rows.filter((r) => r.votes === max) : []
  const isTie = leaders.length > 1

  const sorted = [...rows].sort((a, b) => b.votes - a.votes || a.id - b.id)
  // Ranking kompetisi standar: nilai sama → peringkat sama (1, 1, 3)
  const rankById = {}
  sorted.forEach((r, i) => {
    const prev = sorted[i - 1]
    rankById[r.id] = prev && prev.votes === r.votes ? rankById[prev.id] : i + 1
  })

  const withMeta = rows.map((r) => ({
    ...r,
    percent: total > 0 ? (r.votes / total) * 100 : 0,
    rank: rankById[r.id],
    isLeader: leaders.length === 1 && leaders[0].id === r.id,
    isTied: isTie && r.votes === max,
  }))

  return {
    rows: withMeta,
    ranked: [...withMeta].sort((a, b) => a.rank - b.rank || a.id - b.id),
    total,
    status: max === 0 ? 'empty' : isTie ? 'tie' : 'lead',
    leaders: withMeta.filter((r) => r.isLeader || r.isTied),
  }
}

export const fmt = (n) => new Intl.NumberFormat('id-ID').format(n)
export const fmtPct = (p) => `${p.toLocaleString('id-ID', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}%`
export const fmtTime = (iso) =>
  new Date(iso).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })

export function friendlyError(err) {
  const msg = err?.message || String(err)
  const clean = msg.replace(/^(FORBIDDEN|INVALID|NEGATIVE|CONFLICT|NOT_FOUND):\s*/, '')
  if (/Failed to fetch|NetworkError|network/i.test(msg)) return 'Koneksi internet terputus. Perubahan belum tersimpan — coba lagi.'
  if (/Invalid login credentials/i.test(msg)) return 'Email atau kata sandi salah.'
  return clean
}
