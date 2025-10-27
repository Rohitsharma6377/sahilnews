import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { CategoryModel } from '@/lib/models/Category'
import { z } from 'zod'
import { requireAdmin } from '@/lib/api/session'
import { slugify } from '@/lib/utils'

export async function GET() {
  await dbConnect()
  const list = await CategoryModel.find({}).sort({ name: 1 }).lean()
  return NextResponse.json(list)
}

const createSchema = z.object({
  name: z.string().min(1),
  slug: z.string().optional(),
  description: z.string().optional(),
})

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const { name, slug, description } = parsed.data
  await dbConnect()
  const doc = await CategoryModel.create({
    name,
    slug: slug || slugify(name),
    description: description || '',
  })
  return NextResponse.json(doc)
}
