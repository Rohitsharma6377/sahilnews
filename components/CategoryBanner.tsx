'use client'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export type BannerItem = {
  slug: string
  title: string
  featuredImage?: { url?: string }
  /** Optional YouTube video ID for video slides */
  videoId?: string
  /** Optional MP4 video URL for video slides */
  videoUrl?: string
}

export function CategoryBanner({
  items,
  title,
}: {
  items: BannerItem[]
  title: string
}) {
  const slides = useMemo(() => items.slice(0, 5), [items])
  const [i, setI] = useState(0)
  useEffect(() => {
    if (!slides.length) return
    const id = setInterval(() => setI((x) => (x + 1) % slides.length), 3500)
    return () => clearInterval(id)
  }, [slides.length])

  if (!slides.length) return null
  const cur = slides[i]
  const isVideo = !!(cur.videoId || cur.videoUrl)

  return (
    <section className="mt-6">
      <div className="relative overflow-hidden rounded-2xl">
        {/* smoky blurred background */}
        {cur.featuredImage?.url && !isVideo && (
          <div className="absolute inset-0 -z-10">
            <Image
              src={cur.featuredImage.url}
              alt=""
              fill
              className="object-cover blur-3xl opacity-50"
            />
          </div>
        )}
        <div className="relative">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={cur.slug}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.45 }}
              className="relative aspect-[16/9] md:aspect-[16/6] w-full overflow-hidden"
            >
              {isVideo ? (
                cur.videoId ? (
                  <iframe
                    className="h-full w-full"
                    src={`https://www.youtube.com/embed/${cur.videoId}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&modestbranding=1&loop=1&playlist=${cur.videoId}`}
                    title={cur.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                ) : cur.videoUrl ? (
                  <video
                    className="h-full w-full object-cover"
                    src={cur.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : null
              ) : cur.featuredImage?.url ? (
                <Image
                  src={cur.featuredImage.url}
                  alt={cur.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-sky-200 to-orange-200" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="mb-2 text-xs uppercase tracking-wide text-white/80">
                  {title}
                </div>
                <h3 className="max-w-3xl font-heading text-2xl md:text-3xl text-white drop-shadow">
                  <Link
                    href={`/articles/${cur.slug}`}
                    className="hover:text-base-accent"
                  >
                    {cur.title}
                  </Link>
                </h3>
              </div>
            </motion.div>
          </AnimatePresence>
          {/* dots */}
          <div className="absolute inset-x-0 bottom-2 flex justify-center gap-2 px-2 overflow-hidden">
            {slides.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 w-4 md:w-6 rounded-full ${idx === i ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
