'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { Category, Dish } from '@/lib/types'

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
        <div className="animate-in fade-in slide-in-from-bottom mb-12 text-center duration-700">
          <h2 className="text-secondary mb-4 text-4xl font-bold md:text-5xl">Thực Đơn</h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            Khám phá tuyển chọn các món ăn hấp dẫn được chúng tôi chọn lọc kỹ lưỡng
          </p>
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

        <div className="relative min-h-100">
          {isLoadingDishes || isLoadingCategories ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <Card key={`dish-skeleton-${index}`} className="border-2 border-transparent">
                  <div className="h-48 animate-pulse bg-white/70" />
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
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dish.image || '/placeholder.svg'}
                      alt={dish.name}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 rounded-full bg-white px-3 py-1 shadow-lg">
                      <span className="text-secondary bg-clip-text text-lg font-bold">
                        {formatVnd(dish.price)}đ
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="mb-2 text-xl font-bold">{dish.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Món ăn đặc trưng của nhà hàng.
                    </p>
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
