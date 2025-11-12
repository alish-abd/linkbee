import { createClient } from '@/app/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

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
    const { description, links, images } = body

    if (!description) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      )
    }

    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      )
    }

    // Build prompt for OpenAI
    let prompt = `Создай современную био-страницу (link in bio) на основе следующего описания деятельности пользователя:\n\n${description}\n\n`

    if (links && links.length > 0) {
      prompt += `Ссылки пользователя:\n`
      links.forEach((link: any, index: number) => {
        prompt += `${index + 1}. ${link.title || link.url}: ${link.url}\n`
      })
      prompt += `\n`
    }

    if (images && images.length > 0) {
      prompt += `Пользователь загрузил ${images.length} изображение(й).\n\n`
    }

    prompt += `Верни JSON объект со следующей структурой:
{
  "title": "Заголовок страницы (краткий, привлекательный)",
  "description": "Описание для страницы (2-3 предложения)",
  "blocks": [
    {
      "type": "hero",
      "content": {
        "title": "Заголовок блока",
        "text": "Текст блока"
      }
    },
    {
      "type": "links",
      "content": {
        "title": "Мои ссылки",
        "links": []
      }
    }
  ],
  "theme": {
    "primaryColor": "hex цвет (например #0ea5e9)",
    "backgroundColor": "hex цвет фона",
    "textColor": "hex цвет текста",
    "fontFamily": "название шрифта"
  }
}

Блоки могут быть типами: "hero", "about", "links", "contact". Для типа "links" используй ссылки из списка выше. Сделай дизайн современным и привлекательным.`

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content:
            'Ты эксперт по созданию современных био-страниц (link in bio) для социальных сетей. Создавай привлекательные, профессиональные страницы с четкой структурой.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.7,
    })

    const responseText = completion.choices[0]?.message?.content
    if (!responseText) {
      return NextResponse.json(
        { error: 'Failed to generate content' },
        { status: 500 }
      )
    }

    let generatedData
    try {
      generatedData = JSON.parse(responseText)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse generated content' },
        { status: 500 }
      )
    }

    // Map links to the generated structure
    if (links && links.length > 0 && generatedData.blocks) {
      const linksBlock = generatedData.blocks.find(
        (block: any) => block.type === 'links'
      )
      if (linksBlock) {
        linksBlock.content.links = links.map((link: any, index: number) => ({
          title: link.title || `Link ${index + 1}`,
          url: link.url,
          icon_url: link.icon_url || null,
          order: index,
        }))
      }
    }

    return NextResponse.json({
      title: generatedData.title || 'My Bio Page',
      description: generatedData.description || description,
      blocks: generatedData.blocks || [],
      theme: generatedData.theme || {
        primaryColor: '#0ea5e9',
        backgroundColor: '#ffffff',
        textColor: '#1f2937',
        fontFamily: 'Inter',
      },
    })
  } catch (error: any) {
    console.error('Error generating bio page:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}

