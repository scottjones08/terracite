import { motion } from 'framer-motion'
import { PenTool, MessageSquare, CheckCircle2, Clock, AlertCircle, Eye } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { designReviews } from '@/lib/mock-data'

const statusConfig: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  pending: { color: 'bg-gray-100 text-gray-700', icon: <Clock className="w-3 h-3" />, label: 'Pending' },
  in_review: { color: 'bg-blue-100 text-blue-700', icon: <Eye className="w-3 h-3" />, label: 'In Review' },
  approved: { color: 'bg-green-100 text-green-700', icon: <CheckCircle2 className="w-3 h-3" />, label: 'Approved' },
  changes_requested: { color: 'bg-orange-100 text-orange-700', icon: <AlertCircle className="w-3 h-3" />, label: 'Changes Requested' },
}

export default function DesignReviewPage() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Design Review" description="Review and approve design submissions" actions={<Button className="bg-forest hover:bg-forest-light text-white"><PenTool className="w-4 h-4 mr-2" /> Upload Design</Button>} />

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {designReviews.map(r => {
          const status = statusConfig[r.status]
          return (
            <StaggerItem key={r.id}>
              <motion.div whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                <Card className="border-0 shadow-sm cursor-pointer overflow-hidden">
                  {/* Thumbnail placeholder */}
                  <div className="h-40 bg-gradient-to-br from-sand to-sage/20 flex items-center justify-center">
                    <PenTool className="w-10 h-10 text-sage/40" />
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-sm font-semibold line-clamp-2 flex-1">{r.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">{r.project}</p>
                    <div className="flex items-center justify-between">
                      <Badge className={`text-[10px] ${status.color} border-0 gap-1`}>{status.icon}{status.label}</Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MessageSquare className="w-3 h-3" /> {r.comments}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs text-muted-foreground">
                      <span>{r.submittedBy}</span>
                      <span>{r.date}</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </div>
  )
}
