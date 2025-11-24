import api from './api'

export const authService = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  getMe: () => api.get('/auth/me'),
  logout: () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }
}

// ============================================
// client/src/services/reportService.js
// ============================================
import api from './api'

export const reportService = {
  getAll: () => api.get('/reports'),
  create: (data) => api.post('/reports', data),
  getById: (id) => api.get(`/reports/${id}`),
}