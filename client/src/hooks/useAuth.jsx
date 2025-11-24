import { useState, useEffect } from 'react'
import { authService } from '../services/authService'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authService.getMe()
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authService.login(email, password)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      return res.data
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (data) => {
    setLoading(true)
    setError(null)
    try {
      const res = await authService.register(data)
      localStorage.setItem('token', res.data.token)
      setUser(res.data.user)
      return res.data
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return { user, loading, error, login, register, logout, isAuthenticated: !!user }
}