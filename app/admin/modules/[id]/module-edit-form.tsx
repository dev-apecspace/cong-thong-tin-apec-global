'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Save, ArrowLeft, Trash2 } from 'lucide-react'
import Link from 'next/link'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function ModuleEditForm({ module, projects, details }: any) {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  
  // Basic module state
  const [formData, setFormData] = useState({
    title: module.title,
    description: module.description || '',
    icon: module.icon,
    route: module.route,
    display_order: module.display_order,
    is_visible: module.is_visible,
    background_image: module.background_image || ''
  })

  // Project details state
  const [projectDetails, setProjectDetails] = useState(() => {
    const initialState: Record<string, string> = {}
    projects.forEach((p: any) => {
      const detail = details.find((d: any) => d.project_id === p.id)
      initialState[p.id] = detail ? JSON.stringify(detail.content, null, 2) : '{}'
    })
    return initialState
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // 1. Update basic module info
      const { error: moduleUpdateError } = await supabase
        .from('modules')
        .update(formData)
        .eq('id', module.id)

      if (moduleUpdateError) throw moduleUpdateError

      // 2. Update project details
      for (const projectId of Object.keys(projectDetails)) {
        let parsedContent
        try {
          parsedContent = JSON.parse(projectDetails[projectId])
        } catch (e) {
          throw new Error(`JSON không hợp lệ ở project ${projectId}`)
        }

        const { error: detailError } = await supabase
          .from('module_project_details')
          .upsert({
            module_id: module.id,
            project_id: projectId,
            content: parsedContent
          }, { onConflict: 'module_id,project_id' })

        if (detailError) throw detailError
      }

      toast.success('Cập nhật module thành công')
      router.refresh()
    } catch (error: any) {
      console.error('Save error:', error)
      toast.error(error.message || 'Lỗi khi lưu')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    try {
      const response = await fetch(`/api/admin/modules/${module.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi xóa')
      }

      toast.success('Xóa module thành công')
      router.push('/admin/modules')
    } catch (error: any) {
      console.error('Delete error:', error)
      toast.error(error.message || 'Lỗi khi xóa module')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="sticky top-16 z-20 bg-white/80 backdrop-blur-md py-4 border-b border-slate-100 flex justify-between items-center -mx-8 px-8">
        <Link href="/admin/modules">
          <Button variant="ghost" className="text-slate-500 hover:text-slate-900 rounded-xl">
            <ArrowLeft className="mr-2 h-4 w-4" /> Quay lại
          </Button>
        </Link>
        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl">
                <Trash2 className="mr-2 h-4 w-4" /> Xóa Module
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white rounded-2xl border-none shadow-xl">
              <div className="space-y-4 p-2">
                <AlertDialogTitle className="text-xl font-bold text-slate-900">Xác nhận xóa</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-600 text-base">
                  Bạn có chắc muốn xóa module <span className="font-semibold text-slate-900">"{module.title}"</span>? Hành động này không thể hoàn tác.
                </AlertDialogDescription>
                <div className="flex justify-end gap-3 pt-4">
                  <AlertDialogCancel className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-6">Hủy</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={deleting}
                    className="bg-red-600 hover:bg-red-700 text-white border-none rounded-xl px-6 shadow-sm shadow-red-200"
                  >
                    {deleting ? 'Đang xóa...' : 'Xác nhận xóa'}
                  </AlertDialogAction>
                </div>
              </div>
            </AlertDialogContent>
          </AlertDialog>
          <Button onClick={handleSave} disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 shadow-md shadow-blue-200">
            <Save className="mr-2 h-4 w-4" /> {loading ? 'Đang lưu...' : 'Lưu tất cả thay đổi'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full mt-6">
        <TabsList className="bg-slate-100 border border-slate-200 p-1 rounded-xl w-full max-w-md">
          <TabsTrigger value="basic" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="content" className="flex-1 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Nội dung theo dự án</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="mt-8 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <div className="space-y-8">
              <div className="flex items-center space-x-2 border-b border-slate-50 pb-4">
                <div className="w-1 h-6 bg-blue-600 rounded-full" />
                <h3 className="text-lg font-bold text-slate-900">Cấu hình Module</h3>
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
                  <Label className="text-slate-700 font-semibold">Icon (Tên Lucide Icon)</Label>
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
        </TabsContent>

        <TabsContent value="content" className="mt-8">
          <Tabs defaultValue={projects[0]?.id} className="w-full">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-72 space-y-2">
                <Label className="text-slate-500 text-xs font-bold uppercase tracking-wider ml-1">Danh sách dự án</Label>
                <TabsList className="flex flex-col h-auto bg-slate-50 border border-slate-200 p-2 w-full rounded-2xl space-y-1">
                  {projects.map((p: any) => (
                    <TabsTrigger 
                      key={p.id} 
                      value={p.id} 
                      className="w-full justify-start py-3 px-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all text-slate-600"
                    >
                      {p.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="flex-1">
                {projects.map((p: any) => (
                  <TabsContent key={p.id} value={p.id} className="mt-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                      <div className="space-y-6">
                        <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                            <h3 className="text-lg font-bold text-slate-900">Nội dung cho {p.name}</h3>
                          </div>
                          <span className="text-xs font-medium px-2 py-1 bg-indigo-50 text-indigo-700 rounded-md">ID: {p.id}</span>
                        </div>

                        <div className="space-y-3">
                          <Label className="text-slate-700 font-semibold">Dữ liệu JSON</Label>
                          <Textarea 
                            value={projectDetails[p.id]} 
                            onChange={e => setProjectDetails({
                              ...projectDetails,
                              [p.id]: e.target.value
                            })}
                            className="rounded-xl border-slate-200 focus:ring-blue-500 font-mono text-xs min-h-[500px] bg-slate-50/50"
                          />
                          <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                            <p className="text-xs text-amber-800 leading-relaxed">
                              <strong>Lưu ý:</strong> Vui lòng nhập đúng định dạng JSON. Dữ liệu này quyết định thông tin hiển thị khi người dùng nhấn vào module trong phạm vi dự án <strong>{p.name}</strong>.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
