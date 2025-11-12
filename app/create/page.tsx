'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/app/components/ImageUpload'
import BioPagePreview from '@/app/components/BioPagePreview'

interface Link {
  title: string
  url: string
  icon_url?: string | null
}

interface Image {
  url: string
  storage_path: string
  type: 'avatar' | 'background' | 'content'
}


export default function CreatePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [images, setImages] = useState<Image[]>([])
  const [links, setLinks] = useState<Link[]>([])
  const [generatedData, setGeneratedData] = useState<any>(null)
  const [newLink, setNewLink] = useState({ title: '', url: '' })

  const [description, setDescription] = useState('')

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
      setLinks([...links, { ...newLink, icon_url: null }])
      setNewLink({ title: '', url: '' })
    }
  }

  const handleRemoveLink = (index: number) => {
    setLinks(links.filter((_, i) => i !== index))
  }

  const handleGenerate = async () => {
    if (!description.trim()) {
      alert('Пожалуйста, опишите вашу деятельность')
      return
    }

    setGenerating(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description,
          links,
          images,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Generation failed')
      }

      const data = await response.json()
      setGeneratedData(data)
    } catch (error: any) {
      console.error('Generation error:', error)
      alert(error.message || 'Ошибка при генерации страницы')
    } finally {
      setGenerating(false)
    }
  }

  const handleSave = async () => {
    if (!generatedData) {
      alert('Сначала сгенерируйте страницу')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/bio-pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: generatedData.title,
          description: generatedData.description,
          theme: generatedData.theme,
          blocks: generatedData.blocks,
          links: links.map((link, index) => ({
            ...link,
            order: index,
          })),
          images: images,
          is_published: false,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Save failed')
      }

      const bioPage = await response.json()
      router.push(`/dashboard/edit/${bioPage.id}`)
    } catch (error: any) {
      console.error('Save error:', error)
      alert(error.message || 'Ошибка при сохранении страницы')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Создать био-страницу</h1>
          <p className="mt-2 text-gray-600">
            Опишите вашу деятельность, добавьте ссылки и изображения, и ИИ создаст
            красивую страницу за секунды
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Опишите вашу деятельность *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Например: Я дизайнер, создаю логотипы и брендинг для стартапов. Также веду блог о дизайне и провожу онлайн-курсы."
              />
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

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={generating || !description.trim()}
              className="w-full py-3 px-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {generating ? 'Генерация...' : 'Создать с ИИ'}
            </button>

            {/* Save Button */}
            {generatedData && (
              <button
                onClick={handleSave}
                disabled={loading}
                className="w-full py-3 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? 'Сохранение...' : 'Сохранить страницу'}
              </button>
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="lg:sticky lg:top-8 lg:h-screen lg:overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Предпросмотр
              </h2>
              {generatedData ? (
                <BioPagePreview
                  title={generatedData.title}
                  description={generatedData.description}
                  blocks={generatedData.blocks}
                  theme={generatedData.theme}
                  links={links}
                  images={images}
                />
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center text-gray-500">
                  <p>Предпросмотр появится после генерации</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

