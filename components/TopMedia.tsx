'use client'
import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Thumb = { slug: string; title: string; featuredImage?: { url?: string } }

export function TopMedia({
  videos = ['dQw4w9WgXcQ', 'aqz-KE-bpKQ', 'ysz5S6PUM-U'],
  thumbs = [],
  showVideo = true,
}: {
  videos?: string[]
  thumbs?: Thumb[]
  showVideo?: boolean
}) {
  const vids = useMemo(
    () => (videos.length ? videos : ['dQw4w9WgXcQ']),
    [videos]
  )
  const [v, setV] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setV((x) => (x + 1) % vids.length), 10000)
    return () => clearInterval(id)
  }, [vids.length])

  const doubled = [...thumbs, ...thumbs]

  return (
    <div className="flex items-center gap-3">
      {showVideo && (
        <div className="hidden md:block">
          <div className="overflow-hidden rounded-md shadow-sm">
            <iframe
              title="Top video"
              width="200"
              height="112"
              src={`https://www.youtube.com/embed/${vids[v]}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${vids[v]}`}
              allow="autoplay; encrypted-media; picture-in-picture"
            />
          </div>
        </div>
      )}
      {thumbs.length > 0 && (
        <div className="relative hidden lg:block flex-1 overflow-hidden">
          <div className="thumb-ticker inline-flex items-center">
            {doubled.map((a, i) => (
              <Link
                key={`${a.slug}-${i}`}
                href={`/articles/${a.slug}`}
                className="mr-3 inline-flex items-center gap-2"
              >
                <div className="relative h-6 w-10 overflow-hidden rounded">
                  {a.featuredImage?.url ? (
                    <Image
                      src={a.featuredImage.url}
                      alt={a.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-slate-200" />
                  )}
                </div>
                <span className="text-[11px] text-slate-700 hover:text-emerald-700 line-clamp-1 max-w-[180px]">
                  {a.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
