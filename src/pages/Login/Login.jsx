import { useState } from 'react'
import { login, saveSession } from '../../services/authService'
import './Login.css'

export default function Login() {
  const [email, setEmail] = useState('sofia@uni.edu')
  const [password, setPassword] = useState('password')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  async function handleSubmit(event) {
    event.preventDefault(); setError(''); setLoading(true)
    try { const session = await login({ email, password }); saveSession(session); window.location.hash = '#dashboard' }
    catch (requestError) { setError(requestError.message) }
    finally { setLoading(false) }
  }
  return <main className="login-page"><section className="login-intro"><div className="brand"><span className="brand-mark">T</span><span>TaskBoard</span></div><div className="intro-copy"><h1>Tus tareas,<br />en un solo tablero<span className="orange-dot">.</span></h1><p>Pendiente, en proceso y completada. Cursos con color propio, entregas ordenadas por fecha y un calendario que se entiende de un vistazo.</p><div className="task-preview"><div><i className="task-icon peach">▤</i><span><strong>Parcial de Matemáticas</strong><small>Mañana</small></span><b>›</b></div><div><i className="task-icon blue">▱</i><span><strong>Ensayo de Sociales</strong><small>En 2 días</small></span><b>›</b></div><div><i className="task-icon green">&lt;/&gt;</i><span><strong>Proyecto de Programación</strong><small>En 7 días</small></span><b>›</b></div></div></div><img className="calendar-art" src="/calendario.png" alt="Calendario semanal ilustrado" /></section><section className="login-panel"><form className="login-form" onSubmit={handleSubmit}><h2>Bienvenida de vuelta</h2><p className="subtitle">Entra y revisa qué tienes que entregar esta semana.</p><label htmlFor="email">EMAIL</label><input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required /><label htmlFor="password">CONTRASEÑA</label><input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required /><button disabled={loading}>{loading ? 'Ingresando...' : 'Iniciar sesión'} <span>→</span></button>{error && <p className="form-error">{error}</p>}<div className="login-options"><label><input type="checkbox" defaultChecked /> Recordarme</label><a href="#forgot-password">¿Olvidaste tu contraseña?</a></div><p className="register">¿No tienes cuenta? <a href="#register">Regístrate</a></p></form></section></main>
}
