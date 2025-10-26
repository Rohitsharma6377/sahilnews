import { dbConnect } from '@/lib/db/mongoose'
import { ArticleModel } from '@/lib/models/Article'
import { sampleArticles } from '@/lib/data'

function mapDoc(d: any) {
  if (!d) return null
  return {
    id: String(d._id),
    title: d.title,
    slug: d.slug,
    excerpt: d.excerpt || '',
    content: d.content || '',
    category: d.category || 'general',
    tags: Array.isArray(d.tags) ? d.tags : [],
    author: {
      id: 'na',
      name: d.authorName || 'Unknown',
      avatar: d.authorAvatar || undefined,
    },
    featured: !!d.featured,
    featuredImage: d.featuredImg ? { url: d.featuredImg } : undefined,
    publishedAt: (d.createdAt || new Date()).toISOString(),
    readingTime: '',
  }
}

export async function dbGetFeatured() {
  try {
    await dbConnect()
    const docs = await ArticleModel.find({ featured: true })
      .sort({ createdAt: -1 })
      .limit(6)
      .lean()
    return docs.map(mapDoc).filter(Boolean) as any
  } catch {
    return sampleArticles.filter((a) => a.featured).slice(0, 6)
  }
}

export async function dbGetLatest() {
  try {
    await dbConnect()
    const docs = await ArticleModel.find({})
      .sort({ createdAt: -1 })
      .limit(12)
      .lean()
    return docs.map(mapDoc).filter(Boolean) as any
  } catch {
    return sampleArticles.slice(0, 12)
  }
}

export async function dbGetBySlug(slug: string) {
  try {
    await dbConnect()
    const doc = await ArticleModel.findOne({ slug }).lean()
    return mapDoc(doc) as any
  } catch {
    return sampleArticles.find((a) => a.slug === slug) || null
  }
}

export async function dbGetByCategory(slug: string) {
  try {
    await dbConnect()
    const docs = await ArticleModel.find({ category: slug })
      .sort({ createdAt: -1 })
      .lean()
    return docs.map(mapDoc).filter(Boolean) as any
  } catch {
    return sampleArticles.filter((a) => a.category === slug)
  }
}

export async function dbGetByAuthor(name: string) {
  try {
    await dbConnect()
    const docs = await ArticleModel.find({ authorName: name })
      .sort({ createdAt: -1 })
      .lean()
    return docs.map(mapDoc).filter(Boolean) as any
  } catch {
    return sampleArticles.filter(
      (a) => a.author.name.toLowerCase() === name.toLowerCase()
    )
  }
}

export async function dbSearch(q: string) {
  try {
    await dbConnect()
    const regex = new RegExp(q, 'i')
    const docs = await ArticleModel.find({
      $or: [
        { title: regex },
        { excerpt: regex },
        { content: regex },
        { tags: regex },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean()
    return docs.map(mapDoc).filter(Boolean) as any
  } catch {
    const qq = q.toLowerCase()
    return sampleArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(qq) ||
        a.excerpt.toLowerCase().includes(qq)
    )
  }
}
