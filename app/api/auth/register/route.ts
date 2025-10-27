import { NextResponse } from 'next/server'
import { dbConnect } from '@/lib/db/mongoose'
import { UserModel } from '@/lib/models/User'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function POST(req: Request) {
  const body = await req.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success)
    return NextResponse.json({ error: 'invalid' }, { status: 400 })
  const { name, email, password } = parsed.data
  await dbConnect()
  const existing = await UserModel.findOne({ email })
  if (existing) return NextResponse.json({ error: 'exists' }, { status: 409 })
  const passwordHash = await bcrypt.hash(password, 10)
  const doc = await UserModel.create({
    name,
    email,
    passwordHash,
    role: 'user',
  })
  return NextResponse.json({
    id: String(doc._id),
    email: doc.email,
    role: doc.role,
  })
}
