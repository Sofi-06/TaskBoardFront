import { useState } from 'react'
import { register, saveSession } from '../../services/authService'
import './Register.css'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false)
  function update(event) { setForm({ ...form, [event.target.name]: event.target.value }) }
  async function handleSubmit(event) { event.preventDefault(); setError(''); setLoading(true); try { const session = await register(form); saveSession(session); window.location.hash = '#dashboard' } catch (requestError) { setError(requestError.message) } finally { setLoading(false) } }
  return <main className="auth-page"><section className="auth-art"><div className="brand"><span className="brand-mark">T</span><span>TaskBoard</span></div><div className="auth-message"><h1>Crea tu espacio<br />para organizarte<span>.</span></h1><p>Ten tus cursos, tareas y fechas importantes en un solo lugar.</p></div></section><section className="auth-panel"><form className="auth-form" onSubmit={handleSubmit}><h2>Empieza con TaskBoard</h2><p className="subtitle">Crea tu cuenta y organiza mejor tu semestre.</p><label htmlFor="name">NOMBRE</label><input id="name" name="name" type="text" placeholder="Sofía García" value={form.name} onChange={update} required /><label htmlFor="register-email">EMAIL</label><input id="register-email" name="email" type="email" placeholder="sofia@uni.edu" value={form.email} onChange={update} required /><label htmlFor="register-password">CONTRASEÑA</label><input id="register-password" name="password" type="password" placeholder="Crea una contraseña" value={form.password} onChange={update} required /><button type="submit" disabled={loading}>{loading ? 'Creando...' : 'Crear cuenta'} <span>→</span></button>{error && <p className="form-error">{error}</p>}<p className="auth-link">¿Ya tienes cuenta? <a href="#login">Inicia sesión</a></p></form></section></main>
}
