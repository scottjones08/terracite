import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import PageHeader from '@/components/shared/PageHeader'
import { teamMembers, weeklyUtilization } from '@/lib/mock-data'

const weeks = ['Feb 3', 'Feb 10', 'Feb 17', 'Feb 24']

function utilColor(v: number) {
  if (v >= 90) return 'bg-red-100 text-red-700'
  if (v >= 80) return 'bg-green-100 text-green-700'
  if (v >= 70) return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-600'
}

export default function ResourcePlanningPage() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Resource Planning" description="Team capacity and utilization tracking" />

      {/* Team Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Avg Utilization', value: '82%', color: 'text-forest' },
          { label: 'Over-Allocated', value: '2', color: 'text-red-500' },
          { label: 'Under-Allocated', value: '1', color: 'text-yellow-600' },
          { label: 'Total Capacity', value: '320 hrs/wk', color: 'text-stone' },
        ].map(s => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-sm text-muted-foreground">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Capacity Grid */}
      <Card className="border-0 shadow-sm mb-8">
        <CardHeader><CardTitle className="text-lg font-serif">Weekly Capacity Grid</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground w-48">Team Member</th>
                  <th className="p-3 text-left text-xs font-medium text-muted-foreground w-24">Target</th>
                  {weeks.map(w => <th key={w} className="p-3 text-center text-xs font-medium text-muted-foreground w-24">{w}</th>)}
                </tr>
              </thead>
              <tbody>
                {teamMembers.map(m => {
                  const firstName = m.name.split(' ')[0]
                  return (
                    <tr key={m.id} className="border-b last:border-0 hover:bg-sand/30">
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <Avatar className="w-7 h-7"><AvatarFallback className="bg-forest text-white text-[10px]">{m.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                          <div>
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-[10px] text-muted-foreground">{m.department}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-sm text-muted-foreground">75%</td>
                      {weeklyUtilization.map((week, i) => {
                        const val = (week as unknown as Record<string, number>)[firstName] || 0
                        return (
                          <td key={i} className="p-3 text-center">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}>
                              <Badge className={`text-xs font-mono ${utilColor(val)} border-0`}>{val}%</Badge>
                            </motion.div>
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Individual Cards */}
      <h2 className="text-xl font-serif mb-4">Team Members</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {teamMembers.map(m => (
          <motion.div key={m.id} whileHover={{ y: -2 }}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar><AvatarFallback className="bg-forest text-white text-xs">{m.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.title}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Utilization</span>
                  <span className="text-xs font-medium">{m.utilization}%</span>
                </div>
                <Progress value={m.utilization} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-2">${m.hourlyRate}/hr · {m.department}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
