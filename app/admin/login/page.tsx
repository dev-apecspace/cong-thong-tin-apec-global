'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Box, Lock, Mail, ShieldCheck } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (!email || !password) {
        throw new Error('Vui lòng nhập email và mật khẩu')
      }

      // Gọi API login để xử lý hashing và kiểm tra mật khẩu
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Lỗi đăng nhập')
      }

      // Lưu session vào localStorage (client-side)
      const sessionData = {
        userId: data.user.id,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      }
      localStorage.setItem('admin_session', JSON.stringify(sessionData))

      // Gọi API để set cookie (server-side)
      await fetch('/api/admin/set-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sessionData),
      })

      toast.success('Đăng nhập thành công')
      
      // Delay một chút để đảm bảo cookie được set
      setTimeout(() => {
        router.push('/admin')
        router.refresh()
      }, 500)
    } catch (error: any) {
      console.error('Login error:', error)
      toast.error(error.message || 'Lỗi đăng nhập')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-3xl opacity-50" />
      </div>

      <Card className="w-full max-w-md border-none shadow-2xl bg-white/80 backdrop-blur-xl z-10 rounded-3xl overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <CardHeader className="space-y-4 pt-8 pb-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
              <ShieldCheck size={36} />
            </div>
          </div>
          <div className="space-y-1">
            <CardTitle className="text-3xl text-center font-bold text-slate-900 tracking-tight">Hệ thống Quản trị</CardTitle>
            <CardDescription className="text-center text-slate-500 text-base">
              Vui lòng đăng nhập để tiếp tục
            </CardDescription>
          </div>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-6 px-8">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700 font-semibold ml-1">Email</Label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="pl-10 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-1 ml-1">
                <Label htmlFor="password" title="password" className="text-slate-700 font-semibold">Mật khẩu</Label>
                <button type="button" className="text-xs text-blue-600 hover:underline font-medium">Quên mật khẩu?</button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-blue-500 transition-colors">
                  <Lock size={18} />
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pl-10 h-12 bg-slate-50/50 border-slate-200 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition-all"
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="px-8 pb-10 pt-4">
            <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group" type="submit" disabled={loading}>
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Đăng nhập ngay
                  <Box size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
