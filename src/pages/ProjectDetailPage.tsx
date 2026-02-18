import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Calendar, DollarSign, Users, Clock, FileText, CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { projects, teamMembers } from '@/lib/mock-data'

const tasks = [
  { id: '1', title: 'Complete grading plan revisions', status: 'in_progress', assignee: 'Andrew Bleckley', priority: 'high', due: '2026-02-20' },
  { id: '2', title: 'Submit stormwater calculations', status: 'todo', assignee: 'James Wright', priority: 'medium', due: '2026-02-25' },
  { id: '3', title: 'Client presentation deck', status: 'in_progress', assignee: 'Nina Patel', priority: 'urgent', due: '2026-02-19' },
  { id: '4', title: 'Review planting plan palette', status: 'completed', assignee: 'Elizabeth Fuqua', priority: 'medium', due: '2026-02-15' },
  { id: '5', title: 'Update construction cost estimate', status: 'todo', assignee: 'Rachel Torres', priority: 'low', due: '2026-03-01' },
  { id: '6', title: 'Coordinate with civil engineer', status: 'completed', assignee: 'Marcus Chen', priority: 'high', due: '2026-02-12' },
]

const statusIcon = { completed: <CheckCircle2 className="w-4 h-4 text-green-500" />, in_progress: <Circle className="w-4 h-4 text-blue-500" />, todo: <Circle className="w-4 h-4 text-muted-foreground" /> }
const priorityColor: Record<string, string> = { urgent: 'text-red-600', high: 'text-orange-600', medium: 'text-yellow-600', low: 'text-green-600' }

export default function ProjectDetailPage() {
  const { id } = useParams()
  const project = projects.find(p => p.id === id) || projects[0]
  const budgetPercent = Math.round((project.spent / project.budget) * 100)

  return (
    <div className="p-6 lg:p-8 max-w-[1400px] mx-auto">
      <Link to="/projects" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>

      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-serif text-foreground">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.client} · {project.serviceType}</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-forest/10 text-forest border-forest/20">{project.phase}</Badge>
          <Badge variant="outline">{project.status}</Badge>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { icon: DollarSign, label: 'Budget', value: `$${(project.budget / 1000).toFixed(0)}k`, sub: `$${(project.spent / 1000).toFixed(0)}k spent` },
          { icon: Calendar, label: 'Timeline', value: project.endDate, sub: `Started ${project.startDate}` },
          { icon: Users, label: 'Lead', value: project.lead, sub: project.serviceType },
          { icon: Clock, label: 'Progress', value: `${project.progress}%`, sub: project.phase },
        ].map(s => (
          <Card key={s.label} className="border-0 shadow-sm">
            <CardContent className="p-4 flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-sand flex items-center justify-center shrink-0">
                <s.icon className="w-4 h-4 text-stone" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{s.label}</p>
                <p className="text-sm font-semibold">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-white border mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="files">Files</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg font-serif">Description</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map(t => <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>)}
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg font-serif">Budget Overview</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Spent</span>
                  <span className="text-sm font-medium">${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
                </div>
                <Progress value={budgetPercent} className="h-2 mb-1" />
                <p className={`text-xs ${budgetPercent > 90 ? 'text-red-500' : 'text-muted-foreground'}`}>{budgetPercent}% of budget used</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="divide-y">
                {tasks.map(t => (
                  <motion.div key={t.id} whileHover={{ backgroundColor: 'rgba(232,223,208,0.3)' }} className="flex items-center gap-4 p-4">
                    {statusIcon[t.status as keyof typeof statusIcon]}
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${t.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>{t.title}</p>
                      <p className="text-xs text-muted-foreground">{t.assignee} · Due {t.due}</p>
                    </div>
                    <AlertCircle className={`w-3.5 h-3.5 ${priorityColor[t.priority]}`} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="files">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Master Plan v3.pdf', 'Grading Plan.dwg', 'Planting Plan.pdf', 'Rendering_01.png', 'Site Survey.dwg', 'Cost Estimate.xlsx', 'Stormwater Calcs.pdf', 'Client Feedback.docx'].map(f => (
                  <motion.div key={f} whileHover={{ y: -2 }} className="flex flex-col items-center gap-2 p-4 rounded-lg border bg-white hover:shadow-sm cursor-pointer">
                    <FileText className="w-8 h-8 text-stone" />
                    <span className="text-xs text-center truncate w-full">{f}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  { phase: 'Discovery', allocated: 42000, spent: 42000 },
                  { phase: 'Schematic Design', allocated: 84000, spent: 78000 },
                  { phase: 'Design Development', allocated: 126000, spent: 110000 },
                  { phase: 'Construction Documents', allocated: 105000, spent: 52000 },
                  { phase: 'Construction Admin', allocated: 63000, spent: 5000 },
                ].map(ph => (
                  <div key={ph.phase} className="flex items-center gap-4">
                    <div className="w-40 shrink-0"><span className="text-sm font-medium">{ph.phase}</span></div>
                    <div className="flex-1"><Progress value={Math.round(ph.spent / ph.allocated * 100)} className="h-2" /></div>
                    <div className="w-32 text-right text-xs text-muted-foreground">${(ph.spent / 1000).toFixed(0)}k / ${(ph.allocated / 1000).toFixed(0)}k</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamMembers.slice(0, 6).map(m => (
              <Card key={m.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-3">
                  <Avatar><AvatarFallback className="bg-forest text-white text-xs">{m.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                  <div>
                    <p className="text-sm font-medium">{m.name}</p>
                    <p className="text-xs text-muted-foreground">{m.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="space-y-6 relative before:absolute before:left-[15px] before:top-0 before:bottom-0 before:w-px before:bg-border">
                {[
                  { date: 'Mar 2025', event: 'Project Kickoff', status: 'completed' },
                  { date: 'Jun 2025', event: 'Schematic Design Complete', status: 'completed' },
                  { date: 'Oct 2025', event: 'Design Development Complete', status: 'completed' },
                  { date: 'Feb 2026', event: 'Construction Docs Submission', status: 'in_progress' },
                  { date: 'Apr 2026', event: 'Bidding & Permits', status: 'upcoming' },
                  { date: 'Jun 2026', event: 'Construction Start', status: 'upcoming' },
                ].map(e => (
                  <div key={e.event} className="flex items-start gap-4 relative">
                    <div className={`w-[30px] h-[30px] rounded-full border-2 flex items-center justify-center z-10 ${
                      e.status === 'completed' ? 'bg-forest border-forest' : e.status === 'in_progress' ? 'bg-white border-terracotta' : 'bg-white border-border'
                    }`}>
                      {e.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-white" />}
                      {e.status === 'in_progress' && <Circle className="w-3 h-3 text-terracotta fill-terracotta" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{e.event}</p>
                      <p className="text-xs text-muted-foreground">{e.date}</p>
                    </div>
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
