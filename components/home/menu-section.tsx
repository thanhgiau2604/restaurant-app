'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Category, Dish } from '@/lib/types'
import HTMLFlipBook from 'react-pageflip'
import Dish01 from '@/assets/menu/dish-01.jpg'
import Dish02 from '@/assets/menu/dish-02.jpg'
import Dish03 from '@/assets/menu/dish-03.jpg'
import Dish04 from '@/assets/menu/dish-04.jpg'
import Dish05 from '@/assets/menu/dish-05.jpg'
import Dish06 from '@/assets/menu/dish-06.jpg'
import Dish07 from '@/assets/menu/dish-07.jpg'
import Dish08 from '@/assets/menu/dish-08.jpg'
import Dish09 from '@/assets/menu/dish-09.jpg'
import Dish10 from '@/assets/menu/dish-10.jpg'
import Dish11 from '@/assets/menu/dish-11.jpg'
import Dish12 from '@/assets/menu/dish-12.jpg'
import Dish13 from '@/assets/menu/dish-13.jpg'
import Dish14 from '@/assets/menu/dish-14.jpg'

const menuFlipbookImages = [
  { src: Dish01.src, alt: 'Menu dish 01' },
  { src: Dish02.src, alt: 'Menu dish 02' },
  { src: Dish03.src, alt: 'Menu dish 03' },
  { src: Dish04.src, alt: 'Menu dish 04' },
  { src: Dish05.src, alt: 'Menu dish 05' },
  { src: Dish06.src, alt: 'Menu dish 06' },
  { src: Dish07.src, alt: 'Menu dish 07' },
  { src: Dish08.src, alt: 'Menu dish 08' },
  { src: Dish09.src, alt: 'Menu dish 09' },
  { src: Dish10.src, alt: 'Menu dish 10' },
  { src: Dish11.src, alt: 'Menu dish 11' },
  { src: Dish12.src, alt: 'Menu dish 12' },
  { src: Dish13.src, alt: 'Menu dish 13' },
  { src: Dish14.src, alt: 'Menu dish 14' },
]

type Props = {
  categories: Category[]
  dishes: Dish[]
  activeCategory: string
  isLoadingDishes: boolean
  isLoadingCategories: boolean
  onCategoryChange: (categoryId: string) => void
  formatVnd: (value: number) => string
}

export default function MenuSection({
  categories,
  dishes,
  activeCategory,
  isLoadingDishes,
  isLoadingCategories,
  onCategoryChange,
  formatVnd,
}: Props) {
  return (
    <section
      id="menu"
      className="from-secondary/5 via-secondary/10 to-primary/20 bg-linear-to-br py-20"
    >
      <div className="container mx-auto px-4">
        <div className="animate-in fade-in slide-in-from-bottom mb-6 text-center duration-700">
          <h2 className="text-secondary mb-4 text-4xl font-bold md:text-5xl">Thực Đơn</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Khám phá tuyển chọn các món ăn hấp dẫn được chúng tôi chọn lọc kỹ lưỡng <br />
            Vui lòng chọn thực đơn phù hợp với nhu cầu của bạn
          </p>
        </div>

        <div className="mb-10 flex justify-center">
          <div className="w-full max-w-xl">
            <HTMLFlipBook
              width={520}
              height={680}
              size="stretch"
              minWidth={260}
              maxWidth={560}
              minHeight={360}
              maxHeight={700}
              maxShadowOpacity={0.2}
              showCover={false}
              mobileScrollSupport
              className="mx-auto"
            >
              {menuFlipbookImages.map((image) => (
                <div key={image.src} className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                  <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                </div>
              ))}
            </HTMLFlipBook>
          </div>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          {isLoadingCategories
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`category-skeleton-${index}`}
                  className="h-10 w-28 animate-pulse rounded-full bg-white/70 shadow-sm"
                />
              ))
            : categories.map((category) => (
                <Button
                  key={category.id}
                  onClick={() => onCategoryChange(category.id)}
                  variant={activeCategory === category.id ? 'custom' : 'outline'}
                  className={`rounded-full px-6 transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'from-secondary/50 via-secondary to-primary scale-105 bg-linear-to-br text-white shadow-lg'
                      : 'hover:border-secondary hover:scale-105'
                  }`}
                >
                  {category.name}
                </Button>
              ))}
        </div>

        <div className="relative min-h-80">
          {isLoadingDishes || isLoadingCategories ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={`dish-skeleton-${index}`} className="border-2 border-transparent">
                  <div className="aspect-video w-full animate-pulse bg-white/70" />
                  <CardContent className="space-y-3 p-5">
                    <div className="bg-muted/70 h-5 w-2/3 animate-pulse rounded" />
                    <div className="bg-muted/50 h-4 w-full animate-pulse rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-muted-foreground py-12 text-center">Chưa có danh mục nào.</div>
          ) : dishes.length === 0 ? (
            <div className="text-muted-foreground py-12 text-center">
              Chưa có món ăn trong danh mục này.
            </div>
          ) : (
            <div className="grid gap-6 transition-all duration-500 sm:grid-cols-2 lg:grid-cols-3">
              {dishes.map((dish) => (
                <Card
                  key={dish.id}
                  className="group hover:border-secondary/50 overflow-hidden border-2 pt-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={dish.image || '/placeholder.svg'}
                      alt={dish.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 rounded-full bg-white/80 px-3 py-1 shadow-lg">
                      <span className="text-secondary bg-clip-text text-lg font-bold">
                        {formatVnd(dish.price)}đ
                      </span>
                    </div>
                  </div>
                  <CardContent className="py-0">
                    <h3 className="mb-2 text-xl font-bold">{dish.name}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
