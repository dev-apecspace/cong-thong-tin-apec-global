import { createClient } from '@/lib/supabase-client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const supabase = createClient()

    const { error } = await supabase
      .from('overview_blocks')
      .insert([body])

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: any) {
    console.error('Create block error:', error)
    return NextResponse.json(
      { error: error.message || 'Lỗi server' },
      { status: 500 }
    )
  }
}
