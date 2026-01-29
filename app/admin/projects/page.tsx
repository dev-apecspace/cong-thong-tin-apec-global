import { createClient } from '@/lib/supabase-server'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash2, Plus } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ProjectsTableClient from './projects-table-client'

export default async function ProjectsPage() {
  const supabase = await createClient()
  
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .neq('id', 'default') // Ẩn project default vì nó là hệ thống
    .order('id', { ascending: true })

  if (error) {
    return <div>Lỗi tải dữ liệu: {error.message}</div>
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quản lý Dự án & Công ty</h2>
          <p className="text-slate-500 text-sm">Danh sách các dự án thành viên trong tập đoàn.</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200 rounded-xl px-5">
            <Plus className="mr-2 h-4 w-4" /> Thêm Dự án mới
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <ProjectsTableClient projects={projects || []} />
      </div>
    </div>
  )
}
