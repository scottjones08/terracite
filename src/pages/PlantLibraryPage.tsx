import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, TreePine, Droplets, Sun, Leaf, Plus } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { plants } from '@/lib/mock-data'

const waterColors: Record<string, string> = {
  'Low': 'text-yellow-600', 'Low-Medium': 'text-lime-600', 'Medium': 'text-green-600',
  'Medium-Wet': 'text-teal-600', 'Wet': 'text-blue-600',
}

const typeIcons: Record<string, string> = {
  'Deciduous Tree': '🌳', 'Shrub': '🌿', 'Perennial': '🌸', 'Ornamental Grass': '🌾',
  'Evergreen Shrub': '🌲', 'Vine': '🌱', 'Deciduous Conifer': '🌲',
}

export default function PlantLibraryPage() {
  const [search, setSearch] = useState('')
  const filtered = plants.filter(p =>
    p.commonName.toLowerCase().includes(search.toLowerCase()) ||
    p.botanicalName.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Plant Library" description={`${plants.length} species in the library`}
        actions={<Button className="bg-forest hover:bg-forest-light text-white"><Plus className="w-4 h-4 mr-2" /> Add Plant</Button>} />

      <div className="flex items-center gap-3 mb-6 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by common or botanical name..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white h-9" />
        </div>
      </div>

      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(p => (
          <StaggerItem key={p.id}>
            <motion.div whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
              <Card className="border-0 shadow-sm cursor-pointer overflow-hidden">
                {/* Image placeholder */}
                <div className="h-36 bg-gradient-to-br from-forest/5 via-sage/10 to-sand/30 flex items-center justify-center">
                  <span className="text-4xl">{typeIcons[p.type] || '🌿'}</span>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold">{p.commonName}</h3>
                  <p className="text-xs italic text-muted-foreground mb-3">{p.botanicalName}</p>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div className="flex items-center gap-1"><Sun className="w-3 h-3 text-yellow-500" /> Zone {p.zone}</div>
                    <div className={`flex items-center gap-1 ${waterColors[p.waterNeeds]}`}><Droplets className="w-3 h-3" /> {p.waterNeeds}</div>
                    <div className="flex items-center gap-1 text-muted-foreground"><TreePine className="w-3 h-3" /> {p.height}</div>
                    <div className="flex items-center gap-1 text-muted-foreground"><Leaf className="w-3 h-3" /> {p.type}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-muted-foreground">Sustainability</span>
                      <Progress value={p.sustainabilityScore} className="h-1.5 w-12" />
                    </div>
                    <Badge className="bg-forest/10 text-forest border-0 text-[10px]">{p.sustainabilityScore}</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-2">Native: {p.nativeRegion}</p>
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </div>
  )
}
