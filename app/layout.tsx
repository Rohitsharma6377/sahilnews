import './globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { Analytics } from '@/lib/analytics'
import { BottomBar } from '@/components/BottomBar'

export const metadata: Metadata = {
  title: {
    default: 'FlashNews — Modern News & Blogs',
    template: '%s | FlashNews',
  },
  description:
    'A modern, performant news & blogs platform built with Next.js, Tailwind, and Prisma.',
  metadataBase: new URL('http://localhost:3000'),
  keywords: ['news', 'technology', 'business', 'world', 'FlashNews', 'blogs'],
  openGraph: {
    type: 'website',
    siteName: 'FlashNews',
    title: 'FlashNews — Modern News & Blogs',
    description:
      'A modern, performant news & blogs platform built with Next.js, Tailwind, and Prisma.',
    url: 'http://localhost:3000',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FlashNews — Modern News & Blogs',
    description:
      'A modern, performant news & blogs platform built with Next.js, Tailwind, and Prisma.',
    creator: '@FlashNews',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={clsx(
          'min-h-screen bg-base-bg text-base-fg antialiased pb-16 overflow-x-hidden',
          'selection:bg-base-accent/20 selection:text-base-fg'
        )}
      >
        {children}
        <Analytics />
        {/* fixed bottom bar */}
        <BottomBar />
      </body>
    </html>
  )
}
