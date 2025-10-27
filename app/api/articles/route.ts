import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { ArticleModel } from '@/lib/models/Article'
import { z } from 'zod'
import { requireAdmin } from '@/lib/api/session'

export async function GET(req: Request) {
  await dbConnect()
  const { searchParams } = new URL(req.url)
  const q = searchParams.get('q') || ''
  const cat = searchParams.get('category') || undefined
  const tag = searchParams.get('tag') || undefined
  const where: any = {}
  if (q) where.$text = { $search: q }
  if (cat) where.category = cat
  if (tag) where.tags = tag
  const list = await ArticleModel.find(where)
    .sort({ createdAt: -1 })
    .limit(50)
    .lean()
  return NextResponse.json(list)
}

const schema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  shortDescription: z.string().optional(),
  longDescriptionHtml: z.string().optional(),
  content: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  featuredImg: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z.string().min(1),
  tags: z.array(z.string()).default([]),
  authorName: z.string().min(1),
  authorAvatar: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  videoId: z.string().optional(),
  videoUrl: z.string().optional(),
})

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await dbConnect()
  const doc = await ArticleModel.create(parsed.data)
  return NextResponse.json(doc)
}
