'use client'

import { Clock, MapPin, Phone } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BASIC_INFO } from '@/constants'

export default function LocationSection() {
  return (
    <section
      id="location"
      className="from-secondary/5 via-secondary/10 to-primary/20 bg-linear-to-br py-20"
    >
      <div className="container mx-auto px-4">
        <div className="animate-in fade-in slide-in-from-bottom mb-12 text-center duration-700">
          <h2 className="text-secondary mb-4 text-4xl font-bold md:text-5xl">Vị Trí Quán</h2>
          <p className="text-muted-foreground text-lg">
            Hãy đến và trải nghiệm hương vị tại địa điểm của chúng tôi
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
          <Card className="animate-in fade-in slide-in-from-left shadow-xl duration-700">
            <CardContent className="h-full p-0">
              <iframe
                src={BASIC_INFO.map}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              />
            </CardContent>
          </Card>

          <Card className="animate-in fade-in slide-in-from-right shadow-xl duration-700">
            <CardContent className="space-y-6 p-8">
              <div className="flex items-start gap-4">
                <div className="from-secondary/50 via-secondary to-primary rounded-lg bg-linear-to-br p-3 shadow-lg">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-secondary mb-1 text-lg font-semibold">Địa chỉ</h3>
                  <p className="text-muted-foreground leading-relaxed">{BASIC_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="from-secondary/50 via-secondary to-primary rounded-lg bg-linear-to-br p-3 shadow-lg">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-secondary mb-1 text-lg font-semibold">Số điện thoại</h3>
                  <p className="text-muted-foreground">{BASIC_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="from-secondary/50 via-secondary to-primary rounded-lg bg-linear-to-br p-3 shadow-lg">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-secondary mb-1 text-lg font-semibold">Giờ hoạt động</h3>
                  <div className="text-muted-foreground">
                    <div className="flex justify-between gap-2">
                      <span>Thứ 2 - Chủ nhật:</span>
                      <span className="font-medium">{BASIC_INFO.business_hours.weekdays}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
