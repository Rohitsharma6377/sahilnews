import { NextResponse, type NextRequest } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { ArticleModel } from '@/lib/models/Article'
import { z } from 'zod'
import { requireAdmin } from '@/lib/api/session'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  await dbConnect()
  const doc = await ArticleModel.findOne({ slug }).lean()
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json(doc)
}

const schema = z.object({
  title: z.string().optional(),
  excerpt: z.string().optional(),
  shortDescription: z.string().optional(),
  longDescriptionHtml: z.string().optional(),
  content: z.string().optional(),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  featuredImg: z.string().optional(),
  images: z.array(z.string()).optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  authorName: z.string().optional(),
  authorAvatar: z.string().optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  videoId: z.string().optional(),
  videoUrl: z.string().optional(),
})

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await dbConnect()
  const doc = await ArticleModel.findOneAndUpdate({ slug }, parsed.data, {
    new: true,
  })
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json(doc)
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await dbConnect()
  await ArticleModel.deleteOne({ slug })
  return NextResponse.json({ ok: true })
}
