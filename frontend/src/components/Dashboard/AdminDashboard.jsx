import React from 'react'
import { Users, UtensilsCrossed, Table2, DollarSign, TrendingUp, Clock } from 'lucide-react'
import DashboardLayout from '../Layout/DashboardLayout'
import StatCard from './StatCard'

export default function AdminDashboard() {
  const stats = [
    {
      title: 'Total Revenue',
      value: '$12,847',
      icon: DollarSign,
      change: '+12.5% from last month',
      changeType: 'positive',
      color: 'success'
    },
    {
      title: 'Active Staff',
      value: '24',
      icon: Users,
      change: '+2 this week',
      changeType: 'positive',
      color: 'primary'
    },
    {
      title: 'Menu Items',
      value: '156',
      icon: UtensilsCrossed,
      change: '+8 new items',
      changeType: 'positive',
      color: 'secondary'
    },
    {
      title: 'Tables',
      value: '32',
      icon: Table2,
      change: '85% occupancy',
      changeType: 'neutral',
      color: 'accent'
    }
  ]

  const recentOrders = [
    { id: '#001', table: 'Table 5', amount: '$45.20', status: 'completed', time: '2 min ago' },
    { id: '#002', table: 'Table 12', amount: '$32.80', status: 'preparing', time: '5 min ago' },
    { id: '#003', table: 'Table 3', amount: '$67.40', status: 'served', time: '8 min ago' },
    { id: '#004', table: 'Table 8', amount: '$28.90', status: 'pending', time: '12 min ago' },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'preparing':
        return 'bg-yellow-100 text-yellow-800'
      case 'served':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout title="Admin Dashboard" requiredRole="admin">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts and Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Revenue Overview</h3>
              <TrendingUp className="w-5 h-5 text-primary-600" />
            </div>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg">
              <p className="text-neutral-500">Revenue chart would go here</p>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Recent Orders</h3>
              <Clock className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-primary-600">{order.id.slice(-2)}</span>
                    </div>
                    <div>
                      <p className="font-medium text-neutral-900">{order.table}</p>
                      <p className="text-sm text-neutral-500">{order.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-neutral-900">{order.amount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center p-4 bg-primary-50 hover:bg-primary-100 rounded-lg transition-colors duration-200">
              <Users className="w-5 h-5 text-primary-600 mr-3" />
              <span className="font-medium text-primary-700">Manage Staff</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-secondary-50 hover:bg-secondary-100 rounded-lg transition-colors duration-200">
              <UtensilsCrossed className="w-5 h-5 text-secondary-600 mr-3" />
              <span className="font-medium text-secondary-700">Update Menu</span>
            </button>
            <button className="flex items-center justify-center p-4 bg-accent-50 hover:bg-accent-100 rounded-lg transition-colors duration-200">
              <Table2 className="w-5 h-5 text-accent-600 mr-3" />
              <span className="font-medium text-accent-700">View Tables</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}