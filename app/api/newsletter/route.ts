import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { SubscriberModel } from '@/lib/models/Subscriber'
import { requireAdmin } from '@/lib/api/session'

export async function GET() {
  const admin = await requireAdmin()
  if (!admin)
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  await dbConnect()
  const list = await SubscriberModel.find({}).sort({ createdAt: -1 }).lean()
  return NextResponse.json(list)
}
