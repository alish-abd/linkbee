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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-primary-50">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-200 rounded-full text-sm font-medium text-primary-700 mb-6 shadow-sm">
                <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                <span>Создано с помощью ИИ</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight mb-6 leading-tight">
                Создайте профессиональную{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                    био-страницу
                  </span>
                  <svg className="absolute -bottom-2 left-0 w-full h-4 text-primary-200" fill="currentColor" viewBox="0 0 200 20">
                    <path d="M0,10 Q50,0 100,10 T200,10" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </span>
                {' '}за секунды
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Готовый мини-сайт для соцсетей — без дизайнеров, кода и долгого ожидания. 
                Просто опишите, чем занимаетесь, а ИИ сделает всё остальное.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
                <a
                  href="/auth/signup"
                  className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-500 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 hover:from-primary-700 hover:to-primary-600"
                >
                  <span>Создать бесплатно</span>
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-gray-700 bg-white/80 backdrop-blur-sm border-2 border-gray-300 rounded-xl hover:border-primary-500 hover:text-primary-600 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Узнать больше
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 justify-center lg:justify-start text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Бесплатно</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>За 30 секунд</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Без регистрации карты</span>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Preview */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                {/* Phone Mockup */}
                <div className="relative mx-auto w-full max-w-sm">
                  {/* Phone Frame */}
                  <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    <div className="bg-white rounded-[2.5rem] overflow-hidden">
                      {/* Phone Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-2xl z-20"></div>
                      
                      {/* Screen Content */}
                      <div className="pt-8 pb-4 px-4 bg-gradient-to-br from-primary-50 to-white min-h-[600px]">
                        {/* Profile Section */}
                        <div className="text-center mb-6">
                          <div className="w-24 h-24 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full mx-auto mb-4 shadow-lg flex items-center justify-center">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">Ваше Имя</h3>
                          <p className="text-sm text-gray-600 mb-4">Описание деятельности</p>
                        </div>

                        {/* Links Preview */}
                        <div className="space-y-3">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex-shrink-0"></div>
                                <div className="flex-1 min-w-0">
                                  <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
                                  <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                                </div>
                                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Social Icons */}
                        <div className="flex justify-center gap-4 mt-6">
                          {['instagram', 'tiktok', 'youtube'].map((social) => (
                            <div key={social} className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <div className="w-6 h-6 bg-gray-300 rounded"></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-primary-400 rounded-2xl shadow-lg transform rotate-12 animate-float opacity-90"></div>
                  <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-primary-300 rounded-full shadow-lg transform -rotate-12 animate-float animation-delay-2000 opacity-90"></div>
                </div>
              </div>
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



