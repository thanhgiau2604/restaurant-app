'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Search } from 'lucide-react'
import { type Dish } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'
import { useRestaurantStore } from '@/stores/restaurant-store'
import { toast } from 'sonner'
import DishFormDialog from '@/components/admin/dishes/dish-form-dialog'
import DishTable from '@/components/admin/dishes/dish-table'
import type { DishFormValues } from '@/components/admin/dishes/types'

export function DishManagement() {
  const dishes = useRestaurantStore((state) => state.dishes)
  const isLoadingDishes = useRestaurantStore((state) => state.isLoadingDishes)
  const dishesError = useRestaurantStore((state) => state.dishesError)
  const loadDishes = useRestaurantStore((state) => state.loadDishes)
  const categories = useRestaurantStore((state) => state.categories)
  const isLoadingCategories = useRestaurantStore((state) => state.isLoadingCategories)
  const categoriesError = useRestaurantStore((state) => state.categoriesError)
  const loadCategories = useRestaurantStore((state) => state.loadCategories)
  const addDish = useRestaurantStore((state) => state.addDish)
  const updateDish = useRestaurantStore((state) => state.updateDish)
  const deleteDish = useRestaurantStore((state) => state.deleteDish)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingDish, setEditingDish] = useState<Dish | null>(null)

  const [searchQuery, setSearchQuery] = useState('')

  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const formatVnd = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (!digits) {
      return ''
    }
    return new Intl.NumberFormat('vi-VN').format(Number(digits))
  }

  const parsePrice = (value: string) => {
    const digits = value.replace(/\D/g, '')
    if (!digits) {
      return Number.NaN
    }
    return Number.parseInt(digits, 10)
  }

  const formSchema: z.ZodType<DishFormValues> = z.object({
    name: z.string().min(1, 'Vui lòng nhập tên món.'),
    price: z
      .string()
      .min(1, 'Vui lòng nhập giá.')
      .refine((value) => !Number.isNaN(parsePrice(value)), 'Giá không hợp lệ.'),
    categories: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất một danh mục.'),
    image: z.string().optional().or(z.literal('')),
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<DishFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      categories: [],
      image: '',
    },
  })

  useEffect(() => {
    loadDishes()
    loadCategories()
  }, [])

  useEffect(() => {
    if (dishesError) {
      toast.error('Lỗi món ăn', {
        description: dishesError,
      })
    }
  }, [dishesError])

  useEffect(() => {
    if (categoriesError) {
      toast.error('Lỗi danh mục', {
        description: categoriesError,
      })
    }
  }, [categoriesError])

  const filteredDishes = dishes.filter((dish) => {
    return searchQuery === '' || dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const categoryNamesByIds = (categoryIds: string[]) => {
    if (!categories.length) return []

    return categoryIds.length === 0
      ? ['Chưa có danh mục']
      : categoryIds.map(
          (categoryId) =>
            categories.find((category) => category.id === categoryId)?.name ?? 'Không rõ'
        )
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Ảnh quá lớn', {
          description: 'Vui lòng chọn ảnh nhỏ hơn 5MB',
        })
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Định dạng ảnh không hợp lệ', {
          description: 'Vui lòng chọn tệp hình ảnh',
        })
        return
      }

      setIsUploading(true)
      try {
        const imageUrl = await uploadImage(file)
        setImagePreview(imageUrl)
        setValue('image', imageUrl, { shouldValidate: true, shouldDirty: true })
        toast.success('Tải ảnh thành công')
      } catch (error) {
        toast.error('Tải ảnh thất bại', {
          description: 'Vui lòng thử lại.',
        })
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleClearImage = () => {
    setImagePreview('')
    setValue('image', '', { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = async (values: DishFormValues) => {
    const parsedPrice = parsePrice(values.price)
    try {
      if (editingDish) {
        await updateDish(editingDish.id, {
          name: values.name,
          price: parsedPrice,
          categories: values.categories,
          image: values.image || '',
        })
        toast.success('Cập nhật món ăn thành công')
      } else {
        await addDish({
          name: values.name,
          price: parsedPrice,
          categories: values.categories,
          image: values.image || '',
        })
        toast.success('Thêm món ăn thành công')
      }
      resetForm()
    } catch (error) {
      toast.error('Không thể lưu món ăn', {
        description: 'Vui lòng thử lại.',
      })
    }
  }

  const handleEdit = (dish: Dish) => {
    setEditingDish(dish)
    reset({
      name: dish.name,
      price: formatVnd(dish.price.toString()),
      categories: dish.categories,
      image: dish.image,
    })
    setImagePreview(dish.image)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteDish(id)
      toast.success('Xóa món ăn thành công')
    } catch (error) {
      toast.error('Không thể xóa món ăn', {
        description: 'Vui lòng thử lại.',
      })
    }
  }

  const resetForm = () => {
    reset({ name: '', price: '', categories: [], image: '' })
    setEditingDish(null)
    setImagePreview('')
    setIsDialogOpen(false)
  }

  return (
    <Card className="border-none bg-white/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Quản lý thực đơn</CardTitle>
          <DishFormDialog
            trigger={
              <Button className="text-primary border-secondary/80 gap-2 border bg-white hover:opacity-90">
                <Plus className="h-4 w-4" />
                Thêm món
              </Button>
            }
            isOpen={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
            editingDish={editingDish}
            onSubmit={handleSubmit(onSubmit)}
            onCancel={resetForm}
            register={register}
            control={control}
            errors={errors}
            isSubmitting={isSubmitting}
            isDirty={isDirty}
            categories={categories}
            isLoadingCategories={isLoadingCategories}
            imagePreview={imagePreview}
            isUploading={isUploading}
            onImageChange={handleImageChange}
            onClearImage={handleClearImage}
            formatVnd={formatVnd}
          />
        </div>
        <div className="relative mt-4">
          <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
          <Input
            placeholder="Tìm món theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <DishTable
          dishes={filteredDishes}
          isLoading={isLoadingDishes}
          searchQuery={searchQuery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          categoryNamesByIds={categoryNamesByIds}
          formatVnd={formatVnd}
        />
      </CardContent>
    </Card>
  )
}
