'use client'

interface Theme {
  primaryColor: string
  backgroundColor: string
  textColor: string
  fontFamily: string
}

interface ThemeSelectorProps {
  theme: Theme
  onChange: (theme: Theme) => void
}

const predefinedThemes: Theme[] = [
  {
    primaryColor: '#0ea5e9',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'Inter',
  },
  {
    primaryColor: '#8b5cf6',
    backgroundColor: '#f9fafb',
    textColor: '#111827',
    fontFamily: 'Inter',
  },
  {
    primaryColor: '#ec4899',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'Inter',
  },
  {
    primaryColor: '#10b981',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    fontFamily: 'Inter',
  },
  {
    primaryColor: '#f59e0b',
    backgroundColor: '#fffbeb',
    textColor: '#1f2937',
    fontFamily: 'Inter',
  },
]

export default function ThemeSelector({ theme, onChange }: ThemeSelectorProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Выберите тему</h3>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {predefinedThemes.map((predefinedTheme, index) => (
          <button
            key={index}
            onClick={() => onChange(predefinedTheme)}
            className={`p-4 rounded-lg border-2 transition-all ${
              JSON.stringify(theme) === JSON.stringify(predefinedTheme)
                ? 'border-primary-600 ring-2 ring-primary-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{
              backgroundColor: predefinedTheme.backgroundColor,
            }}
          >
            <div
              className="w-full h-16 rounded mb-2"
              style={{ backgroundColor: predefinedTheme.primaryColor }}
            ></div>
            <div className="text-xs text-gray-600">Тема {index + 1}</div>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Основной цвет
          </label>
          <input
            type="color"
            value={theme.primaryColor}
            onChange={(e) =>
              onChange({ ...theme, primaryColor: e.target.value })
            }
            className="w-full h-10 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цвет фона
          </label>
          <input
            type="color"
            value={theme.backgroundColor}
            onChange={(e) =>
              onChange({ ...theme, backgroundColor: e.target.value })
            }
            className="w-full h-10 rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Цвет текста
          </label>
          <input
            type="color"
            value={theme.textColor}
            onChange={(e) => onChange({ ...theme, textColor: e.target.value })}
            className="w-full h-10 rounded border border-gray-300"
          />
        </div>
      </div>
    </div>
  )
}




