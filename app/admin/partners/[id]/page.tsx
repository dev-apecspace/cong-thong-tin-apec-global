import { createClient } from '@/lib/supabase-server'
import PartnerEditForm from '@/app/admin/partners/partner-edit-form'
import { notFound } from 'next/navigation'

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const supabase = await createClient()

  const { data: partner, error } = await supabase
    .from('partners')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !partner) {
    console.error('Partner fetch error:', error)
    notFound()
  }

  return (
    <div className="space-y-6">
      <PartnerEditForm partner={partner} />
    </div>
  )
}
