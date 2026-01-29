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

interface Block {
  block_id: string
  title: string
  value: string
  icon: string
  display_order: number
}

export default function BlocksTableClient({ blocks }: { blocks: Block[] }) {
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleDelete = async (blockId: string) => {
    setLoading(blockId)
    try {
      const response = await fetch(`/api/admin/blocks/${blockId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Lỗi khi xóa')
      }

      toast.success('Xóa khối thành công')
      router.refresh()
    } catch (error: any) {
      console.error('Delete error:', error)
      toast.error(error.message || 'Lỗi khi xóa khối')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="w-full">
      <Table>
        <TableHeader className="bg-slate-50/50">
          <TableRow className="hover:bg-transparent border-slate-100">
            <TableHead className="font-semibold text-slate-700">Thứ tự</TableHead>
            <TableHead className="font-semibold text-slate-700">Tiêu đề</TableHead>
            <TableHead className="font-semibold text-slate-700">Giá trị</TableHead>
            <TableHead className="font-semibold text-slate-700">Icon</TableHead>
            <TableHead className="text-right font-semibold text-slate-700">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {blocks?.map((block) => (
            <TableRow key={block.block_id} className="border-slate-50 hover:bg-slate-50/50 transition-colors">
              <TableCell>
                <span className="bg-slate-100 px-2 py-1 rounded text-xs text-slate-600 font-medium">
                  {block.display_order}
                </span>
              </TableCell>
              <TableCell className="font-semibold text-slate-900">{block.title}</TableCell>
              <TableCell className="text-blue-600 font-bold">{block.value}</TableCell>
              <TableCell>
                <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-600 border border-slate-100">
                  {block.icon}
                </div>
              </TableCell>
              <TableCell className="text-right space-x-1">
                <Link href={`/admin/blocks/${block.block_id}`}>
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
                        Bạn có chắc chắn muốn xóa khối <span className="font-semibold text-slate-900">"{block.title}"</span>? 
                        Hành động này không thể hoàn tác.
                      </AlertDialogDescription>
                      <div className="flex justify-end gap-3 pt-4">
                        <AlertDialogCancel className="border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl px-6">Hủy</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(block.block_id)}
                          disabled={loading === block.block_id}
                          className="bg-red-600 hover:bg-red-700 text-white border-none rounded-xl px-6 shadow-sm shadow-red-200"
                        >
                          {loading === block.block_id ? 'Đang xóa...' : 'Xác nhận xóa'}
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
