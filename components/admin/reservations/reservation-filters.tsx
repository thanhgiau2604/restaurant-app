'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar, Filter, Search } from 'lucide-react'

type ReservationFiltersProps = {
  searchQuery: string
  filterDate: string
  filterStatus: string
  onSearchChange: (value: string) => void
  onDateChange: (value: string) => void
  onStatusChange: (value: string) => void
  onClearFilters: () => void
  showClear: boolean
}

export default function ReservationFilters({
  searchQuery,
  filterDate,
  filterStatus,
  onSearchChange,
  onDateChange,
  onStatusChange,
  onClearFilters,
  showClear,
}: ReservationFiltersProps) {
  return (
    <div className="flex flex-col gap-4 pt-4 md:flex-row">
      <div className="relative flex-1">
        <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
        <Input
          placeholder="Tìm theo tên hoặc số điện thoại..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="relative">
          <Calendar className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 h-4 w-4 -translate-y-1/2" />
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full pl-9 md:w-45"
          />
        </div>
        <Select value={filterStatus} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full shrink-0 md:max-w-50">
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
        {showClear && (
          <Button variant="outline" onClick={onClearFilters} size="sm">
            Xóa lọc
          </Button>
        )}
      </div>
    </div>
  )
}
