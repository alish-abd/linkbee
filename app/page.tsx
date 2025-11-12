import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-primary-600">
              LinkBee
            </Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                Войти
              </Link>
              <Link
                href="/auth/signup"
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Регистрация
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight mb-6">
              Создайте профессиональную био-страницу за секунды, а не часы
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
              Готовый мини-сайт для соцсетей — без дизайнеров, кода и долгого ожидания. 
              Просто опишите, чем занимаетесь, а ИИ сделает всё остальное.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/auth/signup"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary-600 rounded-lg shadow-lg hover:bg-primary-700 transition-colors duration-200 transform hover:scale-105"
              >
                Создать бесплатно
              </a>
              <a
                href="#features"
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors duration-200"
              >
                Узнать больше
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Проблема</h2>
            <div className="space-y-3 text-gray-700 text-lg">
              <p>
                Создание био-страницы вручную отнимает часы: нужно выбирать шаблон, настраивать блоки, 
                верстать дизайн.
              </p>
              <p>
                Или платите дизайнеру и ждёте. А контент уже готов, но его некуда красиво разместить.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow-xl rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Решение</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Просто опишите, чем занимаетесь, и приложите ссылки с изображениями. 
              ИИ за несколько секунд соберёт современный мини-сайт: структуру, тексты, дизайн. 
              Получите готовую био-страницу для Instagram, TikTok и других соцсетей — 
              без ручной работы и ожидания.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Преимущества
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Экономия времени</h3>
                  <p className="text-gray-600">
                    Готовый результат за секунды вместо часов настройки
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Профессиональный вид</h3>
                  <p className="text-gray-600">
                    Дизайн и структура, которые привлекают подписчиков
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Без технических знаний</h3>
                  <p className="text-gray-600">
                    Просто опишите себя, всё остальное делает ИИ
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Адаптивный дизайн</h3>
                  <p className="text-gray-600">
                    Страница корректно отображается на всех устройствах
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-xl border border-primary-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Обновление за секунды</h3>
                  <p className="text-gray-600">
                    Добавляйте новые ссылки и контент — изменения применяются мгновенно
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Создайте свою био-страницу прямо сейчас
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Начните бесплатно — опишите свою деятельность, и получите готовый мини-сайт через 30 секунд.
          </p>
          <a
            href="/auth/signup"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-primary-600 bg-white rounded-lg shadow-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105"
          >
            Начать бесплатно
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold text-white mb-2">LinkBee</p>
            <p className="text-sm">© 2024 LinkBee. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}



