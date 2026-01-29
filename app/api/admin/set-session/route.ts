import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, email, role, token } = body

    if (!userId || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const response = NextResponse.json(
      { message: 'Session set successfully' },
      { status: 200 }
    )

    // Set session cookie
    response.cookies.set({
      name: 'admin_session',
      value: JSON.stringify({ userId, email, role, token }),
      httpOnly: false, // Cho phép JavaScript đọc
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error: any) {
    console.error('Set session error:', error)
    return NextResponse.json(
      { error: error.message || 'Lỗi server' },
      { status: 500 }
    )
  }
}
