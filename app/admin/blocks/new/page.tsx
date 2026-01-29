import BlockCreateForm from './block-create-form'

export default function BlockNewPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Tạo khối mới</h2>
      <BlockCreateForm />
    </div>
  )
}
