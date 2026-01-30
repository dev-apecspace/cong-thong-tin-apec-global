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
  Users,
  KeyRound
} from 'lucide-react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase-client'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClient()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [userSession, setUserSession] = useState<any>(null)
  
  // Password change state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  })
  const [isChanging, setIsChanging] = useState(false)

  useEffect(() => {
    const session = localStorage.getItem('admin_session')
    if (session) setUserSession(JSON.parse(session))
  }, [])

  const handleLogout = async () => {
    // Xóa session từ localStorage
    localStorage.removeItem('admin_session')
    
    // Xóa cookie
    document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    
    toast.success('Đã đăng xuất')
    router.push('/admin/login')
    router.refresh()
  }

  const handleChangePassword = async () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error('Vui lòng nhập đầy đủ thông tin')
      return
    }

    if (passwords.new !== passwords.confirm) {
      toast.error('Mật khẩu mới không khớp')
      return
    }

    setIsChanging(true)
    try {
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userSession.userId,
          currentPassword: passwords.current,
          newPassword: passwords.new
        })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Lỗi khi đổi mật khẩu')

      toast.success('Đã đổi mật khẩu thành công')
      setIsPasswordModalOpen(false)
      setPasswords({ current: '', new: '', confirm: '' })
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi đổi mật khẩu')
    } finally {
      setIsChanging(false)
    }
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
    { name: 'Quản lý User', href: '/admin/users', icon: Users },
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

        <div className="absolute bottom-6 w-full px-4 space-y-2">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl"
            onClick={() => setIsPasswordModalOpen(true)}
          >
            <KeyRound className="mr-3 h-5 w-5" />
            <span className="font-medium">Đổi mật khẩu</span>
          </Button>
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

      {/* Password Change Dialog */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-md rounded-2xl bg-white border-none shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <KeyRound className="h-5 w-5 text-blue-600" />
              Đổi mật khẩu tài khoản
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current">Mật khẩu hiện tại</Label>
              <Input 
                id="current" 
                type="password" 
                value={passwords.current}
                onChange={e => setPasswords({...passwords, current: e.target.value})}
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new">Mật khẩu mới</Label>
              <Input 
                id="new" 
                type="password" 
                value={passwords.new}
                onChange={e => setPasswords({...passwords, new: e.target.value})}
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm">Xác nhận mật khẩu mới</Label>
              <Input 
                id="confirm" 
                type="password" 
                value={passwords.confirm}
                onChange={e => setPasswords({...passwords, confirm: e.target.value})}
                className="rounded-xl border-slate-200 h-11"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsPasswordModalOpen(false)} className="rounded-xl">Hủy</Button>
            <Button 
              onClick={handleChangePassword} 
              disabled={isChanging}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-200"
            >
              {isChanging ? 'Đang xử lý...' : 'Xác nhận đổi'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
