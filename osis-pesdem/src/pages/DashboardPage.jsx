import { Link, useNavigate } from 'react-router-dom'
import Header, { Hero } from '../components/Header'
import CandidateCard from '../components/CandidateCard'
import StatTiles from '../components/StatTiles'
import StatusBanner from '../components/StatusBanner'
import Panel from '../components/Panel'
import RankingTable from '../components/RankingTable'
import ResultsHidden from '../components/ResultsHidden'
import { VoteBarChart, VotePieChart } from '../components/ResultsCharts'
import { useElection } from '../context/ElectionContext'
import { useAuth } from '../context/AuthContext'
import { APP_TITLE } from '../lib/constants'
import { enterProjector } from './ProjectorPage'

export default function DashboardPage() {
  const { results, canSeeResults, settings, candidates, lastSync, loaded } = useElection()
  const { isAdmin } = useAuth()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen">
      <Header
        right={
          <>
            <button onClick={() => enterProjector(navigate)} className="btn-gold !rounded-full !px-4 !py-2 !text-xs">
              ▣ MODE PROYEKTOR
            </button>
            <Link to={isAdmin ? '/admin' : '/login'} className="btn-ghost">
              {isAdmin ? 'Panel Panitia' : 'Login Panitia'}
            </Link>
          </>
        }
      />
      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-16">
        <Hero title={APP_TITLE} />

        {!loaded ? (
          <p className="text-center text-white/60">Memuat data…</p>
        ) : !canSeeResults ? (
          <ResultsHidden settings={settings} candidates={candidates} />
        ) : (
          <>
            <StatusBanner results={results} />
            <StatTiles results={results} lastSync={lastSync} />

            <div className="grid gap-5 md:grid-cols-3">
              {results.rows.map((r) => (
                <CandidateCard key={r.id} row={r} />
              ))}
            </div>

            <div className="grid gap-5 lg:grid-cols-5">
              <Panel title="Grafik Batang Perolehan Suara" subtitle="Bergerak otomatis setiap ada suara masuk" className="lg:col-span-3">
                <div className="h-72 md:h-80">
                  <VoteBarChart results={results} />
                </div>
              </Panel>
              <Panel title="Diagram Lingkaran" subtitle="Persentase dari total suara" className="lg:col-span-2">
                <div className="h-72 md:h-80">
                  <VotePieChart results={results} />
                </div>
              </Panel>
            </div>

            <Panel title="Peringkat Sementara" subtitle="Diurutkan dari suara terbanyak">
              <RankingTable results={results} />
            </Panel>
          </>
        )}
      </main>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-white/40">
        Aplikasi penghitungan suara manual oleh panitia PESDEM OSIS — bukan untuk pemungutan suara langsung oleh siswa.
      </footer>
    </div>
  )
}
