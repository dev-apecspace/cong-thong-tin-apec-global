import { createClient } from '@/lib/supabase-server'
import { notFound } from 'next/navigation'
import ModuleEditForm from './module-edit-form'

interface PageProps {
  params: {
    id: string
  }
}

export default async function EditModulePage({ params }: any) {
    // Note: Next.js 15+ params are async, but since this is labeled Next 16, 
    // it's likely using the newer pattern.
    const { id } = await params
    
    const supabase = await createClient()
    
    // Fetch module data
    const { data: module, error: moduleError } = await supabase
        .from('modules')
        .select('*')
        .eq('id', id)
        .single()

    if (moduleError || !module) {
        notFound()
    }

    // Fetch projects
    const { data: projects } = await supabase
        .from('projects')
        .select('*')
        .order('id', { ascending: true })

    // Fetch details for all projects for this module
    const { data: details } = await supabase
        .from('module_project_details')
        .select('*')
        .eq('module_id', id)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Chỉnh sửa Module: {module.title || module.name}</h2>
            </div>
            
            <ModuleEditForm 
                module={module} 
                projects={projects || []} 
                details={details || []} 
            />
        </div>
    )
}
