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
      changeType: 'positive',
      color: 'success'
    },
    {
      title: 'Active Orders',
      value: '23',
      icon: ClipboardList,
      change: '5 pending',
      changeType: 'neutral',
      color: 'warning'
    },
    {
      title: 'Table Occupancy',
      value: '78%',
      icon: Table2,
      change: '25 of 32 tables',
      changeType: 'positive',
      color: 'primary'
    },
    {
      title: 'Staff on Duty',
      value: '18',
      icon: Users,
      change: 'Full coverage',
      changeType: 'positive',
      color: 'accent'
    }
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

        {/* Management Content */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-neutral-200">
          <h3 className="text-lg font-semibold text-neutral-900 mb-6">Manager Dashboard Content</h3>
          <p className="text-neutral-600">Manager-specific features and controls will be implemented here.</p>
        </div>
      </div>
    </DashboardLayout>
  )
}