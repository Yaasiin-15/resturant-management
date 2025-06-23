import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient, LoginRequest, SignupRequest } from '../lib/api'

interface User {
  id: number
  email: string
  fullName?: string
}

interface AuthContextType {
  user: User | null
  userRole: 'admin' | 'manager' | 'staff' | null
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, fullName: string, role: 'admin' | 'manager' | 'staff') => Promise<{ error: any }>
  signOut: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userRole, setUserRole] = useState<'admin' | 'manager' | 'staff' | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    const roleData = localStorage.getItem('userRole')

    if (token && userData && roleData) {
      try {
        setUser(JSON.parse(userData))
        setUserRole(roleData as 'admin' | 'manager' | 'staff')
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userRole')
      }
    }
    
    setLoading(false)
  }, [])

  const extractRoleFromRoles = (roles: string[]): 'admin' | 'manager' | 'staff' => {
    if (roles.includes('ROLE_ADMIN')) return 'admin'
    if (roles.includes('ROLE_MANAGER')) return 'manager'
    return 'staff'
  }

  const signIn = async (email: string, password: string) => {
    try {
      const response = await apiClient.login({ email, password })
      
      // Store auth data
      localStorage.setItem('authToken', response.token)
      
      const userData = {
        id: response.id,
        email: response.email
      }
      
      const role = extractRoleFromRoles(response.roles)
      
      localStorage.setItem('userData', JSON.stringify(userData))
      localStorage.setItem('userRole', role)
      
      setUser(userData)
      setUserRole(role)
      
      return { error: null }
    } catch (error: any) {
      console.error('Sign in error:', error)
      return { error: { message: error.message || 'Login failed' } }
    }
  }

  const signUp = async (email: string, password: string, fullName: string, role: 'admin' | 'manager' | 'staff') => {
    try {
      const roleArray = [role] // Convert single role to array format expected by backend
      await apiClient.register({ 
        fullName, 
        email, 
        password, 
        role: roleArray 
      })
      
      return { error: null }
    } catch (error: any) {
      console.error('Sign up error:', error)
      return { error: { message: error.message || 'Registration failed' } }
    }
  }

  const signOut = async () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userData')
    localStorage.removeItem('userRole')
    setUser(null)
    setUserRole(null)
  }

  const value = {
    user,
    userRole,
    signIn,
    signUp,
    signOut,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}