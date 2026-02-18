import { motion } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, RadarChart,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts'
import { BarChart3, TrendingUp, DollarSign, Users, FolderKanban, Clock, Target, Leaf } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'

const revenueByService = [
  { month: 'Sep', landscape: 185000, planning: 85000, urban: 95000 },
  { month: 'Oct', landscape: 198000, planning: 78000, urban: 105000 },
  { month: 'Nov', landscape: 210000, planning: 92000, urban: 98000 },
  { month: 'Dec', landscape: 195000, planning: 88000, urban: 112000 },
  { month: 'Jan', landscape: 225000, planning: 95000, urban: 108000 },
  { month: 'Feb', landscape: 218000, planning: 102000, urban: 118000 },
]

const projectsByPhase = [
  { name: 'Discovery', value: 2, color: '#7A8B69' },
  { name: 'Design', value: 3, color: '#2D5016' },
  { name: 'Review', value: 2, color: '#C4724E' },
  { name: 'Construction', value: 2, color: '#4A5568' },
  { name: 'Complete', value: 1, color: '#E8DFD0' },
]

const utilizationTrend = [
  { month: 'Sep', actual: 78, target: 80 },
  { month: 'Oct', actual: 81, target: 80 },
  { month: 'Nov', actual: 83, target: 80 },
  { month: 'Dec', actual: 76, target: 80 },
  { month: 'Jan', actual: 80, target: 80 },
  { month: 'Feb', actual: 82, target: 80 },
]

const clientRevenue = [
  { name: 'Libbie Mill Partners', revenue: 520000 },
  { name: 'City of Richmond', revenue: 410000 },
  { name: 'Mosaic Development', revenue: 380000 },
  { name: 'River Mill Communities', revenue: 275000 },
  { name: 'HCA Healthcare', revenue: 195000 },
  { name: 'VCU Foundation', revenue: 165000 },
]

const sustainabilityRadar = [
  { metric: 'Native Plants', value: 82, fullMark: 100 },
  { metric: 'Tree Canopy', value: 68, fullMark: 100 },
  { metric: 'Permeable Surface', value: 74, fullMark: 100 },
  { metric: 'Stormwater', value: 88, fullMark: 100 },
  { metric: 'Carbon Offset', value: 71, fullMark: 100 },
  { metric: 'Water Reduction', value: 79, fullMark: 100 },
]

const profitByProject = [
  { name: 'Riverfront Park', revenue: 287000, cost: 198000, margin: 31 },
  { name: 'Sunset Hills', revenue: 341000, cost: 252000, margin: 26 },
  { name: 'Libbie Mill IV', revenue: 198000, cost: 138000, margin: 30 },
  { name: 'VCU Medical', revenue: 156000, cost: 112000, margin: 28 },
  { name: 'Church Hill N', revenue: 276000, cost: 195000, margin: 29 },
]

const kpis = [
  { label: 'Total Revenue YTD', value: '$2.1M', change: '+14%', icon: DollarSign, color: 'bg-forest' },
  { label: 'Active Projects', value: '9', change: '+2', icon: FolderKanban, color: 'bg-terracotta' },
  { label: 'Avg. Utilization', value: '82%', change: '+3%', icon: Users, color: 'bg-sage' },
  { label: 'On-Time Rate', value: '94%', change: '+5%', icon: Target, color: 'bg-stone' },
]

export default function AnalyticsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Analytics" description="Firm-wide performance metrics and insights." />

      {/* KPI Cards */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi) => (
          <StaggerItem key={kpi.label}>
            <motion.div whileHover={{ y: -2, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-10 h-10 rounded-xl ${kpi.color} flex items-center justify-center`}>
                      <kpi.icon className="w-5 h-5 text-white" />
                    </div>
                    <Badge variant="secondary" className="text-xs text-green-700 bg-green-50">{kpi.change}</Badge>
                  </div>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className="text-sm text-muted-foreground mt-0.5">{kpi.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="bg-sand/50">
          <TabsTrigger value="financial" className="gap-2"><DollarSign className="w-4 h-4" /> Financial</TabsTrigger>
          <TabsTrigger value="projects" className="gap-2"><FolderKanban className="w-4 h-4" /> Projects</TabsTrigger>
          <TabsTrigger value="team" className="gap-2"><Users className="w-4 h-4" /> Team</TabsTrigger>
          <TabsTrigger value="sustainability" className="gap-2"><Leaf className="w-4 h-4" /> Sustainability</TabsTrigger>
        </TabsList>

        <TabsContent value="financial">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Revenue by Service */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Revenue by Service Line</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByService}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" />
                    <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
                    <YAxis stroke="#78716c" fontSize={12} tickFormatter={(v: number) => `$${v / 1000}k`} />
                    <Tooltip formatter={(v) => `$${Number(v ?? 0).toLocaleString()}`} contentStyle={{ borderRadius: '8px', border: '1px solid #e2ddd5' }} />
                    <Legend />
                    <Bar dataKey="landscape" name="Landscape Architecture" fill="#2D5016" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="planning" name="Planning" fill="#7A8B69" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="urban" name="Urban Design" fill="#C4724E" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Client Revenue */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Revenue by Client</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientRevenue.map((c, i) => (
                    <motion.div key={c.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{c.name}</span>
                        <span className="text-sm font-semibold">${(c.revenue / 1000).toFixed(0)}k</span>
                      </div>
                      <Progress value={(c.revenue / 520000) * 100} className="h-2" />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Profitability */}
            <Card className="border-0 shadow-sm lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Project Profitability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-sand/30">
                        <th className="text-left text-xs font-medium text-muted-foreground p-3">Project</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-3">Revenue</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-3">Cost</th>
                        <th className="text-right text-xs font-medium text-muted-foreground p-3">Margin</th>
                        <th className="text-left text-xs font-medium text-muted-foreground p-3 w-40">Profitability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profitByProject.map((p) => (
                        <tr key={p.name} className="border-b last:border-0">
                          <td className="p-3 text-sm font-medium">{p.name}</td>
                          <td className="p-3 text-sm text-right">${(p.revenue / 1000).toFixed(0)}k</td>
                          <td className="p-3 text-sm text-right text-muted-foreground">${(p.cost / 1000).toFixed(0)}k</td>
                          <td className="p-3 text-sm text-right font-semibold text-forest">{p.margin}%</td>
                          <td className="p-3"><Progress value={p.margin} className="h-2" /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Phase Distribution */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Projects by Phase</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={projectsByPhase} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name} (${value})`}>
                      {projectsByPhase.map((entry) => (
                        <Cell key={entry.name} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Schedule Performance */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Schedule Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Riverfront Park', spi: 0.95, status: 'on-track' },
                    { name: 'Sunset Hills', spi: 1.02, status: 'ahead' },
                    { name: 'VCU Medical', spi: 0.88, status: 'at-risk' },
                    { name: 'Libbie Mill IV', spi: 0.97, status: 'on-track' },
                    { name: 'Church Hill N', spi: 1.05, status: 'ahead' },
                    { name: 'River Mill Trail', spi: 0.92, status: 'on-track' },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center gap-4">
                      <span className="text-sm font-medium w-32 truncate">{p.name}</span>
                      <div className="flex-1">
                        <Progress value={p.spi * 100} className="h-2" />
                      </div>
                      <span className="text-sm font-mono w-12 text-right">{p.spi.toFixed(2)}</span>
                      <Badge variant="outline" className={`text-xs ${p.status === 'ahead' ? 'text-green-700 border-green-300' : p.status === 'at-risk' ? 'text-red-700 border-red-300' : 'text-stone border-stone/30'}`}>
                        {p.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Utilization Trend */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Team Utilization Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={utilizationTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" />
                    <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
                    <YAxis stroke="#78716c" fontSize={12} domain={[60, 100]} tickFormatter={(v: number) => `${v}%`} />
                    <Tooltip formatter={(v) => `${v}%`} contentStyle={{ borderRadius: '8px', border: '1px solid #e2ddd5' }} />
                    <Line type="monotone" dataKey="actual" stroke="#2D5016" strokeWidth={2} dot={{ fill: '#2D5016', r: 4 }} name="Actual" />
                    <Line type="monotone" dataKey="target" stroke="#C4724E" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
                    <Legend />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Department Breakdown */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Hours by Department</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { dept: 'Landscape Arch', billable: 620, nonBillable: 140 },
                    { dept: 'Urban Design', billable: 280, nonBillable: 85 },
                    { dept: 'Planning', billable: 310, nonBillable: 70 },
                    { dept: 'Operations', billable: 180, nonBillable: 160 },
                  ]} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" />
                    <XAxis type="number" stroke="#78716c" fontSize={12} />
                    <YAxis type="category" dataKey="dept" stroke="#78716c" fontSize={11} width={100} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2ddd5' }} />
                    <Legend />
                    <Bar dataKey="billable" name="Billable" fill="#2D5016" radius={[0, 4, 4, 0]} stackId="a" />
                    <Bar dataKey="nonBillable" name="Non-Billable" fill="#E8DFD0" radius={[0, 4, 4, 0]} stackId="a" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sustainability">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">Portfolio Sustainability Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <RadarChart data={sustainabilityRadar}>
                    <PolarGrid stroke="#e2ddd5" />
                    <PolarAngleAxis dataKey="metric" stroke="#78716c" fontSize={11} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#e2ddd5" fontSize={10} />
                    <Radar name="Portfolio Avg" dataKey="value" stroke="#2D5016" fill="#2D5016" fillOpacity={0.2} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-serif">SITES Certification Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { project: 'Riverfront Park', points: 112, target: 135, level: 'Gold' },
                    { project: 'Sarah Cannon Garden', points: 68, target: 100, level: 'Silver' },
                    { project: 'River Mill Trail', points: 45, target: 85, level: 'Certified' },
                    { project: 'Hope Church Campus', points: 82, target: 100, level: 'Silver' },
                  ].map((p) => (
                    <div key={p.project}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{p.project}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{p.points}/{p.target} pts</span>
                          <Badge variant="outline" className="text-xs">{p.level}</Badge>
                        </div>
                      </div>
                      <Progress value={(p.points / p.target) * 100} className="h-2.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
