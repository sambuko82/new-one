import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Link artefak hanya meneruskan hash sederhana (#proyektor, #admin): ubah ke format router (#/proyektor).
if (/^#[a-z-]+$/.test(window.location.hash)) window.location.replace('#/' + window.location.hash.slice(1))

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
