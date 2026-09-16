// @ts-expect-error Login is intentionally kept as a JS page in the existing frontend structure.
import Login from './pages/Login/Login'
// @ts-expect-error Auth pages remain JS to match the existing page structure.
import Register from './pages/Register/Register'
// @ts-expect-error Auth pages remain JS to match the existing page structure.
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
// @ts-expect-error Dashboard remains a JSX page in the existing frontend structure.
import Dashboard from './pages/Dashboard/Dashboard'
import { useEffect, useState } from 'react'

function App() {
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => { const onHashChange = () => setRoute(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange) }, [])
  if (route === '#register') return <Register />
  if (route === '#forgot-password') return <ForgotPassword />
  if (route === '#dashboard') return <Dashboard />
  return <Login />
}

export default App
