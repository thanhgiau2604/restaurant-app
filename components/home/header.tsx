'use client'

import { Menu, X } from 'lucide-react'
import AppLogo from '@/components/common/logo'

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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppLogo width={150} height="auto" type={scrolled ? 'primary' : 'secondary'} />
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => onNavigate('home')}
              className={`${scrolled ? 'text-foreground' : 'text-white'} font-bold drop-shadow-md transition-colors hover:text-rose-700`}
            >
              Trang chủ
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={`${scrolled ? 'text-foreground' : 'text-white'} font-bold drop-shadow-md transition-colors hover:text-rose-700`}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => onNavigate('menu')}
              className={`${scrolled ? 'text-foreground' : 'text-white'} font-bold drop-shadow-md transition-colors hover:text-rose-700`}
            >
              Thực đơn
            </button>
            <button
              onClick={() => onNavigate('reservations')}
              className={`${scrolled ? 'text-foreground' : 'text-white'} font-bold drop-shadow-md transition-colors hover:text-rose-700`}
            >
              Đặt bàn
            </button>
            <button
              onClick={() => onNavigate('location')}
              className={`${scrolled ? 'text-foreground' : 'text-white'} font-bold drop-shadow-md transition-colors hover:text-rose-700`}
            >
              Vị trí
            </button>
          </div>

          <button className="p-2 md:hidden" onClick={onToggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="bg-background/98 border-border animate-in slide-in-from-top-5 absolute top-full right-0 left-0 border-t shadow-xl backdrop-blur-lg md:hidden">
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              <button
                onClick={() => onNavigate('home')}
                className="text-foreground hover:text-accent py-2 text-left font-medium transition-colors"
              >
                Trang chủ
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-foreground hover:text-accent py-2 text-left font-medium transition-colors"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="text-foreground hover:text-accent py-2 text-left font-medium transition-colors"
              >
                Món ăn
              </button>
              <button
                onClick={() => onNavigate('reservations')}
                className="text-foreground hover:text-accent py-2 text-left font-medium transition-colors"
              >
                Đặt bàn
              </button>
              <button
                onClick={() => onNavigate('location')}
                className="text-foreground hover:text-accent py-2 text-left font-medium transition-colors"
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
