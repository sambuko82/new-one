import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { APP_TITLE, APP_SLOGAN, ACTION_LABELS } from './constants'
import { fmt, fmtPct, fmtTime } from './election'

const stamp = () => {
  const d = new Date()
  const p = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}`
}

const statusText = (results) =>
  results.status === 'empty'
    ? 'Belum ada suara masuk'
    : results.status === 'tie'
      ? `SERI: ${results.leaders.map((l) => `Paslon ${l.nomor}`).join(' & ')}`
      : `Suara terbanyak sementara: Paslon ${results.leaders[0].nomor}`

const nameOf = (candidates, id) => {
  const c = candidates.find((x) => x.id === id)
  return c ? `Paslon ${c.nomor}` : '—'
}

export function exportPDF(results, logs, candidates) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const W = doc.internal.pageSize.getWidth()

  doc.setFillColor(10, 22, 51)
  doc.rect(0, 0, W, 90, 'F')
  doc.setTextColor(236, 200, 101)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(13)
  doc.text(APP_TITLE, W / 2, 38, { align: 'center' })
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'italic')
  doc.setFontSize(10)
  doc.text(`"${APP_SLOGAN}"`, W / 2, 58, { align: 'center' })
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.text(`Rekap hasil penghitungan suara — dicetak ${fmtTime(new Date().toISOString())}`, W / 2, 76, { align: 'center' })

  doc.setTextColor(10, 22, 51)
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text(`Total suara sah: ${fmt(results.total)}`, 40, 120)
  doc.text(statusText(results), 40, 138)

  autoTable(doc, {
    startY: 155,
    head: [['Peringkat', 'No. Urut', 'Ketua OSIS', 'Wakil Ketua OSIS', 'Suara', 'Persentase']],
    body: results.ranked.map((r) => [r.rank, r.nomor, r.ketua, r.wakil, fmt(r.votes), fmtPct(r.percent)]),
    headStyles: { fillColor: [10, 22, 51], textColor: [236, 200, 101] },
    styles: { fontSize: 10 },
    columnStyles: { 4: { halign: 'right' }, 5: { halign: 'right' } },
  })

  if (logs?.length) {
    doc.setFontSize(11)
    doc.text('Riwayat perubahan suara', 40, doc.lastAutoTable.finalY + 30)
    autoTable(doc, {
      startY: doc.lastAutoTable.finalY + 40,
      head: [['Waktu', 'Paslon', 'Aksi', 'Perubahan', 'Sebelum', 'Sesudah', 'Admin', 'Alasan']],
      body: [...logs]
        .reverse()
        .map((l) => [
          fmtTime(l.created_at),
          nameOf(candidates, l.candidate_id),
          ACTION_LABELS[l.action] ?? l.action,
          (l.delta > 0 ? '+' : '') + l.delta,
          l.before_votes,
          l.after_votes,
          l.admin_email ?? '—',
          l.reason,
        ]),
      headStyles: { fillColor: [10, 22, 51], textColor: [236, 200, 101] },
      styles: { fontSize: 7.5, cellPadding: 3 },
    })
  }

  const pages = doc.internal.getNumberOfPages()
  const H = doc.internal.pageSize.getHeight()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setFontSize(8)
    doc.setTextColor(120)
    doc.text(`Halaman ${i} dari ${pages}`, W - 40, H - 20, { align: 'right' })
    doc.text('Tanda tangan Ketua Panitia: ____________________', 40, H - 20)
  }
  doc.save(`hasil-pesdem-osis-${stamp()}.pdf`)
}

export function exportExcel(results, logs, candidates) {
  const wb = XLSX.utils.book_new()
  const summary = [
    [APP_TITLE],
    [APP_SLOGAN],
    [`Dicetak: ${fmtTime(new Date().toISOString())}`],
    [],
    ['Peringkat', 'No. Urut', 'Ketua OSIS', 'Wakil Ketua OSIS', 'Suara', 'Persentase (%)'],
    ...results.ranked.map((r) => [r.rank, r.nomor, r.ketua, r.wakil, r.votes, Number(r.percent.toFixed(2))]),
    [],
    ['', '', '', 'TOTAL', results.total, results.total ? 100 : 0],
    ['Status', statusText(results)],
  ]
  const ws1 = XLSX.utils.aoa_to_sheet(summary)
  ws1['!cols'] = [{ wch: 10 }, { wch: 9 }, { wch: 30 }, { wch: 30 }, { wch: 10 }, { wch: 14 }]
  XLSX.utils.book_append_sheet(wb, ws1, 'Hasil')

  const ws2 = XLSX.utils.json_to_sheet(
    [...(logs ?? [])].reverse().map((l) => ({
      Waktu: fmtTime(l.created_at),
      Paslon: nameOf(candidates, l.candidate_id),
      Aksi: ACTION_LABELS[l.action] ?? l.action,
      Perubahan: l.delta,
      Sebelum: l.before_votes,
      Sesudah: l.after_votes,
      Admin: l.admin_email ?? '',
      Alasan: l.reason,
    })),
  )
  ws2['!cols'] = [{ wch: 24 }, { wch: 10 }, { wch: 12 }, { wch: 10 }, { wch: 9 }, { wch: 9 }, { wch: 28 }, { wch: 40 }]
  XLSX.utils.book_append_sheet(wb, ws2, 'Riwayat')

  XLSX.writeFile(wb, `hasil-pesdem-osis-${stamp()}.xlsx`)
}
