'use client'

import Logo from '@/assets/logo.png'
import Image from 'next/image'
import { Facebook, Instagram, Twitter } from 'lucide-react'

type FooterSectionProps = {
  onNavigate: (sectionId: string) => void
}

export default function FooterSection({ onNavigate }: FooterSectionProps) {
  return (
    <footer className="from-secondary/80 via-secondary/90 to-primary bg-linear-to-br py-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div className="flex gap-2">
            <div className="w-20 shrink-0 gap-1">
              <Image src={Logo.src} width={80} height={80} alt="logo" />
            </div>
            <p className="leading-relaxed text-white/90">
              Mang đến cho bạn những trải nghiệm ẩm thực tinh tế nhất với niềm đam mê và sự tận tâm
              kể từ năm 2026.
            </p>
          </div>

          <div>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('home')}
                className="block text-white/90 transition-colors hover:text-white"
              >
                Trang chủ
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="block text-white/90 transition-colors hover:text-white"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => onNavigate('dishes')}
                className="block text-white/90 transition-colors hover:text-white"
              >
                Thực đơn
              </button>
              <button
                onClick={() => onNavigate('reservations')}
                className="block text-white/90 transition-colors hover:text-white"
              >
                Đặt bàn
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold">Theo dõi chúng tôi</h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="rounded-full bg-white/20 p-3 transition-all hover:scale-110 hover:bg-white/30"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-white/20 p-3 transition-all hover:scale-110 hover:bg-white/30"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="rounded-full bg-white/20 p-3 transition-all hover:scale-110 hover:bg-white/30"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center text-white/80">
          <p>&copy; {new Date().getFullYear()} Nhà hàng Mộc Sơn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
