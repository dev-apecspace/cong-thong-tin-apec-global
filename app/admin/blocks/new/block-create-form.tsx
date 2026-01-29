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

export default function BlockCreateForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    title: '',
    value: '',
    icon: 'Square',
    display_order: 1,
    is_visible: true
  })

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.value.trim()) {
      toast.error('Vui lòng nhập tiêu đề và giá trị')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/blocks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi tạo')
      }

      toast.success('Tạo khối thành công')
      router.push('/admin/blocks')
    } catch (error: any) {
      console.error('Create error:', error)
      toast.error(error.message || 'Lỗi khi tạo khối')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 sticky top-16 z-20 -mx-8 px-8">
        <Link href="/admin/blocks">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900 rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-md shadow-blue-200">
            <Save className="mr-2 h-4 w-4" /> {loading ? 'Đang tạo...' : 'Tạo khối mới'}
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 max-w-2xl">
        <div className="space-y-8">
          <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
            <div className="w-1 h-6 bg-blue-600 rounded-full" />
            <h3 className="text-lg font-bold text-slate-900">Thông tin khối</h3>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Tiêu đề *</Label>
              <Input 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                placeholder="Ví dụ: Đối tác chiến lược"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700 font-semibold">Giá trị (Số liệu) *</Label>
              <Input 
                value={formData.value} 
                onChange={e => setFormData({...formData, value: e.target.value})}
                placeholder="VD: 500+"
                className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-slate-700 font-semibold">Icon (Lucide)</Label>
                <Input 
                  value={formData.icon} 
                  onChange={e => setFormData({...formData, icon: e.target.value})}
                  className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                  placeholder="Ví dụ: Users"
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
          </div>
        </div>
      </div>
    </div>
  )
}
