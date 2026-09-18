# 🎨 AuroMakeover — 48-Hour Room Transformation Platform

![License](https://img.shields.io/badge/license-MIT-blue)
![Status](https://img.shields.io/badge/status-Active%20Development-green)
![Version](https://img.shields.io/badge/version-0.1.0-orange)
![Node](https://img.shields.io/badge/node-18%2B-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue)

> **Transform any room in 48 hours with expert installation, premium materials, and cutting-edge technology. India's fastest, most reliable room transformation service.**

## 📱 Live Demo

- **Web**: [auramakeover.in](https://auramakeover.in) (Coming Week 2)
- **Mobile**: iOS + Android (Coming Week 6)
- **Admin Dashboard**: [admin.auramakeover.in](https://admin.auramakeover.in) (Coming Week 5)

---

## 🎯 What is AuroMakeover?

AuroMakeover is a **unified room transformation platform** that combines:
- **Expert Technicians** — 8–12 trained professionals from Design Walls
- **Premium Materials** — Wallpaper, smart blinds, lighting, furniture
- **48-Hour Execution** — Book → Confirm → Transform → Celebrate
- **AR Visualization** — See your new room before we install
- **Subscription Model** — Stay fresh with seasonal refreshes
- **B2B Partnerships** — For designers, brokers, corporates

### The Problem We Solve
- ❌ DIY room projects take weeks and look amateur
- ❌ Professional designers charge 40–50% premiums
- ❌ Installation takes 2–4 weeks minimum
- ❌ Renters can't change anything (landlord says no)
- ❌ No guarantee if you hate the result

### The AuroMakeover Solution
- ✅ **48-hour installation** (fastest in India)
- ✅ **Expert technicians** (pre-trained, reliable)
- ✅ **Premium materials** (wallpaper, smart blinds, lights)
- ✅ **AR preview** (see it before we install)
- ✅ **30-day reversal** (risk-free guarantee)
- ✅ **Renter-friendly** (wallpaper is removable)
- ✅ **Subscription model** (stay trendy all year)
- ✅ **B2B partnerships** (for scale)

---

## 🚀 Quick Start

### For Users (Web App)
```bash
# Visit the web app (when live)
https://auramakeover.in

# Steps:
1. Browse design gallery or use AR preview
2. Select tier (Starter ₹25K → Luxury ₹150K)
3. Choose installation date + add-ons
4. Pay via UPI/Card/EMI/BNPL
5. Track technician in real-time
6. Enjoy your transformed room!
```

### For Developers (Local Setup)
```bash
# 1. Clone the repository
git clone https://github.com/ajayspi/Makeover.git
cd Makeover

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your keys:
# - SUPABASE_URL, SUPABASE_KEY
# - RAZORPAY_KEY_ID, RAZORPAY_SECRET
# - TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN
# - WATI_API_KEY, WATI_API_URL

# 4. Initialize database
npm run db:migrate
npm run db:seed

# 5. Start development servers
npm run dev

# 6. Open browser
# Web: http://localhost:3000
# API: http://localhost:5000
```

---

## 📋 Project Structure

```
Makeover/
├─ .github/
│  ├─ workflows/
│  │  ├─ deploy-web.yml (Vercel auto-deploy)
│  │  └─ deploy-api.yml (Railway auto-deploy)
│  └─ ISSUE_TEMPLATE/ (bug report, feature request)
│
├─ shared/
│  ├─ types.ts (30+ TypeScript interfaces)
│  ├─ constants.ts (pricing, tiers, add-ons, templates)
│  └─ schema.prisma (18 database models)
│
├─ server/ (Node.js + Express backend)
│  ├─ src/
│  │  ├─ index.ts (Express app, middleware setup)
│  │  ├─ utils/
│  │  │  └─ logger.ts (Winston logger)
│  │  ├─ middleware/
│  │  │  ├─ auth.ts (JWT verification)
│  │  │  ├─ errorHandler.ts (Global error handling)
│  │  │  ├─ requestLogger.ts (Request logging)
│  │  │  └─ rateLimiter.ts (Rate limiting)
│  │  ├─ services/
│  │  │  ├─ auth.service.ts (Phone OTP, JWT tokens)
│  │  │  ├─ razorpay.service.ts (Payment processing)
│  │  │  ├─ whatsapp.service.ts (Wati integration)
│  │  │  ├─ booking.service.ts (Booking logic)
│  │  │  ├─ referral.service.ts (Referral tracking)
│  │  │  ├─ technician.service.ts (Tech assignment)
│  │  │  ├─ notification.service.ts (SMS, email, push)
│  │  │  └─ analytics.service.ts (Dashboard metrics)
│  │  └─ routes/
│  │     ├─ auth.ts (Authentication endpoints)
│  │     ├─ bookings.ts (Booking CRUD)
│  │     ├─ payments.ts (Payment webhooks)
│  │     ├─ designs.ts (Design gallery)
│  │     ├─ subscriptions.ts (Subscription management)
│  │     ├─ users.ts (User profiles)
│  │     ├─ technicians.ts (Tech management)
│  │     ├─ admin.ts (Admin analytics)
│  │     ├─ referrals.ts (Referral system)
│  │     ├─ reviews.ts (Customer reviews)
│  │     └─ support.ts (Help & FAQ)
│  ├─ prisma/
│  │  └─ schema.prisma (Database schema, migrations)
│  └─ package.json
│
├─ web/ (Next.js 15 + React 19 frontend)
│  ├─ app/
│  │  ├─ layout.tsx (Root layout)
│  │  ├─ page.tsx (Landing page)
│  │  ├─ (auth)/ (Auth group)
│  │  │  ├─ login/page.tsx
│  │  │  └─ verify/page.tsx
│  │  ├─ (app)/ (Protected routes)
│  │  │  ├─ layout.tsx (App layout with sidebar)
│  │  │  ├─ dashboard/page.tsx
│  │  │  ├─ booking/page.tsx (5-step wizard)
│  │  │  ├─ booking/[id]/page.tsx
│  │  │  └─ referrals/page.tsx
│  │  ├─ designs/
│  │  │  ├─ page.tsx (Gallery)
│  │  │  └─ [id]/page.tsx (Detail)
│  │  ├─ pricing/page.tsx
│  │  ├─ ar/page.tsx (AR visualizer)
│  │  └─ admin/ (Admin pages)
│  │
│  ├─ components/
│  │  ├─ (layout)/
│  │  │  ├─ Header.tsx
│  │  │  ├─ Footer.tsx
│  │  │  ├─ Sidebar.tsx
│  │  │  └─ Navigation.tsx
│  │  ├─ (auth)/
│  │  │  ├─ PhoneLoginForm.tsx
│  │  │  ├─ OTPVerifyForm.tsx
│  │  │  └─ AuthGuard.tsx
│  │  ├─ (common)/
│  │  │  ├─ Button.tsx
│  │  │  ├─ Input.tsx
│  │  │  ├─ Card.tsx
│  │  │  ├─ Modal.tsx
│  │  │  └─ Loading.tsx
│  │  ├─ (design)/
│  │  │  ├─ DesignCard.tsx
│  │  │  ├─ DesignGallery.tsx
│  │  │  └─ DesignDetail.tsx
│  │  ├─ (pricing)/
│  │  │  ├─ PricingTier.tsx
│  │  │  ├─ PricingGrid.tsx
│  │  │  └─ PriceCalculator.tsx
│  │  ├─ (booking)/
│  │  │  ├─ BookingFlow.tsx
│  │  │  ├─ Step1Design.tsx
│  │  │  ├─ Step2Details.tsx
│  │  │  ├─ Step3AddOns.tsx
│  │  │  ├─ Step4Payment.tsx
│  │  │  └─ Step5Confirm.tsx
│  │  └─ (ar)/
│  │     ├─ ARVisualizer.tsx
│  │     ├─ WallDetector.tsx
│  │     └─ ARControls.tsx
│  │
│  ├─ lib/
│  │  ├─ api.ts (Axios with auth)
│  │  ├─ auth.ts (Auth helpers)
│  │  ├─ pricing.ts (Price calculations)
│  │  ├─ validators.ts (Zod schemas)
│  │  └─ constants.ts (App constants)
│  │
│  ├─ hooks/
│  │  ├─ useAuth.ts
│  │  ├─ useBooking.ts
│  │  ├─ usePricing.ts
│  │  ├─ useAR.ts
│  │  ├─ useFetch.ts
│  │  └─ useDebounce.ts
│  │
│  ├─ store/
│  │  ├─ authStore.ts (Zustand auth state)
│  │  ├─ bookingStore.ts (Booking cart)
│  │  ├─ uiStore.ts (Modals, toasts)
│  │  └─ appStore.ts (Settings)
│  │
│  ├─ types/
│  │  └─ index.ts (Re-export shared types)
│  │
│  ├─ styles/
│  │  └─ globals.css
│  │
│  ├─ public/
│  │  ├─ images/
│  │  ├─ videos/
│  │  └─ icons/
│  │
│  ├─ package.json
│  ├─ next.config.js
│  ├─ tailwind.config.js
│  └─ tsconfig.json
│
├─ docs/
│  ├─ README.md ← You are here
│  ├─ ARCHITECTURE.md (Tech stack, design decisions)
│  ├─ API_DOCUMENTATION.md (All endpoints)
│  ├─ FEATURES.md (Complete feature list)
│  ├─ SETUP.md (Development environment)
│  ├─ DEPLOYMENT.md (Production deployment)
│  ├─ DATABASE.md (Schema, migrations)
│  ├─ CONTRIBUTING.md (How to contribute)
│  └─ TROUBLESHOOTING.md (Common issues)
│
├─ .github/
│  ├─ workflows/ (CI/CD pipelines)
│  └─ ISSUE_TEMPLATE/
│
├─ .env.example (Environment variables template)
├─ .gitignore
├─ package.json (Root workspace)
├─ BUILD_STATUS.md (Week-by-week tracker)
├─ QUICKSTART.md (Developer onboarding)
├─ COMPLETE_HANDOVER_DOCUMENT.md (Full project brief)
├─ REACT_MASTER_PROMPT.md (Frontend architecture)
├─ AURAMAKEOVER_MASTER_PROMPT.md (Product vision)
└─ README.md (This file)
```

---

## ✨ Core Features

### Phase 0: Foundation ✅ COMPLETE
- [x] Database schema (18 models, Prisma ORM)
- [x] Authentication service (Phone OTP + JWT)
- [x] Auth API routes (7 endpoints)
- [x] Project structure (monorepo, shared types)
- [x] Documentation (Master prompts, handover doc)

### Phase 1: MVP (Weeks 1–9) 🚀 IN PROGRESS
- [ ] **Week 1** — API routes (bookings, payments, designs, subscriptions)
- [ ] **Week 2** — Web pages (landing, pricing, booking wizard) + Razorpay integration
- [ ] **Week 3** — AR visualizer (wall detection, design overlay)
- [ ] **Week 4** — Trust infrastructure (background checks, escrow, warranty)
- [ ] **Week 5** — B2B partner portal (designer white-label, broker dashboard)
- [ ] **Week 6** — Mobile app (React Native + Expo)
- [ ] **Week 7** — Content launch (videos, influencer seeding)
- [ ] **Week 8** — Performance & security testing
- [ ] **Week 9** — Go-live 🚀

### Phase 2: Launch & Growth (Weeks 10–14) 📈
- [ ] 50+ influencer posts (coordinated launch)
- [ ] First 500 bookings
- [ ] Iterate based on feedback
- [ ] Optimize funnel (conversion rate)

### Phase 3: Scale (Months 2–6) 📊
- [ ] Profitability (Month 3–4)
- [ ] Expand geographies (additional neighborhoods)
- [ ] B2B channel optimization
- [ ] Subscription adoption (20%+)

### Phase 4: National Expansion (Months 7–12) 🌍
- [ ] Tier-2 cities (4 cities)
- [ ] Tier-3 cities (10+ micro-franchises)
- [ ] ₹3.2–3.4 Cr ARR target

---

## 💰 Pricing & Business Model

### Core Pricing Tiers

| Tier | Price | COGS | Margin | Best For |
|------|-------|------|--------|----------|
| **Starter** | ₹22–28K | ₹7K | 60% | Budget renters, students |
| **Smart** ⭐ | ₹48–62K | ₹16K | 67% | Young professionals |
| **Designer** | ₹75–95K | ₹24K | 75% | First-time homebuyers |
| **Luxury** | ₹130–165K | ₹38K | 77% | High-income, luxury seekers |

### Add-Ons (15+ Items, 75–90% Margins)
- 3D PVC Wall Panels (₹8–12K)
- Framed Canvas Art (₹2–4K)
- Smart Door Locks (₹8–12K)
- Throw Pillows + Rugs (₹3–6K)
- Mirrors + LED Strips (₹5–8K)
- [+ 10 more items]

### Subscriptions (Recurring Revenue)
- **Smart Concierge** — ₹4.5K/month (1 design per quarter)
- **Premium** — ₹7.5K/month (2 designs per month, photography)
- **Seasonal Refresh** — ₹5.5K/quarter (1 full refresh)

---

## 📊 Key Metrics & Targets

### Year 1 Projections
- **Monthly Bookings**: 50 → 180 (ramping over 12 months)
- **Annual Bookings**: 1,530
- **ARR**: ₹1.5–2 Cr (conservative), ₹3.2+ Cr (with B2B scale)
- **Gross Margin**: 60–77% by tier
- **CAC**: ₹1,800 (organic + referral only)
- **LTV**: ₹50K (3–4 bookings + subscription)
- **LTV:CAC**: 28:1 (exceptional)
- **Breakeven**: Month 4
- **Repeat Rate**: 35%
- **Subscription Adoption**: 20%

### Success Criteria
```
Product Metrics:
✓ Website traffic: 50K/month
✓ Conversion rate: 5%
✓ Review rating: 4.7/5 ⭐
✓ Mobile traffic: 75%
✓ Site speed: <2s LCP

Business Metrics:
✓ CAC: ₹1,800
✓ LTV:CAC: 28:1
✓ Repeat rate: 35%
✓ Subscription adoption: 20%
✓ Profitability: Month 4
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5.0+
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: react-hook-form + Zod
- **Animations**: Framer Motion
- **AR**: Three.js + TensorFlow.js
- **Deployment**: Vercel

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL (Supabase)
- **Authentication**: JWT (phone OTP)
- **Payments**: Razorpay API
- **Messaging**: Twilio (SMS) + Wati (WhatsApp)
- **File Storage**: Supabase Storage
- **Real-time**: Supabase Realtime
- **Deployment**: Railway or Render

### External Services
- **Payments**: Razorpay (UPI, EMI, BNPL, recurring)
- **SMS**: Twilio
- **WhatsApp**: Wati
- **Maps**: Google Maps API
- **Verification**: Sumsub (background checks)
- **Analytics**: Mixpanel
- **Error Tracking**: Sentry
- **Monitoring**: Datadog

### Development Tools
- **Version Control**: GitHub
- **Package Manager**: npm workspaces
- **Package Management**: npm
- **Testing**: Vitest + React Testing Library
- **E2E Testing**: Playwright
- **Code Quality**: ESLint + Prettier
- **CI/CD**: GitHub Actions

---

## 🚀 Deployment

### Web (Next.js on Vercel)
```bash
# Auto-deploys on push to main branch
# Vercel handles scaling, caching, edge functions

# Manual deploy
npm run build
vercel deploy --prod
```

### API (Express on Railway)
```bash
# Auto-deploys on push to main branch
# Railway handles Node.js runtime, environment variables

# Manual deploy
git push railway main
```

### Database (PostgreSQL on Supabase)
```bash
# Migrations run automatically on deployment
npm run db:migrate

# Manual migration
npx prisma migrate deploy
```

---

## 📱 API Overview

### Authentication
- `POST /api/auth/send-otp` — Send OTP to phone
- `POST /api/auth/verify-otp` — Verify OTP, return JWT
- `POST /api/auth/refresh-token` — Refresh access token
- `GET /api/auth/me` — Get current user profile
- `PUT /api/auth/profile` — Update profile
- `POST /api/auth/logout` — Logout

### Bookings
- `POST /api/bookings` — Create new booking
- `GET /api/bookings` — List user bookings
- `GET /api/bookings/:id` — Get booking details
- `PUT /api/bookings/:id` — Update booking
- `DELETE /api/bookings/:id` — Cancel booking
- `GET /api/bookings/:id/tracking` — Live GPS tracking

### Payments
- `POST /api/payments/razorpay` — Create Razorpay order
- `POST /api/payments/webhook` — Razorpay webhook
- `GET /api/payments/:id` — Get payment status

### Designs
- `GET /api/designs` — List all designs (with filters)
- `GET /api/designs/:id` — Get design detail
- `GET /api/designs/search` — Search designs

### Subscriptions
- `POST /api/subscriptions` — Create subscription
- `GET /api/subscriptions` — List user subscriptions
- `PUT /api/subscriptions/:id` — Update subscription
- `DELETE /api/subscriptions/:id` — Cancel subscription

### Referrals
- `GET /api/referrals/me` — Get my referral code
- `POST /api/referrals/apply` — Apply referral coupon
- `GET /api/referrals/leaderboard` — Top referrers

### Admin
- `GET /api/admin/analytics` — Dashboard metrics
- `GET /api/admin/users` — User list
- `GET /api/admin/bookings` — Booking reports
- `GET /api/admin/technicians` — Technician management

**Full API documentation**: See [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md)

---

## 🎯 Getting Started (For Developers)

### Prerequisites
- Node.js 18+ (18.17.0 or higher)
- npm 9+ or yarn
- Git
- PostgreSQL 14+ (or use Supabase)

### Step 1: Clone Repository
```bash
git clone https://github.com/ajayspi/Makeover.git
cd Makeover
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Environment Setup
```bash
# Copy template
cp .env.example .env.local

# Edit .env.local with your API keys:
# Database
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
DATABASE_URL=your_database_url

# Authentication
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d

# Payments (Razorpay)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Messaging (Twilio)
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number

# WhatsApp (Wati)
WATI_API_KEY=your_wati_key
WATI_API_URL=https://api.wati.io

# Verification (Sumsub)
SUMSUB_API_KEY=your_sumsub_key

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### Step 4: Database Setup
```bash
# Run migrations
npm run db:migrate

# Seed initial data (designs, add-ons)
npm run db:seed
```

### Step 5: Start Development Servers
```bash
# Terminal 1: Start backend (Express on port 5000)
npm run dev:server

# Terminal 2: Start frontend (Next.js on port 3000)
npm run dev:web

# Or both together:
npm run dev
```

### Step 6: Verify Setup
- Open http://localhost:3000 (web app)
- Open http://localhost:5000/api/auth/health (API)
- Check console for any errors

---

## 📖 Documentation

For detailed information, see:

| Document | Content |
|----------|---------|
| [SETUP.md](./docs/SETUP.md) | Detailed development environment setup |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Tech stack decisions, design patterns |
| [FEATURES.md](./docs/FEATURES.md) | Complete feature list by phase |
| [API_DOCUMENTATION.md](./docs/API_DOCUMENTATION.md) | All API endpoints, request/response formats |
| [DATABASE.md](./docs/DATABASE.md) | Database schema, models, migrations |
| [DEPLOYMENT.md](./docs/DEPLOYMENT.md) | Production deployment guide |
| [CONTRIBUTING.md](./docs/CONTRIBUTING.md) | How to contribute to the project |
| [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md) | Common issues and solutions |
| [COMPLETE_HANDOVER_DOCUMENT.md](./COMPLETE_HANDOVER_DOCUMENT.md) | Full project overview (for team handoff) |
| [REACT_MASTER_PROMPT.md](./REACT_MASTER_PROMPT.md) | Frontend architecture & patterns |
| [AURAMAKEOVER_MASTER_PROMPT.md](./AURAMAKEOVER_MASTER_PROMPT.md) | Product vision & design system |
| [BUILD_STATUS.md](./BUILD_STATUS.md) | Week-by-week development tracker |

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./docs/CONTRIBUTING.md) for guidelines on:
- Reporting bugs
- Suggesting features
- Submitting pull requests
- Code standards & commit conventions

### Quick Contribution Steps
```bash
# 1. Create a new branch
git checkout -b feat/your-feature

# 2. Make your changes
# 3. Commit with clear messages
git commit -m "feat: Add new feature"

# 4. Push to your fork
git push origin feat/your-feature

# 5. Open a pull request
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: "Cannot find module 'prisma'"
```bash
Solution: npm install prisma --save-dev
```

**Issue**: "Database connection refused"
```bash
Solution: Check DATABASE_URL in .env.local, ensure Supabase is running
```

**Issue**: "Razorpay sandbox not working"
```bash
Solution: Use test API keys from Razorpay Dashboard → Settings → API Keys
```

**Issue**: "WhatsApp messages not sending"
```bash
Solution: Ensure WATI_API_KEY is valid, check Wati account status
```

For more: See [TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

---

## 📊 Project Status

### Current Phase
**Phase 0: Foundation** ✅ COMPLETE
- Database schema
- Authentication service
- API routes (auth)
- Documentation

### Next Phase
**Phase 1: MVP** 🚀 IN PROGRESS (Weeks 1–9)
- Week 1: Core API routes
- Week 2: Web MVP + Razorpay
- Week 3: AR visualizer
- Week 4–9: Features, testing, launch

### Timeline
- **Week 1–9**: Development (MVP)
- **Week 10–14**: Launch & optimize
- **Month 2–6**: Growth & scale
- **Month 7–12**: National expansion

**Detailed**: See [BUILD_STATUS.md](./BUILD_STATUS.md)

---

## 💡 Key Features by Phase

### Phase 0: ✅ Done
- [x] Monorepo structure
- [x] Database schema (18 models)
- [x] Phone OTP authentication
- [x] JWT token management
- [x] TypeScript types & constants
- [x] Documentation & setup guides

### Phase 1: 🚀 In Progress
- [ ] Booking creation & management
- [ ] Payment processing (Razorpay)
- [ ] Design gallery & search
- [ ] Subscription management
- [ ] User dashboard
- [ ] AR visualizer (wall detection)
- [ ] Trust & assurance (background checks)
- [ ] B2B partner portal
- [ ] Mobile app (React Native)
- [ ] Content (videos, articles)

### Phase 2: 📋 Planned
- [ ] Performance optimization
- [ ] Advanced analytics
- [ ] Influencer management dashboard
- [ ] Technician mobile app
- [ ] Automated reminders (SMS/WhatsApp)
- [ ] Review moderation
- [ ] Advanced search filters

### Phase 3: 🔜 Planned
- [ ] Multi-city support
- [ ] Regional pricing
- [ ] B2B bulk booking
- [ ] API for partners
- [ ] White-label platform

---

## 🎨 Design System

**Brand Colors:**
- **Gold** (#D4A574) — Premium, transformation
- **Navy** (#1A1F3A) — Trust, stability
- **Teal** (#00B4A6) — Energy, innovation
- **Cream** (#F5F5F5) — Breathing room

**Typography:**
- **Display**: Sora (headlines)
- **Body**: Inter (copy)
- **Accent**: Space Mono (data)

**Components:**
All components use shadcn/ui + Tailwind CSS. See `/web/components/` for examples.

---

## 📞 Support

### Getting Help
1. **Check Documentation** — Most answers are in the docs
2. **Search Issues** — GitHub Issues may have your answer
3. **Open an Issue** — If you find a bug or have a feature request
4. **Contact Founder** — For strategic questions or urgent issues

### Contact
- **Founder/CTO**: AV Ajay Kiran
- **Email**: ajay@auramakeover.in
- **GitHub Issues**: [github.com/ajayspi/Makeover/issues](https://github.com/ajayspi/Makeover/issues)

---

## 📜 License

This project is licensed under the **MIT License** — see [LICENSE](./LICENSE) for details.

**Commercial Use**: This is a commercial venture. If using code, always attribute and contact the founder for licensing questions.

---

## 🙏 Acknowledgments

- **Design Walls** — Operational foundation, technician network
- **Supabase** — Database, auth, real-time infrastructure
- **Razorpay** — Payment processing in India
- **Vercel** — Web deployment
- **Railway** — API deployment
- **shadcn/ui** — Component library
- **Framer Motion** — Animations
- **Three.js** — 3D visualizations

---

## 📈 Roadmap

### Q4 2026 (Immediate)
- [x] Phase 0: Foundation
- [ ] Week 1: API routes
- [ ] Week 2: Web MVP
- [ ] Week 3: AR visualizer
- [ ] Week 9: Launch

### Q1 2027 (Scale)
- [ ] 500+ bookings
- [ ] Profitability
- [ ] Expand to 5 neighborhoods
- [ ] Subscription at scale

### Q2–Q3 2027 (Tier-2 Expansion)
- [ ] Tier-2 cities (4 cities)
- [ ] ₹50 Cr ARR run rate
- [ ] 5,000+ customers

### Q4 2027 (National)
- [ ] Tier-3 cities (10+ micro-franchises)
- [ ] ₹3+ Cr ARR
- [ ] Franchise model live

---

## ✨ Final Notes

**AuroMakeover is more than code.** It's a complete ecosystem:
- 🏢 **Operational foundation** (technicians, vendors)
- 💻 **Technology platform** (mobile app, AR, subscriptions)
- 🌟 **Community** (influencers, referrals, partnerships)
- 📊 **Data moat** (5,000+ installations = market insights)

**The next 9 weeks are critical.** Ship incrementally, test obsessively, and iterate based on real customer feedback.

**Let's transform rooms. Let's transform India. 🎨**

---

**Questions?** Open an issue or reach out to [ajay@auramakeover.in](mailto:ajay@auramakeover.in)

**Ready to contribute?** See [CONTRIBUTING.md](./docs/CONTRIBUTING.md) and start shipping! 🚀
