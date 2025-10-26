import './globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { Analytics } from '@/lib/analytics'
import { TopBar } from '@/components/TopBar'
import { BottomBar } from '@/components/BottomBar'

export const metadata: Metadata = {
  title: {
    default: 'SahilNews — Modern News & Blogs',
    template: '%s | SahilNews',
  },
  description:
    'A modern, performant news & blogs platform built with Next.js, Tailwind, and Prisma.',
  metadataBase: new URL('http://localhost:3000'),
  keywords: ['news', 'technology', 'business', 'world', 'SahilNews', 'blogs'],
  openGraph: {
    type: 'website',
    siteName: 'SahilNews',
    title: 'SahilNews — Modern News & Blogs',
    description:
      'A modern, performant news & blogs platform built with Next.js, Tailwind, and Prisma.',
    url: 'http://localhost:3000',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SahilNews — Modern News & Blogs',
    description:
      'A modern, performant news & blogs platform built with Next.js, Tailwind, and Prisma.',
    creator: '@sahilnews',
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
          'min-h-screen bg-base-bg text-base-fg antialiased pb-16',
          'selection:bg-base-accent/20 selection:text-base-fg'
        )}
      >
        {/* Site-wide top bar with ticker and video */}
        <TopBar />
        {children}
        <Analytics />
        {/* fixed bottom bar */}
        <BottomBar />
      </body>
    </html>
  )
}
