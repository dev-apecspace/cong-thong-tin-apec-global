import { createClient } from '@/lib/supabase-client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createClient()

    const { data, error } = await supabase
      .from('partners')
      .insert([
        {
          name: body.name,
          logo: body.logo,
          description: body.description,
          website: body.website,
          contact_email: body.contact_email,
          contact_phone: body.contact_phone,
          display_order: body.display_order || 1,
          is_visible: true,
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Partners insert error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Partners POST error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const supabase = createClient()

    const { data, error } = await supabase
      .from('partners')
      .select('*')
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Partners select error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ partners: data })
  } catch (error: any) {
    console.error('Partners GET error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
