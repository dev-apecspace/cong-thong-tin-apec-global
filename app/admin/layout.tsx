'use client'

import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  LayoutDashboard, 
  Settings, 
  Box, 
  Layers, 
  LogOut, 
  Grid3X3,
  Menu,
  X,
  Users
} from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const handleLogout = async () => {
    // Xóa session từ localStorage
    localStorage.removeItem('admin_session')
    
    // Xóa cookie
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    
    toast.success('Đã đăng xuất')
    router.push('/admin/login')
    router.refresh()
  }

  // Nếu là trang login thì không hiển thị layout admin
  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  const menuItems = [
    { name: 'Tổng quan', href: '/admin', icon: LayoutDashboard },
    { name: 'Cấu hình chung', href: '/admin/config', icon: Settings },
    { name: 'Quản lý Module', href: '/admin/modules', icon: Box },
    { name: 'Quản lý Dự án', href: '/admin/projects', icon: Layers },
    { name: 'Khối thông tin', href: '/admin/blocks', icon: Grid3X3 },
    { name: 'Quản lý Đối tác', href: '/admin/partners', icon: Users },
  ]

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r border-slate-200 shadow-sm transition-transform duration-300 ease-in-out",
        !isSidebarOpen && "-translate-x-full"
      )}>
        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Box className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              APEC Admin
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)} className="lg:hidden">
            <X className="h-6 w-6" />
          </Button>
        </div>
        
        <nav className="mt-6 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                  isActive 
                    ? "bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100" 
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-600"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 transition-colors",
                  isActive ? "text-blue-600" : "text-slate-400 group-hover:text-blue-500"
                )} />
                <span className="font-medium">{item.name}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 w-full px-4">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span className="font-medium">Đăng xuất</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "lg:ml-64" : "ml-0"
      )}>
        <header className="h-16 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)} className={cn("mr-4", isSidebarOpen && "hidden")}>
              <Menu className="h-6 w-6 text-slate-600" />
            </Button>
            <h1 className="text-lg font-semibold text-slate-800">
              {menuItems.find(i => i.href === pathname)?.name || 'Bảng điều khiển'}
            </h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Hệ thống đang chạy
            </div>
          </div>
        </header>
        
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
