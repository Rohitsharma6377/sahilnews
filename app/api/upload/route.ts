import { NextResponse } from 'next/server'
import { v2 as cloudinary } from 'cloudinary'
import { requireAdmin } from '@/lib/api/session'
import { dbConnect } from '@/lib/db/mongoose'
import { MediaAssetModel } from '@/lib/models/MediaAsset'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: Request) {
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const ct = req.headers.get('content-type') || ''
  if (ct.includes('application/json')) {
    const body = await req.json().catch(() => null)
    const url = body?.url as string | undefined
    if (!url) return NextResponse.json({ error: 'invalid' }, { status: 400 })
    const res = await cloudinary.uploader.upload(url, {
      folder: 'sahilnews',
      resource_type: 'auto',
    })
    await dbConnect()
    await MediaAssetModel.updateOne(
      { public_id: res.public_id },
      {
        $set: {
          url: res.secure_url,
          public_id: res.public_id,
          resource_type: res.resource_type,
          format: res.format,
          bytes: res.bytes,
          width: (res as any).width,
          height: (res as any).height,
          folder: (res as any).folder || 'sahilnews',
        },
      },
      { upsert: true }
    )
    return NextResponse.json({ url: res.secure_url, public_id: res.public_id })
  }
  if (ct.includes('multipart/form-data')) {
    const form = await req.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'invalid' }, { status: 400 })
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const res = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'sahilnews', resource_type: 'auto' },
        (err, result) => {
          if (err) reject(err)
          else resolve(result)
        }
      )
      stream.end(buffer)
    })
    await dbConnect()
    await MediaAssetModel.updateOne(
      { public_id: res.public_id },
      {
        $set: {
          url: res.secure_url,
          public_id: res.public_id,
          resource_type: res.resource_type,
          format: res.format,
          bytes: res.bytes,
          width: (res as any).width,
          height: (res as any).height,
          folder: (res as any).folder || 'sahilnews',
        },
      },
      { upsert: true }
    )
    return NextResponse.json({ url: res.secure_url, public_id: res.public_id })
  }
  return NextResponse.json({ error: 'unsupported' }, { status: 400 })
}
