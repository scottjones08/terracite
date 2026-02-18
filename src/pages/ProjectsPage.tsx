import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, LayoutGrid, List, GanttChart, Search, Filter } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { projects } from '@/lib/mock-data'

const phases = ['Discovery', 'Design', 'Review', 'Construction', 'Complete']
const phaseColors: Record<string, string> = {
  Discovery: 'bg-blue-50 border-blue-200',
  Design: 'bg-amber-50 border-amber-200',
  Review: 'bg-purple-50 border-purple-200',
  Construction: 'bg-green-50 border-green-200',
  Complete: 'bg-gray-50 border-gray-200',
}

type ViewMode = 'kanban' | 'list' | 'timeline'

export default function ProjectsPage() {
  const [view, setView] = useState<ViewMode>('kanban')
  const [search, setSearch] = useState('')

  const filtered = projects.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 lg:p-8">
      <PageHeader
        title="Projects"
        description={`${projects.filter(p => p.status === 'active').length} active projects`}
        actions={
          <Button className="bg-forest hover:bg-forest-light text-white"><Plus className="w-4 h-4 mr-2" /> New Project</Button>
        }
      />

      {/* Toolbar */}
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search projects..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white h-9" />
          </div>
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-1" /> Filter</Button>
        </div>
        <div className="flex items-center gap-1 bg-white rounded-lg border p-0.5">
          {([['kanban', LayoutGrid], ['list', List], ['timeline', GanttChart]] as const).map(([mode, Icon]) => (
            <Button key={mode} variant={view === mode ? 'default' : 'ghost'} size="sm" onClick={() => setView(mode)}
              className={view === mode ? 'bg-forest text-white hover:bg-forest-light' : ''}>
              <Icon className="w-4 h-4" />
            </Button>
          ))}
        </div>
      </div>

      {view === 'kanban' && (
        <div className="flex gap-4 overflow-x-auto pb-4">
          {phases.map(phase => {
            const phaseProjects = filtered.filter(p => p.phase === phase)
            return (
              <div key={phase} className={`min-w-[280px] w-[280px] rounded-xl border p-3 ${phaseColors[phase]}`}>
                <div className="flex items-center justify-between mb-3 px-1">
                  <h3 className="text-sm font-semibold text-foreground">{phase}</h3>
                  <Badge variant="secondary" className="text-xs">{phaseProjects.length}</Badge>
                </div>
                <StaggerContainer className="space-y-2.5">
                  {phaseProjects.map(p => (
                    <StaggerItem key={p.id}>
                      <Link to={`/projects/${p.id}`}>
                        <motion.div whileHover={{ y: -2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                          <Card className="border-0 shadow-sm cursor-pointer">
                            <CardContent className="p-3.5">
                              <p className="text-sm font-semibold mb-1 line-clamp-2">{p.name}</p>
                              <p className="text-xs text-muted-foreground mb-3">{p.client}</p>
                              <Progress value={p.progress} className="h-1 mb-2" />
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] text-muted-foreground">{p.progress}% complete</span>
                                <Badge variant="outline" className="text-[10px] px-1.5 py-0">{p.serviceType.split(' ')[0]}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      </Link>
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              </div>
            )
          })}
        </div>
      )}

      {view === 'list' && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left">
                  <th className="p-3 text-xs font-medium text-muted-foreground">Project</th>
                  <th className="p-3 text-xs font-medium text-muted-foreground">Client</th>
                  <th className="p-3 text-xs font-medium text-muted-foreground">Phase</th>
                  <th className="p-3 text-xs font-medium text-muted-foreground">Progress</th>
                  <th className="p-3 text-xs font-medium text-muted-foreground">Budget</th>
                  <th className="p-3 text-xs font-medium text-muted-foreground">Lead</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-sand/30 transition-colors">
                    <td className="p-3"><Link to={`/projects/${p.id}`} className="text-sm font-medium text-forest hover:underline">{p.name}</Link></td>
                    <td className="p-3 text-sm text-muted-foreground">{p.client}</td>
                    <td className="p-3"><Badge variant="outline" className="text-xs">{p.phase}</Badge></td>
                    <td className="p-3"><div className="flex items-center gap-2"><Progress value={p.progress} className="h-1.5 w-16" /><span className="text-xs text-muted-foreground">{p.progress}%</span></div></td>
                    <td className="p-3 text-sm">${(p.budget / 1000).toFixed(0)}k</td>
                    <td className="p-3 text-sm text-muted-foreground">{p.lead}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}

      {view === 'timeline' && (
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="space-y-4">
              {filtered.map(p => (
                <div key={p.id} className="flex items-center gap-4">
                  <div className="w-48 shrink-0">
                    <Link to={`/projects/${p.id}`} className="text-sm font-medium text-forest hover:underline">{p.name}</Link>
                    <p className="text-xs text-muted-foreground">{p.lead}</p>
                  </div>
                  <div className="flex-1 relative h-8 bg-sand/50 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${p.progress}%` }}
                      transition={{ duration: 0.8, delay: 0.1 }}
                      className="absolute left-0 top-0 h-full bg-forest/20 rounded-full flex items-center justify-end pr-2"
                    >
                      <span className="text-[10px] font-medium text-forest">{p.progress}%</span>
                    </motion.div>
                    <div className="absolute inset-0 flex items-center px-3">
                      <span className="text-[10px] text-muted-foreground">{p.startDate} → {p.endDate}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs shrink-0">{p.phase}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
