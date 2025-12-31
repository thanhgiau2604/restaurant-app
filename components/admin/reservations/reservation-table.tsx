'use client'

import type React from 'react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
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
import { Calendar, Pencil, Phone, Trash2, Users } from 'lucide-react'
import type { Reservation } from '@/lib/types'
import type { ReservationEditForm } from '@/components/admin/reservations/types'

const statusColors = {
  processing: 'bg-yellow-500',
  accepted: 'bg-green-500',
  rejected: 'bg-red-500',
  occupied: 'bg-blue-500',
}

const statusLabels = {
  processing: 'Đang xử lý',
  accepted: 'Đã chấp nhận',
  rejected: 'Từ chối',
  occupied: 'Đang sử dụng',
}

type ReservationTableProps = {
  reservations: Reservation[]
  isLoading: boolean
  editingReservation: Reservation | null
  isDialogOpen: boolean
  formData: ReservationEditForm
  isSaving: boolean
  onEdit: (reservation: Reservation) => void
  onDialogOpenChange: (open: boolean) => void
  onFormDataChange: (next: ReservationEditForm) => void
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  onDelete: (id: string) => void
}

export default function ReservationTable({
  reservations,
  isLoading,
  editingReservation,
  isDialogOpen,
  formData,
  isSaving,
  onEdit,
  onDialogOpenChange,
  onFormDataChange,
  onSubmit,
  onDelete,
}: ReservationTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tên khách</TableHead>
            <TableHead>Điện thoại</TableHead>
            <TableHead>Ngày & giờ</TableHead>
            <TableHead>Số khách</TableHead>
            <TableHead>Bàn</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                {isLoading ? 'Đang tải đặt bàn...' : 'Không có thông tin.'}
              </TableCell>
            </TableRow>
          ) : (
            reservations.map((reservation) => (
              <TableRow key={reservation.id}>
                <TableCell className="font-medium">{reservation.name}</TableCell>
                <TableCell>
                  <div className="text-muted-foreground flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    {reservation.phone}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="text-muted-foreground h-3 w-3" />
                    {reservation.date} lúc {reservation.time}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Users className="text-muted-foreground h-3 w-3" />
                    {reservation.guests}
                  </div>
                </TableCell>
                <TableCell>
                  {reservation.tableNumber || (
                    <span className="text-muted-foreground text-sm">Chưa gán</span>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={`${statusColors[reservation.status]} text-white`}>
                    {statusLabels[reservation.status]}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog
                      open={isDialogOpen && editingReservation?.id === reservation.id}
                      onOpenChange={onDialogOpenChange}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onEdit(reservation)}
                          className="gap-1"
                        >
                          <Pencil className="h-3 w-3" />
                          Sửa
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <DialogHeader>
                          <DialogTitle>Cập nhật bàn</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={onSubmit} className="space-y-4">
                          <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                            <p className="text-sm">
                              <span className="font-semibold">Khách:</span> {reservation.name}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Ngày:</span> {reservation.date} lúc{' '}
                              {reservation.time}
                            </p>
                            <p className="text-sm">
                              <span className="font-semibold">Số khách:</span> {reservation.guests}{' '}
                              người
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="status">Trạng thái</Label>
                            <Select
                              value={formData.status}
                              onValueChange={(value) =>
                                onFormDataChange({
                                  ...formData,
                                  status: value as Reservation['status'],
                                })
                              }
                              required
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn trạng thái" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="processing">Đang xử lý</SelectItem>
                                <SelectItem value="accepted">Đã chấp nhận</SelectItem>
                                <SelectItem value="rejected">Từ chối</SelectItem>
                                <SelectItem value="occupied">Đang sử dụng</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="tableNumber">Số bàn (tùy chọn)</Label>
                            <Input
                              id="tableNumber"
                              value={formData.tableNumber}
                              onChange={(e) =>
                                onFormDataChange({ ...formData, tableNumber: e.target.value })
                              }
                              placeholder="vd: A12, B5, C3"
                            />
                          </div>
                          <div className="flex gap-2 pt-4">
                            <Button
                              type="submit"
                              className="from-primary to-secondary flex-1 bg-linear-to-r text-white"
                              disabled={isSaving}
                            >
                              {isSaving ? 'Đang lưu...' : 'Cập nhật đặt bàn'}
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => onDialogOpenChange(false)}
                            >
                              Đóng
                            </Button>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
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
                            Thao tác này không thể hoàn tác. Đặt bàn của "{reservation.name}" vào
                            ngày {reservation.date} lúc {reservation.time} sẽ bị xóa.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onDelete(reservation.id)}
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
