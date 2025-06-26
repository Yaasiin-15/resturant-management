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
      changeType: 'neutral',
      color: 'primary'
    },
    {
      title: 'Active Orders',
      value: '12',
      icon: ClipboardList,
      change: '3 ready to serve',
      changeType: 'positive',
      color: 'warning'
    },
    {
      title: 'Orders Completed',
      value: '34',
      icon: CheckCircle,
      change: 'Today',
      changeType: 'positive',
      color: 'success'
    },
    {
      title: 'Tips Earned',
      value: '$127',
      icon: Users,
      change: '+$23 today',
      changeType: 'positive',
      color: 'accent'
    }
  ]

  return (
    <DashboardLayout title="Staff Dashboard" requiredRole="staff">
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Staff Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Staff Dashboard Content</h3>
          <p className="text-neutral-600">Staff-specific features and controls will be implemented here.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}