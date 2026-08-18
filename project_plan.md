# PT Phuc Thanh Holding - Corporate Website

## 1. Project Description
A professional corporate website for Công ty Cổ phần Đầu tư và Công nghệ Phúc Thành Holding (PT), an investment and technology holding company in Vietnam. The website serves as a digital presence showcasing the company's services, expertise, and brand identity. Target users include individual investors, institutional clients, partners, and job seekers.

## 2. Page Structure
- `/` - Homepage (hero carousel, services overview, quick links, footer)
- `/about` - About Us (company overview, history, culture, awards)
- `/services` - Services (detailed service categories)
- `/news` - News & Events
- `/contact` - Contact Information

## 3. Core Features
- [ ] Hero banner carousel with auto-slide
- [ ] Service category cards with sub-links
- [ ] Quick access links section
- [ ] Multi-language support (Vietnamese, English)
- [ ] Responsive navigation with mobile menu
- [ ] Comprehensive footer with links and company info

## 4. Data Model Design
No database required for Phase 1. Content managed via i18n files and mock data.

## 5. Backend / Third-party Integration Plan
- Readdy Backend (Supabase-compatible) connected for content storage, auth, and admin operations
- Optional: Contact form via built-in Form feature in later phases

## 6. Development Phase Plan

### Phase 1: Homepage
- Goal: Build a complete, polished homepage matching the SSI reference layout with PT branding
- Deliverable: Homepage with navbar, hero carousel, services, quick links, footer

### Phase 2: Additional Pages
- Goal: Build About, Services, News, and Contact pages
- Deliverable: Complete multi-page corporate website

### Phase 3: Enhancements
- Goal: Add contact form, animations, and SEO optimization
- Deliverable: Production-ready website with all features

### Phase 4: Admin CMS (WordPress-style)
- Goal: Custom admin panel at /admin for single-admin content management with full CRUD
- Architecture: Supabase Auth (email/password) + admin-api Edge Function (service role) + profiles allow-list (ADMIN_EMAIL secret)
- Deliverables:
  - [x] Login page + auth guard + admin shell (sidebar/topbar)
  - [x] Dashboard with stats
  - [x] admin-api Edge Function (CRUD for content_news/content_projects/content_products/order_headers/order_items)
  - [x] News CRUD UI
  - [x] Projects CRUD UI
  - [x] Products CRUD UI
  - [x] Orders list and status management UI
  - [x] Rewire news, projects, and products pages to read from content tables
  - [ ] Apply the versioned Supabase migration in each deployment environment
