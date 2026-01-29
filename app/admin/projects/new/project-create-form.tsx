'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import ImageUpload from '@/app/admin/components/image-upload'

export default function ProjectCreateForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    logo: ''
  })

  const handleSave = async () => {
    if (!formData.id.trim() || !formData.name.trim()) {
      toast.error('Vui lòng nhập mã (ID) và tên dự án')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi tạo')
      }

      toast.success('Tạo dự án thành công')
      router.push('/admin/projects')
    } catch (error: any) {
      console.error('Create error:', error)
      toast.error(error.message || 'Lỗi khi tạo dự án')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 sticky top-16 z-20 -mx-8 px-8">
        <Link href="/admin/projects">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900 rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-md shadow-blue-200">
            <Save className="mr-2 h-4 w-4" /> {loading ? 'Đang tạo...' : 'Tạo dự án mới'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900">Thông tin dự án</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Mã (ID) *</Label>
                  <Input 
                    value={formData.id} 
                    onChange={e => setFormData({...formData, id: e.target.value})}
                    placeholder="VD: company-a"
                    className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                  />
                  <p className="text-[10px] text-slate-400 ml-1">Không thể thay đổi sau khi tạo</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700 font-semibold">Tên dự án *</Label>
                  <Input 
                    value={formData.name} 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="VD: Công ty A"
                    className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900">Logo dự án</h3>
              </div>
              
              <ImageUpload 
                value={formData.logo} 
                onChange={(url) => setFormData({...formData, logo: url})}
                folder="projects"
                label="Tải lên logo"
              />
              
              {formData.logo && (
                <div className="pt-4 border-t border-slate-50">
                  <Label className="text-slate-500 text-[10px] uppercase font-bold mb-2 block">Xem trước</Label>
                  <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-center border border-dashed border-slate-200">
                    <img 
                      src={formData.logo} 
                      alt={formData.name}
                      className="h-16 object-contain"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
