import { createClient } from '@/lib/supabase-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { v4 as uuidv4 } from 'uuid'

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    console.log('Login attempt:', { email })

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và password là bắt buộc' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Kiểm tra kết nối
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

    // Query user từ database
    const { data: user, error: userError } = await supabase
      .from('user')
      .select('id, email, role, password_hash, is_active')
      .eq('email', email)
      .single()

    console.log('User query result:', { user, error: userError })

    if (userError) {
      console.error('User query error:', {
        message: userError.message,
        code: userError.code,
        details: userError.details
      })
      
      if (userError.code === 'PGRST116') {
        return NextResponse.json(
          { error: 'Table "user" không tồn tại hoặc user không tìm thấy' },
          { status: 404 }
        )
      }
      
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không chính xác' },
        { status: 401 }
      )
    }

    if (!user) {
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không chính xác' },
        { status: 401 }
      )
    }

    // Kiểm tra user có active không
    if (!user.is_active) {
      return NextResponse.json(
        { error: 'Tài khoản đã bị vô hiệu hóa' },
        { status: 401 }
      )
    }

    // So sánh password hash
    const passwordHash = hashPassword(password)
    console.log('Password comparison:', { 
      inputHash: passwordHash.substring(0, 8) + '...', 
      dbHash: user.password_hash.substring(0, 8) + '...',
      match: passwordHash === user.password_hash 
    })

    if (user.password_hash !== passwordHash) {
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không chính xác' },
        { status: 401 }
      )
    }

    // Kiểm tra role admin
    if (user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Bạn không có quyền truy cập trang quản trị' },
        { status: 403 }
      )
    }

    // Tạo session token
    const sessionToken = uuidv4()

    console.log('Login successful:', { userId: user.id, email: user.email })

    return NextResponse.json({
      message: 'Đăng nhập thành công',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      token: sessionToken,
    })
  } catch (error: any) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { error: error.message || 'Lỗi server' },
      { status: 500 }
    )
  }
}
