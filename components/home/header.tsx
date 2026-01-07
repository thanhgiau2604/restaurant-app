'use client'

import { Menu, X } from 'lucide-react'
import Logo from '@/assets/logo.png'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'

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
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/70 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image src={Logo.src} width={80} height={80} alt="logo" />
            </Link>

            <p
              className={cn(
                'font-extrabold max-md:hidden',
                scrolled
                  ? 'text-secondary'
                  : 'text-hero-accent text-shadow-[2px_0px_0px_rgba(73,35,20)]'
              )}
            >
              NHÀ HÀNG <br /> <span className="mr-1" />
              MỘC SƠN
            </p>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => onNavigate('home')}
              className={cn(`font-bold drop-shadow-md transition-colors`, {
                'text-primary hover:text-secondary': scrolled,
                'text-white hover:text-white/80': !scrolled,
              })}
            >
              Trang chủ
            </button>
            <button
              onClick={() => onNavigate('about')}
              className={cn(`font-bold drop-shadow-md transition-colors`, {
                'text-primary hover:text-secondary': scrolled,
                'text-white hover:text-white/80': !scrolled,
              })}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => onNavigate('menu')}
              className={cn(`font-bold drop-shadow-md transition-colors`, {
                'text-primary hover:text-secondary': scrolled,
                'text-white hover:text-white/80': !scrolled,
              })}
            >
              Thực đơn
            </button>
            <button
              onClick={() => onNavigate('reservations')}
              className={cn(`font-bold drop-shadow-md transition-colors`, {
                'text-primary hover:text-secondary': scrolled,
                'text-white hover:text-white/80': !scrolled,
              })}
            >
              Đặt bàn
            </button>
            <button
              onClick={() => onNavigate('location')}
              className={cn(`font-bold drop-shadow-md transition-colors`, {
                'text-primary hover:text-secondary': scrolled,
                'text-white hover:text-white/80': !scrolled,
              })}
            >
              Vị trí
            </button>
          </div>

          <button className="p-2 md:hidden" onClick={onToggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled ? 'text-primary' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled ? 'text-primary' : 'text-white'}`} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="bg-background/98 border-border animate-in slide-in-from-top-5 absolute top-full right-0 left-0 border-t shadow-xl backdrop-blur-lg md:hidden">
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              <button
                onClick={() => onNavigate('home')}
                className="text-primary py-2 text-left font-medium transition-colors"
              >
                Trang chủ
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-primary py-2 text-left font-medium transition-colors"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="text-primary py-2 text-left font-medium transition-colors"
              >
                Món ăn
              </button>
              <button
                onClick={() => onNavigate('reservations')}
                className="text-primary py-2 text-left font-medium transition-colors"
              >
                Đặt bàn
              </button>
              <button
                onClick={() => onNavigate('location')}
                className="text-primary py-2 text-left font-medium transition-colors"
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
