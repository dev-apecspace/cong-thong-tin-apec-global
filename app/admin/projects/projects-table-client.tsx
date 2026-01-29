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
import { Edit, Trash2 } from 'lucide-react'
import Image from 'next/image'
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

interface Project {
  id: string
  name: string
  logo: string
}

export default function ProjectsTableClient({ projects }: { projects: Project[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleDelete = async (projectId: string) => {
    setLoading(projectId)
    try {
      const response = await fetch(`/api/admin/projects/${projectId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi xóa')
      }

      toast.success('Xóa dự án thành công')
      router.refresh()
    } catch (error: any) {
      console.error('Delete error:', error)
      toast.error(error.message || 'Lỗi khi xóa dự án')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="font-semibold text-slate-700">Logo</TableHead>
            <TableHead className="font-semibold text-slate-700">Mã (ID)</TableHead>
            <TableHead className="font-semibold text-slate-700">Tên công ty / Dự án</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects?.map((project) => (
            <TableRow key={project.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
              <TableCell>
                {project.logo && (
                  <div className="relative h-12 w-24 bg-slate-50 rounded-lg border border-slate-100 p-1">
                    <Image 
                      src={project.logo} 
                      alt={project.name} 
                      fill 
                      className="object-contain p-1"
                    />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-mono text-blue-600 font-medium">{project.id}</TableCell>
              <TableCell className="font-semibold text-slate-900">{project.name}</TableCell>
              <TableCell className="text-right space-x-1">
                <Link href={`/admin/projects/${project.id}`}>
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
                        Bạn có chắc chắn muốn xóa dự án <span className="font-semibold text-slate-900">"{project.name}"</span>? 
                        Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                      <div className="flex justify-end gap-3 pt-4">
                        <AlertDialogCancel className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-6">Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id)}
                          disabled={loading === project.id}
                          className="bg-red-600 hover:bg-red-700 text-white border-none rounded-xl px-6 shadow-sm shadow-red-200"
                        >
                          {loading === project.id ? 'Đang xóa...' : 'Xác nhận xóa'}
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
