import { Bar, BarChart, CartesianGrid, Cell, LabelList, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts'
import { fmt, fmtPct } from '../lib/election'

const RAD = Math.PI / 180
// Label persentase di tengah cincin (tidak terpotong di layar kecil)
function SliceLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent, large }) {
  if (!percent || percent < 0.04) return null
  const r = innerRadius + (outerRadius - innerRadius) / 2
  const x = cx + r * Math.cos(-midAngle * RAD)
  const y = cy + r * Math.sin(-midAngle * RAD)
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" style={{ fontSize: large ? 18 : 11, fontWeight: 800, paintOrder: 'stroke', stroke: 'rgba(5,11,31,.6)', strokeWidth: 3 }}>
      {(percent * 100).toLocaleString('id-ID', { maximumFractionDigits: 1 })}%
    </text>
  )
}

const tooltipStyle = {
  contentStyle: { background: '#0a1633', border: '1px solid rgba(236,200,101,.5)', borderRadius: 12, color: '#fff' },
  itemStyle: { color: '#fff' },
  labelStyle: { color: '#ecc865', fontWeight: 700 },
}

export function VoteBarChart({ results, large = false }) {
  const data = results.rows.map((r) => ({ name: large ? r.nomor : `Paslon ${r.nomor}`, votes: r.votes, pct: r.percent, color: r.color }))
  const fs = large ? 16 : 12
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: large ? 32 : 28, right: 8, left: 0, bottom: 4 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.08)" vertical={false} />
        <XAxis dataKey="name" interval={0} tick={{ fill: '#fff', fontSize: fs, fontWeight: 700 }} axisLine={{ stroke: 'rgba(255,255,255,.2)' }} tickLine={false} />
        <YAxis allowDecimals={false} tick={{ fill: 'rgba(255,255,255,.6)', fontSize: fs - 2 }} axisLine={false} tickLine={false} width={large ? 60 : 40} />
        <Tooltip {...tooltipStyle} cursor={{ fill: 'rgba(255,255,255,.05)' }} formatter={(v, _n, p) => [`${fmt(v)} suara (${fmtPct(p.payload.pct)})`, 'Perolehan']} />
        <Bar dataKey="votes" radius={[12, 12, 0, 0]} animationDuration={700} maxBarSize={large ? 180 : 110}>
          {data.map((d) => (
            <Cell key={d.name} fill={d.color} />
          ))}
          <LabelList dataKey="votes" position="top" formatter={fmt} style={{ fill: '#ecc865', fontWeight: 800, fontSize: large ? 24 : 15 }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export function VotePieChart({ results, large = false }) {
  const data = results.rows.map((r) => ({ name: `Paslon ${r.nomor}`, value: r.votes, pct: r.percent, color: r.color }))
  const empty = results.total === 0
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={empty ? [{ name: 'Belum ada suara', value: 1, color: 'rgba(255,255,255,.12)' }] : data}
          dataKey="value"
          nameKey="name"
          innerRadius="45%"
          outerRadius="85%"
          paddingAngle={empty ? 0 : 2}
          stroke="#0a1633"
          strokeWidth={3}
          animationDuration={700}
          label={empty ? false : (p) => <SliceLabel {...p} large={large} />}
          labelLine={false}
        >
          {(empty ? [{ color: 'rgba(255,255,255,.12)' }] : data).map((d, i) => (
            <Cell key={i} fill={d.color} />
          ))}
        </Pie>
        {!empty && <Tooltip {...tooltipStyle} formatter={(v, n, p) => [`${fmt(v)} suara (${fmtPct(p.payload.pct)})`, n]} />}
        <Legend wrapperStyle={{ color: '#fff', fontSize: large ? 16 : 12, fontWeight: 600 }} iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  )
}
