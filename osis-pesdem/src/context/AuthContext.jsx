import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  const evaluate = useCallback(async (u) => {
    setUser(u)
    try {
      setIsAdmin(u ? await api.isAdmin(u) : false)
    } catch {
      setIsAdmin(false)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    api.getUser().then(evaluate)
    return api.onAuthChange(evaluate)
  }, [evaluate])

  const signIn = async (email, password) => {
    const u = await api.signIn(email, password)
    const ok = await api.isAdmin(u)
    if (!ok) {
      await api.signOut()
      throw new Error('Akun ini belum terdaftar sebagai panitia. Hubungi ketua panitia.')
    }
    setUser(u)
    setIsAdmin(true)
    return u
  }

  const signOut = async () => {
    await api.signOut()
    setUser(null)
    setIsAdmin(false)
  }

  return <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
