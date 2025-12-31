'use client'

import type React from 'react'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type Reservation } from '@/lib/types'
import { useRestaurantStore } from '@/stores/restaurant-store'
import { toast } from 'sonner'
import ReservationFilters from '@/components/admin/reservations/reservation-filters'
import ReservationTable from '@/components/admin/reservations/reservation-table'
import type { ReservationEditForm } from '@/components/admin/reservations/types'

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

  const [formData, setFormData] = useState<ReservationEditForm>({
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

  const handleDialogOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
      return
    }
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
    <Card className="border-none bg-white/40">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Quản lý đặt bàn</CardTitle>
        <ReservationFilters
          searchQuery={searchQuery}
          filterDate={filterDate}
          filterStatus={filterStatus}
          onSearchChange={setSearchQuery}
          onDateChange={setFilterDate}
          onStatusChange={setFilterStatus}
          onClearFilters={handleClearFilters}
          showClear={Boolean(searchQuery || filterDate || filterStatus !== 'all')}
        />
      </CardHeader>
      <CardContent>
        <ReservationTable
          reservations={filteredReservations}
          isLoading={isLoadingReservations}
          editingReservation={editingReservation}
          isDialogOpen={isDialogOpen}
          formData={formData}
          isSaving={isSaving}
          onEdit={handleEdit}
          onDialogOpenChange={handleDialogOpenChange}
          onFormDataChange={setFormData}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </CardContent>
    </Card>
  )
}
