import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/supabase-server'
import { Box, Layers, Grid3X3, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function AdminDashboard() {
  const supabase = await createClient()
  
  // Fetch some stats
  const { count: modulesCount } = await supabase.from('modules').select('*', { count: 'exact', head: true })
  const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true })
  const { count: blocksCount } = await supabase.from('overview_blocks').select('*', { count: 'exact', head: true })

  const stats = [
    { title: 'Modules', value: modulesCount || 0, icon: Box, color: 'text-blue-500' },
    { title: 'Dự án', value: (projectsCount || 0) - 1, icon: Layers, color: 'text-purple-500' }, // Trừ 1 do có dự án 'default'
    { title: 'Khối thông tin', value: blocksCount || 0, icon: Grid3X3, color: 'text-green-500' },
    { title: 'Quản trị viên', value: 1, icon: Users, color: 'text-orange-500' },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900">Chào buổi chiều! 👋</h2>
        <p className="text-slate-500">
          Dưới đây là tổng quan về hệ thống nội dung của bạn hôm nay.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none shadow-sm bg-white overflow-hidden group hover:shadow-md transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                {stat.title}
              </CardTitle>
              <div className={cn("p-2 rounded-lg transition-colors bg-slate-50 group-hover:bg-opacity-80")}>
                <stat.icon className={cn("h-4 w-4", stat.color)} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-400 mt-1">Dữ liệu hiện tại</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-full lg:col-span-4 border-none shadow-sm bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Box size={160} />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl">Bắt đầu quản trị dễ dàng</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-blue-100 max-w-lg leading-relaxed">
              Hệ thống CMS này giúp bạn quản lý mọi thành phần trên trang web một cách trực quan. 
              Bạn có thể dễ dàng thay đổi văn bản, hình ảnh và cấu trúc các module chỉ với vài cú click chuột.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-sm font-medium">
                ✨ Giao diện mới thân thiện
              </div>
              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20 text-sm font-medium">
                🚀 Thao tác nhanh chóng
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-3 border-none shadow-sm bg-white">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Thông báo hệ thống</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-green-50 border border-green-100">
                <div className="w-2 h-2 mt-2 bg-green-500 rounded-full" />
                <div className="text-sm text-green-800">
                  Kết nối với Supabase ổn định.
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-100">
                <div className="w-2 h-2 mt-2 bg-blue-500 rounded-full" />
                <div className="text-sm text-blue-800">
                  Đã cập nhật giao diện quản trị mới dễ dùng hơn.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
