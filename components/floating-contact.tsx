'use client'

import { Phone } from 'lucide-react'
import { BASIC_INFO } from '@/constants'
import ZaloIcon from '@/assets/zalo.webp'

const phoneDigits = BASIC_INFO.phone.replace(/\D/g, '')
const telLink = phoneDigits ? `tel:${phoneDigits}` : `tel:${BASIC_INFO.phone}`
const zaloLink = phoneDigits ? `https://zalo.me/${phoneDigits}` : 'https://zalo.me/'

export default function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col gap-4">
      <div className="relative">
        <span className="bg-secondary/40 animation-duration-[2.4s] absolute inset-0 animate-ping rounded-full opacity-75" />
        <a
          href={telLink}
          className="bg-secondary text-secondary-foreground hover:shadow-secondary/40 relative flex h-12 w-12 items-center justify-center rounded-full border border-white/30 shadow-lg transition-transform duration-200 hover:scale-105"
          aria-label="Call phone"
        >
          <Phone className="h-6 w-6" />
        </a>
      </div>
      <div className="relative">
        <a
          href={zaloLink}
          target="_blank"
          rel="noreferrer"
          className="bg-secondary text-secondary-foreground hover:shadow-secondary/40 relative flex h-12 w-12 items-center justify-center rounded-full border border-white/30 shadow-lg transition-transform duration-200 hover:scale-105"
          aria-label="Chat on Zalo"
        >
          <img src={ZaloIcon.src} alt="Zalo" className="h-6 w-6" />
        </a>
      </div>
    </div>
  )
}
