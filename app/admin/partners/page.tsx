import { createClient } from '@/lib/supabase-server'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import PartnersTableClient from './partners-table-client'

export default async function PartnersPage() {
  const supabase = await createClient()
  
  const { data: partners, error } = await supabase
    .from('partners')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) {
    return <div>Lỗi tải dữ liệu: {error.message}</div>
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Quản lý Đối tác</h2>
          <p className="text-slate-500 text-sm">Danh sách các đơn vị đối tác chiến lược của tập đoàn.</p>
        </div>
        <Link href="/admin/partners/new">
          <Button className="bg-blue-600 hover:bg-blue-700 shadow-sm shadow-blue-200 rounded-xl px-5">
            <Plus className="mr-2 h-4 w-4" /> Thêm Đối tác mới
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <PartnersTableClient partners={partners || []} />
      </div>
    </div>
  )
}
