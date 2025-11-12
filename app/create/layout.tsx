import { requireAuth } from '@/app/lib/auth'

export default async function CreateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await requireAuth()
  return <>{children}</>
}




