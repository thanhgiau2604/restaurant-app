'use client'

import { Button } from '@/components/ui/button'
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { ImageIcon, Pencil, Trash2 } from 'lucide-react'
import type { Dish } from '@/lib/types'
import Image from 'next/image'

type DishTableProps = {
  dishes: Dish[]
  isLoading: boolean
  searchQuery: string
  onEdit: (dish: Dish) => void
  onDelete: (id: string) => void
  categoryNameById: (categoryId: string) => string
  formatVnd: (value: string) => string
}

export default function DishTable({
  dishes,
  isLoading,
  searchQuery,
  onEdit,
  onDelete,
  categoryNameById,
  formatVnd,
}: DishTableProps) {
  return (
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
          {dishes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-muted-foreground py-8 text-center">
                {isLoading
                  ? 'Đang tải món ăn...'
                  : searchQuery
                    ? 'Không có món nào phù hợp.'
                    : 'Chưa có món ăn. Hãy thêm món đầu tiên.'}
              </TableCell>
            </TableRow>
          ) : (
            dishes.map((dish) => (
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
                      onClick={() => onEdit(dish)}
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
                            Thao tác này không thể hoàn tác. Món "{dish.name}" sẽ bị xóa khỏi thực
                            đơn.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(dish.id)}
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
  )
}
