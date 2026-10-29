export const APP_TITLE = 'PEMILIHAN CALON KETUA OSIS DAN WAKIL KETUA OSIS'
export const APP_SLOGAN = 'Satu Suara, Satu Pilihan, Masa Depan Sekolah!'
export const EVENT_NAME = 'PESDEM (Pesta Demokrasi) OSIS'

// Urutan foto sesuai nomor urut:
// 01 → foto pertama (seragam SMP putih biru)
// 02 → foto ketiga (jas almamater)
// 03 → foto kedua (seragam Pramuka)
export const DEFAULT_CANDIDATES = [
  {
    id: 1,
    nomor: '01',
    ketua: 'Aura Thufaila El-Hazima',
    wakil: 'Khaulah Arkana Putri',
    photo_url: 'paslon/01.jpg',
    color: '#2563eb',
  },
  {
    id: 2,
    nomor: '02',
    ketua: 'Kinara Aisyah Ramadhani',
    wakil: 'Bilal Hauzan Kamil',
    photo_url: 'paslon/02.jpg',
    color: '#d4a72c',
  },
  {
    id: 3,
    nomor: '03',
    ketua: 'Aisy Zhafira Aqila',
    wakil: 'Tedy Kenzie Urdha',
    photo_url: 'paslon/03.jpg',
    color: '#059669',
  },
]

export const ACTION_LABELS = {
  add: 'Tambah',
  subtract: 'Kurangi',
  set: 'Ubah Total',
  reset: 'Reset',
}

// Fallback polling (ms) di samping Realtime, untuk jaga-jaga koneksi WebSocket terputus diam-diam
export const RESYNC_INTERVAL_MS = 20000
