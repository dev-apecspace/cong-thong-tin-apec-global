import { createClient } from '@/lib/supabase-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và password là bắt buộc' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const passwordHash = hashPassword(password)

    // Kiểm tra user đã tồn tại chưa
    const { data: existingUser } = await supabase
      .from('user')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email này đã được đăng ký' },
        { status: 400 }
      )
    }

    // Tạo user mới
    const { data: newUser, error } = await supabase
      .from('user')
      .insert({
        email,
        password_hash: passwordHash,
        role: 'admin',
        is_active: true,
      })
      .select()
      .single()

    if (error) {
      return NextResponse.json(
        { error: 'Lỗi tạo tài khoản: ' + error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: 'Tạo tài khoản admin thành công', user: newUser },
      { status: 201 }
    )
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Lỗi server' },
      { status: 500 }
    )
  }
}
