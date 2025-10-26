import { MetadataRoute } from 'next'
import { sampleArticles } from '@/lib/data'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const items: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      priority: 1,
      changeFrequency: 'daily' as const,
      lastModified: new Date(),
    },
    ...sampleArticles.map((a) => ({
      url: `${base}/articles/${a.slug}`,
      priority: 0.8,
      changeFrequency: 'daily' as const,
      lastModified: new Date(a.publishedAt),
    })),
  ]
  return items
}
