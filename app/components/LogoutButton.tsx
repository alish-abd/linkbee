'use client'

import { createClient } from '@/app/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/auth/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 transition-colors"
    >
      Выйти
    </button>
  )
}




