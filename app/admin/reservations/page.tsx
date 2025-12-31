'use client'

import { AdminHeader } from '@/components/admin/admin-header'
import { AdminAuthGuard } from '@/components/admin/admin-auth-guard'
import { ReservationManagement } from '@/components/admin/reservation-management'

export default function AdminReservationsPage() {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-rose-100 to-purple-100">
        <AdminHeader activePage="reservations" />
        <main className="container mx-auto px-4 py-8">
          <ReservationManagement />
        </main>
      </div>
    </AdminAuthGuard>
  )
}
