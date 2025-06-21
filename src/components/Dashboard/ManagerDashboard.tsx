import React from 'react'
import { UtensilsCrossed, Table2, ClipboardList, DollarSign, TrendingUp, Users } from 'lucide-react'
import DashboardLayout from '../Layout/DashboardLayout'
import StatCard from './StatCard'

export default function ManagerDashboard() {
  const stats = [
    {
      title: "Today's Revenue",
      value: '$1,247',
      icon: DollarSign,
      change: '+8.2% from yesterday',
      changeType: 'positive' as const,
      color: 'success' as const
    },
    {
      title: 'Active Orders',
      value: '23',
      icon: ClipboardList,
      change: '5 pending',
      changeType: 'neutral' as const,
      color: 'warning' as const
    },
    {
      title: 'Table Occupancy',
      value: '78%',
      icon: Table2,
      change: '25 of 32 tables',
      changeType: 'positive' as const,
      color: 'primary' as const
    },
    {
      title: 'Staff on Duty',
      value: '18',
      icon: Users,
      change: 'Full coverage',
      changeType: 'positive' as const,
      color: 'accent' as const
    }
  ]

  const todayOrders = [
    { time: '08:00', orders: 12 },
    { time: '09:00', orders: 18 },
    { time: '10:00', orders: 24 },
    { time: '11:00', orders: 32 },
    { time: '12:00', orders: 45 },
    { time: '13:00', orders: 38 },
    { time: '14:00', orders: 28 },
    { time: '15:00', orders: 22 },
  ]

  const popularItems = [
    { name: 'Grilled Salmon', orders: 24, revenue: '$432.00' },
    { name: 'Caesar Salad', orders: 18, revenue: '$198.00' },
    { name: 'Beef Burger', orders: 16, revenue: '$256.00' },
    { name: 'Pasta Carbonara', orders: 14, revenue: '$182.00' },
  ]

  return (
    <DashboardLayout title="Manager Dashboard" requiredRole="manager">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Timeline */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Today's Orders</h3>
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-3">
              {todayOrders.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">{item.time}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-neutral-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full" 
                        style={{ width: `${(item.orders / 50) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium text-neutral-900 w-8">{item.orders}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Items */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Popular Items</h3>
              <UtensilsCrossed className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-4">
              {popularItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <p className="font-medium text-neutral-900">{item.name}</p>
                    <p className="text-sm text-neutral-500">{item.orders} orders</p>
                  </div>
                  <p className="font-semibold text-primary-600">{item.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Management Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Status */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">Current Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Kitchen Queue</span>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                  5 orders
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Reservations Today</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  12 bookings
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Staff Break Schedule</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  On track
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-neutral-600">Inventory Alerts</span>
                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                  2 items low
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center p-3 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
                <ClipboardList className="w-5 h-5 text-primary-600 mr-3" />
                <span className="font-medium text-primary-700">View All Orders</span>
              </button>
              <button className="w-full flex items-center justify-center p-3 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
                <Table2 className="w-5 h-5 text-secondary-600 mr-3" />
                <span className="font-medium text-secondary-700">Manage Tables</span>
              </button>
              <button className="w-full flex items-center justify-center p-3 bg-accent-50 hover:bg-accent-100 rounded-lg transition-colors duration-200">
                <UtensilsCrossed className="w-5 h-5 text-accent-600 mr-3" />
                <span className="font-medium text-accent-700">Update Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}