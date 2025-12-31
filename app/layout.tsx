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

function RestaurantJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: SITE_NAME,
    url: SITE_URL,
    image: [OG_IMAGE],
    description:
      'Không gian hầm rượu ấm cúng với món ăn hấp dẫn và thức uống tuyển chọn – phù hợp cho giao lưu và tiệc tùng.',
    servesCuisine: ['Ẩm thực', 'Rượu', 'Món Việt'], // TODO: sửa theo thực tế
    telephone: '0848662244', // TODO
    email: 'contact@nhahangmocson.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '8-10-12 Đường số 3, KDC Bến Lức, Phường 7, Quận 8',
      addressLocality: 'TP. Hồ Chí Minh',
      addressRegion: 'Hồ Chí Minh',
      postalCode: '752426',
      addressCountry: 'VN',
    },
    // Nếu có tọa độ, Google rất thích
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.6958397,
      longitude: 106.6093528,
    },
    openingHours: ['Mo-Su 09:30-23:00'],
    sameAs: [
      // TODO: thêm link social nếu có
      // "https://www.facebook.com/...",
      // "https://www.instagram.com/...",
    ],
    // Có thể khai báo nhận đặt bàn / menu
    acceptsReservations: true,
    menu: `${SITE_URL}/#menu`, // TODO nếu có trang menu
  }

  return (
    <script
      type="application/ld+json"
      // Next.js yêu cầu stringify
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <head>
        <RestaurantJsonLd />
      </head>
      <body className={`antialiased ${_googleSans.className}`}>
        <FirebaseAnalytics />
        {children}
        <Analytics />
        <Toaster richColors />
      </body>
    </html>
  )
}
