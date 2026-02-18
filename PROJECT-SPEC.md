# TerraCite — Project Management Platform for Landscape Architecture Firms

## Complete Platform Specification v1.0

> A purpose-built project management platform for landscape architecture, planning, and urban design firms. Inspired by [Cite Design](https://www.cite-design.com/) — a Richmond, VA-based landscape architecture and urban planning firm that creates artful, sustainable outdoor spaces.

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Research: CITE Design Profile](#research-cite-design-profile)
3. [Platform Overview](#platform-overview)
4. [Tech Stack](#tech-stack)
5. [Database Schema](#database-schema)
6. [Authentication & Authorization](#authentication--authorization)
7. [Core Modules — Page-by-Page Specification](#core-modules)
8. [Service-Specific Features](#service-specific-features)
9. [UI/UX Design System](#uiux-design-system)
10. [API Architecture](#api-architecture)
11. [Deployment & Infrastructure](#deployment--infrastructure)
12. [Development Roadmap](#development-roadmap)

---

## Executive Summary

**TerraCite** is a comprehensive project management platform built specifically for landscape architecture, planning, and urban design firms. Unlike generic tools (Asana, Monday.com, Basecamp), TerraCite understands the unique workflows of outdoor design — from plant palette selection and SITES/LEED sustainability scoring to permit tracking, site visit documentation, and client design approval workflows.

**Target Users:** Firms like Cite Design (10-50 person teams) managing 15-40 concurrent projects across landscape architecture, urban design, and planning verticals.

**Estimated Development Cost:** $50,000 – $85,000  
**Timeline:** 16-20 weeks (MVP), 28-36 weeks (full platform)

---

## Research: CITE Design Profile

### About the Firm
- **Name:** Cite Design
- **Location:** 310 North Adams Street, Richmond, VA 23220
- **Phone:** 804.340.2848
- **Email:** info@cite-design.com
- **Tagline:** "We design unique, artful, and sustainable spaces that enrich life outside."
- **Founded:** Richmond, Virginia
- **Social:** LinkedIn, Instagram (@citedesign), Facebook

### Services

#### Landscape Architecture
- Amenity and Hospitality Design
- Garden Design
- Green Roofs
- Lighting Design
- Parks and Public Space
- Pool and Aquatic Design
- Residential Design

#### Planning
- Campus Planning
- Design Guidelines and Manuals
- Land Use Planning
- Open Space and Trail Planning
- Parks and Recreation
- Regional Planning
- Rezoning and Entitlement

#### Urban Design
- Memorial Design
- Placemaking
- Plazas and Squares
- Signage Design and Environmental Graphic Design
- Security Design
- Streetscape Design
- Urban Infill

### Approach / Methodology
1. **"We Get Smart"** — Deep early-stage research into objectives, environmental/cultural backgrounds, complexities, and opportunities
2. **"We Get Inspired"** — Seeking unexpected sources for fresh, innovative ideas; continuous learning
3. **"We Get Personal"** — Collaboration and humanity at the heart; listening from first sketch to implementation

### Notable Projects
| Project | Type | Description |
|---------|------|-------------|
| Mosaic at West Creek | Master-planned community | 200-acre mixed-use with resort lifestyle amenities |
| Parc View at Commonwealth | Student housing | 509-bed tower near VCU with communal gathering areas |
| Penstock Quarter at Libbie Mill | Urban residential | Elevated amenities for urban dwellers |
| Windsor Farms Residence | Residential | Historic home renovation connecting interior to outdoor living |
| Belmont Golf Course | Recreation | Historic course restoration for community use |
| Wellsmith at Libbie Mill | Residential | Active lifestyle amenities with modern conveniences |
| Church Hill North – Armstrong Renaissance | Mixed-income housing | Heritage-inspired community with relationship-building amenities |
| Libbie Mill | Mixed-use community | 80-acre development with diverse public spaces along lake |
| Sarah Cannon Cancer Institute at HCA | Healthcare | Healing garden courtyard for patients and staff |
| Virginia Women's Monument | Memorial | First-of-its-kind monument celebrating Virginia women |
| Hope Church | Institutional | Expansive campus for fellowship and spiritual growth |
| Monument Square | Residential | Classic Richmond architecture meets modern outdoor gathering |
| River Mill | Residential community | Trail system and amenities on Chickahominy River banks |

### Target Clients
- **Residential Developers** (Mosaic, Penstock Quarter, Monument Square)
- **Mixed-Use Developers** (Libbie Mill, Church Hill North)
- **Institutional** (Hope Church, HCA Healthcare)
- **Government/Civic** (Virginia Women's Monument, Belmont Golf Course)
- **Hospitality & Amenity** (Pool/aquatic, resort-style communities)
- **Private Residential** (Windsor Farms, Church Hill Courtyard)
- **Higher Education** (Parc View at VCU, Campus Planning)

### Key Team Members
- **Andrew Bleckley** — Project lead (multiple projects)
- **Elizabeth Fuqua** — Project lead (multiple projects including Virginia Women's Monument, Libbie Mill)

---

## Platform Overview

### Core Modules

| # | Module | Description |
|---|--------|-------------|
| 1 | Project Dashboard | Active projects with status, phase, budget, timeline — Kanban + Gantt + Map views |
| 2 | Client Portal | External-facing portal for progress tracking, design approvals, feedback, documents |
| 3 | Design Review | Upload renderings/plans, markup tools, version history, approval workflows |
| 4 | Site Management | Site visits, photo documentation, GPS-tagged field notes, environmental assessments |
| 5 | Resource Planning | Team assignments, capacity planning, utilization tracking |
| 6 | Financial Tracking | Budgets, invoices, time tracking, profitability per project |
| 7 | Permit & Compliance | Permits, zoning, environmental compliance, inspection schedules |
| 8 | Plant & Materials Library | Plants, hardscape materials, sustainability ratings, cost estimates |
| 9 | Sustainability Scoring | SITES/LEED credits, carbon footprint, native plant percentages |
| 10 | Document Management | CAD files, PDFs, contracts organized by project phase |
| 11 | Communication Hub | Team chat, client messaging, meeting notes, RFI tracking |
| 12 | Reporting & Analytics | Project health, utilization, revenue forecasting, client satisfaction |

---

## Tech Stack

### Frontend
```
React 18+ with TypeScript
Vite (build tool)
Tailwind CSS v4
shadcn/ui (component library)
Framer Motion (animations)
React Router v7 (routing)
TanStack Query v5 (data fetching/caching)
TanStack Table (data tables)
Recharts (analytics/charts)
Mapbox GL JS (project site maps, GPS field notes)
react-pdf (document viewing)
tldraw or Konva.js (design markup/annotation)
date-fns (date manipulation)
Zustand (client-side state)
react-hook-form + zod (forms/validation)
```

### Backend / Infrastructure
```
Supabase (PostgreSQL database, Auth, Storage, Realtime, Edge Functions)
Supabase Row Level Security (RLS) for multi-tenant data isolation
Supabase Storage (CAD files, renderings, photos, documents)
Supabase Realtime (live updates, chat, collaboration)
Supabase Edge Functions (Deno) for server-side logic
Resend (transactional email)
Stripe (billing/invoicing — optional)
```

### DevOps
```
Vercel or Netlify (frontend hosting)
GitHub Actions (CI/CD)
Sentry (error tracking)
PostHog (analytics)
```

---

## Database Schema

### Core Tables

```sql
-- ============================================
-- ORGANIZATION & USERS
-- ============================================

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  subscription_tier TEXT DEFAULT 'professional', -- starter, professional, enterprise
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  organization_id UUID REFERENCES organizations(id),
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'member', -- owner, admin, manager, member, viewer
  title TEXT, -- "Landscape Architect", "Senior Planner", etc.
  department TEXT, -- landscape_architecture, planning, urban_design, admin
  phone TEXT,
  hourly_rate DECIMAL(10,2),
  utilization_target INTEGER DEFAULT 75, -- target billable percentage
  is_active BOOLEAN DEFAULT true,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- CLIENTS
-- ============================================

CREATE TABLE clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL, -- developer, municipality, institution, private_residential, hospitality, healthcare, education
  logo_url TEXT,
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  phone TEXT,
  email TEXT,
  website TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE client_contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES clients(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  title TEXT,
  email TEXT,
  phone TEXT,
  is_primary BOOLEAN DEFAULT false,
  portal_user_id UUID REFERENCES auth.users(id), -- if they have portal access
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PROJECTS
-- ============================================

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id) NOT NULL,
  client_id UUID REFERENCES clients(id),
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  project_number TEXT UNIQUE, -- internal project number e.g. "2024-037"
  
  -- Classification
  service_type TEXT NOT NULL, -- landscape_architecture, planning, urban_design
  project_type TEXT NOT NULL, -- residential, mixed_use, institutional, municipal, hospitality, healthcare, memorial, recreation
  sub_services TEXT[] DEFAULT '{}', -- array of specific sub-services
  
  -- Status & Phase
  status TEXT NOT NULL DEFAULT 'active', -- proposal, active, on_hold, completed, archived, cancelled
  phase TEXT NOT NULL DEFAULT 'discovery', -- discovery, schematic_design, design_development, construction_documents, bidding, construction_admin, closeout
  phase_progress INTEGER DEFAULT 0, -- 0-100 percentage within current phase
  
  -- Location
  address TEXT,
  city TEXT,
  state TEXT,
  zip TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  site_area_acres DECIMAL(10,2),
  site_area_sqft DECIMAL(12,2),
  
  -- Timeline
  start_date DATE,
  estimated_end_date DATE,
  actual_end_date DATE,
  
  -- Financial
  contract_value DECIMAL(12,2),
  budget_total DECIMAL(12,2),
  budget_spent DECIMAL(12,2) DEFAULT 0,
  billing_type TEXT DEFAULT 'fixed', -- fixed, hourly, retainer, milestone
  
  -- Team
  project_lead_id UUID REFERENCES users(id),
  
  -- Sustainability
  sites_target BOOLEAN DEFAULT false,
  leed_target BOOLEAN DEFAULT false,
  sustainability_score DECIMAL(5,2),
  
  -- Metadata
  cover_image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE project_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase TEXT NOT NULL,
  name TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, in_progress, review, completed
  start_date DATE,
  end_date DATE,
  actual_start DATE,
  actual_end DATE,
  budget_allocated DECIMAL(12,2),
  sort_order INTEGER,
  deliverables TEXT[],
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE project_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member', -- lead, manager, member, reviewer
  allocated_hours DECIMAL(8,2),
  start_date DATE,
  end_date DATE,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(project_id, user_id)
);

-- ============================================
-- TASKS & MILESTONES
-- ============================================

CREATE TABLE tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id),
  parent_task_id UUID REFERENCES tasks(id), -- subtasks
  title TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'todo', -- todo, in_progress, review, blocked, completed
  priority TEXT DEFAULT 'medium', -- low, medium, high, urgent
  assignee_id UUID REFERENCES users(id),
  reporter_id UUID REFERENCES users(id),
  due_date DATE,
  estimated_hours DECIMAL(6,2),
  actual_hours DECIMAL(6,2),
  tags TEXT[] DEFAULT '{}',
  sort_order INTEGER,
  dependencies UUID[] DEFAULT '{}', -- task IDs this depends on
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  due_date DATE NOT NULL,
  completed_date DATE,
  status TEXT DEFAULT 'upcoming', -- upcoming, due, completed, overdue
  phase_id UUID REFERENCES project_phases(id),
  is_client_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- DESIGN REVIEW
-- ============================================

CREATE TABLE design_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id),
  uploaded_by UUID REFERENCES users(id),
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_type TEXT NOT NULL, -- rendering, plan, section, detail, cad, pdf, image, sketch
  file_size_bytes BIGINT,
  mime_type TEXT,
  version INTEGER DEFAULT 1,
  parent_file_id UUID REFERENCES design_files(id), -- previous version
  description TEXT,
  tags TEXT[] DEFAULT '{}',
  is_client_visible BOOLEAN DEFAULT false,
  thumbnail_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE design_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  file_id UUID REFERENCES design_files(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, in_review, changes_requested, approved, rejected
  requested_by UUID REFERENCES users(id),
  due_date DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE design_review_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES design_reviews(id) ON DELETE CASCADE,
  author_id UUID REFERENCES users(id),
  author_type TEXT DEFAULT 'internal', -- internal, client
  content TEXT NOT NULL,
  -- Markup annotation data (position on the design file)
  annotation_data JSONB, -- {x, y, width, height, type: "pin"|"rect"|"freehand", path: [...]}
  is_resolved BOOLEAN DEFAULT false,
  resolved_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE design_approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID REFERENCES design_reviews(id) ON DELETE CASCADE,
  approver_id UUID REFERENCES users(id),
  approver_type TEXT DEFAULT 'internal', -- internal, client
  status TEXT NOT NULL, -- approved, rejected, changes_requested
  comments TEXT,
  signed_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- SITE MANAGEMENT
-- ============================================

CREATE TABLE site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  visited_by UUID REFERENCES users(id),
  visit_date TIMESTAMPTZ NOT NULL,
  purpose TEXT, -- initial_assessment, progress_check, construction_observation, final_walkthrough
  weather_conditions TEXT,
  temperature_f INTEGER,
  notes TEXT,
  attendees TEXT[],
  action_items TEXT[],
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE site_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_visit_id UUID REFERENCES site_visits(id) ON DELETE CASCADE,
  project_id UUID REFERENCES projects(id),
  photo_url TEXT NOT NULL,
  thumbnail_url TEXT,
  caption TEXT,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  direction TEXT, -- N, NE, E, SE, S, SW, W, NW
  tags TEXT[] DEFAULT '{}',
  taken_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE field_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  site_visit_id UUID REFERENCES site_visits(id),
  author_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  note_type TEXT DEFAULT 'general', -- general, issue, observation, measurement, environmental
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  photos TEXT[] DEFAULT '{}', -- array of photo URLs
  is_flagged BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE environmental_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL, -- soil_analysis, drainage, ecology, tree_survey, wetland_delineation, stormwater
  status TEXT DEFAULT 'pending', -- pending, in_progress, completed
  assessed_by TEXT,
  assessment_date DATE,
  findings TEXT,
  recommendations TEXT,
  document_url TEXT,
  data JSONB DEFAULT '{}', -- structured assessment data
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- FINANCIAL TRACKING
-- ============================================

CREATE TABLE time_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  task_id UUID REFERENCES tasks(id),
  phase_id UUID REFERENCES project_phases(id),
  date DATE NOT NULL,
  hours DECIMAL(5,2) NOT NULL,
  description TEXT,
  is_billable BOOLEAN DEFAULT true,
  billing_rate DECIMAL(10,2),
  status TEXT DEFAULT 'draft', -- draft, submitted, approved, invoiced
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  project_id UUID REFERENCES projects(id),
  client_id UUID REFERENCES clients(id),
  invoice_number TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'draft', -- draft, sent, viewed, paid, overdue, void
  issue_date DATE,
  due_date DATE,
  paid_date DATE,
  subtotal DECIMAL(12,2),
  tax_rate DECIMAL(5,4) DEFAULT 0,
  tax_amount DECIMAL(12,2) DEFAULT 0,
  total DECIMAL(12,2),
  notes TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE invoice_line_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES invoices(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) DEFAULT 1,
  unit_price DECIMAL(10,2),
  total DECIMAL(12,2),
  phase_id UUID REFERENCES project_phases(id),
  sort_order INTEGER
);

CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id),
  category TEXT NOT NULL, -- materials, travel, subconsultant, equipment, printing, permits, other
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  date DATE NOT NULL,
  receipt_url TEXT,
  is_billable BOOLEAN DEFAULT true,
  is_reimbursable BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected, reimbursed
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PERMITS & COMPLIANCE
-- ============================================

CREATE TABLE permits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  permit_type TEXT NOT NULL, -- building, grading, stormwater, environmental, land_disturbance, zoning, tree_removal, erosion_control
  permit_number TEXT,
  issuing_authority TEXT,
  status TEXT DEFAULT 'not_started', -- not_started, application_prep, submitted, under_review, revisions_needed, approved, denied, expired
  application_date DATE,
  approval_date DATE,
  expiration_date DATE,
  conditions TEXT,
  document_url TEXT,
  notes TEXT,
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE inspections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  permit_id UUID REFERENCES permits(id),
  inspection_type TEXT NOT NULL,
  scheduled_date TIMESTAMPTZ,
  completed_date TIMESTAMPTZ,
  inspector_name TEXT,
  status TEXT DEFAULT 'scheduled', -- scheduled, passed, failed, rescheduled, cancelled
  findings TEXT,
  corrective_actions TEXT,
  document_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE compliance_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- zoning, environmental, ada, stormwater, historic_preservation, tree_preservation
  requirement TEXT NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, in_compliance, non_compliant, waiver_requested, exempt
  due_date DATE,
  notes TEXT,
  document_url TEXT,
  assigned_to UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- PLANT & MATERIALS LIBRARY
-- ============================================

CREATE TABLE plants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  botanical_name TEXT NOT NULL,
  common_name TEXT NOT NULL,
  family TEXT,
  plant_type TEXT, -- tree, shrub, perennial, annual, grass, groundcover, vine, fern, aquatic
  size_category TEXT, -- small, medium, large
  mature_height_ft DECIMAL(6,2),
  mature_spread_ft DECIMAL(6,2),
  growth_rate TEXT, -- slow, moderate, fast
  
  -- Growing conditions
  usda_zones INT4RANGE, -- e.g., [5,9) for zones 5-8
  sun_exposure TEXT[], -- full_sun, part_sun, part_shade, full_shade
  soil_type TEXT[], -- clay, loam, sand, rocky
  moisture TEXT, -- dry, medium, wet, aquatic
  salt_tolerance TEXT, -- none, low, moderate, high
  drought_tolerance TEXT, -- none, low, moderate, high
  
  -- Characteristics
  bloom_color TEXT[],
  bloom_season TEXT[], -- spring, summer, fall, winter
  foliage_color TEXT,
  fall_color TEXT,
  evergreen BOOLEAN DEFAULT false,
  native_region TEXT[], -- eastern_us, southeastern, mid_atlantic, etc.
  is_native BOOLEAN DEFAULT false,
  is_invasive BOOLEAN DEFAULT false,
  
  -- Sustainability
  wildlife_value TEXT[], -- birds, butterflies, pollinators, deer_resistant
  carbon_sequestration_rating TEXT, -- low, medium, high
  stormwater_benefit TEXT, -- low, medium, high
  
  -- Practical
  maintenance_level TEXT, -- low, medium, high
  estimated_cost_range TEXT, -- $, $$, $$$
  unit_cost DECIMAL(10,2),
  cost_unit TEXT, -- each, flat, gallon, balled_burlapped
  availability TEXT, -- common, moderate, specialty
  
  image_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- paving, wall, edging, mulch, aggregate, wood, metal, lighting, furniture, water_feature
  manufacturer TEXT,
  model_number TEXT,
  color TEXT,
  dimensions TEXT,
  material_type TEXT, -- concrete, stone, brick, wood, metal, composite, recycled
  
  -- Sustainability
  recycled_content_pct INTEGER DEFAULT 0,
  local_source BOOLEAN DEFAULT false,
  sustainability_rating TEXT, -- standard, sustainable, highly_sustainable
  leed_credits TEXT[],
  
  -- Practical
  unit_cost DECIMAL(10,2),
  cost_unit TEXT, -- sqft, lf, each, ton, cy
  lead_time_days INTEGER,
  warranty_years INTEGER,
  
  image_url TEXT,
  spec_sheet_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE project_plant_palettes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  plant_id UUID REFERENCES plants(id),
  quantity INTEGER,
  size_spec TEXT, -- "3" cal B&B", "1 gal", "2 gal", etc.
  location_notes TEXT,
  estimated_cost DECIMAL(10,2),
  status TEXT DEFAULT 'proposed', -- proposed, approved, ordered, installed
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- SUSTAINABILITY SCORING
-- ============================================

CREATE TABLE sustainability_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  framework TEXT NOT NULL, -- sites, leed, custom
  category TEXT NOT NULL, -- e.g., "Water", "Soil+Vegetation", "Materials", "Human Health"
  credit_name TEXT NOT NULL,
  credit_code TEXT, -- e.g., "C6.1"
  points_possible INTEGER,
  points_achieved INTEGER DEFAULT 0,
  status TEXT DEFAULT 'not_pursued', -- not_pursued, pursuing, documented, achieved, denied
  documentation_url TEXT,
  notes TEXT,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE project_sustainability_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  metric_type TEXT NOT NULL, -- native_plant_pct, tree_canopy_pct, permeable_surface_pct, stormwater_managed_pct, carbon_offset_tons, water_reduction_pct
  value DECIMAL(10,2),
  unit TEXT,
  target_value DECIMAL(10,2),
  measured_date DATE,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- DOCUMENTS
-- ============================================

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  phase_id UUID REFERENCES project_phases(id),
  uploaded_by UUID REFERENCES users(id),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size_bytes BIGINT,
  mime_type TEXT,
  category TEXT NOT NULL, -- contract, proposal, report, cad, specification, correspondence, photo, permit, invoice, other
  version INTEGER DEFAULT 1,
  parent_document_id UUID REFERENCES documents(id),
  is_client_visible BOOLEAN DEFAULT false,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- COMMUNICATION
-- ============================================

CREATE TABLE project_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  channel TEXT DEFAULT 'internal', -- internal, client
  author_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  attachments TEXT[] DEFAULT '{}',
  is_pinned BOOLEAN DEFAULT false,
  parent_message_id UUID REFERENCES project_messages(id), -- threads
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE meeting_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  meeting_date TIMESTAMPTZ NOT NULL,
  attendees TEXT[],
  location TEXT,
  notes TEXT NOT NULL,
  action_items JSONB DEFAULT '[]', -- [{text, assignee, due_date, completed}]
  recorded_by UUID REFERENCES users(id),
  is_client_visible BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE rfis (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  rfi_number TEXT NOT NULL,
  subject TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT,
  status TEXT DEFAULT 'open', -- open, responded, closed
  priority TEXT DEFAULT 'normal', -- low, normal, high, urgent
  submitted_by UUID REFERENCES users(id),
  assigned_to UUID REFERENCES users(id),
  due_date DATE,
  responded_date DATE,
  attachments TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- NOTIFICATIONS & ACTIVITY
-- ============================================

CREATE TABLE activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES organizations(id),
  project_id UUID REFERENCES projects(id),
  user_id UUID REFERENCES users(id),
  action TEXT NOT NULL, -- created, updated, commented, approved, uploaded, etc.
  entity_type TEXT NOT NULL, -- project, task, design_file, review, etc.
  entity_id UUID,
  details JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT, -- task_assigned, review_requested, approval_needed, deadline, mention, etc.
  entity_type TEXT,
  entity_id UUID,
  project_id UUID REFERENCES projects(id),
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- INDEXES
-- ============================================

CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_projects_client ON projects(client_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_coords ON projects(latitude, longitude);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_time_entries_project ON time_entries(project_id);
CREATE INDEX idx_time_entries_user_date ON time_entries(user_id, date);
CREATE INDEX idx_design_files_project ON design_files(project_id);
CREATE INDEX idx_site_photos_visit ON site_photos(site_visit_id);
CREATE INDEX idx_plants_org ON plants(organization_id);
CREATE INDEX idx_activity_project ON activity_log(project_id);
CREATE INDEX idx_notifications_user ON notifications(user_id, is_read);
CREATE INDEX idx_messages_project ON project_messages(project_id, channel);
```

---

## Authentication & Authorization

### Roles

| Role | Description | Permissions |
|------|-------------|-------------|
| **Owner** | Firm principal/partner | Full access, billing, user management, org settings |
| **Admin** | Office manager / operations | All project data, financials, user management |
| **Manager** | Project manager / senior designer | Full project CRUD, approve time, manage team assignments |
| **Member** | Designer / planner / LA | View/edit assigned projects, submit time, upload files |
| **Viewer** | Intern / read-only | View assigned projects only |
| **Client** | External client portal user | View permitted project data, approve designs, leave feedback |

### Supabase RLS Policies

All tables use Row Level Security. Key patterns:
- **Organization isolation:** Users can only see data from their own organization
- **Project-level access:** Members see only projects they're assigned to (unless admin+)
- **Client portal:** Client users see only `is_client_visible = true` records on their projects
- **Time entries:** Users can edit their own; managers can approve

---

## Core Modules

### Module 1: Project Dashboard

**Route:** `/dashboard`

**Layout:**
- Top bar: Organization logo, global search (⌘K), notifications bell, user avatar
- Left sidebar: Navigation to all modules
- Main content: Dashboard with view toggle

**Views:**

#### 1a. Map View (Default)
- Full-width Mapbox satellite map showing all active project sites as pins
- Pin color coded by status: 🟢 Active, 🟡 On Hold, 🔵 Completed, 🔴 At Risk
- Click pin → slide-out panel with project summary card:
  - Project name, client, phase, budget health bar, timeline bar
  - Quick links to project detail, site photos, latest design file
- Filter bar: status, service type, project type, lead, client, date range
- Cluster pins when zoomed out, expand on zoom

#### 1b. Kanban View
- Columns by phase: Discovery → Schematic Design → Design Development → Construction Docs → Bidding → Construction Admin → Closeout
- Cards show: project name, client, lead avatar, due date, budget health indicator
- Drag-drop to change phase
- Color-coded left border by service type (green = LA, blue = planning, orange = urban design)

#### 1c. Gantt View
- Horizontal timeline with projects as rows
- Phase blocks color-coded
- Milestone diamonds
- Today line
- Zoom: week, month, quarter, year
- Dependencies shown as connecting lines

#### 1d. List View
- Sortable/filterable table with columns:
  - Project #, Name, Client, Type, Phase, Status, Lead, Budget, % Complete, Due Date
- Inline quick-edit for status and phase
- Bulk actions: assign lead, change status, export

**Project Detail Page:** `/projects/:slug`

- Hero section with cover image, project name, client, location
- Tab navigation:
  - **Overview** — Key metrics cards (budget, timeline, phase, sustainability score), recent activity feed
  - **Tasks** — Kanban board + list view of project tasks
  - **Design** — File gallery, active reviews
  - **Site** — Visit log, photos, field notes, environmental assessments
  - **Documents** — File browser organized by phase
  - **Financials** — Budget breakdown, time entries, invoices, expenses
  - **Permits** — Permit tracker, compliance checklist, inspections
  - **Plants** — Plant palette for this project
  - **Sustainability** — SITES/LEED scorecard, metrics dashboard
  - **Team** — Assigned members, roles, hours
  - **Messages** — Internal + client communication
  - **Settings** — Project configuration

**UI Components:**
- `<ProjectCard>` — Used in Kanban, grid views. Thumbnail, name, client, phase badge, budget bar, avatars
- `<PhaseTimeline>` — Horizontal stepper showing all phases with current highlighted
- `<BudgetHealthBar>` — Green/yellow/red progress bar with percentage
- `<ProjectQuickView>` — Slide-over panel from map pins and list rows
- `<MetricCard>` — Icon, label, value, trend indicator (↑↓)

---

### Module 2: Client Portal

**Route:** `/portal` (separate layout, distinct from internal app)

**Features:**
- Simplified navigation: Projects, Documents, Messages, Approvals
- Client logs in with email/password (Supabase Auth magic link or password)
- Sees only their projects, only `is_client_visible` content

**Pages:**

#### 2a. Portal Dashboard
- List of their projects with phase indicator and latest update
- Pending approvals badge
- Unread messages badge

#### 2b. Portal Project View
- Phase timeline (read-only)
- Milestone tracker with status
- Latest design renderings gallery
- Document downloads organized by phase
- "Leave Feedback" button → opens comment form

#### 2c. Portal Design Review
- View design files with zoom/pan
- Click to add pin comments on the design
- Approve / Request Changes button with signature capture
- Version comparison slider

#### 2d. Portal Messages
- Threaded conversation with project team
- File attachment support
- Email notifications on new messages

**UI:**
- Branded with firm's logo and colors
- Minimal, elegant — matches Cite Design aesthetic
- No clutter — clients see only what's relevant

---

### Module 3: Design Review

**Route:** `/projects/:slug/design`

**Features:**

#### 3a. File Gallery
- Grid of design files with large thumbnails
- Filter by type (rendering, plan, section, detail), phase, date
- Upload with drag-drop, batch upload support
- Auto-generate thumbnails for PDFs and images
- CAD file preview (link out to external viewer or embedded viewer)

#### 3b. Review Workspace
- Full-screen design file viewer with zoom, pan, rotate
- **Markup toolbar:**
  - Pin drop (click to place numbered comment pin)
  - Rectangle highlight
  - Freehand draw
  - Arrow
  - Text label
  - Color picker (red, blue, green, orange)
- Side panel: list of all comments/annotations, filterable by status
- Each annotation links to a comment thread
- Resolve/unresolve annotations

#### 3c. Version History
- Version timeline: v1 → v2 → v3
- Click any version to view
- Side-by-side comparison mode
- Slider overlay comparison (before/after)

#### 3d. Approval Workflow
- Create review request → assign reviewers (internal + client)
- Track status: Pending → In Review → Changes Requested → Approved
- Email notifications at each step
- Digital signature capture on approval
- Approval history log

---

### Module 4: Site Management

**Route:** `/projects/:slug/site`

**Features:**

#### 4a. Site Visit Log
- Chronological list of site visits
- Each visit: date, purpose, weather, attendees, notes, action items
- Quick-add from mobile with "New Site Visit" floating action button

#### 4b. Photo Documentation
- Grid/map view of all site photos
- Map view: photos plotted by GPS coordinates on project site map
- Timeline view: photos organized by date
- Batch upload with auto-GPS extraction from EXIF data
- Tag photos: existing conditions, construction progress, issue, completed work
- Compare: select two photos for side-by-side comparison

#### 4c. Field Notes
- GPS-tagged notes plotted on site map
- Quick capture: text + photo + GPS in one action
- Flag notes for follow-up
- Filter by type, date, flagged status

#### 4d. Environmental Assessments
- Track soil analysis, drainage studies, tree surveys, wetland delineations
- Status tracking per assessment
- Link supporting documents
- Structured data entry for common assessment types

---

### Module 5: Resource Planning

**Route:** `/resources`

**Features:**

#### 5a. Team Capacity View
- Horizontal bar chart per team member showing allocated hours vs. available hours per week/month
- Color-coded: green (under capacity), yellow (near capacity), red (over-allocated)
- Click member → see their project assignments

#### 5b. Utilization Dashboard
- Target vs. actual utilization percentage per person
- Billable vs. non-billable hours breakdown
- Trend chart over time (weekly/monthly)
- Department-level rollups

#### 5c. Assignment Matrix
- Projects as rows, team members as columns
- Cell shows allocated hours/role
- Drag to assign/reassign
- Highlight conflicts (over-allocation)

#### 5d. Skills Matrix
- Tag team members with skills: AutoCAD, SketchUp, Revit, GIS, planting design, grading, etc.
- Filter/match skills to project needs
- Identify skill gaps

---

### Module 6: Financial Tracking

**Route:** `/projects/:slug/financials` and `/finance`

**Features:**

#### 6a. Time Tracking
- Timer (start/stop) or manual entry
- Fields: project, phase, task, hours, description, billable toggle
- Weekly timesheet view (grid: projects as rows, days as columns)
- Manager approval workflow
- Mobile time entry

#### 6b. Budget Dashboard
- Overall budget vs. spent (donut chart)
- By phase breakdown (stacked bar)
- Burn rate trend line
- Projected completion cost (earned value)
- Budget alerts at 75%, 90%, 100% thresholds

#### 6c. Invoicing
- Generate invoices from approved time entries + expenses
- Customizable invoice template with firm branding
- PDF export
- Track status: draft → sent → viewed → paid
- Aging report (30/60/90 days)

#### 6d. Profitability
- Per-project: revenue, costs (labor + expenses), margin
- Per-client: lifetime value, project count, average margin
- By service type: which service lines are most profitable
- Firm-wide: monthly revenue, pipeline, forecasting

#### 6e. Expense Tracking
- Log expenses with receipt photo upload
- Categories: materials, travel, subconsultants, equipment, printing, permits
- Approval workflow
- Flag billable vs. non-billable, reimbursable vs. firm expense

---

### Module 7: Permit & Compliance

**Route:** `/projects/:slug/permits`

**Features:**

#### 7a. Permit Tracker
- Table of all permits per project
- Status pipeline: Not Started → Application Prep → Submitted → Under Review → Approved
- Visual timeline of permit milestones
- Automated reminders for expiring permits (30, 60, 90 day warnings)
- Document attachment per permit

#### 7b. Compliance Checklist
- Category-organized checklist (zoning, ADA, environmental, stormwater, etc.)
- Status per item with notes
- Link to supporting documentation
- Export compliance report for client/authority

#### 7c. Inspection Schedule
- Calendar view of upcoming inspections
- Status tracking with pass/fail recording
- Corrective action items auto-create tasks
- Inspector contact info

---

### Module 8: Plant & Materials Library

**Route:** `/library/plants` and `/library/materials`

**Features:**

#### 8a. Plant Database
- Searchable/filterable library of plants
- Filters: type, zone, sun, moisture, native, bloom color, size, deer resistant
- Plant detail card: photo, botanical/common name, characteristics, growing conditions, sustainability benefits, cost
- Quick-add to project palette
- Import from CSV / USDA Plants Database
- Organization can add custom plants

#### 8b. Plant Palette Builder
- Per-project plant selection tool
- Drag plants from library into palette
- Set quantities, size specs, location notes
- Auto-calculate cost estimates
- Native plant percentage calculator
- Export palette as PDF spec sheet
- Season-by-season bloom visualization

#### 8c. Materials Library
- Hardscape materials database
- Categories: paving, walls, edging, mulch, furniture, lighting, water features
- Filter by sustainability rating, cost, material type
- Spec sheets and product links
- Cost calculator per sqft/lf

---

### Module 9: Sustainability Scoring

**Route:** `/projects/:slug/sustainability`

**Features:**

#### 9a. SITES Scorecard
- Full SITES v2 credit checklist (pre-loaded)
- Track pursued credits, documentation status, points achieved
- Visual scorecard: certification level thresholds (Certified, Silver, Gold, Platinum)
- Progress dashboard with points summary by category

#### 9b. LEED Integration
- Track landscape-related LEED credits
- Sustainable Sites, Water Efficiency, Materials & Resources categories
- Cross-reference with SITES where applicable

#### 9c. Sustainability Metrics Dashboard
- **Native Plant %** — calculated from plant palette (target vs. actual)
- **Tree Canopy Coverage** — projected at maturity
- **Permeable Surface %** — of total site area
- **Stormwater Managed** — on-site retention percentage
- **Carbon Offset** — estimated from plant selections
- **Water Reduction** — vs. conventional landscape baseline
- Radar chart visualization
- Export sustainability report for client

---

### Module 10: Document Management

**Route:** `/projects/:slug/documents`

**Features:**

#### 10a. File Browser
- Folder tree organized by phase → category
- Auto-created folder structure on project creation:
  ```
  📁 01 - Discovery
  📁 02 - Schematic Design
  📁 03 - Design Development
  📁 04 - Construction Documents
  📁 05 - Bidding & Negotiation
  📁 06 - Construction Administration
  📁 07 - Closeout
  📁 Contracts & Proposals
  📁 Correspondence
  📁 Site Photos
  📁 Permits
  ```
- Upload via drag-drop, paste, or file picker
- Bulk upload support
- Version history per document
- Preview: images, PDFs inline; CAD/DWG link to external viewer

#### 10b. Search & Filter
- Full-text search across file names, tags, descriptions
- Filter by type, phase, date range, uploader
- Recent files list
- Favorites/bookmarks

#### 10c. Sharing
- Generate shareable links with expiration
- Toggle client visibility per file
- Batch export/download as zip

---

### Module 11: Communication Hub

**Route:** `/projects/:slug/messages`

**Features:**

#### 11a. Project Chat
- Real-time messaging per project (Supabase Realtime)
- Channels: #internal (team only), #client (team + client)
- Rich text, file attachments, image inline preview
- @mentions with notification
- Pin important messages
- Thread replies

#### 11b. Meeting Notes
- Structured template: date, attendees, agenda, notes, action items
- Action items auto-create tasks when checked
- Attach to project timeline
- Client-visible toggle

#### 11c. RFI Tracking
- Numbered RFI log (RFI-001, RFI-002, etc.)
- Question + answer format
- Status: open → responded → closed
- Due date tracking with overdue alerts
- PDF export of RFI log

---

### Module 12: Reporting & Analytics

**Route:** `/reports`

**Features:**

#### 12a. Project Health Dashboard
- All projects: status breakdown (pie chart), phase distribution, at-risk projects
- Project-level: schedule performance index, cost performance index, earned value
- Overdue milestones list
- Stalled projects (no activity in X days)

#### 12b. Team Analytics
- Utilization by person, department, time period
- Billable vs. non-billable breakdown
- Hours by project, phase, service type
- Top contributors

#### 12c. Financial Reports
- Revenue by month/quarter/year (bar chart)
- Revenue by service type, client, project type
- Pipeline: proposal value, win rate
- Accounts receivable aging
- Profitability by project, client, service line
- Budget variance report

#### 12d. Client Satisfaction
- Post-project survey tracking
- NPS score trend
- Client response rates
- Repeat client tracking

#### 12e. Custom Reports
- Report builder: select metrics, filters, grouping, chart type
- Schedule recurring reports (email delivery)
- Export: PDF, CSV, Excel

---

## Service-Specific Features

### Landscape Architecture Module

**Plant Palette Builder** (integrated in Module 8)
- Visual plant arrangement tool
- Season visualization (spring/summer/fall/winter views)
- Mature size overlay on site plan
- Maintenance schedule generator

**Irrigation Design Tracking**
- Irrigation zone mapping
- Head layout tracking (not full design — link to CAD)
- Water budget calculator
- Controller schedule documentation
- Maintenance log

**Grading & Drainage Log**
- Cut/fill volume tracking
- Drainage structure inventory
- Stormwater management feature tracking
- Erosion control measure checklist

### Planning Module

**Zoning Overlay Maps**
- Mapbox layer showing zoning districts
- Link to local zoning codes
- Setback/height/coverage requirements per zone
- Track rezoning applications

**Community Engagement Tracking**
- Public meeting schedule and attendance
- Stakeholder contact database
- Survey/questionnaire distribution and results
- Public comment log with sentiment tagging
- Community feedback summary reports

**Public Comment Management**
- Import comments from public meetings, online portals, email
- Categorize by topic, sentiment, location
- Response tracking
- Export for public record

### Urban Design Module

**Pedestrian Flow Analysis**
- Annotate site maps with pedestrian movement patterns
- Count data entry points
- Before/after comparison
- Connect to site visit observations

**Signage & Wayfinding Inventory**
- Database of sign types, locations, content
- Photo documentation per sign
- Replacement/maintenance schedule
- Map of all signage locations

**Streetscape Element Library**
- Catalog: benches, bollards, planters, bike racks, trash receptacles, light poles
- Product specs and supplier info
- Cost database
- Placement mapping on streetscape plans

---

## UI/UX Design System

### Color Palette

```css
/* Light Mode */
--color-primary: #2D5016;         /* Deep forest green — primary actions */
--color-primary-hover: #3A6B1C;   /* Lighter green hover */
--color-primary-light: #E8F0E2;   /* Light green backgrounds */

--color-secondary: #8B6F47;       /* Warm brown — secondary elements */
--color-accent: #C2724F;          /* Terracotta — accents, CTAs */
--color-accent-light: #F5E6DF;    /* Light terracotta background */

--color-bg-primary: #FDFBF7;      /* Warm cream — main background */
--color-bg-secondary: #F5F2EC;    /* Slightly darker cream — cards */
--color-bg-tertiary: #EDE9E0;     /* Borders, dividers */

--color-text-primary: #1A1A1A;    /* Near-black — headings */
--color-text-secondary: #4A4A4A;  /* Dark gray — body */
--color-text-tertiary: #8A8A8A;   /* Medium gray — labels, captions */

--color-success: #2D7D3A;         /* Green — approved, on-track */
--color-warning: #D4A017;         /* Gold — at-risk, attention */
--color-danger: #C44536;          /* Red — overdue, over-budget */
--color-info: #3B7CB7;            /* Blue — information, links */

/* Dark Mode */
--color-bg-primary-dark: #1A1E16;
--color-bg-secondary-dark: #242920;
--color-bg-tertiary-dark: #2E342A;
--color-text-primary-dark: #F0EDE6;
--color-text-secondary-dark: #B8B4AB;
```

### Typography

```css
/* Headings */
font-family: 'Playfair Display', Georgia, serif;
/* H1: 2.5rem/700, H2: 2rem/700, H3: 1.5rem/600, H4: 1.25rem/600 */

/* Body, UI */
font-family: 'Inter', -apple-system, sans-serif;
/* Body: 1rem/400, Small: 0.875rem/400, Caption: 0.75rem/400 */
/* Buttons: 0.875rem/500, Labels: 0.75rem/600 uppercase tracking-wide */

/* Monospace (project numbers, code) */
font-family: 'JetBrains Mono', monospace;
```

### Spacing & Layout

```css
/* 4px base grid */
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
--space-16: 4rem;    /* 64px */

/* Border radius */
--radius-sm: 0.375rem;   /* 6px — buttons, inputs */
--radius-md: 0.5rem;     /* 8px — cards */
--radius-lg: 0.75rem;    /* 12px — modals, panels */
--radius-full: 9999px;   /* pills, avatars */

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.07);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
```

### Key Component Specs

#### Sidebar Navigation
- Width: 260px (collapsible to 64px icon-only)
- Warm cream background
- Sections: Projects, Library, Resources, Finance, Reports
- Active item: forest green left border + green tint background
- Icons: Lucide icon set
- Bottom: user avatar + org name

#### Project Card (Kanban)
```
┌──────────────────────────────┐
│ 🟢 ██ Service Type Color Bar │
│                              │
│  PROJECT NAME                │
│  Client Name                 │
│                              │
│  📍 Richmond, VA             │
│  📅 Due: Mar 15, 2026        │
│                              │
│  ████████░░ 72% budget       │
│                              │
│  👤👤👤  Phase: SD            │
└──────────────────────────────┘
```
- 280px wide, variable height
- Cream background, subtle shadow
- Hover: lift with larger shadow
- Drag handle on left edge

#### Metric Card
```
┌─────────────────┐
│ 📊  Label        │
│                  │
│  $247,500        │
│  ↑ 12% vs last  │
│  quarter         │
└─────────────────┘
```
- shadcn Card component
- Icon top-left, trend indicator bottom
- Colored border-left for category

#### Phase Timeline Stepper
```
◉─────●─────●─────○─────○─────○─────○
DIS    SD    DD    CD    BID   CA    CLO
       ↑ current
```
- Horizontal stepper
- Filled circles = completed, filled current = in progress, hollow = future
- Green line connecting completed phases

### Mobile Design (< 768px)
- Bottom tab navigation (Dashboard, Projects, Time, Camera, More)
- Camera tab → quick photo capture with GPS tagging
- Time tab → quick time entry
- Cards stack vertically
- Map view is primary on dashboard
- Swipe gestures on Kanban cards

### Animations (Framer Motion)
- Page transitions: fade + slide (200ms ease-out)
- Card hover: `scale(1.02)` + shadow increase (150ms)
- Kanban drag: spring physics
- Modal open: fade + scale from 0.95 (200ms)
- Skeleton loading states for all data-dependent views
- Stagger children animation on list load (50ms per item)
- Map pin drop: bounce with overshoot

---

## API Architecture

### Supabase Client Setup

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### Query Patterns (TanStack Query)

```typescript
// hooks/useProjects.ts
export function useProjects(filters?: ProjectFilters) {
  return useQuery({
    queryKey: ['projects', filters],
    queryFn: async () => {
      let query = supabase
        .from('projects')
        .select(`
          *,
          client:clients(id, name, logo_url),
          lead:users!project_lead_id(id, full_name, avatar_url),
          members:project_members(user:users(id, full_name, avatar_url))
        `)
        .eq('status', filters?.status ?? 'active')
        .order('updated_at', { ascending: false })
      
      if (filters?.service_type) query = query.eq('service_type', filters.service_type)
      if (filters?.client_id) query = query.eq('client_id', filters.client_id)
      
      const { data, error } = await query
      if (error) throw error
      return data
    }
  })
}
```

### Realtime Subscriptions

```typescript
// hooks/useProjectMessages.ts
export function useProjectMessages(projectId: string, channel: string) {
  const queryClient = useQueryClient()
  
  useEffect(() => {
    const subscription = supabase
      .channel(`messages:${projectId}:${channel}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'project_messages',
        filter: `project_id=eq.${projectId}`
      }, (payload) => {
        queryClient.setQueryData(
          ['messages', projectId, channel],
          (old: Message[]) => [...(old ?? []), payload.new as Message]
        )
      })
      .subscribe()
    
    return () => { subscription.unsubscribe() }
  }, [projectId, channel])
}
```

### Edge Functions

```typescript
// supabase/functions/generate-invoice/index.ts
// Generate PDF invoice from time entries + expenses

// supabase/functions/sustainability-calculate/index.ts
// Calculate sustainability metrics from project plant palette

// supabase/functions/send-notification/index.ts
// Email/push notifications for reviews, deadlines, assignments

// supabase/functions/import-plants/index.ts
// Bulk import plants from CSV/USDA database
```

---

## Deployment & Infrastructure

### Environment Variables

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_MAPBOX_TOKEN=pk.eyJ...
VITE_SENTRY_DSN=https://xxx@sentry.io/xxx
VITE_POSTHOG_KEY=phc_xxx
```

### Supabase Storage Buckets

| Bucket | Purpose | Max Size | Public |
|--------|---------|----------|--------|
| `project-files` | CAD, PDFs, contracts | 100MB | No |
| `design-files` | Renderings, plans | 50MB | No |
| `site-photos` | GPS-tagged site photos | 25MB | No |
| `avatars` | User profile photos | 5MB | Yes |
| `org-assets` | Logos, branding | 10MB | Yes |
| `plant-images` | Plant library photos | 10MB | Yes |

### Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.2s |
| Time to Interactive | < 2.5s |
| Largest Contentful Paint | < 2.0s |
| Map load with 50 pins | < 1.5s |
| File upload (50MB) | < 30s |
| Search results | < 200ms |
| Realtime message delivery | < 100ms |

---

## Development Roadmap

### Phase 1: Foundation (Weeks 1-4)
- [ ] Project setup (Vite + React + TypeScript + Tailwind + shadcn)
- [ ] Supabase setup (schema, RLS, auth)
- [ ] Design system implementation (colors, typography, components)
- [ ] Authentication flow (login, signup, org creation)
- [ ] Sidebar navigation + layout shell
- [ ] Project CRUD + list/detail pages
- [ ] Client CRUD

### Phase 2: Core PM (Weeks 5-8)
- [ ] Project Dashboard (map, kanban, gantt, list views)
- [ ] Task management (CRUD, kanban board, assignments)
- [ ] Milestone tracking
- [ ] Time entry + weekly timesheet
- [ ] Basic document upload/management

### Phase 3: Design & Site (Weeks 9-12)
- [ ] Design file upload + gallery
- [ ] Design review + markup tools
- [ ] Approval workflow
- [ ] Site visit logging
- [ ] Photo documentation with GPS
- [ ] Field notes

### Phase 4: Specialized (Weeks 13-16)
- [ ] Plant & Materials Library
- [ ] Plant palette builder
- [ ] Sustainability scoring (SITES/LEED)
- [ ] Permit & compliance tracker
- [ ] Financial dashboards + invoicing

### Phase 5: Communication & Polish (Weeks 17-20)
- [ ] Real-time project messaging
- [ ] Meeting notes + RFI tracking
- [ ] Client portal
- [ ] Reporting & analytics
- [ ] Email notifications
- [ ] Mobile optimization
- [ ] Dark mode
- [ ] Performance optimization

### Phase 6: Advanced (Weeks 21-28)
- [ ] Resource planning & capacity views
- [ ] Service-specific features (irrigation, zoning, streetscape)
- [ ] Custom report builder
- [ ] Bulk import/export tools
- [ ] API documentation
- [ ] User onboarding flow
- [ ] Help documentation

---

## Appendix: Project Phase Definitions

| Phase | Description | Typical Deliverables |
|-------|-------------|---------------------|
| **Discovery** | Site analysis, client goals, research, programming | Site analysis report, program document, base maps |
| **Schematic Design** | Concept development, initial layouts, big ideas | Concept plans, mood boards, preliminary cost estimate |
| **Design Development** | Refine selected concept, material selections, details | DD drawings, material specs, updated cost estimate |
| **Construction Documents** | Final drawings and specifications for construction | CD set, specifications, bid documents |
| **Bidding & Negotiation** | Contractor selection, bid review | Bid tabulation, contractor recommendation |
| **Construction Administration** | Field observation, RFIs, submittals, change orders | Site visit reports, RFI responses, punch lists |
| **Closeout** | Final inspection, documentation, warranty | As-built drawings, maintenance manual, warranty docs |

---

## Appendix: Seed Data for Plant Library

The platform should ship with a pre-loaded library of 200+ common landscape plants for USDA zones 6-8 (matching Cite Design's Richmond, VA market). Categories:

- **Shade Trees** (30): Red Maple, Willow Oak, American Elm, Sweetgum, Tulip Poplar, etc.
- **Ornamental Trees** (25): Crape Myrtle, Dogwood, Redbud, Japanese Maple, Serviceberry, etc.
- **Evergreen Trees** (15): Eastern Red Cedar, Holly, Southern Magnolia, Deodar Cedar, etc.
- **Shrubs** (40): Boxwood, Azalea, Hydrangea, Viburnum, Inkberry, Itea, Sweetspire, etc.
- **Perennials** (50): Black-eyed Susan, Coneflower, Daylily, Hosta, Fern, Switchgrass, etc.
- **Grasses** (20): Muhly Grass, Fountain Grass, Blue Fescue, Switchgrass, Sedge, etc.
- **Groundcovers** (15): Liriope, Pachysandra, Vinca, Creeping Phlox, etc.
- **Vines** (10): Crossvine, Carolina Jessamine, Clematis, Wisteria, etc.

Each plant pre-populated with growing conditions, native status, sustainability ratings, and typical costs.

---

*TerraCite — Purpose-built project management for landscape architecture firms.*
*Specification v1.0 | February 2026*