// Backend untuk versi Artefak claude.ai: penyimpanan bersama (`db`) + identitas (`user`)
// + foto (`assets`) + unduhan (`downloads`). Antarmuka sama dengan supabaseApi/demoApi.
//
// Struktur data:
//   public/state            dibaca semua orang, ditulis panitia (Editor/Owner)
//                           { counts | null, settings, photos }
//   private/state           hanya panitia: { counts }  ← sumber kebenaran
//   private/state/logs/*    hanya panitia: riwayat perubahan
// counts di public/state hanya diisi saat hasil ditampilkan, jadi saat disembunyikan
// pengunjung benar-benar tidak menerima angka suara.
import { DEFAULT_CANDIDATES } from './constants'
import { isResultsPublic } from './election'
import { resizeImage } from './image'

export const ARTIFACT_CAPABILITIES = {
  db: {
    rules: [
      { path: '', read: 'view', write: 'admin' },
      { path: 'private', read: 'admin', write: 'admin' },
    ],
  },
  user: { scopes: ['profile'] },
  assets: {},
  downloads: true,
}

const use = (name) => (window.claude?.use ? window.claude.use(name) : Promise.resolve(null))
const caps = { db: use('db'), user: use('user'), assets: use('assets'), downloads: use('downloads') }
const tabId = `tab-${Math.random().toString(36).slice(2)}`
const delay = (ms) => new Promise((r) => setTimeout(r, ms))
const zeroCounts = () => Object.fromEntries(DEFAULT_CANDIDATES.map((c) => [c.id, 0]))
const DEFAULT_SETTINGS = { id: 1, results_visible: true, show_results_at: null }

async function requireDb() {
  const db = await caps.db
  if (!db) throw new Error('Penyimpanan bersama tidak tersedia. Pastikan Anda masuk ke claude.ai.')
  return db
}

let mePromise
const me = () => (mePromise ??= caps.user.then((u) => (u ? u.me() : null)))

async function requireAdmin() {
  const m = await me()
  if (!m?.canEdit) throw new Error('FORBIDDEN: hanya panitia (Owner/Editor artefak) yang dapat mengubah suara')
  return m
}

const publicRef = (db) => db.doc('public/state')
const privateRef = (db) => db.doc('private/state')

async function readPrivateCounts(db) {
  const snap = await privateRef(db).get()
  if (snap.exists) return { ...zeroCounts(), ...(snap.data().counts ?? {}) }
  // Pertama kali: buat dokumen sumber
  const counts = zeroCounts()
  await privateRef(db).set({ counts, updated_at: new Date().toISOString() })
  return counts
}

async function readPublic(db) {
  const snap = await publicRef(db).get()
  return snap.exists ? snap.data() : null
}

// Salin angka ke dokumen publik hanya jika hasil sedang ditampilkan.
async function mirror(db, counts, settings) {
  const pub = (await readPublic(db)) ?? {}
  const s = settings ?? pub.settings ?? DEFAULT_SETTINGS
  const next = { ...pub, settings: s, counts: isResultsPublic(s) ? counts : null, updated_at: new Date().toISOString() }
  await publicRef(db).set(next)
}

// Kunci kooperatif agar dua panitia tidak saling menimpa (tidak ada transaksi di store ini).
async function withLock(db, fn) {
  for (let i = 0; i < 40; i++) {
    const r = await privateRef(db).acquire({ holder: tabId, ttlMs: 1500 })
    if (r.acquired) return fn()
    await delay(120 + Math.random() * 180)
  }
  throw new Error('Server sedang sibuk menerima input panitia lain. Coba lagi.')
}

function mapCandidates(pub) {
  const photos = pub?.photos ?? {}
  return DEFAULT_CANDIDATES.map((c) => (photos[c.id] ? { ...c, photo_url: photos[c.id] } : c))
}

export const artifactApi = {
  async fetchSnapshot() {
    const db = await caps.db
    if (!db) {
      return { candidates: DEFAULT_CANDIDATES, counts: {}, countsAvailable: false, settings: { ...DEFAULT_SETTINGS, results_visible: false, _noAccess: true } }
    }
    const m = await me()
    const pub = await readPublic(db)
    const settings = pub?.settings ?? DEFAULT_SETTINGS
    let counts = pub?.counts ?? null
    if (m?.canEdit) counts = await readPrivateCounts(db)
    return { candidates: mapCandidates(pub), counts: counts ?? {}, countsAvailable: Boolean(counts), settings }
  },

  subscribe(onChange, onStatus) {
    const unsubs = []
    let stopped = false
    let timer
    ;(async () => {
      const db = await caps.db
      if (stopped) return
      if (!db) return onStatus?.('CHANNEL_ERROR')
      const fail = () => onStatus?.('CHANNEL_ERROR')
      let first = true
      unsubs.push(
        publicRef(db).onSnapshot((snap) => {
          if (first) {
            first = false
            onStatus?.('SUBSCRIBED')
          }
          const d = snap.exists ? snap.data() : {}
          onChange({ type: 'settings', row: d.settings ?? DEFAULT_SETTINGS })
        }, fail),
      )
      const m = await me()
      if (stopped || !m?.canEdit) return
      unsubs.push(
        privateRef(db).onSnapshot((snap) => {
          const counts = snap.exists ? snap.data().counts ?? {} : {}
          for (const [id, votes] of Object.entries(counts)) onChange({ type: 'votes', row: { candidate_id: Number(id), votes } })
        }, fail),
        privateRef(db)
          .collection('logs')
          .orderBy('created_at', 'desc')
          .limit(1)
          .onSnapshot(() => onChange({ type: 'log' }), fail),
      )
      // Jadwal tampil otomatis: laptop panitia yang terbuka menyalin angka ke publik saat waktunya tiba.
      timer = setInterval(async () => {
        try {
          const pub = await readPublic(db)
          const s = pub?.settings
          if (s && !s.results_visible && s.show_results_at && isResultsPublic(s) && !pub.counts) {
            await mirror(db, await readPrivateCounts(db), s)
          }
        } catch {
          /* dicoba lagi pada putaran berikutnya */
        }
      }, 5000)
    })()
    return () => {
      stopped = true
      clearInterval(timer)
      unsubs.forEach((u) => u())
    }
  },

  async applyVoteChange({ candidateId, mode, value, reason, expected = null }) {
    const m = await requireAdmin()
    const db = await requireDb()
    if (!Number.isInteger(value) || value < 0) throw new Error('INVALID: angka suara harus bilangan bulat ≥ 0')
    if ((mode === 'add' || mode === 'subtract') && value === 0) throw new Error('INVALID: jumlah perubahan harus lebih dari 0')
    if (!reason?.trim()) throw new Error('INVALID: alasan perubahan wajib diisi')
    return withLock(db, async () => {
      const counts = await readPrivateCounts(db)
      const before = counts[candidateId] ?? 0
      if (expected !== null && expected !== before)
        throw new Error(`CONFLICT: total suara sudah diubah panitia lain (sekarang ${before}). Muat ulang lalu coba lagi.`)
      const after = mode === 'add' ? before + value : mode === 'subtract' ? before - value : value
      if (after < 0) throw new Error(`NEGATIVE: jumlah suara tidak boleh negatif (sekarang ${before})`)
      const next = { ...counts, [candidateId]: after }
      const now = new Date().toISOString()
      await privateRef(db).set({ counts: next, updated_at: now })
      await privateRef(db).collection('logs').add({
        candidate_id: candidateId,
        action: mode,
        delta: after - before,
        before_votes: before,
        after_votes: after,
        reason: reason.trim(),
        admin_id: m.id,
        created_at: now,
      })
      await mirror(db, next)
      return { candidate_id: candidateId, votes: after }
    })
  },

  async resetAll(reason, confirm) {
    const m = await requireAdmin()
    const db = await requireDb()
    if (confirm !== 'RESET') throw new Error('INVALID: ketik RESET untuk konfirmasi')
    if (!reason?.trim()) throw new Error('INVALID: alasan reset wajib diisi')
    await withLock(db, async () => {
      const counts = await readPrivateCounts(db)
      const now = new Date().toISOString()
      for (const c of DEFAULT_CANDIDATES) {
        await privateRef(db).collection('logs').add({
          candidate_id: c.id,
          action: 'reset',
          delta: -(counts[c.id] ?? 0),
          before_votes: counts[c.id] ?? 0,
          after_votes: 0,
          reason: reason.trim(),
          admin_id: m.id,
          created_at: now,
        })
      }
      const zero = zeroCounts()
      await privateRef(db).set({ counts: zero, updated_at: now })
      await mirror(db, zero)
    })
  },

  async updateSettings(visible, showAt) {
    await requireAdmin()
    const db = await requireDb()
    const settings = { id: 1, results_visible: visible, show_results_at: showAt, updated_at: new Date().toISOString() }
    await mirror(db, await readPrivateCounts(db), settings)
    return settings
  },

  async fetchLogs(limit = 500) {
    await requireAdmin()
    const db = await requireDb()
    const snap = await privateRef(db).collection('logs').orderBy('created_at', 'desc').limit(Math.min(limit, 1000)).get()
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    const user = await caps.user
    const ids = [...new Set(rows.map((r) => r.admin_id).filter(Boolean))]
    const profiles = user && ids.length ? await user.profiles(ids) : {}
    return rows.map((r) => ({ ...r, admin_email: profiles?.[r.admin_id]?.name || 'Panitia' }))
  },

  async updatePhoto(candidateId, file) {
    await requireAdmin()
    const db = await requireDb()
    const assets = await caps.assets
    if (!assets) throw new Error('Unggah foto hanya untuk pemilik/Editor artefak.')
    const { blob } = await resizeImage(file)
    const { url } = await assets.upload(blob)
    const pub = (await readPublic(db)) ?? { settings: DEFAULT_SETTINGS, counts: null }
    await publicRef(db).set({ ...pub, photos: { ...(pub.photos ?? {}), [candidateId]: url } })
  },

  // ---- identitas: pakai akun claude.ai, bukan email/password ----
  async getUser() {
    const m = await me()
    return m ? { id: m.id, email: m.name || 'Panitia', canEdit: m.canEdit } : null
  },
  onAuthChange() {
    return () => {}
  },
  async signIn() {
    throw new Error('Versi artefak memakai akun claude.ai. Buka artefak dengan akun pemilik atau Editor.')
  },
  async signOut() {},
  async isAdmin(user) {
    return Boolean(user?.canEdit)
  },
}

// Simpan file lewat dialog unduhan claude.ai (link unduhan biasa diblokir di artefak).
export async function saveFile(filename, data) {
  const downloads = await caps.downloads
  if (!downloads) throw new Error('Unduhan tidak tersedia di tampilan ini.')
  await downloads.save({ filename, data })
}
