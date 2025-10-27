import { NextResponse, type NextRequest } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { TagModel } from '@/lib/models/Tag'
import { z } from 'zod'
import { requireAdmin } from '@/lib/api/session'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  await dbConnect()
  const doc = await TagModel.findOne({ slug }).lean()
  if (!doc) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  return NextResponse.json(doc)
}

const updateSchema = z.object({ name: z.string().optional() })

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const body = await req.json().catch(() => null)
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await dbConnect()
  const doc = await TagModel.findOneAndUpdate({ slug }, parsed.data, {
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
  await TagModel.deleteOne({ slug })
  return NextResponse.json({ ok: true })
}
