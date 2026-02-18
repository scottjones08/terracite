import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import AppLayout from '@/components/layout/AppLayout'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import ClientsPage from '@/pages/ClientsPage'
import ClientDetailPage from '@/pages/ClientDetailPage'
import DesignReviewPage from '@/pages/DesignReviewPage'
import SiteManagementPage from '@/pages/SiteManagementPage'
import ResourcePlanningPage from '@/pages/ResourcePlanningPage'
import FinancialPage from '@/pages/FinancialPage'
import PermitsPage from '@/pages/PermitsPage'
import PlantLibraryPage from '@/pages/PlantLibraryPage'
import SustainabilityPage from '@/pages/SustainabilityPage'
import DocumentsPage from '@/pages/DocumentsPage'
import CommunicationsPage from '@/pages/CommunicationsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import SettingsPage from '@/pages/SettingsPage'

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:id" element={<ProjectDetailPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="clients/:id" element={<ClientDetailPage />} />
          <Route path="design-review" element={<DesignReviewPage />} />
          <Route path="sites" element={<SiteManagementPage />} />
          <Route path="resources" element={<ResourcePlanningPage />} />
          <Route path="financial" element={<FinancialPage />} />
          <Route path="permits" element={<PermitsPage />} />
          <Route path="plants" element={<PlantLibraryPage />} />
          <Route path="sustainability" element={<SustainabilityPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="communications" element={<CommunicationsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
