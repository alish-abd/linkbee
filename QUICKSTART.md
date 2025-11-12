# Quick Start Guide

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка Supabase

1. Создайте проект на [supabase.com](https://supabase.com)
2. Примените миграции из `supabase/migrations/`
3. Создайте Storage bucket `bio-images` (публичный)
4. Настройте политики Storage (см. `SUPABASE_SETUP.md`)

### 3. Настройка переменных окружения

Создайте `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
```

### 4. Запуск

```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Основные маршруты

- `/` - Главная страница (лендинг)
- `/auth/login` - Вход
- `/auth/signup` - Регистрация
- `/create` - Создание био-страницы (требуется авторизация)
- `/dashboard` - Личный кабинет (требуется авторизация)
- `/dashboard/edit/[id]` - Редактирование страницы
- `/dashboard/settings` - Настройки профиля
- `/[slug]` - Публичная био-страница

## Структура проекта

- `app/` - Next.js App Router
- `app/api/` - API routes
- `app/components/` - React компоненты
- `app/auth/` - Страницы аутентификации
- `app/create/` - Создание страницы
- `app/dashboard/` - Личный кабинет
- `supabase/migrations/` - SQL миграции

## Следующие шаги

1. Настройте Supabase (см. `SUPABASE_SETUP.md`)
2. Получите API ключ OpenAI
3. Зарегистрируйтесь и создайте первую страницу
4. Опубликуйте страницу и поделитесь ссылкой

## Troubleshooting

### Ошибка при регистрации

- Проверьте, что миграции применены
- Убедитесь, что функция `handle_new_user()` создана

### Ошибка при загрузке изображений

- Проверьте, что bucket `bio-images` создан
- Убедитесь, что политики Storage настроены

### Ошибка при генерации с ИИ

- Проверьте, что `OPENAI_API_KEY` установлен
- Убедитесь, что у вас есть доступ к GPT-4 API




