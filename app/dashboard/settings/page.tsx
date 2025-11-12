import { requireAuth } from '@/app/lib/auth'
import { createClient } from '@/app/lib/supabase/server'
import SettingsForm from '@/app/components/SettingsForm'

export default async function SettingsPage() {
  const user = await requireAuth()
  const supabase = await createClient()

  const { data: userProfile } = await supabase
    .from('users')
    .select('username, full_name, avatar_url')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Настройки профиля</h1>
          <p className="mt-2 text-gray-600">
            Управляйте вашим профилем и настройками аккаунта
          </p>
        </div>

        <SettingsForm
          userId={user.id}
          initialData={{
            username: userProfile?.username || '',
            full_name: userProfile?.full_name || '',
            avatar_url: userProfile?.avatar_url || '',
            email: user.email || '',
          }}
        />
      </div>
    </div>
  )
}




