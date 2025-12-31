'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
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
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Calendar, Users, Phone, Search, Filter } from 'lucide-react'
import { type Reservation } from '@/lib/types'
import { useRestaurantStore } from '@/stores/restaurant-store'
import { toast } from 'sonner'

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

export function ReservationManagement() {
  const reservations = useRestaurantStore((state) => state.reservations)
  const isLoadingReservations = useRestaurantStore((state) => state.isLoadingReservations)
  const reservationsError = useRestaurantStore((state) => state.reservationsError)
  const loadReservations = useRestaurantStore((state) => state.loadReservations)
  const updateReservation = useRestaurantStore((state) => state.updateReservation)
  const deleteReservation = useRestaurantStore((state) => state.deleteReservation)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingReservation, setEditingReservation] = useState<Reservation | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('')
  const [filterDate, setFilterDate] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const [formData, setFormData] = useState({
    status: '',
    tableNumber: '',
  })

  useEffect(() => {
    loadReservations()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchQuery])

  useEffect(() => {
    if (reservationsError) {
      toast.error('Lỗi đặt bàn', {
        description: reservationsError,
      })
    }
  }, [reservationsError])

  const filteredReservations = reservations.filter((reservation) => {
    // Search by name or phone
    const matchesSearch =
      debouncedSearchQuery === '' ||
      reservation.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      reservation.phone.includes(debouncedSearchQuery)

    // Filter by date
    const matchesDate = filterDate === '' || reservation.date === filterDate

    // Filter by status
    const matchesStatus = filterStatus === 'all' || reservation.status === filterStatus

    return matchesSearch && matchesDate && matchesStatus
  })

  const handleClearFilters = () => {
    setSearchQuery('')
    setFilterDate('')
    setFilterStatus('all')
  }

  const handleEdit = (reservation: Reservation) => {
    setEditingReservation(reservation)
    setFormData({
      status: reservation.status,
      tableNumber: reservation.tableNumber || '',
    })
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.status) {
      toast.error('Vui lòng chọn trạng thái trước khi lưu.')
      return
    }
    setIsSaving(true)

    try {
      if (editingReservation) {
        await updateReservation(editingReservation.id, {
          status: formData.status as Reservation['status'],
          tableNumber: formData.tableNumber || undefined,
        })
        toast.success('Cập nhật bàn thành công')
        resetForm()
      }
    } catch (error) {
      toast.error('Không thể cập nhật bàn', {
        description: 'Vui lòng thử lại.',
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteReservation(id)
      toast.success('Xóa bàn thành công')
    } catch (error) {
      toast.error('Không thể xóa bàn', {
        description: 'Vui lòng thử lại.',
      })
    }
  }

  const resetForm = () => {
    setFormData({ status: '', tableNumber: '' })
    setEditingReservation(null)
    setIsDialogOpen(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quản lý đặt bàn</CardTitle>
        <div className="flex flex-col gap-4 pt-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <Input
              placeholder="Tìm theo tên hoặc số điện thoại..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Calendar className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
              <Input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="w-45 pl-9"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-35">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="processing">Đang xử lý</SelectItem>
                <SelectItem value="accepted">Đã chấp nhận</SelectItem>
                <SelectItem value="rejected">Từ chối</SelectItem>
                <SelectItem value="occupied">Đang sử dụng</SelectItem>
              </SelectContent>
            </Select>
            {(searchQuery || filterDate || filterStatus !== 'all') && (
              <Button variant="outline" onClick={handleClearFilters} size="sm">
                Xóa lọc
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
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
              {filteredReservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-muted-foreground py-8 text-center">
                    {isLoadingReservations ? 'Đang tải đặt bàn...' : 'Không có thông tin.'}
                  </TableCell>
                </TableRow>
              ) : (
                filteredReservations.map((reservation) => (
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
                        {reservation.date} at {reservation.time}
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
                          onOpenChange={(open) => {
                            if (!open) resetForm()
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(reservation)}
                              className="gap-1"
                            >
                              <Pencil className="h-3 w-3" />
                              Sửa
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Cập nhật đặt bàn</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                              <div className="bg-muted/50 space-y-3 rounded-lg p-4">
                                <p className="text-sm">
                                  <span className="font-semibold">Khách:</span> {reservation.name}
                                </p>
                                <p className="text-sm">
                                  <span className="font-semibold">Ngày:</span> {reservation.date}{' '}
                                  lúc {reservation.time}
                                </p>
                                <p className="text-sm">
                                  <span className="font-semibold">Số khách:</span>{' '}
                                  {reservation.guests} người
                                </p>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="status">Trạng thái</Label>
                                <Select
                                  value={formData.status}
                                  onValueChange={(value) =>
                                    setFormData({ ...formData, status: value })
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
                                    setFormData({ ...formData, tableNumber: e.target.value })
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
                                <Button type="button" variant="outline" onClick={resetForm}>
                                  Hủy
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
                                Thao tác này không thể hoàn tác. Đặt bàn của "{reservation.name}"
                                vào ngày {reservation.date} lúc {reservation.time} sẽ bị xóa.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Hủy</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(reservation.id)}
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
