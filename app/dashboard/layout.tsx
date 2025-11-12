import { requireAuth } from '@/app/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  return <>{children}</>
}




