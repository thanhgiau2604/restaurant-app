'use client'

import type React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export type ReservationFormState = {
  name: string
  guests: string
  phone: string
  date: string
  time: string
}

export type ReservationErrors = Record<string, string>

type ReservationsSectionProps = {
  form: ReservationFormState
  errors: ReservationErrors
  isSubmitting: boolean
  onChange: (field: keyof ReservationFormState, value: string) => void
  onSubmit: (event: React.FormEvent) => void
}

export default function ReservationsSection({
  form,
  errors,
  isSubmitting,
  onChange,
  onSubmit,
}: ReservationsSectionProps) {
  return (
    <section id="reservations" className="bg-white py-20">
      <div className="container mx-auto max-w-2xl px-4">
        <div className="animate-in fade-in slide-in-from-bottom mb-12 text-center duration-700">
          <h2 className="mb-4 text-4xl font-bold text-rose-700 md:text-5xl">Đặt Bàn</h2>
          <p className="text-muted-foreground text-lg">
            Đặt bàn ngay và sẵn sàng cho một trải nghiệm ẩm thực tuyệt vời
          </p>
        </div>

        <Card className="animate-in fade-in slide-in-from-bottom border-none shadow-2xl shadow-rose-100 delay-200 duration-700">
          <CardContent className="p-8">
            <form className="space-y-6" onSubmit={onSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Tên của bạn</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => onChange('name', e.target.value)}
                  className="h-12"
                  aria-invalid={Boolean(errors.name)}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="guests">Số lượng khách tham gia</Label>
                  <Input
                    id="guests"
                    type="number"
                    min="1"
                    max="20"
                    placeholder="2"
                    value={form.guests}
                    onChange={(e) => onChange('guests', e.target.value)}
                    className="h-12"
                    aria-invalid={Boolean(errors.guests)}
                  />
                  {errors.guests && <p className="text-sm text-red-500">{errors.guests}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Số điện thoại của bạn"
                    value={form.phone}
                    onChange={(e) => onChange('phone', e.target.value)}
                    className="h-12"
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="date">Ngày</Label>
                  <Input
                    id="date"
                    type="date"
                    value={form.date}
                    onChange={(e) => onChange('date', e.target.value)}
                    className="h-12"
                    aria-invalid={Boolean(errors.date)}
                  />
                  {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Giờ</Label>
                  <Input
                    id="time"
                    type="time"
                    value={form.time}
                    onChange={(e) => onChange('time', e.target.value)}
                    className="h-12"
                    aria-invalid={Boolean(errors.time)}
                  />
                  {errors.time && <p className="text-sm text-red-500">{errors.time}</p>}
                </div>
              </div>

              <Button
                type="submit"
                variant="default"
                disabled={isSubmitting}
                className="h-12 w-full bg-rose-800/80 font-semibold text-white transition-opacity hover:bg-rose-800/80 hover:text-white hover:opacity-90"
              >
                {isSubmitting ? 'Đang gửi...' : 'Xác nhận Đặt bàn'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
