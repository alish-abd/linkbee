import { createClient } from '@/app/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { id } = params

    const { data: bioPage, error } = await supabase
      .from('bio_pages')
      .select(`
        *,
        links (*),
        images (*),
        users (username, full_name, avatar_url)
      `)
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching bio page:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!bioPage) {
      return NextResponse.json({ error: 'Bio page not found' }, { status: 404 })
    }

    return NextResponse.json(bioPage)
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params
    const body = await request.json()

    // Verify ownership
    const { data: existingPage } = await supabase
      .from('bio_pages')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!existingPage) {
      return NextResponse.json({ error: 'Bio page not found' }, { status: 404 })
    }

    if (existingPage.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Update bio page
    const updateData: any = {}
    if (body.title !== undefined) updateData.title = body.title
    if (body.description !== undefined) updateData.description = body.description
    if (body.slug !== undefined) updateData.slug = body.slug
    if (body.theme !== undefined) updateData.theme = body.theme
    if (body.blocks !== undefined) updateData.blocks = body.blocks
    if (body.is_published !== undefined) updateData.is_published = body.is_published

    const { data: bioPage, error: updateError } = await supabase
      .from('bio_pages')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (updateError) {
      console.error('Error updating bio page:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Update links if provided
    if (body.links !== undefined) {
      // Delete existing links
      await supabase.from('links').delete().eq('bio_page_id', id)

      // Insert new links
      if (body.links.length > 0) {
        const linksData = body.links.map((link: any, index: number) => ({
          bio_page_id: id,
          title: link.title,
          url: link.url,
          icon_url: link.icon_url || null,
          order: link.order || index,
        }))

        await supabase.from('links').insert(linksData)
      }
    }

    // Update images if provided
    if (body.images !== undefined) {
      // Delete existing images
      await supabase.from('images').delete().eq('bio_page_id', id)

      // Insert new images
      if (body.images.length > 0) {
        const imagesData = body.images.map((image: any) => ({
          bio_page_id: id,
          storage_path: image.storage_path,
          url: image.url,
          type: image.type || 'content',
        }))

        await supabase.from('images').insert(imagesData)
      }
    }

    // Fetch complete bio page
    const { data: completeBioPage } = await supabase
      .from('bio_pages')
      .select(`
        *,
        links (*),
        images (*)
      `)
      .eq('id', id)
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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = params

    // Verify ownership
    const { data: existingPage } = await supabase
      .from('bio_pages')
      .select('user_id, images(*)')
      .eq('id', id)
      .single()

    if (!existingPage) {
      return NextResponse.json({ error: 'Bio page not found' }, { status: 404 })
    }

    if (existingPage.user_id !== user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete images from storage
    if (existingPage.images && Array.isArray(existingPage.images)) {
      const imagePaths = existingPage.images.map((img: any) => img.storage_path)
      if (imagePaths.length > 0) {
        await supabase.storage.from('bio-images').remove(imagePaths)
      }
    }

    // Delete bio page (cascade will delete links and images)
    const { error: deleteError } = await supabase
      .from('bio_pages')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting bio page:', deleteError)
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}




