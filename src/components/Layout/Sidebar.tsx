import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Users, 
  UtensilsCrossed, 
  Table2, 
  ClipboardList, 
  CalendarDays, 
  Receipt, 
  Settings,
  LogOut,
  ChefHat
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { userRole, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const adminNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Users, label: 'Staff Management', path: '/admin/staff' },
    { icon: UtensilsCrossed, label: 'Menu Management', path: '/admin/menu' },
    { icon: Table2, label: 'Table Management', path: '/admin/tables' },
    { icon: ClipboardList, label: 'Orders', path: '/admin/orders' },
    { icon: CalendarDays, label: 'Reservations', path: '/admin/reservations' },
    { icon: Receipt, label: 'Billing', path: '/admin/billing' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ]

  const managerNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/manager' },
    { icon: UtensilsCrossed, label: 'Menu Management', path: '/manager/menu' },
    { icon: Table2, label: 'Table Management', path: '/manager/tables' },
    { icon: ClipboardList, label: 'Orders', path: '/manager/orders' },
    { icon: CalendarDays, label: 'Reservations', path: '/manager/reservations' },
    { icon: Receipt, label: 'Billing', path: '/manager/billing' },
  ]

  const staffNavItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/staff' },
    { icon: ClipboardList, label: 'Orders', path: '/staff/orders' },
    { icon: Table2, label: 'Tables', path: '/staff/tables' },
    { icon: CalendarDays, label: 'Reservations', path: '/staff/reservations' },
  ]

  const getNavItems = () => {
    switch (userRole) {
      case 'admin':
        return adminNavItems
      case 'manager':
        return managerNavItems
      case 'staff':
        return staffNavItems
      default:
        return []
    }
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 bg-primary-600 text-white">
            <ChefHat className="w-8 h-8 mr-2" />
            <h1 className="text-xl font-bold">RestaurantPro</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {getNavItems().map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path
              
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path)
                    onClose()
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              )
            })}
          </nav>

          {/* Sign out */}
          <div className="p-4 border-t border-neutral-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center px-4 py-3 text-left text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  )
}