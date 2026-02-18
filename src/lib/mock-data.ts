export const teamMembers = [
  { id: '1', name: 'Andrew Bleckley', title: 'Principal, Landscape Architect', avatar: '', email: 'andrew@citedesign.com', department: 'Landscape Architecture', hourlyRate: 185, utilization: 82 },
  { id: '2', name: 'Elizabeth Fuqua', title: 'Senior Landscape Architect', avatar: '', email: 'elizabeth@citedesign.com', department: 'Landscape Architecture', hourlyRate: 165, utilization: 91 },
  { id: '3', name: 'Marcus Chen', title: 'Urban Designer', avatar: '', email: 'marcus@citedesign.com', department: 'Urban Design', hourlyRate: 145, utilization: 78 },
  { id: '4', name: 'Sarah Mitchell', title: 'Planner', avatar: '', email: 'sarah@citedesign.com', department: 'Planning', hourlyRate: 130, utilization: 85 },
  { id: '5', name: 'David Park', title: 'Junior Designer', avatar: '', email: 'david@citedesign.com', department: 'Landscape Architecture', hourlyRate: 95, utilization: 70 },
  { id: '6', name: 'Rachel Torres', title: 'Project Manager', avatar: '', email: 'rachel@citedesign.com', department: 'Operations', hourlyRate: 140, utilization: 88 },
  { id: '7', name: 'James Wright', title: 'Sustainability Specialist', avatar: '', email: 'james@citedesign.com', department: 'Landscape Architecture', hourlyRate: 150, utilization: 76 },
  { id: '8', name: 'Nina Patel', title: 'Landscape Designer', avatar: '', email: 'nina@citedesign.com', department: 'Landscape Architecture', hourlyRate: 115, utilization: 83 },
]

export const clients = [
  { id: '1', name: 'Mosaic Development Group', type: 'Developer', contactName: 'Robert Haines', email: 'rhaines@mosaicdev.com', phone: '(804) 555-0142', projectCount: 4, totalRevenue: 1250000, isActive: true, city: 'Richmond', state: 'VA' },
  { id: '2', name: 'City of Richmond', type: 'Municipality', contactName: 'Councilwoman Patricia Davis', email: 'pdavis@richmondgov.com', phone: '(804) 555-0198', projectCount: 3, totalRevenue: 890000, isActive: true, city: 'Richmond', state: 'VA' },
  { id: '3', name: 'HCA Healthcare', type: 'Healthcare', contactName: 'Dr. Michael Torres', email: 'mtorres@hcahealthcare.com', phone: '(804) 555-0267', projectCount: 2, totalRevenue: 680000, isActive: true, city: 'Richmond', state: 'VA' },
  { id: '4', name: 'VCU Real Estate Foundation', type: 'Education', contactName: 'Jennifer Walsh', email: 'jwalsh@vcu.edu', phone: '(804) 555-0334', projectCount: 2, totalRevenue: 520000, isActive: true, city: 'Richmond', state: 'VA' },
  { id: '5', name: 'Libbie Mill Partners LLC', type: 'Developer', contactName: 'Thomas Grant', email: 'tgrant@libbiemill.com', phone: '(804) 555-0411', projectCount: 3, totalRevenue: 1780000, isActive: true, city: 'Henrico', state: 'VA' },
  { id: '6', name: 'Hope Church of Richmond', type: 'Institutional', contactName: 'Rev. Daniel Brooks', email: 'dbrooks@hopechurchrva.org', phone: '(804) 555-0489', projectCount: 1, totalRevenue: 340000, isActive: true, city: 'Richmond', state: 'VA' },
  { id: '7', name: 'Belmont Golf Association', type: 'Recreation', contactName: 'William Prescott', email: 'wprescott@belmontgolf.com', phone: '(804) 555-0556', projectCount: 1, totalRevenue: 450000, isActive: false, city: 'Richmond', state: 'VA' },
  { id: '8', name: 'River Mill Communities', type: 'Developer', contactName: 'Amanda Foster', email: 'afoster@rivermill.com', phone: '(804) 555-0623', projectCount: 2, totalRevenue: 920000, isActive: true, city: 'Glen Allen', state: 'VA' },
]

export type Project = {
  id: string; name: string; client: string; clientId: string; status: string; phase: string;
  serviceType: string; budget: number; spent: number; startDate: string; endDate: string;
  lead: string; progress: number; description: string; tags: string[];
}

export const projects: Project[] = [
  { id: '1', name: 'Riverfront Park Master Plan', client: 'City of Richmond', clientId: '2', status: 'active', phase: 'Design', serviceType: 'Landscape Architecture', budget: 420000, spent: 287000, startDate: '2025-03-15', endDate: '2026-06-30', lead: 'Andrew Bleckley', progress: 68, description: 'A 12-acre riverfront park featuring native plantings, interactive water features, and a 1.2-mile riverwalk trail along the James River.', tags: ['parks', 'public', 'waterfront'] },
  { id: '2', name: 'Sunset Hills Residential Community', client: 'Mosaic Development Group', clientId: '1', status: 'active', phase: 'Construction', serviceType: 'Landscape Architecture', budget: 380000, spent: 341000, startDate: '2024-08-01', endDate: '2026-02-28', lead: 'Elizabeth Fuqua', progress: 90, description: 'Master-planned community with 240 homes, resort-style pool, community gardens, and 3 miles of walking trails.', tags: ['residential', 'community', 'amenities'] },
  { id: '3', name: 'VCU Medical Campus Green', client: 'VCU Real Estate Foundation', clientId: '4', status: 'active', phase: 'Review', serviceType: 'Urban Design', budget: 285000, spent: 156000, startDate: '2025-01-10', endDate: '2026-04-15', lead: 'Marcus Chen', progress: 55, description: 'Healing garden and campus green space for the VCU Medical Center, integrating therapeutic landscapes and ADA-compliant pathways.', tags: ['healthcare', 'campus', 'healing-garden'] },
  { id: '4', name: 'Libbie Mill Phase IV Streetscape', client: 'Libbie Mill Partners LLC', clientId: '5', status: 'active', phase: 'Design', serviceType: 'Urban Design', budget: 520000, spent: 198000, startDate: '2025-06-01', endDate: '2026-12-31', lead: 'Andrew Bleckley', progress: 38, description: 'Mixed-use streetscape design for the final phase of Libbie Mill, including public plazas, retail promenades, and lakefront dining areas.', tags: ['mixed-use', 'streetscape', 'retail'] },
  { id: '5', name: 'Sarah Cannon Healing Garden', client: 'HCA Healthcare', clientId: '3', status: 'active', phase: 'Discovery', serviceType: 'Landscape Architecture', budget: 195000, spent: 28000, startDate: '2025-11-01', endDate: '2026-08-30', lead: 'Nina Patel', progress: 14, description: 'Courtyard healing garden for oncology patients, featuring sensory plantings, meditation spaces, and accessible water features.', tags: ['healthcare', 'healing-garden', 'sensory'] },
  { id: '6', name: 'Church Hill North Renaissance', client: 'City of Richmond', clientId: '2', status: 'active', phase: 'Construction', serviceType: 'Planning', budget: 310000, spent: 276000, startDate: '2024-11-15', endDate: '2026-03-15', lead: 'Sarah Mitchell', progress: 89, description: 'Mixed-income community with heritage-inspired streetscapes, community gathering spaces, and urban agriculture plots.', tags: ['mixed-income', 'heritage', 'community'] },
  { id: '7', name: 'Belmont Golf Course Restoration', client: 'Belmont Golf Association', clientId: '7', status: 'complete', phase: 'Complete', serviceType: 'Landscape Architecture', budget: 450000, spent: 438000, startDate: '2024-03-01', endDate: '2025-09-30', lead: 'Andrew Bleckley', progress: 100, description: 'Historic golf course restoration including native area revegetation, stormwater management, and pollinator meadows.', tags: ['recreation', 'restoration', 'historic'] },
  { id: '8', name: 'River Mill Trail System', client: 'River Mill Communities', clientId: '8', status: 'active', phase: 'Design', serviceType: 'Landscape Architecture', budget: 275000, spent: 112000, startDate: '2025-05-01', endDate: '2026-07-15', lead: 'Elizabeth Fuqua', progress: 41, description: '4.5-mile trail network along the Chickahominy River with boardwalks, overlooks, and educational signage about riparian ecology.', tags: ['trails', 'riparian', 'education'] },
  { id: '9', name: 'Hope Church Campus Expansion', client: 'Hope Church of Richmond', clientId: '6', status: 'active', phase: 'Review', serviceType: 'Landscape Architecture', budget: 340000, spent: 204000, startDate: '2025-02-15', endDate: '2026-05-30', lead: 'David Park', progress: 60, description: 'Campus expansion featuring outdoor worship amphitheater, memorial garden, playground, and stormwater bioretention areas.', tags: ['institutional', 'campus', 'worship'] },
  { id: '10', name: 'Monument Square Courtyard', client: 'Mosaic Development Group', clientId: '1', status: 'active', phase: 'Discovery', serviceType: 'Urban Design', budget: 165000, spent: 18000, startDate: '2025-12-01', endDate: '2026-09-15', lead: 'Marcus Chen', progress: 11, description: 'Classic Richmond-inspired courtyard design for luxury condominiums, blending historic architecture with modern outdoor living.', tags: ['residential', 'courtyard', 'luxury'] },
]

export const revenueData = [
  { month: 'Jan', revenue: 285000, expenses: 198000 },
  { month: 'Feb', revenue: 312000, expenses: 205000 },
  { month: 'Mar', revenue: 298000, expenses: 212000 },
  { month: 'Apr', revenue: 345000, expenses: 225000 },
  { month: 'May', revenue: 378000, expenses: 231000 },
  { month: 'Jun', revenue: 356000, expenses: 218000 },
  { month: 'Jul', revenue: 401000, expenses: 245000 },
  { month: 'Aug', revenue: 389000, expenses: 238000 },
  { month: 'Sep', revenue: 425000, expenses: 252000 },
  { month: 'Oct', revenue: 412000, expenses: 248000 },
  { month: 'Nov', revenue: 438000, expenses: 261000 },
  { month: 'Dec', revenue: 395000, expenses: 242000 },
]

export const activities = [
  { id: '1', action: 'uploaded design revision v3', user: 'Elizabeth Fuqua', project: 'Sunset Hills Residential', time: '12 minutes ago', type: 'design' },
  { id: '2', action: 'approved grading permit', user: 'Sarah Mitchell', project: 'Church Hill North', time: '45 minutes ago', type: 'permit' },
  { id: '3', action: 'completed site visit', user: 'Andrew Bleckley', project: 'Riverfront Park Master Plan', time: '2 hours ago', type: 'site' },
  { id: '4', action: 'submitted invoice #2025-089', user: 'Rachel Torres', project: 'Libbie Mill Phase IV', time: '3 hours ago', type: 'financial' },
  { id: '5', action: 'added 14 native plants to palette', user: 'James Wright', project: 'Sarah Cannon Healing Garden', time: '4 hours ago', type: 'plants' },
  { id: '6', action: 'completed construction milestone', user: 'Nina Patel', project: 'Sunset Hills Residential', time: '5 hours ago', type: 'milestone' },
  { id: '7', action: 'posted field note with 6 photos', user: 'David Park', project: 'Hope Church Campus', time: 'Yesterday', type: 'site' },
  { id: '8', action: 'updated sustainability score to 87', user: 'James Wright', project: 'Riverfront Park Master Plan', time: 'Yesterday', type: 'sustainability' },
]

export const deadlines = [
  { id: '1', title: 'Client Design Presentation', project: 'VCU Medical Campus Green', date: '2026-02-20', daysLeft: 2, priority: 'urgent' },
  { id: '2', title: 'Grading Plans Submission', project: 'Riverfront Park Master Plan', date: '2026-02-23', daysLeft: 5, priority: 'high' },
  { id: '3', title: 'Permit Application Deadline', project: 'Libbie Mill Phase IV', date: '2026-02-28', daysLeft: 10, priority: 'medium' },
  { id: '4', title: 'Phase IV Construction Docs', project: 'Sunset Hills Residential', date: '2026-03-05', daysLeft: 15, priority: 'medium' },
  { id: '5', title: 'Community Feedback Session', project: 'Church Hill North', date: '2026-03-10', daysLeft: 20, priority: 'low' },
]

export const plants = [
  { id: '1', commonName: 'Red Maple', botanicalName: 'Acer rubrum', zone: '3-9', waterNeeds: 'Medium', type: 'Deciduous Tree', height: '40-70 ft', spread: '30-50 ft', sustainabilityScore: 92, nativeRegion: 'Eastern US', image: '' },
  { id: '2', commonName: 'Virginia Sweetspire', botanicalName: 'Itea virginica', zone: '5-9', waterNeeds: 'Medium-Wet', type: 'Shrub', height: '3-5 ft', spread: '3-5 ft', sustainabilityScore: 95, nativeRegion: 'Virginia', image: '' },
  { id: '3', commonName: 'Eastern Redbud', botanicalName: 'Cercis canadensis', zone: '4-9', waterNeeds: 'Low-Medium', type: 'Deciduous Tree', height: '20-30 ft', spread: '25-35 ft', sustainabilityScore: 94, nativeRegion: 'Eastern US', image: '' },
  { id: '4', commonName: 'Switchgrass', botanicalName: 'Panicum virgatum', zone: '4-9', waterNeeds: 'Low', type: 'Ornamental Grass', height: '3-6 ft', spread: '2-3 ft', sustainabilityScore: 97, nativeRegion: 'North America', image: '' },
  { id: '5', commonName: 'Black-eyed Susan', botanicalName: 'Rudbeckia fulgida', zone: '3-9', waterNeeds: 'Low-Medium', type: 'Perennial', height: '2-3 ft', spread: '1-2 ft', sustainabilityScore: 96, nativeRegion: 'Eastern US', image: '' },
  { id: '6', commonName: 'River Birch', botanicalName: 'Betula nigra', zone: '4-9', waterNeeds: 'Medium-Wet', type: 'Deciduous Tree', height: '40-70 ft', spread: '25-35 ft', sustainabilityScore: 91, nativeRegion: 'Eastern US', image: '' },
  { id: '7', commonName: 'Inkberry Holly', botanicalName: 'Ilex glabra', zone: '4-9', waterNeeds: 'Medium', type: 'Evergreen Shrub', height: '5-8 ft', spread: '5-8 ft', sustainabilityScore: 89, nativeRegion: 'Eastern US', image: '' },
  { id: '8', commonName: 'Blue Flag Iris', botanicalName: 'Iris versicolor', zone: '3-9', waterNeeds: 'Wet', type: 'Perennial', height: '2-3 ft', spread: '1-2 ft', sustainabilityScore: 93, nativeRegion: 'Eastern US', image: '' },
  { id: '9', commonName: 'American Beautyberry', botanicalName: 'Callicarpa americana', zone: '6-10', waterNeeds: 'Low-Medium', type: 'Shrub', height: '3-6 ft', spread: '3-6 ft', sustainabilityScore: 90, nativeRegion: 'Southeastern US', image: '' },
  { id: '10', commonName: 'Bald Cypress', botanicalName: 'Taxodium distichum', zone: '4-10', waterNeeds: 'Medium-Wet', type: 'Deciduous Conifer', height: '50-70 ft', spread: '20-30 ft', sustainabilityScore: 95, nativeRegion: 'Southeastern US', image: '' },
  { id: '11', commonName: 'Joe-Pye Weed', botanicalName: 'Eutrochium purpureum', zone: '4-8', waterNeeds: 'Medium-Wet', type: 'Perennial', height: '4-7 ft', spread: '2-4 ft', sustainabilityScore: 98, nativeRegion: 'Eastern US', image: '' },
  { id: '12', commonName: 'Coral Honeysuckle', botanicalName: 'Lonicera sempervirens', zone: '4-9', waterNeeds: 'Low-Medium', type: 'Vine', height: '10-20 ft', spread: '3-6 ft', sustainabilityScore: 94, nativeRegion: 'Eastern US', image: '' },
]

export const permits = [
  { id: '1', type: 'Grading Permit', project: 'Riverfront Park Master Plan', authority: 'City of Richmond DPW', status: 'under_review', applicationDate: '2025-12-15', expirationDate: '2026-12-15', assignedTo: 'Sarah Mitchell' },
  { id: '2', type: 'Stormwater Management', project: 'Sunset Hills Residential', authority: 'Henrico County DEQ', status: 'approved', applicationDate: '2025-06-01', expirationDate: '2027-06-01', assignedTo: 'James Wright' },
  { id: '3', type: 'Tree Removal Permit', project: 'Libbie Mill Phase IV', authority: 'Henrico County Planning', status: 'submitted', applicationDate: '2026-01-20', expirationDate: '', assignedTo: 'David Park' },
  { id: '4', type: 'Environmental Impact', project: 'River Mill Trail System', authority: 'VA DEQ', status: 'under_review', applicationDate: '2025-11-10', expirationDate: '', assignedTo: 'James Wright' },
  { id: '5', type: 'Land Disturbance', project: 'Church Hill North', authority: 'City of Richmond', status: 'approved', applicationDate: '2025-04-15', expirationDate: '2026-10-15', assignedTo: 'Sarah Mitchell' },
  { id: '6', type: 'Erosion Control', project: 'Riverfront Park Master Plan', authority: 'VA DEQ', status: 'application_prep', applicationDate: '', expirationDate: '', assignedTo: 'Rachel Torres' },
  { id: '7', type: 'Building Permit', project: 'Hope Church Campus', authority: 'City of Richmond', status: 'revisions_needed', applicationDate: '2025-10-01', expirationDate: '', assignedTo: 'David Park' },
  { id: '8', type: 'Zoning Variance', project: 'Monument Square Courtyard', authority: 'City of Richmond BZA', status: 'not_started', applicationDate: '', expirationDate: '', assignedTo: 'Marcus Chen' },
]

export const invoices = [
  { id: '1', number: 'INV-2025-076', project: 'Riverfront Park Master Plan', client: 'City of Richmond', amount: 85000, status: 'paid', issueDate: '2025-11-01', dueDate: '2025-12-01', paidDate: '2025-11-28' },
  { id: '2', number: 'INV-2025-082', project: 'Sunset Hills Residential', client: 'Mosaic Development Group', amount: 62500, status: 'paid', issueDate: '2025-12-01', dueDate: '2026-01-01', paidDate: '2025-12-22' },
  { id: '3', number: 'INV-2026-001', project: 'Libbie Mill Phase IV', client: 'Libbie Mill Partners LLC', amount: 78000, status: 'sent', issueDate: '2026-01-15', dueDate: '2026-02-15', paidDate: '' },
  { id: '4', number: 'INV-2026-005', project: 'VCU Medical Campus Green', client: 'VCU Real Estate Foundation', amount: 45000, status: 'overdue', issueDate: '2026-01-01', dueDate: '2026-02-01', paidDate: '' },
  { id: '5', number: 'INV-2026-012', project: 'Church Hill North', client: 'City of Richmond', amount: 55000, status: 'draft', issueDate: '2026-02-15', dueDate: '2026-03-15', paidDate: '' },
  { id: '6', number: 'INV-2026-008', project: 'River Mill Trail System', client: 'River Mill Communities', amount: 38000, status: 'sent', issueDate: '2026-02-01', dueDate: '2026-03-01', paidDate: '' },
]

export const designReviews = [
  { id: '1', title: 'Riverfront Park — Master Plan Rendering v3', project: 'Riverfront Park Master Plan', status: 'in_review', submittedBy: 'Andrew Bleckley', date: '2026-02-15', comments: 5, thumbnail: '' },
  { id: '2', title: 'Sunset Hills — Pool Deck Detail', project: 'Sunset Hills Residential', status: 'approved', submittedBy: 'Elizabeth Fuqua', date: '2026-02-10', comments: 3, thumbnail: '' },
  { id: '3', title: 'VCU Healing Garden — Planting Plan', project: 'VCU Medical Campus Green', status: 'changes_requested', submittedBy: 'Nina Patel', date: '2026-02-12', comments: 8, thumbnail: '' },
  { id: '4', title: 'Libbie Mill — Plaza Section Drawing', project: 'Libbie Mill Phase IV', status: 'pending', submittedBy: 'Marcus Chen', date: '2026-02-17', comments: 0, thumbnail: '' },
  { id: '5', title: 'Hope Church — Amphitheater Layout', project: 'Hope Church Campus', status: 'in_review', submittedBy: 'David Park', date: '2026-02-14', comments: 2, thumbnail: '' },
  { id: '6', title: 'River Mill — Boardwalk Detail Sheet', project: 'River Mill Trail System', status: 'approved', submittedBy: 'Elizabeth Fuqua', date: '2026-02-08', comments: 4, thumbnail: '' },
]

export const weeklyUtilization = [
  { week: 'Feb 3', Andrew: 85, Elizabeth: 92, Marcus: 78, Sarah: 88, David: 65, Rachel: 90, James: 72, Nina: 80 },
  { week: 'Feb 10', Andrew: 80, Elizabeth: 88, Marcus: 82, Sarah: 85, David: 70, Rachel: 92, James: 78, Nina: 85 },
  { week: 'Feb 17', Andrew: 88, Elizabeth: 95, Marcus: 75, Sarah: 82, David: 72, Rachel: 85, James: 80, Nina: 88 },
  { week: 'Feb 24', Andrew: 82, Elizabeth: 90, Marcus: 80, Sarah: 90, David: 68, Rachel: 88, James: 75, Nina: 82 },
]

export const siteVisits = [
  { id: '1', project: 'Riverfront Park Master Plan', date: '2026-02-15', visitor: 'Andrew Bleckley', purpose: 'Progress Check', weather: 'Partly Cloudy, 52°F', notes: 'Grading work 80% complete. Retaining wall footings poured along river edge. Soil stabilization fabric installed on slopes.', photos: 6, gps: '37.5326, -77.4350' },
  { id: '2', project: 'Sunset Hills Residential', date: '2026-02-13', visitor: 'Elizabeth Fuqua', purpose: 'Construction Observation', weather: 'Sunny, 48°F', notes: 'Pool deck pavers being installed. Irrigation heads placed for community garden zone. Reviewed plant installation at entrance boulevard.', photos: 12, gps: '37.5890, -77.5120' },
  { id: '3', project: 'Church Hill North', date: '2026-02-11', visitor: 'Sarah Mitchell', purpose: 'Final Walkthrough', weather: 'Overcast, 44°F', notes: 'Punch list items reviewed. Heritage stone wall needs repointing at north entrance. Playground surfacing complete and inspected.', photos: 8, gps: '37.5420, -77.4100' },
  { id: '4', project: 'Hope Church Campus', date: '2026-02-08', visitor: 'David Park', purpose: 'Initial Assessment', weather: 'Rain, 38°F', notes: 'Evaluated drainage patterns during rain event. Identified low spot near proposed amphitheater site requiring additional grading. Existing oak trees in good health.', photos: 4, gps: '37.5610, -77.4780' },
]
