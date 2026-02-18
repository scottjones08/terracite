import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Building2, Puzzle, Bell, Shield, Palette, Save, Camera, Mail, Phone, MapPin, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'

const integrations = [
  { name: 'Supabase', description: 'Database, auth, and storage', connected: true, icon: '🗄️' },
  { name: 'Mapbox', description: 'Project site mapping and GPS', connected: true, icon: '🗺️' },
  { name: 'Stripe', description: 'Payment processing and invoicing', connected: false, icon: '💳' },
  { name: 'Google Workspace', description: 'Calendar and document sync', connected: true, icon: '📅' },
  { name: 'AutoCAD Web', description: 'CAD file preview and markup', connected: false, icon: '📐' },
  { name: 'Resend', description: 'Transactional email delivery', connected: true, icon: '📧' },
  { name: 'Sentry', description: 'Error tracking and monitoring', connected: true, icon: '🐛' },
  { name: 'PostHog', description: 'Product analytics', connected: false, icon: '📊' },
]

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    email: true, push: true, taskAssigned: true, reviewRequested: true,
    deadlineReminder: true, clientMessage: true, weeklyDigest: true, invoicePaid: false,
  })

  return (
    <div className="p-6 lg:p-8 max-w-[1200px] mx-auto">
      <PageHeader title="Settings" description="Manage your profile, organization, and integrations." />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-sand/50">
          <TabsTrigger value="profile" className="gap-2"><User className="w-4 h-4" /> Profile</TabsTrigger>
          <TabsTrigger value="organization" className="gap-2"><Building2 className="w-4 h-4" /> Organization</TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2"><Bell className="w-4 h-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="integrations" className="gap-2"><Puzzle className="w-4 h-4" /> Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <div className="space-y-6">
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-serif">Personal Information</CardTitle>
                <CardDescription>Update your profile details and preferences.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-20 h-20">
                      <AvatarFallback className="bg-forest text-white text-xl">AB</AvatarFallback>
                    </Avatar>
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                      <Camera className="w-3.5 h-3.5 text-forest" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Andrew Bleckley</h3>
                    <p className="text-sm text-muted-foreground">Principal, Landscape Architect</p>
                    <Badge variant="outline" className="mt-1 text-xs">Owner</Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="Andrew Bleckley" className="bg-cream" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" defaultValue="Principal, Landscape Architect" className="bg-cream" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="email" defaultValue="andrew@citedesign.com" className="pl-10 bg-cream" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input id="phone" defaultValue="(804) 340-2848" className="pl-10 bg-cream" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Landscape Architecture" className="bg-cream" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate</Label>
                    <Input id="hourlyRate" defaultValue="$185" className="bg-cream" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" defaultValue="Principal landscape architect with 18 years of experience designing sustainable outdoor spaces across Virginia. Specializing in parks, public spaces, and mixed-use community design." className="bg-cream" rows={3} />
                </div>

                <div className="flex justify-end">
                  <Button className="bg-forest hover:bg-forest-light gap-2">
                    <Save className="w-4 h-4" /> Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="organization">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Organization Settings</CardTitle>
              <CardDescription>Manage your firm's information and branding.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Firm Name</Label>
                  <Input defaultValue="Cite Design" className="bg-cream" />
                </div>
                <div className="space-y-2">
                  <Label>Website</Label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue="www.cite-design.com" className="pl-10 bg-cream" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input defaultValue="info@cite-design.com" className="bg-cream" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="804.340.2848" className="bg-cream" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Address</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input defaultValue="310 North Adams Street, Richmond, VA 23220" className="pl-10 bg-cream" />
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-semibold mb-3">Subscription</h4>
                <div className="flex items-center gap-4 p-4 bg-forest/5 rounded-lg border border-forest/10">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">Professional Plan</span>
                      <Badge className="bg-forest text-white text-xs">Active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Up to 25 team members · Unlimited projects · All modules</p>
                  </div>
                  <Button variant="outline" size="sm">Manage Plan</Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button className="bg-forest hover:bg-forest-light gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-serif">Notification Preferences</CardTitle>
              <CardDescription>Choose how and when you receive notifications.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-sand/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch checked={notifications.email} onCheckedChange={(v) => setNotifications({ ...notifications, email: v })} />
              </div>
              <div className="flex items-center justify-between p-4 bg-sand/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Push Notifications</p>
                  <p className="text-xs text-muted-foreground">Browser and mobile push notifications</p>
                </div>
                <Switch checked={notifications.push} onCheckedChange={(v) => setNotifications({ ...notifications, push: v })} />
              </div>

              <Separator />

              <h4 className="text-sm font-semibold">Activity Notifications</h4>
              {[
                { key: 'taskAssigned' as const, label: 'Task Assigned', desc: 'When a task is assigned to you' },
                { key: 'reviewRequested' as const, label: 'Review Requested', desc: 'When someone requests your design review' },
                { key: 'deadlineReminder' as const, label: 'Deadline Reminders', desc: '3-day and 1-day warnings' },
                { key: 'clientMessage' as const, label: 'Client Messages', desc: 'New messages from clients' },
                { key: 'weeklyDigest' as const, label: 'Weekly Digest', desc: 'Summary of project activity' },
                { key: 'invoicePaid' as const, label: 'Invoice Paid', desc: 'When a client pays an invoice' },
              ].map((n) => (
                <div key={n.key} className="flex items-center justify-between py-3">
                  <div>
                    <p className="text-sm font-medium">{n.label}</p>
                    <p className="text-xs text-muted-foreground">{n.desc}</p>
                  </div>
                  <Switch checked={notifications[n.key]} onCheckedChange={(v) => setNotifications({ ...notifications, [n.key]: v })} />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {integrations.map((int) => (
              <StaggerItem key={int.name}>
                <motion.div whileHover={{ y: -2 }}>
                  <Card className="border-0 shadow-sm">
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-sand flex items-center justify-center text-2xl">{int.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold">{int.name}</h3>
                            <Badge variant={int.connected ? 'default' : 'secondary'} className={`text-xs ${int.connected ? 'bg-green-100 text-green-700' : ''}`}>
                              {int.connected ? 'Connected' : 'Not Connected'}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{int.description}</p>
                          <Button variant="outline" size="sm" className="mt-3 text-xs h-7">
                            {int.connected ? 'Configure' : 'Connect'}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </TabsContent>
      </Tabs>
    </div>
  )
}
