'use client'

import { useState } from 'react'
import type { Dish } from '@/lib/types'
import HTMLFlipBook from 'react-pageflip'

type Props = {
  dishes: Dish[]
  isLoadingDishes: boolean
}

export default function MenuSection({ dishes, isLoadingDishes }: Props) {
  const [isCoverActive, setIsCoverActive] = useState(true)
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait')
  const menuImages = dishes
    .filter((dish) => dish.image)
    .map((dish, index) => ({
      src: dish.image,
      alt: dish.name ? dish.name : `Menu image ${index + 1}`,
    }))
  const shouldRenderFlipbook = isLoadingDishes || menuImages.length > 0
  const shouldCenterCover = isCoverActive && orientation === 'landscape'

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

        {shouldRenderFlipbook ? (
          <div className="mb-10 flex justify-center">
            <div className="w-full max-w-5xl">
              {isLoadingDishes ? (
                <div className="flex h-240 items-center justify-center rounded-2xl shadow-2xl" />
              ) : (
                <HTMLFlipBook
                  width={700}
                  height={960}
                  size="stretch"
                  minWidth={300}
                  maxWidth={1024}
                  minHeight={400}
                  maxHeight={1000}
                  maxShadowOpacity={0.2}
                  showCover
                  mobileScrollSupport
                  startPage={0}
                  drawShadow
                  flippingTime={1000}
                  usePortrait
                  startZIndex={0}
                  autoSize
                  clickEventForward
                  useMouseEvents
                  swipeDistance={30}
                  showPageCorners
                  disableFlipByClick={false}
                  className="mx-auto"
                  style={{
                    transform: shouldCenterCover ? 'translateX(-25%)' : undefined,
                    transition: 'transform 300ms ease',
                  }}
                  onInit={(event) => {
                    const page = event?.data?.page ?? 0
                    const mode = event?.data?.mode ?? 'portrait'
                    setIsCoverActive(page === 0)
                    setOrientation(mode)
                  }}
                  onFlip={(event) => {
                    setIsCoverActive(event?.data === 0)
                  }}
                  onChangeOrientation={(event) => {
                    setOrientation(event?.data ?? 'portrait')
                  }}
                >
                  {menuImages.map((image) => (
                    <div
                      key={image.src}
                      className="overflow-hidden rounded-2xl bg-white shadow-2xl"
                    >
                      <img src={image.src} alt={image.alt} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </HTMLFlipBook>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
