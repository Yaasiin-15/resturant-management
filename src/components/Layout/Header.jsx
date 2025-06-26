import React from 'react'
import { Menu, Bell, User } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export default function Header({ onMenuClick, title }) {
  const { user, userRole } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-neutral-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-neutral-100 lg:hidden"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-xl font-semibold text-neutral-800">{title}</h1>
        </div>

        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-lg hover:bg-neutral-100">
            <Bell className="w-6 h-6 text-neutral-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-neutral-800">{user?.email}</p>
              <p className="text-xs text-neutral-500 capitalize">{userRole}</p>
            </div>
            <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-primary-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}