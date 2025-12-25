"use client"

import { Button } from "@/components/ui/button"
import { UtensilsCrossed, LogOut, LayoutDashboard, CalendarDays } from "lucide-react"
import { logout } from "@/lib/admin-auth"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface AdminHeaderProps {
  activePage?: "dashboard" | "menu" | "reservations"
}

export function AdminHeader({ activePage = "dashboard" }: AdminHeaderProps) {
  const router = useRouter()

  const handleLogout = async () => {
    await logout()
    toast.success('Logged out',{
      description: "You have been successfully logged out.",
    })
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/admin" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-linear-to-r from-primary to-secondary p-2 rounded-lg">
              <UtensilsCrossed className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Flavor House Admin
              </h1>
              <p className="text-xs text-muted-foreground">Restaurant Management</p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            <Link href="/admin">
              <Button
                variant={activePage === "dashboard" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2",
                  activePage === "dashboard" && "bg-linear-to-r from-primary to-secondary text-white",
                )}
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/admin/menu">
              <Button
                variant={activePage === "menu" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2",
                  activePage === "menu" && "bg-linear-to-r from-primary to-secondary text-white",
                )}
              >
                <UtensilsCrossed className="h-4 w-4" />
                Menu
              </Button>
            </Link>
            <Link href="/admin/reservations">
              <Button
                variant={activePage === "reservations" ? "default" : "ghost"}
                size="sm"
                className={cn(
                  "gap-2",
                  activePage === "reservations" && "bg-linear-to-r from-primary to-secondary text-white",
                )}
              >
                <CalendarDays className="h-4 w-4" />
                Reservations
              </Button>
            </Link>
          </nav>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="gap-2 hover:bg-destructive hover:text-destructive-foreground bg-transparent"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  )
}
