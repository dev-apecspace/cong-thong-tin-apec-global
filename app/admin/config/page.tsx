import { createClient } from '@/lib/supabase-server'
import ConfigEditForm from './config-edit-form'

export default async function ConfigPage() {
  const supabase = await createClient()
  
  const { data: config } = await supabase
    .from('company_config')
    .select('*')
    .single()

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Cấu hình hệ thống</h2>
        <p className="text-slate-500 text-sm">Quản lý các thông tin cơ bản của tập đoàn hiển thị trên website.</p>
      </div>
      {config && (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
          <ConfigEditForm config={config} />
        </div>
      )}
    </div>
  )
}
