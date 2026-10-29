import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { api } from '../lib/api'
import { DEFAULT_CANDIDATES, RESYNC_INTERVAL_MS } from '../lib/constants'
import { computeResults, isResultsPublic } from '../lib/election'
import { useAuth } from './AuthContext'

const ElectionContext = createContext(null)

export function ElectionProvider({ children }) {
  const { user, isAdmin } = useAuth()
  const [candidates, setCandidates] = useState(DEFAULT_CANDIDATES)
  const [counts, setCounts] = useState({})
  const [settings, setSettings] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)
  const [realtime, setRealtime] = useState('connecting')
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState(null)
  const [syncError, setSyncError] = useState(null)
  const [logVersion, setLogVersion] = useState(0)
  const [, setTick] = useState(0)
  const inflight = useRef(null)

  const resync = useCallback(async () => {
    if (inflight.current) return inflight.current
    setSyncing(true)
    inflight.current = (async () => {
      try {
        const snap = await api.fetchSnapshot()
        setCandidates(snap.candidates)
        setCounts(snap.counts)
        setSettings(snap.settings)
        setLastSync(new Date())
        setSyncError(null)
        setLogVersion((v) => v + 1)
      } catch (e) {
        setSyncError(e)
      } finally {
        setLoaded(true)
        setSyncing(false)
        inflight.current = null
      }
    })()
    return inflight.current
  }, [])

  // Snapshot awal + setiap kali status login berubah (admin boleh melihat suara walau disembunyikan)
  useEffect(() => {
    resync()
  }, [resync, user?.id, isAdmin])

  // Realtime
  useEffect(() => {
    const unsub = api.subscribe(
      (ev) => {
        if (ev.type === 'votes' && ev.row?.candidate_id != null) {
          setCounts((c) => ({ ...c, [ev.row.candidate_id]: ev.row.votes }))
          setLastSync(new Date())
        } else if (ev.type === 'settings') {
          // Visibilitas berubah → ambil ulang (RLS bisa membuka/menutup data suara)
          resync()
        } else if (ev.type === 'candidate' && ev.row?.id != null) {
          setCandidates((cs) => cs.map((c) => (c.id === ev.row.id ? { ...c, ...ev.row } : c)))
        } else if (ev.type === 'log') {
          setLogVersion((v) => v + 1)
        } else if (ev.type === 'resync') {
          resync()
        }
      },
      (status) => {
        setRealtime(status)
        // Setiap kali tersambung (ulang), kejar perubahan yang terlewat
        if (status === 'SUBSCRIBED') resync()
      },
    )
    return unsub
  }, [resync])

  // Indikator internet + sinkronisasi ulang otomatis
  useEffect(() => {
    const goOnline = () => {
      setOnline(true)
      resync()
    }
    const goOffline = () => setOnline(false)
    const onVisible = () => document.visibilityState === 'visible' && resync()
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    document.addEventListener('visibilitychange', onVisible)
    const iv = setInterval(() => navigator.onLine && resync(), RESYNC_INTERVAL_MS)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
      document.removeEventListener('visibilitychange', onVisible)
      clearInterval(iv)
    }
  }, [resync])

  // Jadwal tampil hasil: saat waktunya tiba, render ulang + ambil data
  useEffect(() => {
    if (!settings?.show_results_at || settings.results_visible) return
    const ms = new Date(settings.show_results_at).getTime() - Date.now()
    if (ms <= 0) return
    const t = setTimeout(() => {
      setTick((x) => x + 1)
      resync()
    }, Math.min(ms + 500, 2 ** 31 - 1))
    return () => clearTimeout(t)
  }, [settings, resync])

  const isPublic = isResultsPublic(settings)
  const canSeeResults = isPublic || isAdmin
  const results = useMemo(() => computeResults(candidates, counts), [candidates, counts])

  const connection = !online
    ? 'offline'
    : syncError
      ? 'error'
      : realtime === 'SUBSCRIBED'
        ? 'live'
        : realtime === 'connecting'
          ? 'connecting'
          : 'reconnecting'

  const applyChange = async (args) => {
    const row = await api.applyVoteChange(args)
    if (row?.candidate_id != null) setCounts((c) => ({ ...c, [row.candidate_id]: row.votes }))
    return row
  }

  const value = {
    loaded,
    candidates,
    counts,
    settings,
    results,
    isPublic,
    canSeeResults,
    connection,
    syncing,
    lastSync,
    syncError,
    logVersion,
    resync,
    applyChange,
    setSettingsLocal: setSettings,
  }
  return <ElectionContext.Provider value={value}>{children}</ElectionContext.Provider>
}

export const useElection = () => useContext(ElectionContext)
