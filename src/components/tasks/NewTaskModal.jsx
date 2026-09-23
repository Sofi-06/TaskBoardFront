import { useState } from 'react'
import { apiRequest } from '../../services/api'
import './NewTaskModal.css'

export default function NewTaskModal({ courses, onClose, onCreated }) {
  const [form, setForm] = useState({ title: '', description: '', courseId: courses[0]?.id || '', dueDate: '', status: 'PENDING', priority: 'MEDIUM' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = async (event) => {
    event.preventDefault()
    if (!form.courseId) return setError('Primero debes crear un curso.')
    setSaving(true)
    setError('')
    try {
      const { courseId, ...data } = form
      await apiRequest(`/tasks/course/${courseId}`, { method: 'POST', body: JSON.stringify(data) })
      onCreated()
    } catch (requestError) {
      setError(requestError.message)
    } finally {
      setSaving(false)
    }
  }

  return <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><form className="task-modal" onSubmit={submit}><div className="modal-heading"><div><h2>Nueva tarea</h2><p>Título, curso, estado, prioridad y fecha de entrega.</p></div><button type="button" className="modal-close" onClick={onClose}>×</button></div><label>TÍTULO<input name="title" value={form.title} onChange={update} placeholder="Ej. Parcial capítulo 3" minLength="3" maxLength="200" required /></label><label>DESCRIPCIÓN<textarea name="description" value={form.description} onChange={update} placeholder="Detalles, material a repasar, formato de entrega..." maxLength="2000" /></label><div className="form-grid"><label>CURSO<select name="courseId" value={form.courseId} onChange={update} required>{courses.map((course) => <option value={course.id} key={course.id}>{course.name}</option>)}</select></label><label>FECHA DE ENTREGA<input type="date" name="dueDate" value={form.dueDate} onChange={update} /></label><label>ESTADO<select name="status" value={form.status} onChange={update}><option value="PENDING">Pendiente</option><option value="IN_PROGRESS">En proceso</option><option value="COMPLETED">Completada</option></select></label><label>PRIORIDAD<select name="priority" value={form.priority} onChange={update}><option value="LOW">Baja</option><option value="MEDIUM">Media</option><option value="HIGH">Alta</option></select></label></div>{error && <p className="modal-error">{error}</p>}<div className="modal-actions"><button type="button" className="cancel-button" onClick={onClose}>Cancelar</button><button type="submit" className="create-button" disabled={saving}>{saving ? 'Guardando...' : 'Crear tarea'}</button></div></form></div>
}
