import { createClient } from '@/lib/supabase-server'
import BlockEditForm from '../block-edit-form'

export default async function BlockEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const resolvedParams = await params
  const supabase = await createClient()
  
  const { data: block, error } = await supabase
    .from('overview_blocks')
    .select('*')
    .eq('block_id', resolvedParams.id)
    .single()

  if (error || !block) {
    console.error('Block fetch error:', error)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Chỉnh sửa khối</h2>
      {block && <BlockEditForm block={block} />}
    </div>
  )
}
