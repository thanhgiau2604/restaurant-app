import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/admin-auth"
import { AdminHeader } from "@/components/admin/admin-header"
import { ReservationManagement } from "@/components/admin/reservation-management"

export default async function AdminReservationsPage() {
  const authenticated = await isAuthenticated()

  if (!authenticated) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader activePage="reservations" />
      <main className="container mx-auto px-4 py-8">
        <ReservationManagement />
      </main>
    </div>
  )
}
