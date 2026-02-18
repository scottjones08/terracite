import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Search, Building2, Mail, Phone, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'
import { clients } from '@/lib/mock-data'

export default function ClientsPage() {
  const [search, setSearch] = useState('')
  const filtered = clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Clients" description={`${clients.length} total clients`}
        actions={<Button className="bg-forest hover:bg-forest-light text-white"><Plus className="w-4 h-4 mr-2" /> Add Client</Button>} />

      <div className="flex items-center gap-3 mb-6 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search clients..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white h-9" />
        </div>
      </div>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map(c => (
          <StaggerItem key={c.id}>
            <Link to={`/clients/${c.id}`}>
              <motion.div whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(0,0,0,0.08)' }}>
                <Card className="border-0 shadow-sm cursor-pointer h-full">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3 mb-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-sand text-stone text-xs">{c.name.split(' ').slice(0, 2).map(w => w[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold truncate">{c.name}</h3>
                        <Badge variant="secondary" className="text-[10px] mt-0.5">{c.type}</Badge>
                      </div>
                      {c.isActive && <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5" />}
                    </div>
                    <div className="space-y-1.5 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2"><Building2 className="w-3 h-3" />{c.contactName}</div>
                      <div className="flex items-center gap-2"><MapPin className="w-3 h-3" />{c.city}, {c.state}</div>
                    </div>
                    <div className="flex items-center justify-between mt-4 pt-3 border-t">
                      <div>
                        <p className="text-lg font-bold text-forest">{c.projectCount}</p>
                        <p className="text-[10px] text-muted-foreground">Projects</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold">${(c.totalRevenue / 1000).toFixed(0)}k</p>
                        <p className="text-[10px] text-muted-foreground">Revenue</p>
                      </div>
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
}
