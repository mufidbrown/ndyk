import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
  createdAt: string
}

const API_BASE = 'http://localhost:8080/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const toast = useToast()

  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  const isAuthenticated = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  const register = async (userData: { name: string; email: string; password: string }) => {
    try {
      isLoading.value = true
      const res = await fetch(`${API_BASE}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      })
      if (!res.ok) throw await res.json()
      toast.success('Registration successful! Please login.')
      router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Registration failed')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const login = async (email: string, password: string) => {
    try {
      isLoading.value = true
      const res = await fetch(`${API_BASE}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw await res.json()

      const result = await res.json() // { token: '...' }
      token.value = result.token

      // Simulasikan user karena backend tidak kirim data user
      const fakeUser: User = {
        id: '1',
        email,
        name: 'User',
        role: 'user',
        createdAt: new Date().toISOString()
      }
      user.value = fakeUser

      localStorage.setItem('token', result.token)
      localStorage.setItem('user', JSON.stringify(fakeUser))

      toast.success('Login successful!')

      // router.push(user.value.role === 'admin' ? '/admin' : '/')
      router.push('/admin')

    } catch (error: any) {
      toast.error(error.message || 'Login failed')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      isLoading.value = true
      const res = await fetch(`${API_BASE}/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      if (!res.ok) throw await res.json()
      toast.success('Password reset link sent to your email!')
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset link')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const resetPassword = async (tokenStr: string, password: string) => {
    try {
      isLoading.value = true
      const res = await fetch(`${API_BASE}/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenStr, password })
      })
      if (!res.ok) throw await res.json()
      toast.success('Password reset successful! Please login.')
      router.push('/auth/login')
    } catch (error: any) {
      toast.error(error.message || 'Password reset failed')
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged out successfully!')
    router.push('/')
  }

  return {
    user,
    token,
    isLoading,
    isAuthenticated,
    isAdmin,
    initializeAuth,
    register,
    login,
    forgotPassword,
    resetPassword,
    logout
  }
})
