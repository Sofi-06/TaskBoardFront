import { useEffect, useState } from 'react'
import { Archive, Trash2 } from 'lucide-react'
import Sidebar from '../../components/Sidebar/Sidebar'
import CreateCourseModal from './CreateCourseModal'
import ConfirmModal from '../../components/ui/ConfirmModal'
import { apiRequest } from '../../services/api'
import { getDashboard } from '../../services/dashboardService'
import '../../components/tasks/NewTaskModal.css'
import './Courses.css'

const fallbackColors = ['#ff7d2b', '#249ecb', '#37a56d', '#e84263']
const dateFormatter = new Intl.DateTimeFormat('es-CO', { day: 'numeric', month: 'short' })

export default function Courses() {
  const [courses, setCourses] = useState([]); const [error, setError] = useState(''); const [showModal, setShowModal] = useState(false); const [confirmation, setConfirmation] = useState(null)
  const user = JSON.parse(localStorage.getItem('user') || '{}'); const displayName = user.name || 'Mi perfil'
  const loadCourses = () => getDashboard().then((response) => setCourses(response.courses || [])).catch((requestError) => setError(requestError.message))
  useEffect(() => { loadCourses() }, [])
  const archiveCourse = (event, course) => { event.stopPropagation(); setConfirmation({ title: 'Guardar curso', message: `“${course.name}” pasará a Archivados. Podrás recuperarlo cuando quieras.`, confirmLabel: 'Archivar', action: async () => { await apiRequest(`/courses/${course.id}/archive`, { method: 'PATCH' }); loadCourses() } }) }
  const removeCourse = (event, course) => { event.stopPropagation(); setConfirmation({ title: 'Eliminar para siempre', message: `Se borrará “${course.name}” junto con todas sus tareas. Esta acción no se puede deshacer.`, confirmLabel: 'Eliminar definitivamente', danger: true, action: async () => { await apiRequest(`/courses/${course.id}`, { method: 'DELETE' }); loadCourses() } }) }
  const finishConfirmation = async () => { try { await confirmation.action(); setConfirmation(null) } catch (requestError) { setError(requestError.message); setConfirmation(null) } }
  return <main className="courses-page"><Sidebar active="courses" /><section className="dashboard-content"><header className="topbar"><span>{new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())}</span><div><button className="semester">{displayName}</button><span className="profile">{displayName.charAt(0).toUpperCase()}</span></div></header><div className="courses-inner"><div className="courses-heading"><div><h1>Mis cursos</h1><p>{courses.length} {courses.length === 1 ? 'curso' : 'cursos'} en este semestre</p></div><button className="new-task" onClick={() => setShowModal(true)}>＋ Crear curso</button></div>{error && <div className="dashboard-error">No se pudieron cargar tus cursos: {error}</div>}<div className="courses-grid">{courses.map((course, index) => { const nextTask = course.tasks?.find((task) => task.dueDate && task.status !== 'COMPLETED'); const color = course.color || fallbackColors[index % fallbackColors.length]; return <article className="course-page-card" style={{ '--course-color': color }} key={course.id} onClick={() => { window.location.hash = `course/${course.id}` }}><div className="course-actions"><button className="archive-course" title="Archivar curso" aria-label={`Archivar ${course.name}`} onClick={(event) => archiveCourse(event, course)}><Archive size={17} /></button><button className="delete-course" title="Eliminar definitivamente" aria-label={`Eliminar definitivamente ${course.name}`} onClick={(event) => removeCourse(event, course)}><Trash2 size={17} /></button></div><i /><h2>{course.name}</h2><p>{course.tasks?.length || 0} {course.tasks?.length === 1 ? 'tarea' : 'tareas'} {nextTask ? `· ${nextTask.title} ${dateFormatter.format(new Date(nextTask.dueDate))}` : '· Sin entregas próximas'}</p></article> })}{!courses.length && !error && <p className="empty-courses">Aún no tienes cursos. Crea el primero.</p>}</div></div></section>{showModal && <CreateCourseModal onClose={() => setShowModal(false)} onCreated={() => { setShowModal(false); loadCourses() }} />}{confirmation && <ConfirmModal {...confirmation} onClose={() => setConfirmation(null)} onConfirm={finishConfirmation} />}</main>
}
