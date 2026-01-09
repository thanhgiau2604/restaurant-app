'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Upload, X } from 'lucide-react'
import { type Dish } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'
import { useRestaurantStore } from '@/stores/restaurant-store'
import { toast } from 'sonner'
import Image from 'next/image'

export function DishManagement() {
  const dishes = useRestaurantStore((state) => state.dishes)
  const isLoadingDishes = useRestaurantStore((state) => state.isLoadingDishes)
  const dishesError = useRestaurantStore((state) => state.dishesError)
  const loadDishes = useRestaurantStore((state) => state.loadDishes)
  const addDish = useRestaurantStore((state) => state.addDish)
  const updateDish = useRestaurantStore((state) => state.updateDish)
  const deleteDish = useRestaurantStore((state) => state.deleteDish)

  const [isUploadingNew, setIsUploadingNew] = useState(false)
  const [uploadingDishId, setUploadingDishId] = useState<string | null>(null)

  useEffect(() => {
    loadDishes()
  }, [])

  useEffect(() => {
    if (dishesError) {
      toast.error('Lỗi món ăn', {
        description: dishesError,
      })
    }
  }, [dishesError])

  const validateImageFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      return 'Vui lòng chọn ảnh nhỏ hơn 5MB'
    }
    if (!file.type.startsWith('image/')) {
      return 'Vui lòng chọn tệp hình ảnh'
    }
    return null
  }

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    const input = e.target
    if (files.length === 0) return

    setIsUploadingNew(true)
    try {
      for (const file of files) {
        const validationError = validateImageFile(file)
        if (validationError) {
          toast.error('Ảnh không hợp lệ', {
            description: validationError,
          })
          continue
        }
        const imageUrl = await uploadImage(file)
        await addDish({
          name: `Menu image ${Date.now()}`,
          price: 0,
          categories: [],
          image: imageUrl,
        })
      }
      toast.success('Thêm ảnh thực đơn thành công')
    } catch (error) {
      toast.error('Thêm ảnh thất bại', {
        description: 'Vui lòng thử lại.',
      })
    } finally {
      setIsUploadingNew(false)
      input.value = ''
    }
  }

  const handleUpdateImage = async (dish: Dish, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const input = e.target
    if (!file) return
    const validationError = validateImageFile(file)
    if (validationError) {
      toast.error('Ảnh không hợp lệ', {
        description: validationError,
      })
      input.value = ''
      return
    }

    setUploadingDishId(dish.id)
    try {
      const imageUrl = await uploadImage(file)
      await updateDish(dish.id, { image: imageUrl })
      toast.success('Cập nhật ảnh thành công')
    } catch (error) {
      toast.error('Cập nhật ảnh thất bại', {
        description: 'Vui lòng thử lại.',
      })
    } finally {
      setUploadingDishId(null)
      input.value = ''
    }
  }

  const handleDelete = async (dish: Dish) => {
    try {
      await deleteDish(dish.id)
      toast.success('Xóa ảnh thực đơn thành công')
    } catch (error) {
      toast.error('Không thể xóa ảnh', {
        description: 'Vui lòng thử lại.',
      })
    }
  }

  return (
    <Card className="border-none bg-white/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Quản lý hình ảnh thực đơn</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="border-muted-foreground/25 hover:border-secondary/60 rounded-lg border-2 border-dashed bg-white/70 p-6 text-center transition-colors">
            <input
              type="file"
              id="menu-image-upload"
              accept="image/*"
              onChange={handleAddImage}
              disabled={isUploadingNew}
              multiple
              className="hidden"
            />
            <label
              htmlFor="menu-image-upload"
              className={isUploadingNew ? 'cursor-not-allowed' : 'cursor-pointer'}
            >
              <div className="flex flex-col items-center gap-2">
                {isUploadingNew ? (
                  <div className="border-secondary/30 border-t-secondary h-10 w-10 animate-spin rounded-full border-4" />
                ) : (
                  <div className="bg-secondary/10 rounded-full p-3">
                    <Upload className="text-secondary h-6 w-6" />
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium">
                    {isUploadingNew ? 'Đang tải ảnh...' : 'Bấm để thêm ảnh thực đơn'}
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">PNG, JPG, WEBP tối đa 5MB</p>
                </div>
              </div>
            </label>
          </div>

          {isLoadingDishes ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`menu-image-skeleton-${index}`}
                  className="bg-muted/60 h-40 animate-pulse rounded-lg"
                />
              ))}
            </div>
          ) : dishes.length === 0 ? (
            <div className="text-muted-foreground py-6 text-center">
              Chưa có ảnh thực đơn. Hãy thêm ảnh đầu tiên.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {dishes.map((dish) => (
                <div
                  key={dish.id}
                  className="group border-muted/60 relative overflow-hidden rounded-lg border bg-white"
                >
                  <div className="relative aspect-video w-full">
                    <Image
                      src={dish.image || '/placeholder.svg'}
                      alt={dish.name || 'Menu image'}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-2 right-2 flex items-center gap-2">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-foreground bg-white/90 hover:bg-white"
                          aria-label="Xóa ảnh"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Thao tác này không thể hoàn tác. Ảnh thực đơn sẽ bị xóa.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(dish)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Xóa
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                  <div className="border-muted/60 flex items-center justify-between gap-2 border-t px-3 py-2">
                    <div>
                      <input
                        type="file"
                        id={`menu-image-update-${dish.id}`}
                        accept="image/*"
                        onChange={(e) => handleUpdateImage(dish, e)}
                        disabled={uploadingDishId === dish.id}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
