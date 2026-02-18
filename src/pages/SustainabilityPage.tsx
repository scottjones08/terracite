import { motion } from 'framer-motion'
import { BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Leaf, TreePine, Droplets, Wind } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import PageHeader from '@/components/shared/PageHeader'
import AnimatedNumber from '@/components/shared/AnimatedNumber'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'

const sitesCredits = [
  { category: 'Water', earned: 8, possible: 12 },
  { category: 'Soil + Vegetation', earned: 14, possible: 18 },
  { category: 'Materials', earned: 5, possible: 8 },
  { category: 'Human Health', earned: 10, possible: 14 },
  { category: 'Construction', earned: 4, possible: 6 },
  { category: 'Operations', earned: 7, possible: 10 },
  { category: 'Monitoring', earned: 3, possible: 4 },
]

const nativePlantData = [
  { name: 'Native', value: 72, color: '#2D5016' },
  { name: 'Adapted', value: 18, color: '#7A8B69' },
  { name: 'Non-Native', value: 10, color: '#C4724E' },
]

const carbonData = [
  { month: 'Jan', sequestered: 12, emitted: 8 },
  { month: 'Feb', sequestered: 14, emitted: 7 },
  { month: 'Mar', sequestered: 18, emitted: 9 },
  { month: 'Apr', sequestered: 22, emitted: 6 },
  { month: 'May', sequestered: 28, emitted: 5 },
  { month: 'Jun', sequestered: 32, emitted: 4 },
]

export default function SustainabilityPage() {
  const totalEarned = sitesCredits.reduce((a, c) => a + c.earned, 0)
  const totalPossible = sitesCredits.reduce((a, c) => a + c.possible, 0)

  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Sustainability" description="SITES/LEED tracking, carbon dashboard, and native plant metrics" />

      {/* Stats */}
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {[
          { label: 'SITES Score', value: totalEarned, total: totalPossible, icon: Leaf, color: 'bg-forest' },
          { label: 'Native Species', value: 72, total: 100, icon: TreePine, color: 'bg-sage', suffix: '%' },
          { label: 'Water Reduction', value: 34, total: 100, icon: Droplets, color: 'bg-blue-500', suffix: '%' },
          { label: 'Carbon Offset', value: 126, total: 200, icon: Wind, color: 'bg-terracotta', suffix: ' tons' },
        ].map(s => (
          <StaggerItem key={s.label}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-5">
                <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
                  <s.icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-2xl font-bold"><AnimatedNumber value={s.value} suffix={s.suffix} /></div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <Progress value={(s.value / s.total) * 100} className="h-1.5 mt-2" />
              </CardContent>
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* SITES Credits */}
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-serif">SITES Credit Tracker</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sitesCredits.map(c => (
                <div key={c.category} className="flex items-center gap-3">
                  <div className="w-32 text-sm font-medium">{c.category}</div>
                  <div className="flex-1"><Progress value={(c.earned / c.possible) * 100} className="h-2" /></div>
                  <span className="text-xs text-muted-foreground w-16 text-right">{c.earned}/{c.possible}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-sm font-medium">Total SITES Score</span>
              <Badge className="bg-forest text-white">{totalEarned}/{totalPossible} ({Math.round(totalEarned / totalPossible * 100)}%)</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Native Plant Chart */}
        <Card className="border-0 shadow-sm">
          <CardHeader><CardTitle className="text-lg font-serif">Native Plant Distribution</CardTitle></CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={nativePlantData} dataKey="value" cx="50%" cy="50%" outerRadius={90} innerRadius={50} paddingAngle={3} label={({ name, value }) => `${name} ${value}%`}>
                  {nativePlantData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Carbon Dashboard */}
      <Card className="border-0 shadow-sm">
        <CardHeader><CardTitle className="text-lg font-serif">Carbon Sequestration vs Emissions (tons CO₂)</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={carbonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2ddd5" />
              <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
              <YAxis stroke="#78716c" fontSize={12} />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="sequestered" stroke="#2D5016" fill="#2D5016" fillOpacity={0.15} strokeWidth={2} name="Sequestered" />
              <Area type="monotone" dataKey="emitted" stroke="#C4724E" fill="#C4724E" fillOpacity={0.15} strokeWidth={2} name="Emitted" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
