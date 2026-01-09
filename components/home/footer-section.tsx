'use client'

import Logo from '@/assets/logo.png'
import Image from 'next/image'
import { Facebook, Instagram, Twitter } from 'lucide-react'

type FooterSectionProps = {
  onNavigate: (sectionId: string) => void
}

export default function FooterSection({ onNavigate }: FooterSectionProps) {
  return (
    <footer className="from-primary/15 to-primary/25 text-foreground bg-linear-to-r py-12 shadow-xl">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-8 md:grid-cols-3">
          <div className="flex gap-2">
            <div className="w-20 shrink-0 gap-1">
              <Image src={Logo.src} width={80} height={80} alt="logo" />
            </div>
            <p className="leading-relaxed text-black">
              Mang đến cho bạn những trải nghiệm ẩm thực tinh tế nhất với niềm đam mê và sự tận tâm
              kể từ năm 2026.
            </p>
          </div>

          <div>
            <div className="space-y-2">
              <button
                onClick={() => onNavigate('home')}
                className="hover:text-foreground block text-black transition-colors"
              >
                Trang chủ
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="hover:text-foreground block text-black transition-colors"
              >
                Giới thiệu
              </button>
              <button
                onClick={() => onNavigate('dishes')}
                className="hover:text-foreground block text-black transition-colors"
              >
                Thực đơn
              </button>
              <button
                onClick={() => onNavigate('reservations')}
                className="hover:text-foreground block text-black transition-colors"
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
                className="bg-secondary/10 text-foreground hover:bg-secondary/20 rounded-full p-3 transition-all hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-secondary/10 text-foreground hover:bg-secondary/20 rounded-full p-3 transition-all hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-secondary/10 text-foreground hover:bg-secondary/20 rounded-full p-3 transition-all hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-secondary/20 text-muted-foreground border-t pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Nhà hàng Mộc Sơn. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
