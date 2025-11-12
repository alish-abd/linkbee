import { createClient } from '@/app/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: bioPages, error } = await supabase
      .from('bio_pages')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching bio pages:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(bioPages)
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, slug, theme, blocks, is_published, links, images } = body

    // Get user profile to get username
    const { data: userProfile } = await supabase
      .from('users')
      .select('username')
      .eq('id', user.id)
      .single()

    // Use slug or fallback to username
    const pageSlug = slug || userProfile?.username || user.id

    // Check if slug is unique
    const { data: existingPage } = await supabase
      .from('bio_pages')
      .select('id')
      .eq('slug', pageSlug)
      .single()

    if (existingPage) {
      return NextResponse.json(
        { error: 'This slug is already taken' },
        { status: 400 }
      )
    }

    // Create bio page
    const { data: bioPage, error: bioPageError } = await supabase
      .from('bio_pages')
      .insert({
        user_id: user.id,
        title: title || 'My Bio Page',
        description: description || '',
        slug: pageSlug,
        theme: theme || {
          primaryColor: '#0ea5e9',
          backgroundColor: '#ffffff',
          textColor: '#1f2937',
          fontFamily: 'Inter',
        },
        blocks: blocks || [],
        is_published: is_published || false,
      })
      .select()
      .single()

    if (bioPageError) {
      console.error('Error creating bio page:', bioPageError)
      return NextResponse.json({ error: bioPageError.message }, { status: 500 })
    }

    // Insert links if provided
    if (links && links.length > 0) {
      const linksData = links.map((link: any, index: number) => ({
        bio_page_id: bioPage.id,
        title: link.title,
        url: link.url,
        icon_url: link.icon_url || null,
        order: link.order || index,
      }))

      const { error: linksError } = await supabase.from('links').insert(linksData)

      if (linksError) {
        console.error('Error creating links:', linksError)
        // Continue even if links fail
      }
    }

    // Insert images if provided
    if (images && images.length > 0) {
      const imagesData = images.map((image: any) => ({
        bio_page_id: bioPage.id,
        storage_path: image.storage_path,
        url: image.url,
        type: image.type || 'content',
      }))

      const { error: imagesError } = await supabase.from('images').insert(imagesData)

      if (imagesError) {
        console.error('Error creating images:', imagesError)
        // Continue even if images fail
      }
    }

    // Fetch complete bio page with relations
    const { data: completeBioPage } = await supabase
      .from('bio_pages')
      .select(`
        *,
        links (*),
        images (*)
      `)
      .eq('id', bioPage.id)
      .single()

    return NextResponse.json(completeBioPage)
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}




