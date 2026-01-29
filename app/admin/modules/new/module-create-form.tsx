'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  name: string
}

export default function ModuleCreateForm({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'Box',
    route: '',
    display_order: 1,
    is_visible: true,
    background_image: ''
  })

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.route.trim()) {
      toast.error('Vui lòng nhập tiêu đề và route')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi tạo')
      }

      toast.success('Tạo module thành công')
      router.push('/admin/modules')
    } catch (error: any) {
      console.error('Create error:', error)
      toast.error(error.message || 'Lỗi khi tạo module')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 sticky top-16 z-20 -mx-8 px-8">
        <Link href="/admin/modules">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900 rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-md shadow-blue-200">
            <Save className="mr-2 h-4 w-4" /> {loading ? 'Đang tạo...' : 'Tạo module mới'}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <div className="space-y-8">
          <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h3 className="text-lg font-bold text-slate-900">Thông tin Module</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Tiêu đề (Dùng \n để xuống dòng)</Label>
              <Textarea 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all min-h-[100px]"
                placeholder="Nhập tiêu đề hiển thị"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Mô tả ngắn</Label>
              <Textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all min-h-[100px]"
                placeholder="Nhập mô tả cho module"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Icon (Lucide Icon)</Label>
              <Input 
                value={formData.icon} 
                onChange={e => setFormData({...formData, icon: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                placeholder="Ví dụ: Layout, Users, Box..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Đường dẫn (Route)</Label>
              <Input 
                value={formData.route} 
                onChange={e => setFormData({...formData, route: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                placeholder="/management"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Thứ tự hiển thị</Label>
              <Input 
                type="number"
                value={formData.display_order} 
                onChange={e => setFormData({...formData, display_order: parseInt(e.target.value)})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 font-semibold">Ảnh nền (URL)</Label>
            <Input 
              value={formData.background_image} 
              onChange={e => setFormData({...formData, background_image: e.target.value})}
              className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
              placeholder="https://images.unsplash.com/..."
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="space-y-0.5">
              <Label htmlFor="visible" className="text-slate-900 font-semibold cursor-pointer">Trạng thái hiển thị</Label>
              <p className="text-xs text-slate-500">Bật để hiển thị module này trên trang chủ</p>
            </div>
            <Switch 
              id="visible" 
              checked={formData.is_visible} 
              onCheckedChange={checked => setFormData({...formData, is_visible: checked})}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
