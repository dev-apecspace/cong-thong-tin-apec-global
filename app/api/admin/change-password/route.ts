import { createClient } from '@/lib/supabase-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { userId, currentPassword, newPassword } = await request.json()

    if (!userId || !currentPassword || !newPassword) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc' }, { status: 400 })
    }

    const supabase = createClient()

    // 1. Kiểm tra mật khẩu cũ
    const { data: user, error: fetchError } = await supabase
      .from('user')
      .select('password_hash')
      .eq('id', userId)
      .single()

    if (fetchError || user.password_hash !== hashPassword(currentPassword)) {
      return NextResponse.json({ error: 'Mật khẩu hiện tại không chính xác' }, { status: 401 })
    }

    // 2. Cập nhật mật khẩu mới
    const { error: updateError } = await supabase
      .from('user')
      .update({ password_hash: hashPassword(newPassword) })
      .eq('id', userId)

    if (updateError) throw updateError

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Change password error:', error)
    return NextResponse.json({ error: error.message || 'Lỗi server' }, { status: 500 })
  }
}
