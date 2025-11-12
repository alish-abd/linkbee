'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'

interface ImageUploadProps {
  onUpload: (file: File) => Promise<string>
  onRemove: (url: string) => void
  images: string[]
  maxImages?: number
  acceptedTypes?: string[]
}

export default function ImageUpload({
  onUpload,
  onRemove,
  images,
  maxImages = 10,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
}: ImageUploadProps) {
  const [uploading, setUploading] = useState<string | null>(null)

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (images.length >= maxImages) {
        alert(`Максимум ${maxImages} изображений`)
        return
      }

      for (const file of acceptedFiles.slice(0, maxImages - images.length)) {
        setUploading(file.name)
        try {
          await onUpload(file)
        } catch (error) {
          console.error('Upload error:', error)
          alert('Ошибка при загрузке изображения')
        } finally {
          setUploading(null)
        }
      }
    },
    [images.length, maxImages, onUpload]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedTypes.reduce((acc, type) => {
      acc[type] = []
      return acc
    }, {} as Record<string, string[]>),
    maxSize: 10 * 1024 * 1024, // 10MB
  })

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-primary-500 bg-primary-50'
            : 'border-gray-300 hover:border-primary-400'
        } ${images.length >= maxImages ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} disabled={images.length >= maxImages} />
        {uploading ? (
          <p className="text-gray-600">Загрузка {uploading}...</p>
        ) : isDragActive ? (
          <p className="text-primary-600">Отпустите файл здесь...</p>
        ) : (
          <div>
            <p className="text-gray-600">
              Перетащите изображения сюда или нажмите для выбора
            </p>
            <p className="text-sm text-gray-500 mt-2">
              JPEG, PNG, WebP, GIF (макс. 10MB)
            </p>
            <p className="text-sm text-gray-400 mt-1">
              {images.length} / {maxImages} изображений
            </p>
          </div>
        )}
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <img
                src={url}
                alt={`Upload ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                onClick={() => onRemove(url)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg
                  className="w-4 h-4"
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
        </div>
      )}
    </div>
  )
}




