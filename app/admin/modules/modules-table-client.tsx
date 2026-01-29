'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface Module {
  id: string
  title: string
  icon: string
  route: string
  display_order: number
  is_visible: boolean
}

export default function ModulesTableClient({ modules }: { modules: Module[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleDelete = async (moduleId: string) => {
    setLoading(moduleId)
    try {
      const response = await fetch(`/api/admin/modules/${moduleId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi xóa')
      }

      toast.success('Xóa module thành công')
      router.refresh()
    } catch (error: any) {
      console.error('Delete error:', error)
      toast.error(error.message || 'Lỗi khi xóa module')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="w-[100px] font-semibold text-slate-700">Thứ tự</TableHead>
            <TableHead className="font-semibold text-slate-700">Tiêu đề</TableHead>
            <TableHead className="font-semibold text-slate-700">Icon</TableHead>
            <TableHead className="font-semibold text-slate-700">Đường dẫn</TableHead>
            <TableHead className="font-semibold text-slate-700">Trạng thái</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {modules?.map((module) => (
            <TableRow key={module.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
              <TableCell className="font-medium text-slate-600">
                <span className="bg-slate-100 px-2 py-1 rounded text-xs">{module.display_order}</span>
              </TableCell>
              <TableCell className="font-medium text-slate-900 whitespace-pre-line">{module.title}</TableCell>
              <TableCell>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
                  {module.icon}
                </div>
              </TableCell>
              <TableCell className="text-slate-500 font-mono text-xs">{module.route}</TableCell>
              <TableCell>
                {module.is_visible ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                    <Eye className="mr-1 h-3 w-3" /> Hiển thị
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium border border-slate-200">
                    <EyeOff className="mr-1 h-3 w-3" /> Đang ẩn
                  </span>
                )}
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Link href={`/admin/modules/${module.id}`}>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-white rounded-2xl border-none shadow-xl">
                    <div className="space-y-4 p-2">
                      <AlertDialogTitle className="text-xl font-bold text-slate-900">Xác nhận xóa</AlertDialogTitle>
                      <AlertDialogDescription className="text-slate-600 text-base">
                        Bạn có chắc chắn muốn xóa module <span className="font-semibold text-slate-900">"{module.title}"</span>? 
                        Hành động này không thể hoàn tác và sẽ ảnh hưởng đến trang chủ.
                      </AlertDialogDescription>
                      <div className="flex justify-end gap-3 pt-4">
                        <AlertDialogCancel className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-6">Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(module.id)}
                          disabled={loading === module.id}
                          className="bg-red-600 hover:bg-red-700 text-white border-none rounded-xl px-6 shadow-sm shadow-red-200"
                        >
                          {loading === module.id ? 'Đang xóa...' : 'Xác nhận xóa'}
                        </AlertDialogAction>
                      </div>
                    </div>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
