'use client'

import LinkBlock from './LinkBlock'

interface Block {
  type: string
  content: any
}

interface BioPagePreviewProps {
  title: string
  description?: string
  blocks: Block[]
  theme?: {
    primaryColor?: string
    backgroundColor?: string
    textColor?: string
    fontFamily?: string
  }
  links?: Array<{
    id?: string
    title: string
    url: string
    icon_url?: string | null
    order?: number
  }>
  images?: Array<{
    url: string
    type: string
  }>
}

export default function BioPagePreview({
  title,
  description,
  blocks,
  theme,
  links = [],
  images = [],
}: BioPagePreviewProps) {
  const primaryColor = theme?.primaryColor || '#0ea5e9'
  const backgroundColor = theme?.backgroundColor || '#ffffff'
  const textColor = theme?.textColor || '#1f2937'
  const fontFamily = theme?.fontFamily || 'Inter'

  const avatarImage = images.find((img) => img.type === 'avatar')
  const backgroundImage = images.find((img) => img.type === 'background')
  const contentImages = images.filter((img) => img.type === 'content')

  return (
    <div
      className="min-h-screen rounded-lg border-2 border-gray-200 overflow-hidden"
      style={{
        backgroundColor,
        color: textColor,
        fontFamily,
      }}
    >
      {/* Background Image */}
      {backgroundImage && (
        <div
          className="h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: `url(${backgroundImage.url})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>
      )}

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Avatar */}
        {avatarImage && (
          <div className="flex justify-center -mt-16 mb-4">
            <img
              src={avatarImage.url}
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
              style={{ borderColor: backgroundColor }}
            />
          </div>
        )}

        {/* Title */}
        <h1
          className="text-3xl font-bold text-center mb-4"
          style={{ color: textColor }}
        >
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p
            className="text-center text-gray-600 mb-8"
            style={{ color: textColor, opacity: 0.8 }}
          >
            {description}
          </p>
        )}

        {/* Content Images */}
        {contentImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {contentImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Content ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        {/* Blocks */}
        <div className="space-y-6">
          {blocks.map((block, index) => (
            <div key={index}>
              {block.type === 'hero' && (
                <div className="text-center py-8">
                  <h2
                    className="text-2xl font-bold mb-4"
                    style={{ color: primaryColor }}
                  >
                    {block.content?.title || ''}
                  </h2>
                  <p className="text-gray-700">{block.content?.text || ''}</p>
                </div>
              )}

              {block.type === 'about' && (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h2
                    className="text-xl font-semibold mb-3"
                    style={{ color: primaryColor }}
                  >
                    {block.content?.title || 'О себе'}
                  </h2>
                  <p className="text-gray-700">{block.content?.text || ''}</p>
                </div>
              )}

              {block.type === 'links' && (
                <div>
                  <h2
                    className="text-xl font-semibold mb-4 text-center"
                    style={{ color: primaryColor }}
                  >
                    {block.content?.title || 'Мои ссылки'}
                  </h2>
                  <LinkBlock links={links} theme={theme} />
                </div>
              )}

              {block.type === 'contact' && (
                <div className="text-center py-6">
                  <h2
                    className="text-xl font-semibold mb-4"
                    style={{ color: primaryColor }}
                  >
                    {block.content?.title || 'Свяжитесь со мной'}
                  </h2>
                  <p className="text-gray-700">{block.content?.text || ''}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}




