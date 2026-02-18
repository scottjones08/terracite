import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Send, Pin, Search, Plus, Paperclip, Hash, Users, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'

const channels = [
  { id: '1', name: 'Riverfront Park', type: 'project', unread: 3, lastMessage: 'Grading plans updated', time: '12m ago' },
  { id: '2', name: 'Sunset Hills', type: 'project', unread: 0, lastMessage: 'Pool deck approved', time: '2h ago' },
  { id: '3', name: 'VCU Medical Campus', type: 'project', unread: 1, lastMessage: 'Client feedback received', time: '4h ago' },
  { id: '4', name: 'Libbie Mill Phase IV', type: 'project', unread: 5, lastMessage: 'Plaza section needs revision', time: '30m ago' },
  { id: '5', name: 'General', type: 'team', unread: 0, lastMessage: 'Happy Friday everyone!', time: '1d ago' },
  { id: '6', name: 'Design Team', type: 'team', unread: 2, lastMessage: 'New plant palette standards', time: '3h ago' },
]

const messages = [
  { id: '1', author: 'Andrew Bleckley', initials: 'AB', content: `Just completed the site visit at Riverfront Park. Grading work is about 80% complete. The retaining wall footings along the river edge look solid. I've uploaded 6 new photos to the site management module.`, time: '10:32 AM', isPinned: true },
  { id: '2', author: 'Elizabeth Fuqua', initials: 'EF', content: 'Great progress! Did you get a chance to check the drainage swale near the amphitheater area? The contractor mentioned some concerns about the grade there.', time: '10:45 AM', isPinned: false },
  { id: '3', author: 'Andrew Bleckley', initials: 'AB', content: `Yes — I flagged that in my field notes. The swale needs about 6" more depth at the outlet. I've created a task for the grading subcontractor. @JamesWright can you review the stormwater calcs for that area?`, time: '10:52 AM', isPinned: false },
  { id: '4', author: 'James Wright', initials: 'JW', content: `On it. I'll run the updated calcs this afternoon and have the revised drainage plan ready by EOD tomorrow. The current design handles a 10-year storm but we might want to bump it to 25-year given the proximity to the river.`, time: '11:15 AM', isPinned: false },
  { id: '5', author: 'Rachel Torres', initials: 'RT', content: `Quick heads up — the City of Richmond wants to schedule a progress review meeting next week. I've proposed Wednesday at 2pm. Does that work for the team leads?`, time: '11:30 AM', isPinned: false },
  { id: '6', author: 'Nina Patel', initials: 'NP', content: `Wednesday works for me. I'll have the updated planting plan rendered by then. Also, the native plant supplier confirmed availability for the spring installation — 95% of our palette is in stock.`, time: '11:48 AM', isPinned: false },
  { id: '7', author: 'Andrew Bleckley', initials: 'AB', content: `Perfect. Let's plan to show the updated master plan rendering, grading progress photos, and the revised planting schedule. @RachelTorres can you prepare the budget summary slide?`, time: '12:05 PM', isPinned: true },
]

const meetingNotes = [
  { id: '1', title: 'Client Design Review — Riverfront Park', date: 'Feb 15, 2026', attendees: ['Andrew Bleckley', 'Elizabeth Fuqua', 'Councilwoman Davis'], actionItems: 3 },
  { id: '2', title: 'Weekly Team Standup', date: 'Feb 17, 2026', attendees: ['Full Team'], actionItems: 7 },
  { id: '3', title: 'VCU Healing Garden — Stakeholder Workshop', date: 'Feb 12, 2026', attendees: ['Marcus Chen', 'Nina Patel', 'Dr. Torres'], actionItems: 5 },
  { id: '4', title: 'Libbie Mill Phase IV — Contractor Coordination', date: 'Feb 10, 2026', attendees: ['Andrew Bleckley', 'Rachel Torres', 'Thomas Grant'], actionItems: 4 },
]

const rfis = [
  { id: '1', number: 'RFI-001', subject: 'Retaining Wall Material Substitution', project: 'Riverfront Park', status: 'open', priority: 'high', dueDate: 'Feb 22, 2026' },
  { id: '2', number: 'RFI-002', subject: 'ADA Ramp Slope Clarification', project: 'VCU Medical Campus', status: 'responded', priority: 'normal', dueDate: 'Feb 18, 2026' },
  { id: '3', number: 'RFI-003', subject: 'Tree Protection Zone Boundary', project: 'Libbie Mill Phase IV', status: 'open', priority: 'urgent', dueDate: 'Feb 20, 2026' },
  { id: '4', number: 'RFI-004', subject: 'Irrigation Controller Location', project: 'Sunset Hills', status: 'closed', priority: 'low', dueDate: 'Feb 10, 2026' },
]

const statusColors: Record<string, string> = {
  open: 'bg-yellow-100 text-yellow-700',
  responded: 'bg-blue-100 text-blue-700',
  closed: 'bg-green-100 text-green-700',
}

const priorityColors: Record<string, string> = {
  urgent: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  normal: 'bg-gray-100 text-gray-700',
  low: 'bg-green-100 text-green-700',
}

const avatarColors: Record<string, string> = {
  AB: 'bg-forest text-white',
  EF: 'bg-terracotta text-white',
  JW: 'bg-sage text-white',
  RT: 'bg-stone text-white',
  NP: 'bg-forest-light text-white',
  MC: 'bg-terracotta-light text-white',
}

export default function CommunicationsPage() {
  const [selectedChannel, setSelectedChannel] = useState('1')
  const [newMessage, setNewMessage] = useState('')

  return (
    <div className="p-6 lg:p-8 max-w-[1600px] mx-auto">
      <PageHeader title="Communications" description="Team messaging, meeting notes, and RFI tracking." />

      <Tabs defaultValue="messages" className="space-y-6">
        <TabsList className="bg-sand/50">
          <TabsTrigger value="messages" className="gap-2"><MessageSquare className="w-4 h-4" /> Messages</TabsTrigger>
          <TabsTrigger value="meetings" className="gap-2"><Clock className="w-4 h-4" /> Meeting Notes</TabsTrigger>
          <TabsTrigger value="rfis" className="gap-2"><Hash className="w-4 h-4" /> RFIs</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-280px)]">
            {/* Channel List */}
            <Card className="border-0 shadow-sm lg:col-span-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">Channels</CardTitle>
                  <Button variant="ghost" size="icon" className="w-7 h-7"><Plus className="w-4 h-4" /></Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <Input placeholder="Search..." className="pl-8 h-8 text-sm bg-cream" />
                </div>
              </CardHeader>
              <ScrollArea className="h-[calc(100%-120px)]">
                <div className="px-3 pb-3 space-y-0.5">
                  {channels.map((ch) => (
                    <motion.button
                      key={ch.id}
                      whileHover={{ x: 2 }}
                      onClick={() => setSelectedChannel(ch.id)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-lg text-left transition-colors ${selectedChannel === ch.id ? 'bg-forest/10 text-forest' : 'hover:bg-sand/50'}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-sand flex items-center justify-center">
                        {ch.type === 'project' ? <Hash className="w-3.5 h-3.5 text-stone" /> : <Users className="w-3.5 h-3.5 text-stone" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium truncate">{ch.name}</span>
                          {ch.unread > 0 && <Badge className="bg-terracotta text-white text-[10px] px-1.5 h-4">{ch.unread}</Badge>}
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{ch.lastMessage}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </ScrollArea>
            </Card>

            {/* Message Thread */}
            <Card className="border-0 shadow-sm lg:col-span-3 flex flex-col">
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Hash className="w-4 h-4 text-forest" />
                    <CardTitle className="text-base font-medium">Riverfront Park Master Plan</CardTitle>
                    <Badge variant="outline" className="text-xs">12 members</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="w-8 h-8"><Pin className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="w-8 h-8"><Search className="w-4 h-4" /></Button>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 p-3 rounded-lg ${msg.isPinned ? 'bg-forest/5 border border-forest/10' : 'hover:bg-sand/30'}`}
                    >
                      <Avatar className="w-8 h-8 shrink-0">
                        <AvatarFallback className={`text-xs ${avatarColors[msg.initials] || 'bg-stone text-white'}`}>{msg.initials}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold">{msg.author}</span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                          {msg.isPinned && <Pin className="w-3 h-3 text-forest" />}
                        </div>
                        <p className="text-sm text-foreground/80 mt-1 leading-relaxed">{msg.content}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Textarea
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="min-h-[44px] max-h-[120px] resize-none pr-24 bg-cream"
                      rows={1}
                    />
                    <div className="absolute right-2 bottom-2 flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="w-7 h-7"><Paperclip className="w-4 h-4 text-muted-foreground" /></Button>
                    </div>
                  </div>
                  <Button className="bg-forest hover:bg-forest-light shrink-0 self-end">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="meetings">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {meetingNotes.map((m) => (
              <StaggerItem key={m.id}>
                <motion.div whileHover={{ y: -2 }}>
                  <Card className="border-0 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-sm font-semibold">{m.title}</h3>
                          <p className="text-xs text-muted-foreground mt-0.5">{m.date}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">{m.actionItems} actions</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{m.attendees.join(', ')}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </TabsContent>

        <TabsContent value="rfis">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-sand/30">
                      <th className="text-left text-xs font-medium text-muted-foreground p-4">RFI #</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-4">Subject</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-4">Project</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-4">Priority</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-4">Status</th>
                      <th className="text-left text-xs font-medium text-muted-foreground p-4">Due Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rfis.map((rfi) => (
                      <motion.tr key={rfi.id} whileHover={{ backgroundColor: 'rgba(232,223,208,0.3)' }} className="border-b last:border-0 cursor-pointer">
                        <td className="p-4 text-sm font-mono font-medium text-forest">{rfi.number}</td>
                        <td className="p-4 text-sm font-medium">{rfi.subject}</td>
                        <td className="p-4 text-sm text-muted-foreground">{rfi.project}</td>
                        <td className="p-4"><Badge className={`text-xs ${priorityColors[rfi.priority]}`}>{rfi.priority}</Badge></td>
                        <td className="p-4"><Badge className={`text-xs ${statusColors[rfi.status]}`}>{rfi.status}</Badge></td>
                        <td className="p-4 text-sm text-muted-foreground">{rfi.dueDate}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
