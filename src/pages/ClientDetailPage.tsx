import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { clients, projects, invoices } from '@/lib/mock-data'

export default function ClientDetailPage() {
  const { id } = useParams()
  const client = clients.find(c => c.id === id) || clients[0]
  const clientProjects = projects.filter(p => p.clientId === client.id)
  const clientInvoices = invoices.filter(i => i.client === client.name)

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      <Link to="/clients" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to Clients
      </Link>

      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-serif">{client.name}</h1>
          <div className="flex items-center gap-3 mt-2">
            <Badge variant="secondary">{client.type}</Badge>
            {client.isActive && <Badge className="bg-green-100 text-green-700 border-0">Active</Badge>}
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-forest">${(client.totalRevenue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-muted-foreground">Total Revenue</p>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="bg-white border mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="projects">Projects ({clientProjects.length})</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg font-serif">Contact Information</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3"><Building2 className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{client.contactName}</span></div>
                <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{client.email}</span></div>
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{client.phone}</span></div>
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-muted-foreground" /><span className="text-sm">{client.city}, {client.state}</span></div>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-sm">
              <CardHeader><CardTitle className="text-lg font-serif">Summary</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Active Projects</span><span className="text-sm font-medium">{clientProjects.filter(p => p.status === 'active').length}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Total Projects</span><span className="text-sm font-medium">{client.projectCount}</span></div>
                <div className="flex justify-between"><span className="text-sm text-muted-foreground">Lifetime Revenue</span><span className="text-sm font-medium">${client.totalRevenue.toLocaleString()}</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-3">
            {clientProjects.map(p => (
              <Card key={p.id} className="border-0 shadow-sm">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="flex-1">
                    <Link to={`/projects/${p.id}`} className="text-sm font-medium text-forest hover:underline">{p.name}</Link>
                    <p className="text-xs text-muted-foreground">{p.serviceType} · {p.lead}</p>
                  </div>
                  <Badge variant="outline">{p.phase}</Badge>
                  <div className="w-24"><Progress value={p.progress} className="h-1.5" /></div>
                  <span className="text-xs text-muted-foreground w-8">{p.progress}%</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="communications">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
              {[
                { date: '2026-02-15', subject: 'Design review meeting notes', from: 'Andrew Bleckley', type: 'Meeting' },
                { date: '2026-02-10', subject: 'Phase IV timeline update', from: 'Rachel Torres', type: 'Email' },
                { date: '2026-01-28', subject: 'Budget revision approval request', from: 'Rachel Torres', type: 'Email' },
                { date: '2026-01-15', subject: 'Site visit photos and report', from: 'Elizabeth Fuqua', type: 'Report' },
              ].map((c, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-sand/30">
                  <Badge variant="outline" className="text-[10px] mt-0.5">{c.type}</Badge>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{c.subject}</p>
                    <p className="text-xs text-muted-foreground">{c.from} · {c.date}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <table className="w-full">
                <thead><tr className="border-b"><th className="p-3 text-xs text-left text-muted-foreground">Invoice</th><th className="p-3 text-xs text-left text-muted-foreground">Project</th><th className="p-3 text-xs text-left text-muted-foreground">Amount</th><th className="p-3 text-xs text-left text-muted-foreground">Status</th><th className="p-3 text-xs text-left text-muted-foreground">Due</th></tr></thead>
                <tbody>
                  {clientInvoices.map(inv => (
                    <tr key={inv.id} className="border-b last:border-0 hover:bg-sand/30">
                      <td className="p-3 text-sm font-medium">{inv.number}</td>
                      <td className="p-3 text-sm text-muted-foreground">{inv.project}</td>
                      <td className="p-3 text-sm">${inv.amount.toLocaleString()}</td>
                      <td className="p-3"><Badge variant={inv.status === 'paid' ? 'default' : inv.status === 'overdue' ? 'destructive' : 'secondary'} className="text-xs">{inv.status}</Badge></td>
                      <td className="p-3 text-sm text-muted-foreground">{inv.dueDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
