import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin/admin-header"
import Link from "next/link"
import { UtensilsCrossed, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default async function AdminPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
            Restaurant Dashboard
          </h2>
          <p className="text-muted-foreground">Select a management section to get started</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
          <Link href="/admin/menu">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <UtensilsCrossed className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Menu Management</CardTitle>
                </div>
                <CardDescription>
                  Add, edit, and delete menu items. Manage dish details, pricing, and categories.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Click to manage your restaurant menu</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/reservations">
            <Card className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50 group">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl">Reservations</CardTitle>
                </div>
                <CardDescription>
                  View and manage customer reservations. Update status and assign table numbers.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Click to manage reservations</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </main>
    </div>
  )
}
