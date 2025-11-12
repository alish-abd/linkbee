'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface SettingsFormProps {
  userId: string
  initialData: {
    username: string
    full_name: string
    avatar_url: string
    email: string
  }
}

export default function SettingsForm({ userId, initialData }: SettingsFormProps) {
  const router = useRouter()
  const [username, setUsername] = useState(initialData.username)
  const [fullName, setFullName] = useState(initialData.full_name)
  const [avatarUrl, setAvatarUrl] = useState(initialData.avatar_url)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSaving(true)

    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          full_name: fullName,
          avatar_url: avatarUrl,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update profile')
      }

      router.refresh()
      alert('Профиль обновлен успешно')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={initialData.email}
          disabled
          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
        />
        <p className="mt-1 text-sm text-gray-500">Email нельзя изменить</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Имя пользователя (username)
        </label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
        <p className="mt-1 text-sm text-gray-500">
          Используется в URL ваших страниц: /{username}
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Полное имя
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL аватара
        </label>
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="https://example.com/avatar.jpg"
        />
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt="Avatar preview"
            className="mt-2 w-16 h-16 rounded-full object-cover"
          />
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Сохранение...' : 'Сохранить'}
        </button>
      </div>
    </form>
  )
}




