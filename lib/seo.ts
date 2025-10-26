import type { Metadata } from 'next'

export function articleMetadata({
  title,
  description,
  slug,
  image,
}: {
  title: string
  description: string
  slug: string
  image?: string
}): Metadata {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const full = `${url}/articles/${slug}`
  const images = image
    ? [{ url: image, width: 1200, height: 630, alt: title }]
    : []
  return {
    title,
    description,
    alternates: { canonical: full },
    openGraph: {
      type: 'article',
      url: full,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images as any,
    },
  }
}

export function articleJsonLd(p: {
  title: string
  description: string
  slug: string
  image?: string
  author: string
  datePublished: string
}) {
  const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: p.title,
    description: p.description,
    image: p.image ? [p.image] : [],
    author: [{ '@type': 'Person', name: p.author }],
    datePublished: p.datePublished,
    mainEntityOfPage: `${url}/articles/${p.slug}`,
  }
}
