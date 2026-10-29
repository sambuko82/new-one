// Gabungkan JS + CSS hasil build menjadi dist-artifact/pesdem-osis.html (tanpa <html>/<head>,
// karena claude.ai membungkus halaman artefak sendiri).
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'

const dir = 'dist-artifact/assets'
const files = readdirSync(dir)
const js = readFileSync(`${dir}/${files.find((f) => f.endsWith('.js'))}`, 'utf8').replaceAll('</script', '<\\/script')
const css = readFileSync(`${dir}/${files.find((f) => f.endsWith('.css'))}`, 'utf8')

const html = `<title>PESDEM OSIS Live Count</title>
<meta name="theme-color" content="#0a1633">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
<style>:root{color-scheme:dark}${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`
writeFileSync('dist-artifact/pesdem-osis.html', html)
console.log(`dist-artifact/pesdem-osis.html (${(html.length / 1024).toFixed(0)} KB)`)
