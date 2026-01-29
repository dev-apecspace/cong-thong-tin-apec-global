import { createClient } from '@/lib/supabase-server'
import ModuleCreateForm from './module-create-form'

export default async function ModuleNewPage() {
  const supabase = await createClient()
  
  // Lấy danh sách projects
  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .order('id', { ascending: true })

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tạo Module mới</h2>
      <ModuleCreateForm projects={projects || []} />
    </div>
  )
}
