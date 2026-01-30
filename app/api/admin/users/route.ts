import { createClient } from '@/lib/supabase-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, email, password, full_name, role, permissions, is_active } = body
    const supabase = createClient()

    if (id) {
      // UPDATE
      const updateData: any = { full_name, role, permissions, is_active }
      if (password) updateData.password_hash = hashPassword(password)

      const { error } = await supabase.from('user').update(updateData).eq('id', id)
      if (error) throw error
    } else {
      // INSERT
      if (!email || !password) return NextResponse.json({ error: 'Thiếu email hoặc mật khẩu' }, { status: 400 })
      
      const { error } = await supabase.from('user').insert([{
        email,
        password_hash: hashPassword(password),
        full_name,
        role,
        is_active: true,
        permissions
      }])
      if (error) throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('User API error:', error)
    return NextResponse.json({ error: error.message || 'Lỗi server' }, { status: 500 })
  }
}
