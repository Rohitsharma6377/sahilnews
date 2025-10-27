import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function getSession() {
  const session = await getServerSession(authOptions)
  return session as any
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions)
  if (!session || (session as any).role !== 'admin') return null
  return session
}
