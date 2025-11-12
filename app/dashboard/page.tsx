import { requireAuth } from '@/app/lib/auth'
import { createClient } from '@/app/lib/supabase/server'
import Link from 'next/link'
import { createClient as createClientBrowser } from '@/app/lib/supabase/client'
import LogoutButton from '@/app/components/LogoutButton'

export default async function DashboardPage() {
  const user = await requireAuth()
  const supabase = await createClient()

  // Fetch user's bio pages
  const { data: bioPages, error } = await supabase
    .from('bio_pages')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bio pages:', error)
  }

  // Fetch user profile
  const { data: userProfile } = await supabase
    .from('users')
    .select('username, full_name')
    .eq('id', user.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Личный кабинет</h1>
            <p className="mt-2 text-gray-600">
              Добро пожаловать, {userProfile?.full_name || user.email}!
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/create"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Создать страницу
            </Link>
            <Link
              href="/dashboard/settings"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Настройки
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Bio Pages List */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Мои страницы</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {bioPages && bioPages.length > 0 ? (
              bioPages.map((page) => (
                <div
                  key={page.id}
                  className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{page.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {page.description || 'Без описания'}
                    </p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          page.is_published
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {page.is_published ? 'Опубликовано' : 'Черновик'}
                      </span>
                      <span className="text-xs text-gray-500">
                        Создано: {new Date(page.created_at).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {page.is_published && (
                      <a
                        href={`/${page.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 text-sm text-primary-600 hover:text-primary-700"
                      >
                        Просмотр
                      </a>
                    )}
                    <Link
                      href={`/dashboard/edit/${page.id}`}
                      className="px-3 py-1 text-sm text-gray-700 hover:text-gray-900"
                    >
                      Редактировать
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <p className="text-gray-500 mb-4">У вас пока нет созданных страниц</p>
                <Link
                  href="/create"
                  className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Создать первую страницу
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}




