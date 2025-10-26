import './globals.css'
import type { Metadata } from 'next'
import clsx from 'clsx'
import { Analytics } from '@/lib/analytics'
import { TopBar } from '@/components/TopBar'

export const metadata: Metadata = {
  title: {
    default: 'SahilNews — Modern News & Blogs',
    template: '%s | SahilNews',
  },
  description:
    'A modern, performant news & blogs platform built with Next.js, Tailwind, and Prisma.',
  metadataBase: new URL('http://localhost:3000'),
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
          'min-h-screen bg-base-bg text-base-fg antialiased',
          'selection:bg-base-accent/20 selection:text-base-fg'
        )}
      >
        {/* Site-wide top bar with ticker and video */}
        <TopBar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
