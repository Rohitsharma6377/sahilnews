import readingTime from 'reading-time'

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

const demoImages: Record<string, string> = {
  technology:
    'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1400&auto=format&fit=crop',
  world:
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=1400&auto=format&fit=crop',
  business:
    'https://images.unsplash.com/photo-1554224155-3a589877462f?q=80&w=1400&auto=format&fit=crop',
  sports:
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1400&auto=format&fit=crop',
  science:
    'https://images.unsplash.com/photo-1531346878377-a5be20888e57?q=80&w=1400&auto=format&fit=crop',
  entertainment:
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1400&auto=format&fit=crop',
}

const authors = [
  { id: 'author-alex', name: 'Alex Doe' },
  { id: 'author-sam', name: 'Sam Lee' },
  { id: 'author-rin', name: 'Rin Patel' },
  { id: 'author-mia', name: 'Mia Chen' },
]

const categories = [
  'technology',
  'world',
  'business',
  'sports',
  'science',
  'entertainment',
] as const

function make(p: Partial<Article> & Pick<Article, 'title' | 'slug'>): Article {
  const content =
    p.content ||
    `${p.title}. This is a sample article body with enough words to compute reading time. `.repeat(
      8
    )
  return {
    id: p.id || p.slug,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt || content.slice(0, 160),
    content,
    category: p.category || 'technology',
    tags: p.tags || ['news', p.category || 'tech'],
    author: p.author || authors[Math.abs(hashCode(p.slug)) % authors.length],
    featured: p.featured ?? false,
    featuredImage: p.featuredImage || {
      url: demoImages[p.category || 'technology'],
    },
    publishedAt: p.publishedAt || new Date().toISOString(),
    readingTime: readingTime(content).text,
  }
}

function hashCode(s: string) {
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  }
  return h
}

function buildArticles(): Article[] {
  const list: Article[] = []
  let index = 0
  for (const cat of categories) {
    for (let i = 1; i <= 6; i++) {
      const slug = `${cat}-story-${i}`
      const title = `${cat[0].toUpperCase()}${cat.slice(1)} Highlight #${i}`
      const featured = i === 1 // first of each category featured (6 featured total)
      const publishedAt = new Date(
        Date.now() - index * 1000 * 60 * 60 * 8
      ).toISOString()
      list.push(
        make({
          title,
          slug,
          category: cat,
          tags: [
            cat,
            i % 2 === 0 ? 'analysis' : 'breaking',
            i % 3 === 0 ? 'opinion' : 'update',
          ],
          featured,
          publishedAt,
        })
      )
      index++
    }
  }
  // Add a few special tech posts
  list.unshift(
    make({
      title: 'Introducing SahilNews',
      slug: 'introducing-SahilNews',
      category: 'technology',
      featured: true,
    }),
    make({
      title: 'Next.js 15 and Turbopack',
      slug: 'nextjs-15-and-turbopack',
      category: 'technology',
      featured: true,
    })
  )
  return list
}

export const sampleArticles: Article[] = buildArticles()

export function getFeatured() {
  return sampleArticles.filter((a) => a.featured).slice(0, 6)
}
export function getLatest() {
  return [...sampleArticles]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 12)
}
export function getBySlug(slug: string) {
  return sampleArticles.find((a) => a.slug === slug)
}
export function getByCategory(category: string) {
  return sampleArticles.filter((a) => a.category === category)
}
export function getByAuthor(name: string) {
  return sampleArticles.filter((a) => a.author.name === name)
}
