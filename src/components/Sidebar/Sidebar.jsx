import './Sidebar.css'
import { CalendarDays, Columns3, LayoutDashboard, BookOpen } from 'lucide-react'

export default function Sidebar() {
  return <aside className="sidebar"><div className="side-brand"><span className="brand-mark">T</span><strong>TaskBoard</strong></div><nav><a className="active" href="#dashboard"><span><LayoutDashboard /></span>Dashboard</a><a href="#courses"><span><BookOpen /></span>Mis cursos</a><a href="#board"><span><Columns3 /></span>Tablero general</a><a href="#calendar"><span><CalendarDays /></span>Calendario</a></nav><div className="side-user"><span className="user-avatar">S</span><div><strong>Sofía</strong><small>sofia@uni.edu</small></div><a href="#login">↪ Cerrar sesión</a></div></aside>
}
