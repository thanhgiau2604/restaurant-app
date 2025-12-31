'use client'

import { AdminHeader } from '@/components/admin/admin-header'
import { AdminAuthGuard } from '@/components/admin/admin-auth-guard'
import Link from 'next/link'
import { UtensilsCrossed, Calendar } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'

export default function AdminPage() {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-linear-to-br from-orange-50 via-rose-100 to-purple-100">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-primary mb-2 text-3xl font-bold">Dashboard</h2>
          </div>

          <div className="grid max-w-4xl gap-6 md:grid-cols-2">
            <Link href="/admin/menu">
              <Card className="group cursor-pointer border-none bg-white/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="secondary-gradient rounded-lg p-3 transition-transform group-hover:scale-110">
                      <UtensilsCrossed className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Quản lý thực đơn</CardTitle>
                  </div>
                  <CardDescription>
                    Thêm, chỉnh sửa và xóa món ăn. Quản lý thông tin món, giá và danh mục.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Bấm để quản lý thực đơn</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/reservations">
              <Card className="group cursor-pointer border-none bg-white/50 transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="secondary-gradient rounded-lg p-3 transition-transform group-hover:scale-110">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Đặt bàn</CardTitle>
                  </div>
                  <CardDescription>
                    Xem và quản lý đặt bàn của khách. Cập nhật trạng thái và gán số bàn.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">Bấm để quản lý đặt bàn</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  )
}
