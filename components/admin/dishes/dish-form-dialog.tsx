'use client'

import type React from 'react'

import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Upload, X } from 'lucide-react'
import type { Category, Dish } from '@/lib/types'
import Image from 'next/image'
import type { DishFormValues } from '@/components/admin/dishes/types'

type DishFormDialogProps = {
  trigger: React.ReactNode
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingDish: Dish | null
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onCancel: () => void
  register: UseFormRegister<DishFormValues>
  control: Control<DishFormValues>
  errors: FieldErrors<DishFormValues>
  isSubmitting: boolean
  isDirty: boolean
  categories: Category[]
  isLoadingCategories: boolean
  imagePreview: string
  isUploading: boolean
  onImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClearImage: () => void
  formatVnd: (value: string) => string
}

export default function DishFormDialog({
  trigger,
  isOpen,
  onOpenChange,
  editingDish,
  onSubmit,
  onCancel,
  register,
  control,
  errors,
  isSubmitting,
  isDirty,
  categories,
  isLoadingCategories,
  imagePreview,
  isUploading,
  onImageChange,
  onClearImage,
  formatVnd,
}: DishFormDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{editingDish ? 'Chỉnh sửa món' : 'Thêm món mới'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tên món</Label>
            <Input id="name" {...register('name')} placeholder="vd: Cá hồi nướng" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">Giá (VNĐ)</Label>
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <Input
                  id="price"
                  type="text"
                  inputMode="numeric"
                  value={field.value}
                  onChange={(e) => field.onChange(formatVnd(e.target.value))}
                  placeholder="0"
                />
              )}
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          </div>
          <div className="space-y-2">
            <Label>Danh mục</Label>
            <Controller
              control={control}
              name="categories"
              render={({ field }) => {
                const selected = field.value ?? []
                const toggleCategory = (categoryId: string) => {
                  if (selected.includes(categoryId)) {
                    field.onChange(selected.filter((item) => item !== categoryId))
                  } else {
                    field.onChange([...selected, categoryId])
                  }
                }

                return (
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {selected.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Chưa chọn danh mục.</p>
                      ) : (
                        selected.map((categoryId) => {
                          const categoryName =
                            categories.find((category) => category.id === categoryId)?.name ??
                            'Không rõ'
                          return (
                            <Badge key={categoryId} variant="secondary" className="gap-1 pr-1">
                              {categoryName}
                              <button
                                type="button"
                                onClick={() => toggleCategory(categoryId)}
                                className="hover:text-foreground/80 text-muted-foreground rounded-full p-0.5"
                                aria-label={`Bỏ ${categoryName}`}
                              >
                                <X className="h-3 w-3 text-white" />
                              </button>
                            </Badge>
                          )
                        })
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {isLoadingCategories ? (
                        <p className="text-muted-foreground text-sm">Đang tải danh mục...</p>
                      ) : categories.length === 0 ? (
                        <p className="text-muted-foreground text-sm">Chưa có danh mục.</p>
                      ) : (
                        categories.map((category) => {
                          const isSelected = selected.includes(category.id)
                          return (
                            <Button
                              key={category.id}
                              type="button"
                              variant={isSelected ? 'custom' : 'outline'}
                              onClick={() => toggleCategory(category.id)}
                              className="rounded-full"
                            >
                              {category.name}
                            </Button>
                          )
                        })
                      )}
                    </div>
                  </div>
                )
              }}
            />
            {errors.categories && (
              <p className="text-sm text-red-500">{errors.categories.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Hình ảnh món</Label>
            {imagePreview ? (
              <div className="relative">
                <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
                  <Image
                    src={imagePreview || '/placeholder.svg'}
                    alt="Xem trước"
                    fill
                    className="object-cover"
                  />
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 gap-1"
                  onClick={onClearImage}
                >
                  <X className="h-3 w-3" />
                  Xóa ảnh
                </Button>
              </div>
            ) : (
              <div className="border-muted-foreground/25 hover:border-primary/50 rounded-lg border-2 border-dashed p-8 text-center transition-colors">
                <input
                  type="file"
                  id="image-upload"
                  accept="image/*"
                  onChange={onImageChange}
                  disabled={isUploading}
                  className="hidden"
                />
                <label
                  htmlFor="image-upload"
                  className={isUploading ? 'cursor-not-allowed' : 'cursor-pointer'}
                >
                  <div className="flex flex-col items-center gap-2">
                    {isUploading ? (
                      <div className="border-primary/30 border-t-primary h-10 w-10 animate-spin rounded-full border-4" />
                    ) : (
                      <div className="bg-muted rounded-full p-3">
                        <Upload className="text-muted-foreground h-6 w-6" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">
                        {isUploading ? 'Đang tải ảnh...' : 'Bấm để tải ảnh'}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        PNG, JPG, WEBP tối đa 5MB
                      </p>
                    </div>
                  </div>
                </label>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              className="secondary-gradient flex-1 text-white hover:opacity-90"
              disabled={isUploading || isSubmitting || !isDirty}
            >
              {isSubmitting ? 'Đang lưu...' : `${editingDish ? 'Cập nhật' : 'Thêm'} món`}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Hủy
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
