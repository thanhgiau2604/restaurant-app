'use client'

import { AdminHeader } from '@/components/admin/admin-header'
import { AdminAuthGuard } from '@/components/admin/admin-auth-guard'
import { DishManagement } from '@/components/admin/dish-management'

export default function AdminMenuPage() {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-rose-100 to-purple-100">
        <AdminHeader activePage="menu" />
        <main className="container mx-auto px-4 py-8">
          <DishManagement />
        </main>
      </div>
    </AdminAuthGuard>
  )
}
