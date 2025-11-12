'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'
import BioPagePreview from '@/app/components/BioPagePreview'
import ThemeSelector from '@/app/components/ThemeSelector'

interface BioPage {
  id: string
  title: string
  description: string
  slug: string
  theme: {
    primaryColor: string
    backgroundColor: string
    textColor: string
    fontFamily: string
  }
  blocks: any[]
  is_published: boolean
  links: Array<{
    id: string
    title: string
    url: string
    icon_url: string | null
    order: number
  }>
  images: Array<{
    id: string
    url: string
    storage_path: string
    type: string
  }>
}

export default function EditBioPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [bioPage, setBioPage] = useState<BioPage | null>(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [slug, setSlug] = useState('')
  const [theme, setTheme] = useState({
    primaryColor: '#0ea5e9',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'Inter',
  })
  const [blocks, setBlocks] = useState<any[]>([])
  const [links, setLinks] = useState<Array<{ id?: string; title: string; url: string; icon_url?: string | null; order?: number }>>([])
  const [images, setImages] = useState<Array<{ url: string; storage_path: string; type: string }>>([])
  const [isPublished, setIsPublished] = useState(false)
  const [newLink, setNewLink] = useState({ title: '', url: '' })

  useEffect(() => {
    fetchBioPage()
  }, [id])

  const fetchBioPage = async () => {
    try {
      const response = await fetch(`/api/bio-pages/${id}`)
      if (!response.ok) {
        throw new Error('Failed to fetch bio page')
      }
      const data = await response.json()
      setBioPage(data)
      setTitle(data.title)
      setDescription(data.description || '')
      setSlug(data.slug)
      setTheme(data.theme || theme)
      setBlocks(data.blocks || [])
      setLinks(data.links || [])
      setImages(data.images || [])
      setIsPublished(data.is_published || false)
    } catch (error) {
      console.error('Error fetching bio page:', error)
      router.push('/dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file: File): Promise<string> => {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || 'Upload failed')
    }

    const data = await response.json()
    const imageType: 'avatar' | 'background' | 'content' =
      images.length === 0 ? 'avatar' : images.length === 1 ? 'background' : 'content'

    setImages([
      ...images,
      {
        url: data.url,
        storage_path: data.path,
        type: imageType,
      },
    ])

    return data.url
  }

  const handleImageRemove = (url: string) => {
    setImages(images.filter((img) => img.url !== url))
  }

  const handleAddLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { ...newLink, icon_url: null, order: links.length }])
      setNewLink({ title: '', url: '' })
    }
  }

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/bio-pages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          slug,
          theme,
          blocks,
          links: links.map((link, index) => ({
            ...link,
            order: index,
          })),
          images,
          is_published: isPublished,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Save failed')
      }

      router.push('/dashboard')
    } catch (error: any) {
      console.error('Save error:', error)
      alert(error.message || 'Ошибка при сохранении страницы')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Редактировать страницу</h1>
            <p className="mt-2 text-gray-600">Внесите изменения и сохраните</p>
          </div>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isPublished}
                onChange={(e) => setIsPublished(e.target.checked)}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">Опубликовано</span>
            </label>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Заголовок
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Описание
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                URL (slug)
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="my-bio-page"
              />
              <p className="mt-1 text-sm text-gray-500">
                URL будет: /{slug}
              </p>
            </div>

            {/* Theme */}
            <div>
              <ThemeSelector theme={theme} onChange={setTheme} />
            </div>

            {/* Links */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Ссылки
              </label>
              <div className="space-y-2">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {link.title}
                      </div>
                      <div className="text-xs text-gray-500 truncate">{link.url}</div>
                    </div>
                    <button
                      onClick={() => handleRemoveLink(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Название ссылки"
                    value={newLink.title}
                    onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <input
                    type="url"
                    placeholder="URL"
                    value={newLink.url}
                    onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddLink}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm"
                  >
                    Добавить
                  </button>
                </div>
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Изображения
              </label>
              <ImageUpload
                onUpload={handleImageUpload}
                onRemove={handleImageRemove}
                images={images.map((img) => img.url)}
                maxImages={10}
              />
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-8 lg:h-screen lg:overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Предпросмотр
              </h2>
              <BioPagePreview
                title={title}
                description={description}
                blocks={blocks}
                theme={theme}
                links={links}
                images={images}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




