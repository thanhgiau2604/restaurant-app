import type { Reservation } from '@/lib/types'

export type ReservationEditForm = {
  status: Reservation['status'] | ''
  tableNumber: string
}
