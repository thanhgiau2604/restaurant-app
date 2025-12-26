import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import FirebaseAnalytics from '@/components/firebase-analytics'


const _googleSans = Inter({ subsets: ["vietnamese"] })

export const metadata: Metadata = {
  title: "Flavor House - Exceptional Dining Experience",
  description:
    "Experience culinary excellence at Flavor House. Fresh ingredients, bold flavors, and unforgettable moments. Reserve your table today!",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
