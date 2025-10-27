import type { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { dbConnect } from '@/lib/db/mongoose'
import { UserModel } from '@/lib/models/User'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/admin' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD

        if (credentials?.email && credentials?.password) {
          try {
            await dbConnect()
            const user = await UserModel.findOne({ email: credentials.email })
            if (
              user &&
              (await bcrypt.compare(credentials.password, user.passwordHash))
            ) {
              return {
                id: String(user._id),
                name: user.name,
                email: user.email,
                role: (user.role as any) || 'user',
              }
            }
          } catch {}
        }

        if (
          credentials?.email === adminEmail &&
          credentials?.password === adminPassword
        ) {
          return {
            id: 'admin',
            name: 'Admin',
            email: adminEmail,
            role: 'admin' as any,
          }
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as any).role || 'user'
      return token
    },
    async session({ session, token }) {
      ;(session as any).role = (token as any).role
      return session
    },
  },
}

// NextAuth v4 (App Router): handler is created in app/api/auth/[...nextauth]/route.ts
