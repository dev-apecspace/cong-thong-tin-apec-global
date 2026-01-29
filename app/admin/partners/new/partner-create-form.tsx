'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function PartnerCreateForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    logo: '',
    description: '',
    website: '',
    contact_email: '',
    contact_phone: '',
    display_order: 1,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'display_order' ? parseInt(value) : value
    }))
  }

  const handleImageChange = (url: string) => {
    setFormData(prev => ({
      ...prev,
      logo: url
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      toast.error('Tên đối tác không được để trống')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi tạo đối tác')
      }

      toast.success('Thêm đối tác thành công')
      router.push('/admin/partners')
      router.refresh()
    } catch (error: any) {
      console.error('Create error:', error)
      toast.error(error.message || 'Lỗi khi thêm đối tác')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 sticky top-16 z-20 -mx-8 px-8">
        <Link href="/admin/partners">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900 rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        </Link>
        <div className="flex gap-3">
          <Button onClick={handleSubmit} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-md shadow-blue-200">
            <Save className="mr-2 h-4 w-4" /> {loading ? 'Đang lưu...' : 'Thêm đối tác mới'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900">Thông tin đối tác</h3>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-slate-700 font-semibold">Tên đối tác *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập tên đối tác"
                    className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-slate-700 font-semibold">Mô tả</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Mô tả về đối tác"
                    className="rounded-xl border-slate-200 focus:ring-blue-500 min-h-[120px]"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="website" className="text-slate-700 font-semibold">Website</Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                      className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="display_order" className="text-slate-700 font-semibold">Thứ tự hiển thị</Label>
                    <Input
                      id="display_order"
                      name="display_order"
                      type="number"
                      value={formData.display_order}
                      onChange={handleChange}
                      className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                      min="1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900">Thông tin liên hệ</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contact_email" className="text-slate-700 font-semibold">Email liên hệ</Label>
                  <Input
                    id="contact_email"
                    name="contact_email"
                    type="email"
                    value={formData.contact_email}
                    onChange={handleChange}
                    placeholder="contact@example.com"
                    className="rounded-xl border-slate-200 focus:ring-blue-500 h-11"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_phone" className="text-slate-700 font-semibold">Điện thoại</Label>
                  <Input
                    id="contact_phone"
                    name="contact_phone"
                    value={formData.contact_phone}
                    onChange={handleChange}
                    placeholder="+84 9xx xxx xxx"
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
                <h3 className="text-lg font-bold text-slate-900">Logo đối tác</h3>
              </div>
              
              <ImageUpload
                value={formData.logo}
                onChange={handleImageChange}
                folder="partners"
                label="Tải lên logo"
              />
              <p className="text-xs text-slate-500 text-center">
                Định dạng hỗ trợ: PNG, SVG, JPG. Tối đa 2MB.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
