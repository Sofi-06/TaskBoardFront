// @ts-expect-error Login is intentionally kept as a JS page in the existing frontend structure.
import Login from './pages/Login/Login'
// @ts-expect-error Auth pages remain JS to match the existing page structure.
import Register from './pages/Register/Register'
// @ts-expect-error Auth pages remain JS to match the existing page structure.
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'
// @ts-expect-error Dashboard remains a JSX page in the existing frontend structure.
import Dashboard from './pages/Dashboard/Dashboard'
// @ts-expect-error Courses remains JS to match the existing page structure.
import Courses from './pages/Courses/Courses'
// @ts-expect-error Board remains JS to match the existing page structure.
import Board from './pages/Board/Board'
// @ts-expect-error Calendar remains JS to match the existing page structure.
import Calendar from './pages/Calendar/Calendar'
// @ts-expect-error Reset password remains JS to match the existing page structure.
import ResetPassword from './pages/ResetPassword/ResetPassword'
import { useEffect, useState } from 'react'

function App() {
  const [route, setRoute] = useState(window.location.hash)
  useEffect(() => { const onHashChange = () => setRoute(window.location.hash); window.addEventListener('hashchange', onHashChange); return () => window.removeEventListener('hashchange', onHashChange) }, [])
  if (route === '#register') return <Register />
  if (route === '#forgot-password') return <ForgotPassword />
  if (route.startsWith('#reset-password/')) return <ResetPassword token={route.split('/')[1]} />
  if (route === '#dashboard') return <Dashboard />
  if (route === '#courses') return <Courses />
  if (route === '#board') return <Board />
  if (route === '#calendar') return <Calendar />
  if (route.startsWith('#course/')) return <Board courseId={route.split('/')[1]} />
  return <Login />
}

export default App
