import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Logo } from '../components/Header'
import { APP_TITLE, APP_SLOGAN } from '../lib/constants'
import { DEMO_ACCOUNTS, mode } from '../lib/api'
import { friendlyError } from '../lib/election'

export default function LoginPage() {
  const { isAdmin, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (isAdmin) return <Navigate to="/admin" replace />

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await signIn(email, password)
      navigate('/admin')
    } catch (err) {
      setError(friendlyError(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Logo className="mx-auto h-16 w-16" />
          <h1 className="mt-4 font-display text-xl font-extrabold text-white">{APP_TITLE}</h1>
          <p className="mt-1 font-display italic text-gold-300">“{APP_SLOGAN}”</p>
        </div>
        <form onSubmit={submit} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-navy-800/70 p-6 backdrop-blur">
          <div>
            <h2 className="font-display text-lg font-bold text-white">Login Panitia</h2>
            <p className="text-xs text-white/60">Hanya akun panitia terdaftar yang dapat mengubah suara.</p>
          </div>
          <label className="text-xs font-semibold text-white/70">
            Email
            <input type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="input mt-1" />
          </label>
          <label className="text-xs font-semibold text-white/70">
            Kata sandi
            <input type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="input mt-1" />
          </label>
          {error && <p className="rounded-xl bg-red-500/15 p-3 text-sm font-semibold text-red-300">{error}</p>}
          <button type="submit" disabled={busy} className="btn-gold">
            {busy ? 'Memeriksa…' : 'MASUK'}
          </button>
          {mode === 'demo' && (
            <div className="rounded-xl border border-gold-400/30 bg-gold-500/10 p-3 text-xs text-gold-200">
              <b>Mode DEMO</b> (Supabase belum dikonfigurasi). Data tersimpan di browser ini saja.
              <br />
              Akun uji: <code>{DEMO_ACCOUNTS[0].email}</code> / <code>{DEMO_ACCOUNTS[0].password}</code>
            </div>
          )}
          <Link to="/" className="text-center text-xs text-white/60 hover:text-white">
            ← Kembali ke dashboard hasil
          </Link>
        </form>
      </div>
    </div>
  )
}
