import { createClient } from '@/app/lib/supabase/server'
import { notFound } from 'next/navigation'
import BioPagePreview from '@/app/components/BioPagePreview'

export default async function PublicBioPage({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()
  const { slug } = params

  // Fetch bio page by slug
  const { data: bioPage, error } = await supabase
    .from('bio_pages')
    .select(`
      *,
      links (*),
      images (*),
      users (username, full_name, avatar_url)
    `)
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !bioPage) {
    notFound()
  }

  // Transform data for BioPagePreview
  const blocks = (bioPage.blocks as any[]) || []
  const links = (bioPage.links || []).map((link: any) => ({
    id: link.id,
    title: link.title,
    url: link.url,
    icon_url: link.icon_url,
    order: link.order,
  }))
  const images = (bioPage.images || []).map((image: any) => ({
    url: image.url,
    type: image.type,
  }))

  return (
    <main className="min-h-screen">
      <BioPagePreview
        title={bioPage.title}
        description={bioPage.description || ''}
        blocks={blocks}
        theme={bioPage.theme as any}
        links={links}
        images={images}
      />
    </main>
  )
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const supabase = await createClient()
  const { slug } = params

  const { data: bioPage } = await supabase
    .from('bio_pages')
    .select('title, description')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!bioPage) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: bioPage.title,
    description: bioPage.description || '',
  }
}




