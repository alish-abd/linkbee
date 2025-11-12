-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    username TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create bio_pages table
CREATE TABLE IF NOT EXISTS public.bio_pages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    theme JSONB DEFAULT '{"primaryColor": "#0ea5e9", "backgroundColor": "#ffffff", "textColor": "#1f2937", "fontFamily": "Inter"}'::jsonb,
    blocks JSONB DEFAULT '[]'::jsonb,
    is_published BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create links table
CREATE TABLE IF NOT EXISTS public.links (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bio_page_id UUID NOT NULL REFERENCES public.bio_pages(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    url TEXT NOT NULL,
    icon_url TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create images table
CREATE TABLE IF NOT EXISTS public.images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bio_page_id UUID NOT NULL REFERENCES public.bio_pages(id) ON DELETE CASCADE,
    storage_path TEXT NOT NULL,
    url TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('avatar', 'background', 'content')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_bio_pages_user_id ON public.bio_pages(user_id);
CREATE INDEX IF NOT EXISTS idx_bio_pages_slug ON public.bio_pages(slug);
CREATE INDEX IF NOT EXISTS idx_bio_pages_is_published ON public.bio_pages(is_published);
CREATE INDEX IF NOT EXISTS idx_links_bio_page_id ON public.links(bio_page_id);
CREATE INDEX IF NOT EXISTS idx_images_bio_page_id ON public.images(bio_page_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER set_updated_at_users
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_updated_at_bio_pages
    BEFORE UPDATE ON public.bio_pages
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();




