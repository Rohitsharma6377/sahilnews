import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ user: null })
  return NextResponse.json({
    user: {
      name: session.user?.name,
      email: session.user?.email,
      role: (session as any).role,
    },
  })
}
