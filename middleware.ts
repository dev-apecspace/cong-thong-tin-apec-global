import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Chỉ kiểm tra admin routes (trừ login page)
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    // Kiểm tra cookie session
    const sessionCookie = request.cookies.get('admin_session')
    
    // Nếu không có session, chuyển về login
    if (!sessionCookie) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}

