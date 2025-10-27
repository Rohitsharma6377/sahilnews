import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { MediaAssetModel } from '@/lib/models/MediaAsset'
import { requireAdmin } from '@/lib/api/session'

export async function GET(req: Request) {
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { searchParams } = new URL(req.url)
  const page = Math.max(1, Number(searchParams.get('page') || '1'))
  const limit = Math.min(
    100,
    Math.max(1, Number(searchParams.get('limit') || '24'))
  )
  const folder = searchParams.get('folder') || undefined
  const where: any = {}
  if (folder) where.folder = folder
  await dbConnect()
  const [items, total] = await Promise.all([
    MediaAssetModel.find(where)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    MediaAssetModel.countDocuments(where),
  ])
  return NextResponse.json({ items, total, page, limit })
}
