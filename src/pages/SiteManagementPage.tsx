import { motion } from 'framer-motion'
import { MapPin, Camera, Cloud, Thermometer, Plus, Navigation } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { siteVisits } from '@/lib/mock-data'

export default function SiteManagementPage() {
  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Site Management" description="Site visits, field notes, and GPS documentation"
        actions={<Button className="bg-forest hover:bg-forest-light text-white"><Plus className="w-4 h-4 mr-2" /> Log Site Visit</Button>} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Map Placeholder */}
        <Card className="lg:col-span-2 border-0 shadow-sm overflow-hidden">
          <div className="h-[350px] bg-gradient-to-br from-sage/10 via-sand/30 to-forest/5 flex items-center justify-center relative">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-forest/30 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Interactive Map — Mapbox GL Integration</p>
              <p className="text-xs text-muted-foreground mt-1">GPS-tagged site visits and field notes</p>
            </div>
            {/* Fake pins */}
            {[{ top: '25%', left: '30%' }, { top: '45%', left: '60%' }, { top: '60%', left: '40%' }, { top: '35%', left: '75%' }].map((pos, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3 + i * 0.1 }}
                className="absolute w-6 h-6 bg-terracotta rounded-full border-2 border-white shadow-md flex items-center justify-center"
                style={{ top: pos.top, left: pos.left }}>
                <Navigation className="w-3 h-3 text-white" />
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Quick stats */}
        <div className="space-y-4">
          {[
            { label: 'Total Site Visits', value: '47', sub: 'This quarter' },
            { label: 'Photos Documented', value: '312', sub: 'Across all projects' },
            { label: 'Field Notes', value: '89', sub: '12 flagged for review' },
            { label: 'Active Sites', value: '8', sub: 'In construction phase' },
          ].map(s => (
            <Card key={s.label} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-forest">{s.value}</p>
                <p className="text-sm font-medium">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Site Visit Log */}
      <h2 className="text-xl font-serif mb-4">Recent Site Visits</h2>
      <StaggerContainer className="space-y-4">
        {siteVisits.map(v => (
          <StaggerItem key={v.id}>
            <motion.div whileHover={{ x: 2 }}>
              <Card className="border-0 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm font-semibold">{v.project}</h3>
                      <p className="text-xs text-muted-foreground">{v.visitor} · {v.date}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{v.purpose}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{v.notes}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Cloud className="w-3 h-3" />{v.weather}</span>
                    <span className="flex items-center gap-1"><Camera className="w-3 h-3" />{v.photos} photos</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{v.gps}</span>
                  </div>
                  {/* Photo grid placeholder */}
                  <div className="grid grid-cols-6 gap-2 mt-3">
                    {Array.from({ length: Math.min(v.photos, 6) }).map((_, i) => (
                      <div key={i} className="aspect-square rounded-lg bg-sand/50 flex items-center justify-center">
                        <Camera className="w-4 h-4 text-stone/30" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
