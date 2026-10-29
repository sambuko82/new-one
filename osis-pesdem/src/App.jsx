import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ElectionProvider } from './context/ElectionContext'
import { ToastProvider } from './components/Toast'
import DashboardPage from './pages/DashboardPage'
import ProjectorPage from './pages/ProjectorPage'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'

function RequireAdmin({ children }) {
  const { isAdmin, loading } = useAuth()
  if (loading) return <div className="grid min-h-screen place-items-center text-white/60">Memeriksa sesi…</div>
  return isAdmin ? children : <Navigate to="/login" replace />
}

// HashRouter: URL seperti /#/proyektor tetap jalan di hosting statis mana pun tanpa konfigurasi rewrite.
export default function App() {
  return (
    <AuthProvider>
      <ElectionProvider>
        <ToastProvider>
          <HashRouter>
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/proyektor" element={<ProjectorPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/admin"
                element={
                  <RequireAdmin>
                    <AdminPage />
                  </RequireAdmin>
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </HashRouter>
        </ToastProvider>
      </ElectionProvider>
    </AuthProvider>
  )
}
