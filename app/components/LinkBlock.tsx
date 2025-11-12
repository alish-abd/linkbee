'use client'

interface Link {
  id?: string
  title: string
  url: string
  icon_url?: string | null
  order?: number
}

interface LinkBlockProps {
  links: Link[]
  theme?: {
    primaryColor?: string
    backgroundColor?: string
    textColor?: string
  }
}

export default function LinkBlock({ links, theme }: LinkBlockProps) {
  const primaryColor = theme?.primaryColor || '#0ea5e9'
  const backgroundColor = theme?.backgroundColor || '#ffffff'
  const textColor = theme?.textColor || '#1f2937'

  const sortedLinks = [...links].sort((a, b) => (a.order || 0) - (b.order || 0))

  return (
    <div className="space-y-3">
      {sortedLinks.map((link, index) => (
        <a
          key={link.id || index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
          style={{
            backgroundColor,
            borderColor: primaryColor,
            color: textColor,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {link.icon_url && (
                <img
                  src={link.icon_url}
                  alt={link.title}
                  className="w-8 h-8 rounded flex-shrink-0"
                />
              )}
              <span className="font-medium truncate">{link.title}</span>
            </div>
            <svg
              className="w-5 h-5 flex-shrink-0 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </a>
      ))}
    </div>
  )
}




