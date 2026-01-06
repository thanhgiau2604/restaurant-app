'use client'

import { Button } from '@/components/ui/button'
import MainBg from '@/assets/view-04.jpg'
import Dish01 from '@/assets/dish-01.jpg'
import Dish02 from '@/assets/dish-02.jpg'
import Dish03 from '@/assets/dish-03.jpg'
import Dish04 from '@/assets/dish-04.jpg'

const heroDishImages = [
  {
    src: Dish01.src,
    positionClass: 'top-[15%] left-[10%]',
    sizeClass: 'h-32 w-32 md:h-48 md:w-48',
    visibleOpacityClass: 'opacity-80',
    hiddenTranslateClass: '-translate-y-20',
    animationDelay: '0.2s',
  },
  {
    src: Dish02.src,
    positionClass: 'top-[60%] left-[5%]',
    sizeClass: 'h-24 w-24 md:h-36 md:w-36',
    visibleOpacityClass: 'opacity-70',
    hiddenTranslateClass: 'translate-y-20',
    animationDelay: '0.4s',
  },
  {
    src: Dish03.src,
    positionClass: 'top-[20%] right-[8%]',
    sizeClass: 'h-28 w-28 md:h-40 md:w-40',
    visibleOpacityClass: 'opacity-75',
    hiddenTranslateClass: '-translate-y-20',
    animationDelay: '0.3s',
  },
  {
    src: Dish04.src,
    positionClass: 'right-[12%] bottom-[20%]',
    sizeClass: 'h-24 w-24 md:h-36 md:w-36',
    visibleOpacityClass: 'opacity-80',
    hiddenTranslateClass: 'translate-y-20',
    animationDelay: '0.5s',
  },
]

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
        {heroDishImages.map((dish) => (
          <img
            key={`${dish.src}-${dish.animationDelay}`}
            src={dish.src}
            alt="Food"
            className={`absolute ${dish.positionClass} ${dish.sizeClass} rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? `translate-y-0 ${dish.visibleOpacityClass}` : `${dish.hiddenTranslateClass} opacity-0`}`}
            style={{ animationDelay: dish.animationDelay }}
          />
        ))}
      </div>

      <div
        className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      >
        <h1 className="mb-6 bg-clip-text text-5xl font-bold text-balance text-white drop-shadow-2xl text-shadow-[2px_5px_0px_rgba(73,28,29)] md:text-7xl">
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
          className="from-secondary to-primary rounded-full bg-linear-to-r px-10 py-8 text-2xl font-semibold text-white shadow-2xl transition-transform hover:scale-105"
        >
          Đặt Bàn Ngay
        </Button>
      </div>
    </section>
  )
}
