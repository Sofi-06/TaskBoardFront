const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

export async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('accessToken')
  const response = await fetch(`${API_URL}${path}`, { ...options, headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) } })
  const body = await response.json().catch(() => ({}))
  if (response.status === 401) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    if (window.location.hash !== '#login') window.location.hash = '#login'
    throw new Error('Tu sesión expiró. Vuelve a iniciar sesión para continuar.')
  }
  if (!response.ok) throw new Error(body.message || 'Ocurrió un error en el servidor')
  return body
}
