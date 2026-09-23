import { CalendarDays, Columns3, LayoutDashboard, BookOpen } from 'lucide-react'
import './Sidebar.css'

export default function Sidebar({ active }) {
  const hash = window.location.hash; const current = active || (hash.startsWith('#course/') ? 'courses' : hash.slice(1) || 'dashboard'); const user = JSON.parse(localStorage.getItem('user') || '{}'); const name = user.name || 'Estudiante'
  return <aside className="sidebar"><div className="side-brand"><span className="brand-mark">T</span><strong>TaskBoard</strong></div><nav><a className={current === 'dashboard' ? 'active' : ''} href="#dashboard"><span><LayoutDashboard /></span>Dashboard</a><a className={current === 'courses' ? 'active' : ''} href="#courses"><span><BookOpen /></span>Mis cursos</a><a className={current === 'board' ? 'active' : ''} href="#board"><span><Columns3 /></span>Tablero general</a><a className={current === 'calendar' ? 'active' : ''} href="#calendar"><span><CalendarDays /></span>Calendario</a></nav><div className="side-user"><span className="user-avatar">{name.charAt(0).toUpperCase()}</span><div><strong>{name}</strong><small>{user.email || ''}</small></div><a href="#login" onClick={() => localStorage.clear()}>↪ Cerrar sesión</a></div></aside>
}
