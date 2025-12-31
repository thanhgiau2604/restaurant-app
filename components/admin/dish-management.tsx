'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Plus, Pencil, Trash2, ImageIcon, Upload, X, Search } from 'lucide-react'
import { type Dish } from '@/lib/types'
import { uploadImage } from '@/lib/cloudinary'
import { useRestaurantStore } from '@/stores/restaurant-store'
import Image from 'next/image'
import { toast } from 'sonner'

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

  const formSchema = z.object({
    name: z.string().min(1, 'Vui lòng nhập tên món.'),
    price: z
      .string()
      .min(1, 'Vui lòng nhập giá.')
      .refine((value) => !Number.isNaN(parsePrice(value)), 'Giá không hợp lệ.'),
    category: z.string().min(1, 'Vui lòng chọn danh mục.'),
    image: z.string().optional().or(z.literal('')),
  })

  type FormValues = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: '',
      category: '',
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

  const categoryNameById = (categoryId: string) => {
    return categories.find((category) => category.id === categoryId)?.name ?? 'Không rõ'
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

  const onSubmit = async (values: FormValues) => {
    const parsedPrice = parsePrice(values.price)
    try {
      if (editingDish) {
        await updateDish(editingDish.id, {
          name: values.name,
          price: parsedPrice,
          category: values.category,
          image: values.image || '',
        })
        toast.success('Cập nhật món ăn thành công')
      } else {
        await addDish({
          name: values.name,
          price: parsedPrice,
          category: values.category,
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
      category: dish.category,
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
    reset({ name: '', price: '', category: '', image: '' })
    setEditingDish(null)
    setImagePreview('')
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Quản lý thực đơn</CardTitle>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button className="from-primary to-secondary gap-2 bg-linear-to-r text-white hover:opacity-90">
                <Plus className="h-4 w-4" />
                Thêm món
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDish ? 'Chỉnh sửa món' : 'Thêm món mới'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên món</Label>
                  <Input id="name" {...register('name')} placeholder="vd: Cá hồi nướng" required />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Giá (VND)</Label>
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
                        required
                      />
                    )}
                  />
                  {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Danh mục</Label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn danh mục" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingCategories ? (
                            <SelectItem value="loading" disabled>
                              Đang tải...
                            </SelectItem>
                          ) : categories.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              Chưa có danh mục
                            </SelectItem>
                          ) : (
                            categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Hình ảnh món</Label>
                  {imagePreview ? (
                    <div className="relative">
                      <div className="bg-muted relative h-48 w-full overflow-hidden rounded-lg">
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
                        onClick={handleClearImage}
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
                        onChange={handleImageChange}
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
                              PNG, JPG tối đa 5MB
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
                    className="from-primary to-secondary flex-1 bg-linear-to-r text-white hover:opacity-90"
                    disabled={isUploading || isSubmitting || !isDirty}
                  >
                    {isSubmitting ? 'Đang lưu...' : `${editingDish ? 'Cập nhật' : 'Thêm'} món`}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Hủy
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hình ảnh</TableHead>
                <TableHead>Tên</TableHead>
                <TableHead>Danh mục</TableHead>
                <TableHead>Giá</TableHead>
                <TableHead className="text-right">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDishes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                    {isLoadingDishes
                      ? 'Đang tải món ăn...'
                      : searchQuery
                        ? 'Không có món nào phù hợp.'
                        : 'Chưa có món ăn. Hãy thêm món đầu tiên.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredDishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell>
                      <div className="bg-muted relative h-16 w-16 overflow-hidden rounded-lg">
                        {dish.image ? (
                          <Image
                            src={dish.image || '/placeholder.svg'}
                            alt={dish.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center">
                            <ImageIcon className="text-muted-foreground h-6 w-6" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{dish.name}</TableCell>
                    <TableCell>{categoryNameById(dish.category)}</TableCell>
                    <TableCell>{formatVnd(dish.price.toString())}đ</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(dish)}
                          className="gap-1"
                        >
                          <Pencil className="h-3 w-3" />
                          Sửa
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-1">
                              <Trash2 className="h-3 w-3" />
                              Xóa
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Bạn chắc chắn chứ?</AlertDialogTitle>
                              <AlertDialogDescription>
                                Thao tác này không thể hoàn tác. Món "{dish.name}" sẽ bị xóa khỏi
                                thực đơn.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(dish.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Xóa
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
