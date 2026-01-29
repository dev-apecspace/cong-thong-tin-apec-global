import { createClient } from '@/lib/supabase-server'
import ProjectEditForm from '../project-edit-form'

export default async function ProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !project) {
    console.error('Project fetch error:', error)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chỉnh sửa dự án</h2>
      {project && <ProjectEditForm project={project} />}
    </div>
  )
}
