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
    <header className={`fixed top-0 right-0 left-0 z-50 bg-white/90 shadow-lg backdrop-blur-sm`}>
      <nav className="container mx-auto px-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center md:flex md:justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Image src={Logo.src} width={80} height={80} alt="logo" />
            </Link>

            <p
              className={cn(
                'hidden text-sm leading-tight font-bold text-balance md:block md:text-base'
              )}
            >
              <span className={cn('text-brown-1')}>Nhà Hàng Ẩm Thực Mộc Sơn</span>
              <span className={cn('text-brown-1 block text-xs md:text-sm')}>
                chuyên alacarte, sky và Hầm rượu VIP
              </span>
            </p>
          </div>

          <p className={cn('text-center text-sm leading-tight font-bold text-balance md:hidden')}>
            <span className={cn('text-brown-1')}>Nhà Hàng Ẩm Thực Mộc Sơn</span>
            <span className={cn('text-brown-1 block text-xs')}>
              chuyên alacarte, sky và Hầm rượu VIP
            </span>
          </p>

          <div className="hidden items-center gap-8 md:flex">
            <button
              onClick={() => onNavigate('about')}
              className={cn(
                `text-secondary hover:text-secondary/80 font-bold drop-shadow-md transition-colors`
              )}
            >
              Giới thiệu
            </button>
            <button
              onClick={() => onNavigate('menu')}
              className={cn(
                `text-secondary hover:text-secondary/80 font-bold drop-shadow-md transition-colors`
              )}
            >
              Thực đơn
            </button>
            <button
              onClick={() => onNavigate('reservations')}
              className={cn(
                `text-secondary hover:text-secondary/80 font-bold drop-shadow-md transition-colors`
              )}
            >
              Đặt bàn
            </button>
            <button
              onClick={() => onNavigate('location')}
              className={cn(
                `text-secondary hover:text-secondary/80 font-bold drop-shadow-md transition-colors`
              )}
            >
              Vị trí
            </button>
          </div>

          <button className="p-2 md:hidden" onClick={onToggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? (
              <X className={`text-secondary h-6 w-6`} />
            ) : (
              <Menu className={`text-secondary h-6 w-6`} />
            )}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-border animate-in slide-in-from-top-5 absolute top-full right-0 left-0 border-t bg-white/95 shadow-xl backdrop-blur-lg md:hidden">
            <div className="container mx-auto flex flex-col gap-4 px-4 py-6">
              <button
                onClick={() => onNavigate('about')}
                className="text-secondary py-2 text-left font-medium transition-colors"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => onNavigate('menu')}
                className="text-secondary py-2 text-left font-medium transition-colors"
              >
                Món ăn
              </button>
              <button
                onClick={() => onNavigate('reservations')}
                className="text-secondary py-2 text-left font-medium transition-colors"
              >
                Đặt bàn
              </button>
              <button
                onClick={() => onNavigate('location')}
                className="text-secondary py-2 text-left font-medium transition-colors"
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
