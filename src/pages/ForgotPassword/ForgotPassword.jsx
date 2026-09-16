import { useState } from 'react'
import './ForgotPassword.css'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)
  return <main className="auth-page"><section className="auth-art"><div className="brand"><span className="brand-mark">T</span><span>TaskBoard</span></div><div className="auth-message"><h1>Vuelve a tener<br />todo bajo control<span>.</span></h1><p>Te ayudamos a recuperar el acceso a tu tablero.</p></div></section><section className="auth-panel"><form className="auth-form" onSubmit={event => { event.preventDefault(); setSent(true) }}><h2>¿Olvidaste tu contraseña?</h2><p className="subtitle">Escribe tu email y te enviaremos un enlace para recuperarla.</p><label htmlFor="forgot-email">EMAIL</label><input id="forgot-email" type="email" placeholder="sofia@uni.edu" required /><button type="submit">Enviar enlace <span>→</span></button>{sent && <p className="form-success">Revisa tu correo para continuar.</p>}<p className="auth-link"><a href="#login">← Volver a iniciar sesión</a></p></form></section></main>
}
