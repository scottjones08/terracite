import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { FolderKanban, DollarSign, Users, TrendingUp, Clock, AlertTriangle, MapPin, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import PageHeader from '@/components/shared/PageHeader'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { revenueData, activities, deadlines, projects } from '@/lib/mock-data'

const stats = [
  { label: 'Active Projects', value: 9, icon: FolderKanban, color: 'bg-forest', change: '+2 this month' },
  { label: 'Monthly Revenue', value: 438000, icon: DollarSign, color: 'bg-terracotta', prefix: '$', change: '+12% vs last month' },
  { label: 'Team Utilization', value: 82, icon: Users, color: 'bg-sage', suffix: '%', change: '↑ 3% from last week' },
  { label: 'On-Time Delivery', value: 94, icon: TrendingUp, color: 'bg-stone', suffix: '%', change: '2 projects ahead' },
]

const priorityColors: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-green-100 text-green-700',
}

const typeIcons: Record<string, string> = {
  design: '🎨', permit: '📋', site: '📍', financial: '💰', plants: '🌿', milestone: '🎯', sustainability: '♻️',
}

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Dashboard" description="Welcome back, Andrew. Here's what's happening today." />

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((s) => (
          <StaggerItem key={s.label}>
            <motion.div whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }} transition={{ duration: 0.2 }}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center`}>
                      <s.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-foreground">
                    <AnimatedNumber value={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{s.label}</p>
                  <p className="text-xs text-sage mt-2">{s.change}</p>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif">Revenue & Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2D5016" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#2D5016" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4724E" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#C4724E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" />
                <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
                <YAxis stroke="#78716c" fontSize={12} tickFormatter={(v) => `$${v / 1000}k`} />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2ddd5' }} />
                <Area type="monotone" dataKey="revenue" stroke="#2D5016" fill="url(#colorRevenue)" strokeWidth={2} name="Revenue" />
                <Area type="monotone" dataKey="expenses" stroke="#C4724E" fill="url(#colorExpenses)" strokeWidth={2} name="Expenses" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <Clock className="w-4 h-4 text-terracotta" /> Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deadlines.map((d) => (
              <motion.div key={d.id} whileHover={{ x: 2 }} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-sand/50 transition-colors">
                <div className="mt-0.5">
                  {d.daysLeft <= 3 ? <AlertTriangle className="w-4 h-4 text-red-500" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{d.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{d.project}</p>
                </div>
                <Badge variant="secondary" className={`text-xs shrink-0 ${priorityColors[d.priority]}`}>
                  {d.daysLeft}d
                </Badge>
              </motion.div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <Activity className="w-4 h-4 text-sage" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {activities.map((a) => (
              <motion.div key={a.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3 p-3 rounded-lg hover:bg-sand/30 transition-colors">
                <span className="text-base mt-0.5">{typeIcons[a.type] || '📌'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm"><span className="font-medium">{a.user}</span> {a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.project} · {a.time}</p>
                </div>
              </motion.div>
            ))}
          </CardContent>
        </Card>

        {/* Active Projects Overview */}
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-serif flex items-center gap-2">
              <MapPin className="w-4 h-4 text-forest" /> Project Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {projects.filter(p => p.status === 'active').slice(0, 5).map((p) => (
              <div key={p.id} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium truncate flex-1">{p.name}</p>
                  <span className="text-xs text-muted-foreground ml-2">{p.progress}%</span>
                </div>
                <Progress value={p.progress} className="h-1.5" />
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0">{p.phase}</Badge>
                  <span className="text-[10px] text-muted-foreground">{p.lead}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
