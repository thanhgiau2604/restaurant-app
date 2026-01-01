'use client'

import { Button } from '@/components/ui/button'
import MainBg from '@/assets/view-06.jpg'
import Dish01 from '@/assets/dish-01.jpg'
import Dish02 from '@/assets/dish-02.jpg'
import Dish03 from '@/assets/dish-03.jpg'
import Dish04 from '@/assets/dish-04.jpg'

type HeroSectionProps = {
  heroVisible: boolean
  onCtaClick: () => void
}

export default function HeroSection({ heroVisible, onCtaClick }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="animate-gradient-xy absolute inset-0 bg-linear-to-br from-(--color-hero-accent) via-(--color-hero-primary) to-(--color-hero-secondary) opacity-90" />
      <div
        className={`absolute inset-0 bg-cover bg-center opacity-40`}
        style={{ backgroundImage: `url(${MainBg.src})` }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={Dish01.src}
          alt="Food"
          className={`absolute top-[15%] left-[10%] h-32 w-32 rounded-full object-cover shadow-2xl transition-all duration-1000 md:h-48 md:w-48 ${heroVisible ? 'translate-y-0 opacity-80' : '-translate-y-20 opacity-0'}`}
          style={{ animationDelay: '0.2s' }}
        />
        <img
          src={Dish02.src}
          alt="Food"
          className={`absolute top-[60%] left-[5%] h-24 w-24 rounded-full object-cover shadow-2xl transition-all duration-1000 md:h-36 md:w-36 ${heroVisible ? 'translate-y-0 opacity-70' : 'translate-y-20 opacity-0'}`}
          style={{ animationDelay: '0.4s' }}
        />
        <img
          src={Dish03.src}
          alt="Food"
          className={`absolute top-[20%] right-[8%] h-28 w-28 rounded-full object-cover shadow-2xl transition-all duration-1000 md:h-40 md:w-40 ${heroVisible ? 'translate-y-0 opacity-75' : '-translate-y-20 opacity-0'}`}
          style={{ animationDelay: '0.3s' }}
        />
        <img
          src={Dish04.src}
          alt="Food"
          className={`absolute right-[12%] bottom-[20%] h-24 w-24 rounded-full object-cover shadow-2xl transition-all duration-1000 md:h-36 md:w-36 ${heroVisible ? 'translate-y-0 opacity-80' : 'translate-y-20 opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      <div
        className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <h1 className="mb-6 text-5xl font-bold text-balance text-white drop-shadow-2xl md:text-7xl">
          Nhà Hàng Ẩm Thực Mộc Sơn
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-xl text-pretty text-white drop-shadow-lg md:text-2xl">
          Món ăn hấp dẫn và thức uống chọn lọc dành cho những buổi tiệc trọn vẹn trong không gian
          hầm rượu.
        </p>
        <Button
          size="lg"
          variant="custom"
          onClick={onCtaClick}
          className="rounded-full bg-linear-to-r from-[#fa6689] to-rose-800 px-10 py-8 text-2xl font-semibold text-white shadow-2xl transition-transform hover:scale-105"
        >
          Đặt Bàn Ngay
        </Button>
      </div>
    </section>
  )
}
