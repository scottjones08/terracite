import { motion } from 'framer-motion'
import { FileCheck, AlertTriangle, Clock, CheckCircle2, Circle, PenLine } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/shared/PageHeader'
import { permits } from '@/lib/mock-data'

const statusFlow = ['not_started', 'application_prep', 'submitted', 'under_review', 'revisions_needed', 'approved']
const statusLabels: Record<string, string> = {
  not_started: 'Not Started', application_prep: 'Preparing', submitted: 'Submitted',
  under_review: 'Under Review', revisions_needed: 'Revisions', approved: 'Approved', denied: 'Denied'
}
const statusColors: Record<string, string> = {
  not_started: 'bg-gray-100 text-gray-600', application_prep: 'bg-blue-100 text-blue-700',
  submitted: 'bg-indigo-100 text-indigo-700', under_review: 'bg-yellow-100 text-yellow-700',
  revisions_needed: 'bg-orange-100 text-orange-700', approved: 'bg-green-100 text-green-700', denied: 'bg-red-100 text-red-700'
}

export default function PermitsPage() {
  const approved = permits.filter(p => p.status === 'approved').length
  const pending = permits.filter(p => !['approved', 'not_started'].includes(p.status)).length

  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Permits & Compliance" description="Track permits, inspections, and regulatory compliance"
        actions={<Button className="bg-forest hover:bg-forest-light text-white"><FileCheck className="w-4 h-4 mr-2" /> New Permit</Button>} />

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="border-0 shadow-sm"><CardContent className="p-4">
          <p className="text-2xl font-bold text-green-600">{approved}</p>
          <p className="text-sm text-muted-foreground">Approved</p>
        </CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4">
          <p className="text-2xl font-bold text-yellow-600">{pending}</p>
          <p className="text-sm text-muted-foreground">In Progress</p>
        </CardContent></Card>
        <Card className="border-0 shadow-sm"><CardContent className="p-4">
          <p className="text-2xl font-bold text-terracotta">2</p>
          <p className="text-sm text-muted-foreground">Expiring Soon</p>
        </CardContent></Card>
      </div>

      {/* Pipeline */}
      <Card className="border-0 shadow-sm mb-8">
        <CardHeader><CardTitle className="text-lg font-serif">Permit Pipeline</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {statusFlow.map(status => {
              const items = permits.filter(p => p.status === status)
              return (
                <div key={status} className="min-w-[200px] flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xs font-semibold uppercase text-muted-foreground">{statusLabels[status]}</h3>
                    <Badge variant="secondary" className="text-[10px]">{items.length}</Badge>
                  </div>
                  <div className="space-y-2">
                    {items.map(p => (
                      <motion.div key={p.id} whileHover={{ y: -1 }}>
                        <Card className="border shadow-none">
                          <CardContent className="p-3">
                            <p className="text-xs font-semibold">{p.type}</p>
                            <p className="text-[10px] text-muted-foreground">{p.project}</p>
                            <p className="text-[10px] text-muted-foreground mt-1">{p.assignedTo}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full">
            <thead><tr className="border-b">
              <th className="p-3 text-xs text-left text-muted-foreground">Permit</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Project</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Authority</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Status</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Applied</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Assigned</th>
            </tr></thead>
            <tbody>
              {permits.map(p => (
                <tr key={p.id} className="border-b last:border-0 hover:bg-sand/30">
                  <td className="p-3 text-sm font-medium">{p.type}</td>
                  <td className="p-3 text-sm text-muted-foreground">{p.project}</td>
                  <td className="p-3 text-sm text-muted-foreground">{p.authority}</td>
                  <td className="p-3"><Badge className={`text-xs ${statusColors[p.status]} border-0`}>{statusLabels[p.status]}</Badge></td>
                  <td className="p-3 text-sm text-muted-foreground">{p.applicationDate || '—'}</td>
                  <td className="p-3 text-sm text-muted-foreground">{p.assignedTo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
