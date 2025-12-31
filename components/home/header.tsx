"use client"

import { Menu, X } from "lucide-react"
import AppLogo from "@/components/common/logo"

type HeaderProps = {
  scrolled: boolean
  mobileMenuOpen: boolean
  onToggleMobileMenu: () => void
  onNavigate: (sectionId: string) => void
}

export default function HomeHeader({
  scrolled,
  mobileMenuOpen,
  onToggleMobileMenu,
  onNavigate,
}: HeaderProps) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-sm shadow-lg" : "bg-transparent"}`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppLogo width={150} height="auto" type={scrolled ? "primary" : "secondary"} />
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => onNavigate("home")}
              className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors drop-shadow-md font-bold`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => onNavigate("about")}
              className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors  drop-shadow-md font-bold`}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => onNavigate("dishes")}
              className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors drop-shadow-md font-bold`}
            >
              Thực đơn
            </button>
            <button
              onClick={() => onNavigate("reservations")}
              className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors font-bold drop-shadow-md`}
            >
              Đặt bàn
            </button>
            <button
              onClick={() => onNavigate("location")}
              className={`${scrolled ? "text-foreground" : "text-white"} hover:text-rose-700 transition-colors font-bold drop-shadow-md`}
            >
              Vị trí
            </button>
          </div>

          <button className="md:hidden p-2" onClick={onToggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-lg shadow-xl border-t border-border animate-in slide-in-from-top-5">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <button
                onClick={() => onNavigate("home")}
                className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
              >
                Trang chủ
              </button>
              <button
                onClick={() => onNavigate("about")}
                className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => onNavigate("dishes")}
                className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
              >
                Món ăn
              </button>
              <button
                onClick={() => onNavigate("reservations")}
                className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
              >
                Đặt bàn
              </button>
              <button
                onClick={() => onNavigate("location")}
                className="text-left py-2 text-foreground hover:text-accent transition-colors font-medium"
              >
                Vị trí
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
