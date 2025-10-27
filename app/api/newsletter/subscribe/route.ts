import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { SubscriberModel } from '@/lib/models/Subscriber'
import { z } from 'zod'

const schema = z.object({ email: z.string().email() })

export async function POST(req: Request) {
  const ct = req.headers.get('content-type') || ''
  let email: string | null = null
  if (ct.includes('application/json')) {
    const body = await req.json().catch(() => null)
    const parsed = schema.safeParse(body)
    if (parsed.success) email = parsed.data.email
  } else {
    const form = await req.formData().catch(() => null)
    const e = form?.get('email')
    if (typeof e === 'string') email = e
  }
  if (!email) return NextResponse.json({ error: 'invalid' }, { status: 400 })
  await dbConnect()
  await SubscriberModel.updateOne(
    { email },
    { $set: { email } },
    { upsert: true }
  )
  return NextResponse.json({ ok: true })
}
