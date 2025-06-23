const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api'

export interface LoginRequest {
  email: string
  password: string
}

export interface SignupRequest {
  fullName: string
  email: string
  password: string
  role: string[]
}

export interface LoginResponse {
  token: string
  type: string
  id: number
  email: string
  roles: string[]
}

export interface ApiError {
  message: string
  status?: number
}

class ApiClient {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken')
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    }
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/signin`, {
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
  }

  async register(userData: SignupRequest): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Registration failed' }))
      throw new Error(error.message || 'Registration failed')
    }

    return response.json()
  }

  async getProfile(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch profile')
    }

    return response.json()
  }

  // Menu API
  async getMenuItems(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/menu/items`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch menu items')
    }

    return response.json()
  }

  // Tables API
  async getTables(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/tables`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch tables')
    }

    return response.json()
  }

  // Orders API
  async getOrders(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }

    return response.json()
  }

  // Reservations API
  async getReservations(): Promise<any[]> {
    const response = await fetch(`${API_BASE_URL}/reservations`, {
      headers: this.getAuthHeaders(),
    })

    if (!response.ok) {
      throw new Error('Failed to fetch reservations')
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()