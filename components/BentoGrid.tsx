import { cn } from '@/lib/utils'

import Link from 'next/link'
import Image from 'next/image'
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from '@tabler/icons-react'

const BentoGridRoot = ({
  className,
  children,
}: {
  className?: string
  children?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
}: {
  className?: string
  title?: string | React.ReactNode
  description?: string | React.ReactNode
  header?: React.ReactNode
  icon?: React.ReactNode
}) => {
  return (
    <div
      className={cn(
        'group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none',
        className
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        {icon}
        <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
        <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  )
}

type ArticleLite = {
  slug: string
  title: string
  excerpt?: string
  category?: string
  author?: { name?: string }
  readingTime?: string
  featuredImage?: { url?: string }
}

export function BentoGrid({ articles }: { articles: ArticleLite[] }) {
  const iconSet = [
    IconClipboardCopy,
    IconFileBroken,
    IconSignature,
    IconTableColumn,
    IconArrowWaveRightUp,
    IconBoxAlignTopLeft,
    IconBoxAlignRightFilled,
  ]

  return (
    <section className="container mt-10">
      <BentoGridRoot>
        {articles.map((a, i) => {
          const IconComp = iconSet[i % iconSet.length]
          const header = (
            <div className="relative flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100">
              {a.featuredImage?.url ? (
                <Image
                  src={a.featuredImage.url}
                  alt={a.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : null}
            </div>
          )

          return (
            <BentoGridItem
              key={a.slug}
              title={<Link href={`/articles/${a.slug}`}>{a.title}</Link>}
              description={
                a.excerpt ||
                `${a.category || 'Article'}${a.readingTime ? ` · ${a.readingTime}` : ''}`
              }
              header={header}
              icon={<IconComp className="h-4 w-4 text-neutral-500" />}
              className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
            />
          )
        })}
      </BentoGridRoot>
    </section>
  )
}
