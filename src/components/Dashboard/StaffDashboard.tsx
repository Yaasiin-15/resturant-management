import React from 'react'
import { ClipboardList, Table2, Clock, CheckCircle, AlertCircle, Users } from 'lucide-react'
import DashboardLayout from '../Layout/DashboardLayout'
import StatCard from './StatCard'

export default function StaffDashboard() {
  const stats = [
    {
      title: 'Assigned Tables',
      value: '8',
      icon: Table2,
      change: 'Section A & B',
      changeType: 'neutral' as const,
      color: 'primary' as const
    },
    {
      title: 'Active Orders',
      value: '12',
      icon: ClipboardList,
      change: '3 ready to serve',
      changeType: 'positive' as const,
      color: 'warning' as const
    },
    {
      title: 'Orders Completed',
      value: '34',
      icon: CheckCircle,
      change: 'Today',
      changeType: 'positive' as const,
      color: 'success' as const
    },
    {
      title: 'Tips Earned',
      value: '$127',
      icon: Users,
      change: '+$23 today',
      changeType: 'positive' as const,
      color: 'accent' as const
    }
  ]

  const myTables = [
    { number: 5, status: 'occupied', customers: 4, orderValue: '$67.50', timeOccupied: '45 min' },
    { number: 12, status: 'available', customers: 0, orderValue: '$0.00', timeOccupied: '-' },
    { number: 18, status: 'reserved', customers: 2, orderValue: '$0.00', timeOccupied: '15 min' },
    { number: 23, status: 'occupied', customers: 6, orderValue: '$124.20', timeOccupied: '1h 20min' },
    { number: 27, status: 'available', customers: 0, orderValue: '$0.00', timeOccupied: '-' },
    { number: 31, status: 'occupied', customers: 3, orderValue: '$43.80', timeOccupied: '25 min' },
  ]

  const pendingTasks = [
    { id: 1, task: 'Take order for Table 5', priority: 'high', time: '2 min ago' },
    { id: 2, task: 'Serve food to Table 23', priority: 'high', time: '5 min ago' },
    { id: 3, task: 'Clear Table 18', priority: 'medium', time: '8 min ago' },
    { id: 4, task: 'Refill drinks for Table 31', priority: 'low', time: '12 min ago' },
  ]

  const getTableStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800'
      case 'available':
        return 'bg-green-100 text-green-800'
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <DashboardLayout title="Staff Dashboard" requiredRole="staff">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Tables */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">My Tables</h3>
              <Table2 className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-3">
              {myTables.map((table) => (
                <div key={table.number} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-primary-600">{table.number}</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTableStatusColor(table.status)}`}>
                          {table.status}
                        </span>
                        {table.customers > 0 && (
                          <span className="text-sm text-neutral-500">{table.customers} guests</span>
                        )}
                      </div>
                      <p className="text-sm text-neutral-500">{table.timeOccupied}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">{table.orderValue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-neutral-900">Pending Tasks</h3>
              <AlertCircle className="w-5 h-5 text-primary-600" />
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <div>
                      <p className="font-medium text-neutral-900">{task.task}</p>
                      <p className="text-sm text-neutral-500">{task.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                    <button className="text-primary-600 hover:text-primary-700">
                      <CheckCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-neutral-900">Recent Activity</h3>
            <Clock className="w-5 h-5 text-primary-600" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-neutral-900">Order #1234 completed</p>
                <p className="text-sm text-neutral-500">Table 27 - $43.80 • 5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <ClipboardList className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-neutral-900">New order received</p>
                <p className="text-sm text-neutral-500">Table 12 - 2 guests seated • 12 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <Table2 className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-neutral-900">Table 18 cleared</p>
                <p className="text-sm text-neutral-500">Ready for next guests • 18 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}