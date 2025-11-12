-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bio_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.images ENABLE ROW LEVEL SECURITY;

-- Users policies
-- Users can read their own profile
CREATE POLICY "Users can read own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

-- Users can insert their own profile
CREATE POLICY "Users can insert own profile"
    ON public.users FOR INSERT
    WITH CHECK (auth.uid() = id);

-- Anyone can read published bio pages
CREATE POLICY "Anyone can read published bio pages"
    ON public.bio_pages FOR SELECT
    USING (is_published = true);

-- Users can read their own bio pages (published or not)
CREATE POLICY "Users can read own bio pages"
    ON public.bio_pages FOR SELECT
    USING (auth.uid() = user_id);

-- Users can insert their own bio pages
CREATE POLICY "Users can insert own bio pages"
    ON public.bio_pages FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Users can update their own bio pages
CREATE POLICY "Users can update own bio pages"
    ON public.bio_pages FOR UPDATE
    USING (auth.uid() = user_id);

-- Users can delete their own bio pages
CREATE POLICY "Users can delete own bio pages"
    ON public.bio_pages FOR DELETE
    USING (auth.uid() = user_id);

-- Links policies
-- Anyone can read links of published bio pages
CREATE POLICY "Anyone can read links of published pages"
    ON public.links FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.bio_pages
            WHERE bio_pages.id = links.bio_page_id
            AND bio_pages.is_published = true
        )
    );

-- Users can manage links of their own bio pages
CREATE POLICY "Users can manage own links"
    ON public.links FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.bio_pages
            WHERE bio_pages.id = links.bio_page_id
            AND bio_pages.user_id = auth.uid()
        )
    );

-- Images policies
-- Anyone can read images of published bio pages
CREATE POLICY "Anyone can read images of published pages"
    ON public.images FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.bio_pages
            WHERE bio_pages.id = images.bio_page_id
            AND bio_pages.is_published = true
        )
    );

-- Users can manage images of their own bio pages
CREATE POLICY "Users can manage own images"
    ON public.images FOR ALL
    USING (
        EXISTS (
            SELECT 1 FROM public.bio_pages
            WHERE bio_pages.id = images.bio_page_id
            AND bio_pages.user_id = auth.uid()
        )
    );

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    username_text TEXT;
BEGIN
    -- Generate username from email (before @) or use id
    username_text := LOWER(SPLIT_PART(NEW.email, '@', 1));
    
    -- Ensure username is unique
    IF EXISTS (SELECT 1 FROM public.users WHERE username = username_text) THEN
        username_text := username_text || '_' || SUBSTRING(NEW.id::text, 1, 8);
    END IF;
    
    INSERT INTO public.users (id, username, full_name)
    VALUES (NEW.id, username_text, COALESCE(NEW.raw_user_meta_data->>'full_name', ''));
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();




