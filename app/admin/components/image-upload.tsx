'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Upload, X } from 'lucide-react'

interface ImageUploadProps {
  value: string
  onChange: (url: string) => void
  folder?: string
  label?: string
}

export default function ImageUpload({ value, onChange, folder = 'uploads', label = 'Logo' }: ImageUploadProps) {
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setLoading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', folder)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi upload')
      }

      const data = await response.json()
      onChange(data.url)
      toast.success('Upload ảnh thành công')
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Lỗi upload ảnh')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-3 w-full">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 group">
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={loading}
            className="cursor-pointer bg-white border-slate-200 rounded-xl hover:border-blue-400 transition-colors h-11 pr-10"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400 group-hover:text-blue-500 transition-colors">
            <Upload size={18} />
          </div>
        </div>
        
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onChange('')}
            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl h-11 w-11 shrink-0 border border-slate-100 sm:border-none"
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {value && (
        <div className="mt-4 space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Xem trước</p>
            <span className="text-[10px] font-mono text-slate-400 bg-white px-2 py-1 rounded border border-slate-100 truncate max-w-[200px]">
              {value.split('/').pop()}
            </span>
          </div>
          <div className="relative h-32 w-full bg-white rounded-xl border border-slate-200 overflow-hidden shadow-inner flex items-center justify-center">
            <img 
              src={value} 
              alt="preview"
              className="max-w-full max-h-full object-contain p-4"
              onError={() => {
                toast.error('Không thể tải hình ảnh này')
                onChange('')
              }}
            />
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center space-x-2 px-1">
          <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-medium text-blue-600">Đang tải ảnh lên hệ thống...</p>
        </div>
      )}
    </div>
  )
}
