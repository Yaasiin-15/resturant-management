import React, { createContext, useContext, useEffect, useState } from 'react'
import { apiClient } from '../lib/api'

const AuthContext = createContext(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('authToken')
    const userData = localStorage.getItem('userData')
    const roleData = localStorage.getItem('userRole')

    if (token && userData && roleData) {
      try {
        setUser(JSON.parse(userData))
        setUserRole(roleData)
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('authToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userRole')
      }
    }
    
    setLoading(false)
  }, [])

  const extractRoleFromRoles = (roles) => {
    if (roles.includes('ROLE_ADMIN')) return 'admin'
    if (roles.includes('ROLE_MANAGER')) return 'manager'
    return 'staff'
  }

  const signIn = async (email, password) => {
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
    } catch (error) {
      console.error('Sign in error:', error)
      return { error: { message: error.message || 'Login failed' } }
    }
  }

  const signUp = async (email, password, fullName, role) => {
    try {
      const roleArray = [role] // Convert single role to array format expected by backend
      await apiClient.register({ 
        fullName, 
        email, 
        password, 
        role: roleArray 
      })
      
      return { error: null }
    } catch (error) {
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