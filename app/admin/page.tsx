"use client"

import { AdminHeader } from "@/components/admin/admin-header"
import { AdminAuthGuard } from "@/components/admin/admin-auth-guard"
import Link from "next/link"
import { UtensilsCrossed, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function AdminPage() {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-background">
        <AdminHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h2 className="text-3xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
              Dashboard
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <Link href="/admin/menu">
              <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-linear-to-r from-primary to-secondary p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <UtensilsCrossed className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Quản lý thực đơn</CardTitle>
                  </div>
                  <CardDescription>
                    Thêm, chỉnh sửa và xóa món ăn. Quản lý thông tin món, giá và danh mục.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Bấm để quản lý thực đơn</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/admin/reservations">
              <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-linear-to-r from-primary to-secondary p-3 rounded-lg group-hover:scale-110 transition-transform">
                      <Calendar className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-2xl">Đặt bàn</CardTitle>
                  </div>
                  <CardDescription>
                    Xem và quản lý đặt bàn của khách. Cập nhật trạng thái và gán số bàn.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">Bấm để quản lý đặt bàn</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </main>
      </div>
    </AdminAuthGuard>
  )
}
