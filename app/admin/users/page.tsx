'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { Plus, Shield, User as UserIcon, Trash2, Edit } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'

const DEFAULT_PERMISSIONS = {
  config: { view: true, edit: false },
  modules: { view: true, create: false, edit: false, delete: false },
  projects: { view: true, create: false, edit: false, delete: false },
  blocks: { view: true, create: false, edit: false, delete: false },
  partners: { view: true, create: false, edit: false, delete: false },
  users: { view: false, manage: false }
}

const MODULE_LABELS: Record<string, string> = {
  config: 'Cấu hình chung',
  modules: 'Quản lý Module',
  projects: 'Quản lý Dự án',
  blocks: 'Khối thông tin',
  partners: 'Quản lý Đối tác',
  users: 'Quản lý User'
}

const ACTION_LABELS: Record<string, string> = {
  view: 'Xem',
  edit: 'Sửa',
  create: 'Thêm mới',
  delete: 'Xóa',
  manage: 'Toàn quyền'
}

export default function UsersPage() {
  const supabase = createClient()
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    password: '',
    role: 'staff',
    is_active: true,
    permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))
  })

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('user').select('*').order('created_at', { ascending: false })
    if (error) toast.error('Lỗi khi tải danh sách user')
    else setUsers(data || [])
    setLoading(false)
  }

  const handlePermissionChange = (moduleKey: string, actionKey: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      permissions: {
        ...prev.permissions,
        [moduleKey]: {
          ...prev.permissions[moduleKey],
          [actionKey]: checked
        }
      }
    }))
  }

  const handleSaveUser = async () => {
    if (!formData.email || (!editingUser && !formData.password)) {
      toast.error('Vui lòng nhập đầy đủ email và mật khẩu')
      return
    }

    try {
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingUser?.id,
          email: formData.email,
          password: formData.password,
          full_name: formData.full_name,
          role: formData.role,
          is_active: formData.is_active,
          permissions: formData.permissions
        })
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || 'Lỗi khi lưu user')

      toast.success(editingUser ? 'Cập nhật thành công' : 'Thêm mới thành công')
      setIsDialogOpen(false)
      fetchUsers()
      resetForm()
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi lưu user')
    }
  }

  const resetForm = () => {
    setEditingUser(null)
    setFormData({
      email: '',
      full_name: '',
      password: '',
      role: 'staff',
      is_active: true,
      permissions: JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))
    })
  }

  const handleEdit = (user: any) => {
    setEditingUser(user)
    setFormData({
      email: user.email,
      full_name: user.full_name || '',
      password: '',
      role: user.role,
      is_active: user.is_active,
      permissions: user.permissions || JSON.parse(JSON.stringify(DEFAULT_PERMISSIONS))
    })
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc muốn xóa user này?')) return
    const { error } = await supabase.from('user').delete().eq('id', id)
    if (error) toast.error('Lỗi khi xóa user')
    else {
      toast.success('Đã xóa user')
      fetchUsers()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Quản lý User & Phân quyền</h1>
          <p className="text-slate-500">Quản lý tài khoản truy cập CMS và giới hạn quyền hạn</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open)
          if (!open) resetForm()
        }}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-xl w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" /> Thêm User mới
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white border-none shadow-xl p-0">
            <DialogHeader className="p-8 border-b border-slate-100">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <UserIcon className="h-5 w-5 text-blue-600" />
                </div>
                {editingUser ? 'Chỉnh sửa User' : 'Thêm User mới'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input 
                    disabled={!!editingUser}
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="Email đăng nhập"
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Họ và tên</Label>
                  <Input 
                    value={formData.full_name}
                    onChange={e => setFormData({...formData, full_name: e.target.value})}
                    placeholder="Tên hiển thị"
                    className="rounded-xl border-slate-200"
                  />
                </div>
                {!editingUser && (
                  <div className="space-y-2">
                    <Label>Mật khẩu</Label>
                    <Input 
                      type="password"
                      value={formData.password}
                      onChange={e => setFormData({...formData, password: e.target.value})}
                      placeholder="Mật khẩu bảo mật"
                      className="rounded-xl border-slate-200"
                    />
                  </div>
                )}
                <div className="space-y-2">
                  <Label>Vai trò</Label>
                  <select 
                    className="w-full h-10 px-3 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={formData.role}
                    onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="staff">Nhân viên (Cần phân quyền)</option>
                    <option value="admin">Quản trị viên (Toàn quyền)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <h3 className="font-bold text-slate-900">Thiết lập quyền chi tiết</h3>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {Object.entries(formData.permissions).map(([moduleKey, actions]: [string, any]) => (
                    <div key={moduleKey} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                      <div className="font-semibold text-slate-800">{MODULE_LABELS[moduleKey]}</div>
                      <div className="flex flex-wrap gap-6">
                        {Object.entries(actions).map(([actionKey, value]) => (
                          <div key={actionKey} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${moduleKey}-${actionKey}`}
                              checked={value as boolean}
                              onCheckedChange={(checked) => handlePermissionChange(moduleKey, actionKey, !!checked)}
                              className="rounded-md"
                            />
                            <Label htmlFor={`${moduleKey}-${actionKey}`} className="text-sm font-medium cursor-pointer">
                              {ACTION_LABELS[actionKey]}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 border-t border-slate-100 bg-slate-50/50">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)} className="rounded-xl">Hủy</Button>
              <Button onClick={handleSaveUser} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 shadow-md shadow-blue-200">
                {editingUser ? 'Cập nhật' : 'Tạo mới'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-12 text-center text-slate-500">Đang tải...</div>
        ) : users.length === 0 ? (
          <div className="col-span-full py-12 text-center text-slate-500 italic">Chưa có user nào</div>
        ) : (
          users.map((user) => (
            <Card key={user.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow group rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <UserIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-900 truncate">{user.full_name || user.email}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-mono truncate max-w-[150px]">{user.email}</span>
                      <span className={`flex-shrink-0 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        user.role === 'admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {user.role}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-xs text-slate-500 mb-6">
                  <div className="flex justify-between py-1 border-b border-slate-50">
                    <span>Ngày tạo:</span>
                    <span className="text-slate-700">{new Date(user.created_at).toLocaleDateString('vi-VN')}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(user)} 
                    disabled={user.role === 'admin'}
                    className="flex-1 rounded-xl border-slate-200 hover:bg-slate-50 disabled:opacity-30"
                  >
                    <Edit className="h-4 w-4 mr-2" /> Sửa
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDelete(user.id)} 
                    disabled={user.role === 'admin'}
                    className="text-red-500 hover:bg-red-50 hover:text-red-700 rounded-xl disabled:opacity-30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
