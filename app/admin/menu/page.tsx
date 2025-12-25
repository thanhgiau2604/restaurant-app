import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { DishManagement } from "@/components/admin/dish-management"

export default async function AdminMenuPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader activePage="menu" />
      <main className="container mx-auto px-4 py-8">
        <DishManagement />
      </main>
    </div>
  )
}
