"use client"

import { Button } from "@/components/ui/button"

type HeroSectionProps = {
  heroVisible: boolean
  onCtaClick: () => void
}

export default function HeroSection({ heroVisible, onCtaClick }: HeroSectionProps) {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-(--color-hero-accent) via-(--color-hero-primary) to-(--color-hero-secondary) animate-gradient-xy opacity-90" />
      <div className="absolute inset-0 bg-[url('/restaurant-interior-dining.jpg')] bg-cover bg-center opacity-40" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/delicious-gourmet-burger.jpg"
          alt="Food"
          className={`absolute top-[15%] left-[10%] w-32 h-32 md:w-48 md:h-48 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-80 translate-y-0" : "opacity-0 -translate-y-20"}`}
          style={{ animationDelay: "0.2s" }}
        />
        <img
          src="/fresh-pasta-dish.jpg"
          alt="Food"
          className={`absolute top-[60%] left-[5%] w-24 h-24 md:w-36 md:h-36 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-70 translate-y-0" : "opacity-0 translate-y-20"}`}
          style={{ animationDelay: "0.4s" }}
        />
        <img
          src="/grilled-salmon-plate.png"
          alt="Food"
          className={`absolute top-[20%] right-[8%] w-28 h-28 md:w-40 md:h-40 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-75 translate-y-0" : "opacity-0 -translate-y-20"}`}
          style={{ animationDelay: "0.3s" }}
        />
        <img
          src="/colorful-dessert.png"
          alt="Food"
          className={`absolute bottom-[20%] right-[12%] w-24 h-24 md:w-36 md:h-36 rounded-full object-cover shadow-2xl transition-all duration-1000 ${heroVisible ? "opacity-80 translate-y-0" : "opacity-0 translate-y-20"}`}
          style={{ animationDelay: "0.5s" }}
        />
      </div>

      <div
        className={`relative z-10 container mx-auto px-4 text-center transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 text-balance drop-shadow-2xl">
          Trải nghiệm đỉnh cao ẩm thực
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto text-pretty drop-shadow-lg">
          Nguyên liệu tươi ngon, hương vị đậm đà và những khoảnh khắc khó quên tại nhà hàng Mộc Sơn
        </p>
        <Button
          size="lg"
          variant="custom"
          onClick={onCtaClick}
          className="bg-linear-to-r from-[#fa6689] to-rose-800 text-white font-semibold px-10 py-8 text-2xl rounded-full shadow-2xl hover:scale-105 transition-transform"
        >
          Đặt Bàn Ngay
        </Button>
      </div>
    </section>
  )
}
