import { NextResponse, type NextRequest } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { dbConnect } from '@/lib/db/mongoose'
import { MediaAssetModel } from '@/lib/models/MediaAsset'
import { requireAdmin } from '@/lib/api/session'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ public_id: string }> }
) {
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { public_id } = await params
  const pid = public_id
  try {
    await dbConnect()
    await cloudinary.uploader.destroy(pid, { resource_type: 'image' })
    await MediaAssetModel.deleteOne({ public_id: pid })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'delete_failed' }, { status: 500 })
  }
}
