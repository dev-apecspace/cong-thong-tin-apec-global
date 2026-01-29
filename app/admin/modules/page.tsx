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
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import ModulesTableClient from './modules-table-client'

export default async function ModulesPage() {
  const supabase = await createClient()
  
  const { data: modules, error } = await supabase
    .from('modules')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    return <div>Lỗi tải dữ liệu: {error.message}</div>
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Danh sách Module</h2>
          <p className="text-slate-500 text-sm">Quản lý các khối nội dung chính trên trang chủ.</p>
        </div>
        <Link href="/admin/modules/new">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200 rounded-xl px-5">
            <Plus className="mr-2 h-4 w-4" /> Thêm Module mới
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <ModulesTableClient modules={modules || []} />
      </div>
    </div>
  )
}

