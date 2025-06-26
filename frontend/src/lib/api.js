const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

class ApiClient {
  getAuthHeaders() {
    const token = localStorage.getItem('authToken')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Login failed' }))
        throw new Error(error.message || 'Login failed')
      }

      return response.json()
    } catch (error) {
      console.error('Login API error:', error)
      throw error
    }
  }

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Registration failed' }))
        throw new Error(error.message || 'Registration failed')
      }

      return response.json()
    } catch (error) {
      console.error('Register API error:', error)
      throw error
    }
  }

  async getProfile() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/profile`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch profile')
      }

      return response.json()
    } catch (error) {
      console.error('Profile API error:', error)
      throw error
    }
  }

  // Menu API
  async getMenuItems() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/menu/items`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch menu items')
      }

      return response.json()
    } catch (error) {
      console.error('Menu API error:', error)
      throw error
    }
  }

  // Tables API
  async getTables() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/tables`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tables')
      }

      return response.json()
    } catch (error) {
      console.error('Tables API error:', error)
      throw error
    }
  }

  // Orders API
  async getOrders() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch orders')
      }

      return response.json()
    } catch (error) {
      console.error('Orders API error:', error)
      throw error
    }
  }

  // Reservations API
  async getReservations() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reservations`, {
        headers: this.getAuthHeaders(),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch reservations')
      }

      return response.json()
    } catch (error) {
      console.error('Reservations API error:', error)
      throw error
    }
  }
}

export const apiClient = new ApiClient()