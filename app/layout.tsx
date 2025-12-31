import type React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import FirebaseAnalytics from '@/components/firebase-analytics'

const SITE_NAME = 'Nhà hàng Mộc Sơn'
const SITE_URL = 'https://nhahangmocson.com'
const OG_IMAGE = `${SITE_URL}/main-logo.png`
const TW_IMAGE = OG_IMAGE

const _googleSans = Inter({ subsets: ['vietnamese'] })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Hầm rượu & Ẩm thực cho tiệc tùng và giao lưu`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    'Nhà hàng Mộc Sơn mang đến không gian hầm rượu ấm cúng, món ăn hấp dẫn và thức uống tuyển chọn. Điểm hẹn lý tưởng cho giao lưu, tiệc tùng và những buổi gặp gỡ đáng nhớ.',
  keywords: [
    'Nhà hàng',
    'Nhà hàng Mộc Sơn',
    'hầm rượu',
    'bia',
    'ẩm thực',
    'tiệc tùng',
    'giao lưu',
    'nhà hàng',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: 'vi_VN',
    title: `${SITE_NAME} | Không gian hầm rượu cho giao lưu & tiệc tùng`,
    description:
      'Trải nghiệm ẩm thực và thức uống trong không gian hầm rượu ấm cúng. Phù hợp cho tiệc tùng, gặp gỡ và những khoảnh khắc đáng nhớ tại Nhà hàng Mộc Sơn.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Hầm rượu & Ẩm thực`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Hầm rượu & Ẩm thực`,
    description:
      'Không gian hầm rượu ấm cúng với món ăn và thức uống tuyển chọn – lý tưởng cho giao lưu và tiệc tùng.',
    images: [TW_IMAGE],
  },

  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`antialiased ${_googleSans.className}`}>
        <FirebaseAnalytics />
        {children}
        <Analytics />
        <Toaster richColors />
      </body>
    </html>
  )
}
