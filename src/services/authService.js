import { apiRequest } from './api'

export function login(data) { return apiRequest('/auth/login', { method: 'POST', body: JSON.stringify(data) }) }
export function register(data) { return apiRequest('/auth/register', { method: 'POST', body: JSON.stringify(data) }) }
export function saveSession(session) { localStorage.setItem('accessToken', session.accessToken); localStorage.setItem('user', JSON.stringify(session.user)) }
