import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'CỔNG THÔNG TIN - APEC GLOBAL | PORTAL CHÍNH THỨC',
  description: 'CỔNG THÔNG TIN CHÍNH THỨC CỦA TẬP ĐOÀN, CUNG CẤP THÔNG TIN DÀNH CHO NHÂN VIÊN, KHÁCH HÀNG VÀ CÁC ĐỐI TÁC KINH DOANH',
  keywords: 'TẬP ĐOÀN, THÔNG TIN, NHÂN VIÊN, KHÁCH HÀNG, CỔNG THÔNG TIN',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`font-sans antialiased`}>
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
