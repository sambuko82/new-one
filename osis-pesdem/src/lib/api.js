// Lapisan data. Dua backend dengan antarmuka yang sama:
//  - Supabase (produksi): PostgreSQL + Realtime + Auth + RLS
//  - Demo lokal (bila .env belum diisi): localStorage + BroadcastChannel, sinkron antar-tab di 1 browser
import { supabase, isSupabaseConfigured } from './supabase'
import { DEFAULT_CANDIDATES } from './constants'
import { resizeImage } from './image'

export const mode = isSupabaseConfigured ? 'supabase' : 'demo'

/* ======================================================================
 * SUPABASE BACKEND
 * ==================================================================== */
const supabaseApi = {
  async fetchSnapshot() {
    const [cand, votes, settings] = await Promise.all([
      supabase.from('candidates').select('*').order('id'),
      supabase.from('vote_counts').select('*'),
      supabase.from('settings').select('*').eq('id', 1).maybeSingle(),
    ])
    for (const r of [cand, votes, settings]) if (r.error) throw r.error
    const counts = {}
    for (const v of votes.data) counts[v.candidate_id] = v.votes
    return {
      candidates: cand.data?.length ? cand.data : DEFAULT_CANDIDATES,
      counts,
      // RLS menyembunyikan baris suara bila hasil belum ditampilkan
      countsAvailable: votes.data.length > 0,
      settings: settings.data,
    }
  },

  subscribe(onChange, onStatus) {
    const channel = supabase
      .channel('pesdem-live')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vote_counts' }, (p) =>
        onChange({ type: 'votes', row: p.new }),
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, (p) =>
        onChange({ type: 'settings', row: p.new }),
      )
      .on('postgres_changes', { event: '*', schema: 'public', table: 'candidates' }, (p) =>
        onChange({ type: 'candidate', row: p.new }),
      )
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'vote_logs' }, (p) =>
        onChange({ type: 'log', row: p.new }),
      )
      .subscribe((status) => onStatus?.(status))
    return () => supabase.removeChannel(channel)
  },

  async applyVoteChange({ candidateId, mode, value, reason, expected = null }) {
    const { data, error } = await supabase.rpc('apply_vote_change', {
      p_candidate: candidateId,
      p_mode: mode,
      p_value: value,
      p_reason: reason,
      p_expected: expected,
    })
    if (error) throw error
    return data
  },

  async resetAll(reason, confirm) {
    const { error } = await supabase.rpc('reset_all_votes', { p_reason: reason, p_confirm: confirm })
    if (error) throw error
  },

  async updateSettings(visible, showAt) {
    const { data, error } = await supabase.rpc('update_settings', { p_visible: visible, p_show_at: showAt })
    if (error) throw error
    return data
  },

  async fetchLogs(limit = 500) {
    const { data, error } = await supabase
      .from('vote_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit)
    if (error) throw error
    return data
  },

  async updatePhoto(candidateId, file) {
    const { blob } = await resizeImage(file)
    const path = `paslon-${String(candidateId).padStart(2, '0')}-${Date.now()}.jpg`
    const up = await supabase.storage.from('paslon').upload(path, blob, { contentType: 'image/jpeg', upsert: true })
    if (up.error) throw up.error
    const { data } = supabase.storage.from('paslon').getPublicUrl(path)
    const { error } = await supabase.from('candidates').update({ photo_url: data.publicUrl, updated_at: new Date().toISOString() }).eq('id', candidateId)
    if (error) throw error
  },

  // ---- auth ----
  async getUser() {
    const { data } = await supabase.auth.getSession()
    return data.session?.user ?? null
  },
  onAuthChange(cb) {
    const { data } = supabase.auth.onAuthStateChange((_e, session) => cb(session?.user ?? null))
    return () => data.subscription.unsubscribe()
  },
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    return data.user
  },
  async signOut() {
    await supabase.auth.signOut()
  },
  async isAdmin(user) {
    if (!user) return false
    const { data, error } = await supabase.from('admins').select('user_id').eq('user_id', user.id).maybeSingle()
    if (error) throw error
    return Boolean(data)
  },
}

/* ======================================================================
 * DEMO BACKEND (tanpa server)
 * ==================================================================== */
const DEMO_KEY = 'pesdem-demo-v1'
const DEMO_USER_KEY = 'pesdem-demo-user'
export const DEMO_ACCOUNTS = [
  { email: 'panitia1@pesdem.local', password: 'pesdem2026' },
  { email: 'panitia2@pesdem.local', password: 'pesdem2026' },
]

const bc = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('pesdem-demo') : null
const listeners = new Set()
const authListeners = new Set()

function demoInitial() {
  return {
    candidates: DEFAULT_CANDIDATES,
    counts: { 1: 0, 2: 0, 3: 0 },
    settings: { id: 1, results_visible: true, show_results_at: null, updated_at: new Date().toISOString() },
    logs: [],
    seq: 0,
  }
}
function demoLoad() {
  try {
    const raw = localStorage.getItem(DEMO_KEY)
    return raw ? JSON.parse(raw) : demoInitial()
  } catch {
    return demoInitial()
  }
}
function demoSave(db, events) {
  localStorage.setItem(DEMO_KEY, JSON.stringify(db))
  for (const ev of events) {
    listeners.forEach((l) => l(ev))
    bc?.postMessage(ev)
  }
}
bc && (bc.onmessage = (e) => listeners.forEach((l) => l(e.data)))
typeof window !== 'undefined' &&
  window.addEventListener('storage', (e) => {
    if (e.key === DEMO_KEY) listeners.forEach((l) => l({ type: 'resync' }))
  })

function demoUser() {
  try {
    return JSON.parse(sessionStorage.getItem(DEMO_USER_KEY))
  } catch {
    return null
  }
}
function requireDemoAdmin() {
  const u = demoUser()
  if (!u) throw new Error('FORBIDDEN: hanya panitia yang dapat mengubah suara')
  return u
}
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

const demoApi = {
  async fetchSnapshot() {
    const db = demoLoad()
    return { candidates: db.candidates, counts: db.counts, countsAvailable: true, settings: db.settings }
  },
  subscribe(onChange, onStatus) {
    listeners.add(onChange)
    setTimeout(() => onStatus?.('SUBSCRIBED'), 50)
    return () => listeners.delete(onChange)
  },
  async applyVoteChange({ candidateId, mode, value, reason, expected = null }) {
    const user = requireDemoAdmin()
    await delay(120)
    if (!Number.isInteger(value) || value < 0) throw new Error('INVALID: angka suara harus bilangan bulat ≥ 0')
    if ((mode === 'add' || mode === 'subtract') && value === 0) throw new Error('INVALID: jumlah perubahan harus lebih dari 0')
    if (!reason?.trim()) throw new Error('INVALID: alasan perubahan wajib diisi')
    const db = demoLoad()
    const before = db.counts[candidateId] ?? 0
    if (expected !== null && expected !== before)
      throw new Error(`CONFLICT: total suara sudah diubah panitia lain (sekarang ${before}). Muat ulang lalu coba lagi.`)
    const after = mode === 'add' ? before + value : mode === 'subtract' ? before - value : value
    if (after < 0) throw new Error(`NEGATIVE: jumlah suara tidak boleh negatif (sekarang ${before})`)
    db.counts[candidateId] = after
    const log = {
      id: ++db.seq,
      candidate_id: candidateId,
      action: mode,
      delta: after - before,
      before_votes: before,
      after_votes: after,
      reason: reason.trim(),
      admin_email: user.email,
      created_at: new Date().toISOString(),
    }
    db.logs.unshift(log)
    demoSave(db, [
      { type: 'votes', row: { candidate_id: candidateId, votes: after } },
      { type: 'log', row: log },
    ])
    return { candidate_id: candidateId, votes: after }
  },
  async resetAll(reason, confirm) {
    const user = requireDemoAdmin()
    if (confirm !== 'RESET') throw new Error('INVALID: ketik RESET untuk konfirmasi')
    if (!reason?.trim()) throw new Error('INVALID: alasan reset wajib diisi')
    const db = demoLoad()
    const events = []
    for (const c of db.candidates) {
      const before = db.counts[c.id] ?? 0
      db.counts[c.id] = 0
      const log = {
        id: ++db.seq,
        candidate_id: c.id,
        action: 'reset',
        delta: -before,
        before_votes: before,
        after_votes: 0,
        reason: reason.trim(),
        admin_email: user.email,
        created_at: new Date().toISOString(),
      }
      db.logs.unshift(log)
      events.push({ type: 'votes', row: { candidate_id: c.id, votes: 0 } }, { type: 'log', row: log })
    }
    demoSave(db, events)
  },
  async updateSettings(visible, showAt) {
    const user = requireDemoAdmin()
    const db = demoLoad()
    db.settings = { ...db.settings, results_visible: visible, show_results_at: showAt, updated_at: new Date().toISOString(), updated_by: user.email }
    demoSave(db, [{ type: 'settings', row: db.settings }])
    return db.settings
  },
  async fetchLogs(limit = 500) {
    requireDemoAdmin()
    return demoLoad().logs.slice(0, limit)
  },
  async updatePhoto(candidateId, file) {
    requireDemoAdmin()
    const { dataUrl } = await resizeImage(file, 600, 0.8)
    const db = demoLoad()
    db.candidates = db.candidates.map((c) => (c.id === candidateId ? { ...c, photo_url: dataUrl } : c))
    try {
      demoSave(db, [{ type: 'candidate', row: db.candidates.find((c) => c.id === candidateId) }])
    } catch {
      throw new Error('Penyimpanan browser penuh. Gunakan foto lebih kecil atau mode Supabase.')
    }
  },
  async getUser() {
    return demoUser()
  },
  onAuthChange(cb) {
    authListeners.add(cb)
    return () => authListeners.delete(cb)
  },
  async signIn(email, password) {
    await delay(200)
    const acc = DEMO_ACCOUNTS.find((a) => a.email === email.trim().toLowerCase() && a.password === password)
    if (!acc) throw new Error('Invalid login credentials')
    const user = { id: acc.email, email: acc.email }
    sessionStorage.setItem(DEMO_USER_KEY, JSON.stringify(user))
    authListeners.forEach((l) => l(user))
    return user
  },
  async signOut() {
    sessionStorage.removeItem(DEMO_USER_KEY)
    authListeners.forEach((l) => l(null))
  },
  async isAdmin(user) {
    return Boolean(user)
  },
}

export const api = isSupabaseConfigured ? supabaseApi : demoApi
