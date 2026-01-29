'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Save } from 'lucide-react'
import ImageUpload from '@/app/admin/components/image-upload'

export default function ConfigEditForm({ config }: any) {
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState(config)

  const handleSave = async () => {
    setLoading(true)
    try {
      const { error } = await supabase
        .from('company_config')
        .update(formData)
        .eq('id', config.id)

      if (error) throw error
      toast.success('Cập nhật cấu hình thành công')
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi lưu')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 sticky top-16 z-20 -mx-8 px-8">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Cấu hình Hệ thống</h2>
          <p className="text-xs text-slate-500">Cập nhật thông tin tập đoàn và giao diện trang chủ</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-md shadow-blue-200">
            <Save className="mr-2 h-4 w-4" /> {loading ? 'Đang lưu...' : 'Lưu thay đổi'}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 space-y-12">
        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h3 className="text-lg font-bold text-slate-900">Thông tin cơ bản</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Tên tập đoàn</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all h-11"
                placeholder="Nhập tên chính thức của tập đoàn"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Slogan</Label>
              <Input 
                value={formData.slogan} 
                onChange={e => setFormData({...formData, slogan: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all h-11"
                placeholder="Câu khẩu hiệu của tập đoàn"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <Label className="text-slate-700 font-semibold">Logo tập đoàn</Label>
              <ImageUpload 
                value={formData.logo} 
                onChange={url => setFormData({...formData, logo: url})}
                folder="config"
                label="Tải logo lên"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Tên thương hiệu (Brand)</Label>
              <Input 
                value={formData.brand_name} 
                onChange={e => setFormData({...formData, brand_name: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all h-11"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Tên ngắn (Short Name)</Label>
              <Input 
                value={formData.short_name} 
                onChange={e => setFormData({...formData, short_name: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all h-11"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
            <div className="w-1 h-6 bg-indigo-600 rounded-full" />
            <h3 className="text-lg font-bold text-slate-900">Cấu hình Giao diện</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="space-y-0.5">
                <Label htmlFor="header-sticky" className="text-slate-900 font-semibold cursor-pointer">Thanh Header cố định</Label>
                <p className="text-xs text-slate-500">Giữ menu luôn ở trên cùng khi cuộn trang</p>
              </div>
              <Switch 
                id="header-sticky" 
                checked={formData.header_sticky} 
                onCheckedChange={checked => setFormData({...formData, header_sticky: checked})}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="space-y-0.5">
                <Label className="text-slate-900 font-semibold">Màu nền Header</Label>
                <p className="text-xs text-slate-500">Chọn màu sắc chủ đạo cho phần đầu trang</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full border border-slate-200 shadow-sm overflow-hidden" style={{ backgroundColor: formData.header_bg_color || '#ffffff' }}>
                  <input 
                    type="color"
                    value={formData.header_bg_color || '#ffffff'} 
                    onChange={e => setFormData({...formData, header_bg_color: e.target.value})}
                    className="opacity-0 w-full h-full cursor-pointer"
                  />
                </div>
                <span className="text-xs font-mono text-slate-500 uppercase">{formData.header_bg_color || '#ffffff'}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Link Video giới thiệu (Footer)</Label>
              <Input 
                value={formData.footer_video_url} 
                onChange={e => setFormData({...formData, footer_video_url: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all h-11"
                placeholder="https://youtube.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Thông tin bản quyền (Copyright)</Label>
              <Input 
                value={formData.footer_copyright} 
                onChange={e => setFormData({...formData, footer_copyright: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 transition-all h-11"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
