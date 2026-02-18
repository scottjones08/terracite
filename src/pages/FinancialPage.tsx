import { motion } from 'framer-motion'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { DollarSign, TrendingUp, Clock, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageHeader from '@/components/shared/PageHeader'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { revenueData, invoices, projects } from '@/lib/mock-data'

const statusColors: Record<string, string> = {
  paid: 'bg-green-100 text-green-700',
  sent: 'bg-blue-100 text-blue-700',
  overdue: 'bg-red-100 text-red-700',
  draft: 'bg-gray-100 text-gray-600',
}

const profitability = projects.filter(p => p.status === 'active').map(p => ({
  name: p.name.length > 20 ? p.name.substring(0, 20) + '...' : p.name,
  margin: Math.round(((p.budget - p.spent) / p.budget) * 100),
  revenue: p.spent,
}))

export default function FinancialPage() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Financial Tracking" description="Revenue, expenses, invoicing, and profitability" />

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'YTD Revenue', value: 4434000, icon: DollarSign, prefix: '$', color: 'bg-forest' },
          { label: 'Net Profit', value: 1261000, icon: TrendingUp, prefix: '$', color: 'bg-sage' },
          { label: 'Outstanding', value: 161000, icon: Clock, prefix: '$', color: 'bg-terracotta' },
          { label: 'Overdue', value: 45000, icon: AlertCircle, prefix: '$', color: 'bg-red-500' },
        ].map(s => (
          <StaggerItem key={s.label}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold"><AnimatedNumber value={s.value} prefix={s.prefix} /></div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Tabs defaultValue="overview">
        <TabsList className="bg-white border mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="profitability">Profitability</TabsTrigger>
          <TabsTrigger value="time">Time Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg font-serif">Revenue Trend</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" />
                    <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
                    <YAxis stroke="#78716c" fontSize={12} tickFormatter={v => `$${v/1000}k`} />
                    <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, ""]} />
                    <Area type="monotone" dataKey="revenue" stroke="#2D5016" fill="#2D5016" fillOpacity={0.1} strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg font-serif">Expenses by Month</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" />
                    <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
                    <YAxis stroke="#78716c" fontSize={12} tickFormatter={v => `$${v/1000}k`} />
                    <Tooltip formatter={(v) => [`$${Number(v).toLocaleString()}`, ""]} />
                    <Bar dataKey="expenses" fill="#C4724E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <table className="w-full">
                <thead><tr className="border-b">
                  <th className="p-3 text-xs text-left text-muted-foreground">Invoice</th>
                  <th className="p-3 text-xs text-left text-muted-foreground">Project</th>
                  <th className="p-3 text-xs text-left text-muted-foreground">Client</th>
                  <th className="p-3 text-xs text-left text-muted-foreground">Amount</th>
                  <th className="p-3 text-xs text-left text-muted-foreground">Status</th>
                  <th className="p-3 text-xs text-left text-muted-foreground">Due Date</th>
                </tr></thead>
                <tbody>
                  {invoices.map(inv => (
                    <motion.tr key={inv.id} whileHover={{ backgroundColor: 'rgba(232,223,208,0.3)' }} className="border-b last:border-0">
                      <td className="p-3 text-sm font-medium">{inv.number}</td>
                      <td className="p-3 text-sm text-muted-foreground">{inv.project}</td>
                      <td className="p-3 text-sm text-muted-foreground">{inv.client}</td>
                      <td className="p-3 text-sm font-medium">${inv.amount.toLocaleString()}</td>
                      <td className="p-3"><Badge className={`text-xs ${statusColors[inv.status]} border-0`}>{inv.status}</Badge></td>
                      <td className="p-3 text-sm text-muted-foreground">{inv.dueDate}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profitability">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg font-serif">Project Profitability</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                {profitability.map(p => (
                  <div key={p.name} className="flex items-center gap-4">
                    <div className="w-48 shrink-0 text-sm font-medium truncate">{p.name}</div>
                    <div className="flex-1 bg-sand/50 rounded-full h-6 overflow-hidden">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${100 - p.margin}%` }} transition={{ duration: 0.8 }}
                        className={`h-full rounded-full flex items-center justify-end pr-2 ${p.margin > 20 ? 'bg-forest/20' : 'bg-red-200'}`}>
                        <span className="text-[10px] font-medium">{p.margin}% margin</span>
                      </motion.div>
                    </div>
                    <span className="text-xs text-muted-foreground w-20 text-right">${(p.revenue / 1000).toFixed(0)}k billed</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card className="border-0 shadow-sm">
            <CardHeader><CardTitle className="text-lg font-serif">Time Tracking Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'Andrew Bleckley', billable: 142, nonBillable: 18, total: 160 },
                  { name: 'Elizabeth Fuqua', billable: 148, nonBillable: 12, total: 160 },
                  { name: 'Marcus Chen', billable: 125, nonBillable: 23, total: 148 },
                  { name: 'Sarah Mitchell', billable: 136, nonBillable: 16, total: 152 },
                  { name: 'David Park', billable: 108, nonBillable: 32, total: 140 },
                  { name: 'Rachel Torres', billable: 140, nonBillable: 20, total: 160 },
                ].map(t => (
                  <div key={t.name} className="flex items-center gap-4 p-2 rounded-lg hover:bg-sand/30">
                    <span className="w-36 text-sm font-medium">{t.name}</span>
                    <div className="flex-1 flex items-center gap-1 h-5">
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(t.billable / 160) * 100}%` }} transition={{ duration: 0.6 }}
                        className="h-full bg-forest/30 rounded" />
                      <motion.div initial={{ width: 0 }} animate={{ width: `${(t.nonBillable / 160) * 100}%` }} transition={{ duration: 0.6 }}
                        className="h-full bg-sand rounded" />
                    </div>
                    <span className="text-xs text-muted-foreground w-24 text-right">{t.billable}h / {t.total}h</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
