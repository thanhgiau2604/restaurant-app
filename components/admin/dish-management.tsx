"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, ImageIcon, Upload, X, Search } from "lucide-react"
import { type Dish } from "@/lib/types"
import { uploadImage } from "@/lib/cloudinary"
import { useRestaurantStore } from "@/stores/restaurant-store"
import Image from "next/image"
import { toast } from "sonner"

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

  const [searchQuery, setSearchQuery] = useState("")

  const [imagePreview, setImagePreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  const formatVnd = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (!digits) {
      return ""
    }
    return new Intl.NumberFormat("vi-VN").format(Number(digits))
  }

  const parsePrice = (value: string) => {
    const digits = value.replace(/\D/g, "")
    if (!digits) {
      return Number.NaN
    }
    return Number.parseInt(digits, 10)
  }

  const formSchema = z.object({
    name: z.string().min(1, "Dish name is required."),
    price: z
      .string()
      .min(1, "Price is required.")
      .refine((value) => !Number.isNaN(parsePrice(value)), "Please enter a valid price."),
    category: z.string().min(1, "Category is required."),
    image: z.string().optional().or(z.literal("")),
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
      name: "",
      price: "",
      category: "",
      image: "",
    },
  })

  useEffect(() => {
    loadDishes()
    loadCategories()
  }, [])

  useEffect(() => {
    if (dishesError) {
      toast.error("Dishes error", {
        description: dishesError,
      })
    }
  }, [dishesError])

  useEffect(() => {
    if (categoriesError) {
      toast.error("Categories error", {
        description: categoriesError,
      })
    }
  }, [categoriesError])

  const filteredDishes = dishes.filter((dish) => {
    return searchQuery === "" || dish.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  const categoryNameById = (categoryId: string) => {
    return categories.find((category) => category.id === categoryId)?.name ?? "Unknown"
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File too large',{
          description: "Please select an image smaller than 5MB",
        })
        return
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        toast.error('Invalid file type',{
          description: "Please select an image file",
        })
        return
      }

      setIsUploading(true)
      try {
        const imageUrl = await uploadImage(file)
        setImagePreview(imageUrl)
        setValue("image", imageUrl, { shouldValidate: true, shouldDirty: true })
        toast.success("Image uploaded")
      } catch (error) {
        toast.error("Image upload failed", {
          description: "Please try again.",
        })
      } finally {
        setIsUploading(false)
      }
    }
  }

  const handleClearImage = () => {
    setImagePreview("")
    setValue("image", "", { shouldValidate: true, shouldDirty: true })
  }

  const onSubmit = async (values: FormValues) => {
    const parsedPrice = parsePrice(values.price)
    try {
      if (editingDish) {
        await updateDish(editingDish.id, {
          name: values.name,
          price: parsedPrice,
          category: values.category,
          image: values.image || "",
        })
        toast.success("Dish updated successfully")
      } else {
        await addDish({
          name: values.name,
          price: parsedPrice,
          category: values.category,
          image: values.image || "",
        })
        toast.success("Dish added successfully")
      }
      resetForm()
    } catch (error) {
      toast.error("Unable to save dish", {
        description: "Please try again.",
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
      toast.success("Dish deleted successfully")
    } catch (error) {
      toast.error("Unable to delete dish", {
        description: "Please try again.",
      })
    }
  }

  const resetForm = () => {
    reset({ name: "", price: "", category: "", image: "" })
    setEditingDish(null)
    setImagePreview("")
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Menu Management</CardTitle>
          <Dialog
            open={isDialogOpen}
            onOpenChange={(open) => {
              setIsDialogOpen(open)
              if (!open) resetForm()
            }}
          >
            <DialogTrigger asChild>
              <Button className="bg-linear-to-r from-primary to-secondary text-white gap-2 hover:opacity-90">
                <Plus className="h-4 w-4" />
                Add Dish
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingDish ? "Edit Dish" : "Add New Dish"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Dish Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="e.g., Grilled Salmon"
                    required
                  />
                  {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price (VND)</Label>
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
                  <Label htmlFor="category">Category</Label>
                  <Controller
                    control={control}
                    name="category"
                    render={({ field }) => (
                      <Select value={field.value} onValueChange={field.onChange} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingCategories ? (
                            <SelectItem value="loading" disabled>
                              Loading...
                            </SelectItem>
                          ) : categories.length === 0 ? (
                            <SelectItem value="empty" disabled>
                              No categories available
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
                  {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Dish Image</Label>
                  {imagePreview ? (
                    <div className="relative">
                      <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
                        <Image src={imagePreview || "/placeholder.svg"} alt="Preview" fill className="object-cover" />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 gap-1"
                        onClick={handleClearImage}
                      >
                        <X className="h-3 w-3" />
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="image-upload"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isUploading}
                        className="hidden"
                      />
                      <label htmlFor="image-upload" className={isUploading ? "cursor-not-allowed" : "cursor-pointer"}>
                        <div className="flex flex-col items-center gap-2">
                          {isUploading ? (
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
                          ) : (
                            <div className="bg-muted p-3 rounded-full">
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {isUploading ? "Uploading image..." : "Click to upload image"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 5MB</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    type="submit"
                    className="flex-1 bg-linear-to-r from-primary to-secondary text-white hover:opacity-90"
                    disabled={isUploading || isSubmitting || !isDirty}
                  >
                    {isSubmitting ? "Saving..." : `${editingDish ? "Update" : "Add"} Dish`}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          <Input
            placeholder="Search dishes by name..."
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
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDishes.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    {isLoadingDishes
                      ? "Loading dishes..."
                      : searchQuery
                        ? "No dishes match your search."
                        : "No dishes found. Add your first dish to get started."}
                  </TableCell>
                </TableRow>
              ) : (
                filteredDishes.map((dish) => (
                  <TableRow key={dish.id}>
                    <TableCell>
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        {dish.image ? (
                          <Image src={dish.image || "/placeholder.svg"} alt={dish.name} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{dish.name}</TableCell>
                    <TableCell>{categoryNameById(dish.category)}</TableCell>
                    <TableCell>{formatVnd(dish.price.toString())}đ</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(dish)} className="gap-1">
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm" className="gap-1">
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the dish "{dish.name}" from
                                your menu.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(dish.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
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
