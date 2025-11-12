# Инструкция по настройке Supabase

## 1. Создание проекта

1. Перейдите на [supabase.com](https://supabase.com)
2. Войдите или зарегистрируйтесь
3. Создайте новый проект
4. Запишите:
   - Project URL (например, `https://xxxxx.supabase.co`)
   - Anon key (публичный ключ)
   - Service role key (приватный ключ, храните в секрете!)

## 2. Применение миграций

### Миграция 001: Создание таблиц

1. В Supabase Dashboard перейдите в **SQL Editor**
2. Создайте новый запрос
3. Скопируйте содержимое файла `supabase/migrations/001_initial_schema.sql`
4. Выполните запрос

### Миграция 002: Настройка RLS политик

1. В SQL Editor создайте новый запрос
2. Скопируйте содержимое файла `supabase/migrations/002_rls_policies.sql`
3. Выполните запрос

## 3. Создание Storage Bucket

1. В Supabase Dashboard перейдите в **Storage**
2. Нажмите **New bucket**
3. Название: `bio-images`
4. Выберите **Public bucket** (публичный доступ)
5. Нажмите **Create bucket**

### Настройка политик Storage

В SQL Editor выполните следующие запросы:

```sql
-- Политика для загрузки файлов (только авторизованные пользователи)
CREATE POLICY "Users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'bio-images');

-- Политика для чтения файлов (публичный доступ)
CREATE POLICY "Anyone can view images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'bio-images');

-- Политика для удаления файлов (только владелец)
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'bio-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Политика для обновления файлов (только владелец)
CREATE POLICY "Users can update own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'bio-images' 
  AND auth.uid()::text = (storage.foldername(name))[1]
);
```

## 4. Настройка переменных окружения

Создайте файл `.env.local` в корне проекта:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
OPENAI_API_KEY=your-openai-api-key
```

### Где найти ключи:

- **NEXT_PUBLIC_SUPABASE_URL**: Project Settings → API → Project URL
- **NEXT_PUBLIC_SUPABASE_ANON_KEY**: Project Settings → API → anon public key
- **SUPABASE_SERVICE_ROLE_KEY**: Project Settings → API → service_role key (секретный!)
- **OPENAI_API_KEY**: [OpenAI Platform](https://platform.openai.com/api-keys) → Create new secret key

## 5. Проверка настройки

1. Запустите dev сервер: `npm run dev`
2. Перейдите на http://localhost:3000
3. Зарегистрируйтесь
4. Создайте первую био-страницу

## 6. Troubleshooting

### Ошибка при регистрации

- Убедитесь, что миграции применены корректно
- Проверьте, что функция `handle_new_user()` создана
- Проверьте логи в Supabase Dashboard → Logs → Postgres Logs

### Ошибка при загрузке изображений

- Убедитесь, что bucket `bio-images` создан
- Проверьте политики Storage
- Убедитесь, что bucket публичный

### Ошибка при генерации с ИИ

- Проверьте, что OPENAI_API_KEY установлен
- Убедитесь, что у вас есть доступ к GPT-4 API
- Проверьте баланс на OpenAI аккаунте

## 7. Дополнительные настройки

### Настройка email аутентификации

1. В Supabase Dashboard перейдите в **Authentication → Settings**
2. Настройте SMTP (опционально)
3. Настройте email templates (опционально)

### Настройка OAuth провайдеров

1. В Supabase Dashboard перейдите в **Authentication → Providers**
2. Включите нужные провайдеры (Google, GitHub, etc.)
3. Добавьте Client ID и Client Secret

### Настройка домена

1. В Supabase Dashboard перейдите в **Authentication → URL Configuration**
2. Добавьте ваш домен в **Redirect URLs**
3. Обновите **Site URL**




