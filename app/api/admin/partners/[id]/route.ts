import { createClient } from '@/lib/supabase-client'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const body = await request.json()
    const supabase = createClient()

    const { data, error } = await supabase
      .from('partners')
      .update({
        name: body.name,
        logo: body.logo,
        description: body.description,
        website: body.website,
        contact_email: body.contact_email,
        contact_phone: body.contact_phone,
        display_order: body.display_order || 1,
      })
      .eq('id', resolvedParams.id)
      .select()
      .single()

    if (error) {
      console.error('Partners update error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(data)
  } catch (error: any) {
    console.error('Partners PUT error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params
    const supabase = createClient()

    const { error } = await supabase
      .from('partners')
      .delete()
      .eq('id', resolvedParams.id)

    if (error) {
      console.error('Partners delete error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Partners DELETE error:', error)
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
