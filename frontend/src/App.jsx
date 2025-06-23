import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import AdminDashboard from './components/Dashboard/AdminDashboard'
import ManagerDashboard from './components/Dashboard/ManagerDashboard'
import StaffDashboard from './components/Dashboard/StaffDashboard'

function AppRoutes() {
  const { user, userRole, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route
        path="/admin/*"
        element={
          user && userRole === 'admin' ? (
            <Routes>
              <Route index element={<AdminDashboard />} />
              <Route path="*" element={<AdminDashboard />} />
            </Routes>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      <Route
        path="/manager/*"
        element={
          user && userRole === 'manager' ? (
            <Routes>
              <Route index element={<ManagerDashboard />} />
              <Route path="*" element={<ManagerDashboard />} />
            </Routes>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      <Route
        path="/staff/*"
        element={
          user && userRole === 'staff' ? (
            <Routes>
              <Route index element={<StaffDashboard />} />
              <Route path="*" element={<StaffDashboard />} />
            </Routes>
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Default redirects */}
      <Route
        path="/"
        element={
          user && userRole ? (
            <Navigate to={`/${userRole}`} replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="/unauthorized" element={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Unauthorized Access</h1>
            <p className="text-neutral-600">You don't have permission to access this page.</p>
          </div>
        </div>
      } />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  )
}