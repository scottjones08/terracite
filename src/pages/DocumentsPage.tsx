import { useState } from 'react'
import { motion } from 'framer-motion'
import { Folder, FileText, FileImage, FileSpreadsheet, File, Upload, ChevronRight, Search } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import PageHeader from '@/components/shared/PageHeader'
import { StaggerContainer, StaggerItem } from '@/components/shared/StaggerContainer'

const folders = [
  { name: 'Riverfront Park Master Plan', files: 34, size: '2.4 GB', recent: '2 hours ago' },
  { name: 'Sunset Hills Residential', files: 28, size: '1.8 GB', recent: 'Yesterday' },
  { name: 'VCU Medical Campus Green', files: 19, size: '980 MB', recent: '3 days ago' },
  { name: 'Libbie Mill Phase IV', files: 22, size: '1.2 GB', recent: 'Today' },
  { name: 'Church Hill North', files: 31, size: '2.1 GB', recent: 'Yesterday' },
  { name: 'River Mill Trail System', files: 15, size: '650 MB', recent: 'Last week' },
]

const recentFiles = [
  { name: 'Master_Plan_v3_Final.pdf', project: 'Riverfront Park', type: 'pdf', size: '24.5 MB', date: '2026-02-18', author: 'Andrew Bleckley' },
  { name: 'Pool_Deck_Detail_R2.dwg', project: 'Sunset Hills', type: 'cad', size: '18.2 MB', date: '2026-02-17', author: 'Elizabeth Fuqua' },
  { name: 'Planting_Plan_v2.pdf', project: 'VCU Medical', type: 'pdf', size: '12.8 MB', date: '2026-02-17', author: 'Nina Patel' },
  { name: 'Site_Photo_Set_Feb15.zip', project: 'Riverfront Park', type: 'archive', size: '156 MB', date: '2026-02-15', author: 'Andrew Bleckley' },
  { name: 'Budget_Revision_Q1.xlsx', project: 'Libbie Mill IV', type: 'spreadsheet', size: '340 KB', date: '2026-02-14', author: 'Rachel Torres' },
  { name: 'Rendering_Amphitheater.png', project: 'Hope Church', type: 'image', size: '8.4 MB', date: '2026-02-14', author: 'David Park' },
  { name: 'Stormwater_Calcs.pdf', project: 'Church Hill', type: 'pdf', size: '2.1 MB', date: '2026-02-13', author: 'James Wright' },
  { name: 'Trail_Section_Details.dwg', project: 'River Mill', type: 'cad', size: '22.6 MB', date: '2026-02-12', author: 'Elizabeth Fuqua' },
]

const fileIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText className="w-5 h-5 text-red-500" />
    case 'cad': return <File className="w-5 h-5 text-blue-500" />
    case 'image': return <FileImage className="w-5 h-5 text-green-500" />
    case 'spreadsheet': return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
    default: return <File className="w-5 h-5 text-stone" />
  }
}

export default function DocumentsPage() {
  const [search, setSearch] = useState('')

  return (
    <div className="p-6 lg:p-8">
      <PageHeader title="Documents" description="Project files, CAD drawings, and contracts"
        actions={<Button className="bg-forest hover:bg-forest-light text-white"><Upload className="w-4 h-4 mr-2" /> Upload Files</Button>} />

      <div className="flex items-center gap-3 mb-6 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search files..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 bg-white h-9" />
        </div>
      </div>

      {/* Upload zone */}
      <Card className="border-2 border-dashed border-sage/30 bg-sage/5 mb-8">
        <CardContent className="p-8 text-center">
          <Upload className="w-10 h-10 text-sage/40 mx-auto mb-2" />
          <p className="text-sm font-medium text-muted-foreground">Drag & drop files here, or click to browse</p>
          <p className="text-xs text-muted-foreground mt-1">Supports PDF, DWG, DXF, PNG, JPG, XLSX up to 500MB</p>
        </CardContent>
      </Card>

      {/* Project Folders */}
      <h2 className="text-xl font-serif mb-4">Project Folders</h2>
      <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {folders.map(f => (
          <StaggerItem key={f.name}>
            <motion.div whileHover={{ y: -2 }}>
              <Card className="border-0 shadow-sm cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sand flex items-center justify-center shrink-0">
                    <Folder className="w-5 h-5 text-terracotta" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{f.name}</p>
                    <p className="text-xs text-muted-foreground">{f.files} files · {f.size}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                </CardContent>
              </Card>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      {/* Recent Files */}
      <h2 className="text-xl font-serif mb-4">Recent Files</h2>
      <Card className="border-0 shadow-sm">
        <CardContent className="p-0">
          <table className="w-full">
            <thead><tr className="border-b">
              <th className="p-3 text-xs text-left text-muted-foreground">File</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Project</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Size</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Author</th>
              <th className="p-3 text-xs text-left text-muted-foreground">Date</th>
            </tr></thead>
            <tbody>
              {recentFiles.map(f => (
                <motion.tr key={f.name} whileHover={{ backgroundColor: 'rgba(232,223,208,0.3)' }} className="border-b last:border-0 cursor-pointer">
                  <td className="p-3"><div className="flex items-center gap-2">{fileIcon(f.type)}<span className="text-sm font-medium">{f.name}</span></div></td>
                  <td className="p-3 text-sm text-muted-foreground">{f.project}</td>
                  <td className="p-3 text-sm text-muted-foreground">{f.size}</td>
                  <td className="p-3 text-sm text-muted-foreground">{f.author}</td>
                  <td className="p-3 text-sm text-muted-foreground">{f.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
