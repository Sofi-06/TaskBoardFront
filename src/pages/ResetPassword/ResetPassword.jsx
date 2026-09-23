import { useState } from 'react'
import { apiRequest } from '../../services/api'
import '../ForgotPassword/ForgotPassword.css'

export default function ResetPassword({ token }) {
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const submit = async (event) => {
    event.preventDefault()
    if (password !== confirm) return setError('Las contraseñas no coinciden')
    try { const response = await apiRequest('/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) }); setMessage(response.message); setError('') } catch (requestError) { setError(requestError.message) }
  }
  return <main className="auth-page"><section className="auth-art"><div className="brand"><span className="brand-mark">T</span><span>TaskBoard</span></div><div className="auth-message"><h1>Vuelve a tener<br />todo bajo control<span>.</span></h1><p>Te ayudamos a recuperar el acceso a tu tablero.</p></div></section><section className="auth-panel"><form className="auth-form" onSubmit={submit}><h2>Nueva contraseña</h2><p className="subtitle">Crea una contraseña nueva para tu cuenta.</p><label>NUEVA CONTRASEÑA</label><input type="password" minLength="6" placeholder="Escribe tu nueva contraseña" value={password} onChange={(event) => setPassword(event.target.value)} required /><label>CONFIRMAR CONTRASEÑA</label><input type="password" minLength="6" placeholder="Vuelve a escribir tu contraseña" value={confirm} onChange={(event) => setConfirm(event.target.value)} required /><button type="submit">Guardar contraseña</button>{message && <p className="form-success">{message} <a href="#login">Iniciar sesión</a></p>}{error && <p className="form-error">{error}</p>}</form></section></main>
}
