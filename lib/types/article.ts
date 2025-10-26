export type Article = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  tags: string[]
  author: { id: string; name: string; avatar?: string }
  featured: boolean
  featuredImage?: { url: string }
  publishedAt: string
  readingTime: string
}
