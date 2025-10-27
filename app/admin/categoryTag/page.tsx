import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { AdminLogin } from '@/components/auth/AdminLogin'
import { SignOutButton } from '@/components/auth/SignOutButton'
import { AdminProviders } from '@/lib/rtk/Providers'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { AdminShell } from '@/components/admin/AdminShell'
import { SetAdminSection } from '@/components/admin/SetAdminSection'

export default async function AdminCategoryTagPage() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return (
      <main className="container py-12 max-w-md">
        <h1 className="font-heading text-2xl">Admin Login</h1>
        <AdminLogin />
      </main>
    )
  }

  return (
    <AdminProviders>
      <AdminShell>
        <main className="container py-6">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-2xl sm:text-3xl">
              Categories & Tags
            </h1>
            <SignOutButton />
          </div>
          <div className="mt-6">
            <SetAdminSection section="categories" />
            <AdminDashboard />
          </div>
        </main>
      </AdminShell>
    </AdminProviders>
  )
}
