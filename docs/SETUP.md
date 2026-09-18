# 🔧 AuroMakeover - Development Setup Guide

Complete step-by-step guide to set up the project locally for development.

---

## 📋 Prerequisites

Before you begin, ensure you have:

### Required
- **Node.js** 18.17.0 or higher ([download](https://nodejs.org))
  - Verify: `node --version`
- **npm** 9.0.0 or higher (comes with Node.js)
  - Verify: `npm --version`
- **Git** ([download](https://git-scm.com))
  - Verify: `git --version`
- **PostgreSQL** 14+ (local or Supabase)
- **Code Editor** (VS Code recommended)

### Recommended
- **Docker** (optional, for database)
- **Postman** or **Insomnia** (API testing)
- **GitHub Desktop** (optional, easier git management)

---

## 🚀 Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/ajayspi/Makeover.git

# Navigate to project directory
cd Makeover

# List files to verify structure
ls -la
```

**Output should show**:
```
├── shared/
├── server/
├── web/
├── docs/
├── package.json
├── README.md
├── .env.example
└── ... other files
```

---

## 📦 Step 2: Install Dependencies

```bash
# Install root dependencies (monorepo workspace)
npm install

# This installs:
# - shared/ dependencies
# - server/ dependencies
# - web/ dependencies
# - All in one command (npm workspaces)
```

**Time**: ~2–3 minutes (depends on internet speed)

**Verify**:
```bash
npm list | head -20
```

---

## 🔑 Step 3: Environment Variables

### Get Supabase API Keys

1. **Create Supabase Account**:
   - Go to [supabase.com](https://supabase.com)
   - Click "Start your project"
   - Sign up with GitHub / Google

2. **Create a Project**:
   - Name: `auramakeover-dev`
   - Region: `Asia Pacific (Singapore)` (closest to India)
   - Password: Create strong password
   - Click "Create new project"
   - Wait 2–3 minutes for project creation

3. **Get API Keys**:
   - Go to Settings → API
   - Copy "Project URL" → `SUPABASE_URL`
   - Copy "anon public" key → `SUPABASE_ANON_KEY`
   - Copy "service_role secret" key → `SUPABASE_SERVICE_ROLE_KEY`

4. **Get Connection String**:
   - Go to Settings → Database
   - Copy "PostgreSQL Connection String"
   - Set password and database name
   - Save as `DATABASE_URL`

### Get Razorpay Sandbox Keys

1. **Create Razorpay Account**:
   - Go to [razorpay.com](https://razorpay.com)
   - Sign up with email
   - Complete KYC (quick, ~5 mins)

2. **Get Test API Keys**:
   - Go to Settings → API Keys
   - Switch to "Test Mode" (toggle in top-right)
   - Copy "Key ID" → `RAZORPAY_KEY_ID`
   - Copy "Key Secret" → `RAZORPAY_SECRET`

### Get Twilio Credentials

1. **Create Twilio Account**:
   - Go to [twilio.com](https://twilio.com)
   - Sign up (free trial, ₹1000 credit)
   - Verify phone number

2. **Get Credentials**:
   - Go to Console → Account SID
   - Copy "Account SID" → `TWILIO_ACCOUNT_SID`
   - Copy "Auth Token" → `TWILIO_AUTH_TOKEN`

3. **Get Phone Number**:
   - Go to Phone Numbers → Buy a Number
   - Choose country: India
   - Buy number (e.g., +91987654321)
   - Copy → `TWILIO_PHONE_NUMBER`

### Create .env.local

```bash
# Copy template
cp .env.example .env.local

# Edit with your editor
nano .env.local
# or
code .env.local
```

**Fill with your values**:
```env
# Database
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
DATABASE_URL=postgresql://postgres:password@db.xxxx.supabase.co:5432/postgres

# Authentication
JWT_SECRET=your_super_secret_key_at_least_32_chars
JWT_EXPIRY=7d

# Payments (Razorpay - Sandbox)
RAZORPAY_KEY_ID=rzp_test_xxxxx
RAZORPAY_SECRET=xxxxxx

# Messaging (Twilio)
TWILIO_ACCOUNT_SID=AC1234567890
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=+919876543210

# Messaging (Wati - optional for now)
WATI_API_KEY=your_wati_key
WATI_API_URL=https://api.wati.io

# Next.js Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000

# Environment
NODE_ENV=development
```

**⚠️ Security**:
- `.env.local` is in `.gitignore` (never commit secrets)
- Use strong `JWT_SECRET` (min 32 characters)
- Test keys only (never use production keys locally)

---

## 🗄️ Step 4: Database Setup

### Initialize Database with Supabase

1. **Create Tables** (using Prisma migrations):
```bash
# Run migrations
npm run db:migrate

# Output should show:
# Applying migration `20260918_init`
# ✓ Migration applied
```

2. **Seed Initial Data** (designs, tiers, add-ons):
```bash
# Run seed script
npm run db:seed

# Output should show:
# ✓ Seeding database
# ✓ Created 40 designs
# ✓ Created 4 pricing tiers
# ✓ Created 15 add-ons
```

### Verify Database

1. **Check Supabase Dashboard**:
   - Go to [supabase.com](https://supabase.com)
   - Navigate to project
   - Go to SQL Editor
   - Run: `SELECT COUNT(*) FROM "Design";`
   - Should return: `40`

2. **Check via CLI**:
```bash
npm run db:check
# Output: ✓ Database connected
#         ✓ 40 designs found
#         ✓ Ready for development
```

---

## ▶️ Step 5: Start Development Servers

### Option A: Start Both (Recommended)

```bash
# Terminal 1: Start backend + frontend together
npm run dev

# Output:
# > backend listening on http://localhost:5000
# > frontend listening on http://localhost:3000
```

### Option B: Start Separately

**Terminal 1** (Backend):
```bash
npm run dev:server

# Output:
# ✓ Server running on http://localhost:5000
# ✓ Database connected
```

**Terminal 2** (Frontend):
```bash
npm run dev:web

# Output:
# ▲ Next.js 15
# ▲ Local:   http://localhost:3000
# ▲ Ready in 2.3s
```

---

## 🌐 Step 6: Verify Setup

### Test Backend API

Open terminal and run:

```bash
# Health check
curl http://localhost:5000/api/auth/health

# Output:
# {"success":true,"data":{"status":"ok","uptime":10}}

# Send OTP (test)
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210"}'

# Output:
# {"success":true,"data":{"phone":"+919876543210","expiresIn":600}}
```

### Test Frontend Web

Open browser and visit:

1. **Landing Page**: http://localhost:3000
   - Should show hero, design gallery, pricing
   - No errors in console (F12)

2. **Login Page**: http://localhost:3000/login
   - Phone input field
   - "Send OTP" button

3. **Auth Flow**:
   - Enter phone: `+919876543210`
   - Click "Send OTP"
   - Check SMS/WhatsApp (using Twilio test number)
   - Enter OTP in next page
   - Should login successfully
   - Redirects to dashboard

---

## 🐛 Step 7: Troubleshooting

### Problem: "Cannot find module 'prisma'"
```bash
Solution:
npm install prisma --save-dev
npm run db:migrate
```

### Problem: "DATABASE_URL not found"
```bash
Solution:
# Verify .env.local exists
ls -la .env.local

# Check DATABASE_URL is set
echo $DATABASE_URL

# If empty, edit .env.local and add PostgreSQL URL
```

### Problem: "ECONNREFUSED" (cannot connect to database)
```bash
Solution:
# 1. Verify Supabase project is running
#    - Go to supabase.com, check project status

# 2. Verify DATABASE_URL in .env.local is correct
#    - Check character-by-character (typos?)

# 3. Check password in connection string
#    - PostgreSQL passwords with special chars need URL encoding
#    - Example: pass!@word → pass%21%40word

# 4. Test connection manually
npm run db:check
```

### Problem: "Razorpay key not found"
```bash
Solution:
# 1. Verify you're in Razorpay Test Mode (not Live)
# 2. Verify RAZORPAY_KEY_ID and RAZORPAY_SECRET in .env.local
# 3. Key format check:
#    - KEY_ID should start with "rzp_test_"
#    - SECRET should be ~40 random characters
```

### Problem: "SMS not received"
```bash
Solution:
# 1. Check Twilio Console for logs (why SMS failed)
# 2. Verify TWILIO_PHONE_NUMBER is correct
# 3. Check phone number format: +919876543210 (must include +91)
# 4. Note: Twilio free trial only sends to verified numbers
#    - Go to Twilio → Phone Numbers → Verify a Number
#    - Add your actual phone number
#    - Receive verification code via SMS
#    - Use that number for testing
```

### Problem: "Port 3000 or 5000 already in use"
```bash
Solution:
# Find process using port
lsof -i :3000
lsof -i :5000

# Kill process
kill -9 <PID>

# Or use different ports
npm run dev:server -- --port 5001
npm run dev:web -- --port 3001
```

---

## 📝 Step 8: IDE Setup (VS Code)

### Recommended Extensions

1. **ESLint** — Code quality
   - ID: `dbaeumer.vscode-eslint`

2. **Prettier** — Code formatting
   - ID: `esbenp.prettier-vscode`

3. **TypeScript Vue Plugin** — TypeScript support
   - ID: `Vue.volar`

4. **Prisma** — Database schema syntax highlighting
   - ID: `Prisma.prisma`

5. **REST Client** — Make API requests in editor
   - ID: `humao.rest-client`

### .vscode/settings.json

Create file: `.vscode/settings.json`

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## 🧪 Step 9: Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Watch mode (re-run on file change)
npm run test:watch

# Coverage report
npm run test:coverage
```

### API Testing (Postman/Insomnia)

1. **Import collection**:
   - File → Import
   - Select `/postman-collection.json`

2. **Set environment**:
   - Environments → Create new
   - Set variables:
     - `base_url`: `http://localhost:5000`
     - `phone`: `+919876543210`
     - `otp`: `123456` (use received OTP)

3. **Run requests**:
   - Click "Send" on each request
   - Check response (200 OK)

---

## 🚀 Step 10: First Development Task

### Create Your First Feature

1. **Create a branch**:
```bash
git checkout -b feat/first-feature
```

2. **Make a change** (e.g., add a button):
```bash
# Edit: web/components/Button.tsx
# Add new variant or style
```

3. **Test locally**:
```bash
# Browser: http://localhost:3000
# Should see your changes
```

4. **Commit**:
```bash
git add .
git commit -m "feat: Add button variant"
```

5. **Push**:
```bash
git push origin feat/first-feature
```

6. **Open PR** on GitHub for code review

---

## 📚 Next Steps

After setup is complete:

1. **Read Architecture**: [ARCHITECTURE.md](./ARCHITECTURE.md)
2. **Learn API**: [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
3. **Read Features**: [FEATURES.md](./FEATURES.md)
4. **Check Build Status**: [BUILD_STATUS.md](../BUILD_STATUS.md)
5. **Start coding**: Week 1 tasks in [BUILD_STATUS.md](../BUILD_STATUS.md)

---

## 💡 Tips & Tricks

### Database Commands

```bash
# Open Prisma Studio (UI for database)
npm run db:studio

# Reset database (⚠️ deletes all data)
npm run db:reset

# Generate Prisma client
npm run db:generate

# Format schema
npm run db:format
```

### Useful npm Scripts

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Build for production
npm run build

# Start production server
npm start

# Clean install (remove node_modules, reinstall)
npm run clean
```

### Git Workflow

```bash
# See current status
git status

# See changes
git diff

# Undo changes to a file
git checkout -- <file>

# Undo last commit (keep changes)
git reset HEAD~1

# See commit history
git log --oneline
```

---

## 🤝 Getting Help

1. **Check docs**:
   - README.md, SETUP.md, ARCHITECTURE.md

2. **Search GitHub issues**:
   - [github.com/ajayspi/Makeover/issues](https://github.com/ajayspi/Makeover/issues)

3. **Ask in PR comments**:
   - When stuck, ask questions in your PR

4. **Contact founder**:
   - Email: ajay@auramakeover.in
   - For urgent issues or blockers

---

## ✅ Checklist

Before you start coding, verify:

- [ ] Node.js 18+ installed
- [ ] npm 9+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] .env.local created with all keys
- [ ] Database migrated and seeded
- [ ] Backend running (`http://localhost:5000`)
- [ ] Frontend running (`http://localhost:3000`)
- [ ] API health check passes
- [ ] SMS test works (OTP received)
- [ ] Authentication flow works (can login)
- [ ] No console errors in browser

---

**You're ready to code! 🎉**

Next: Check [BUILD_STATUS.md](../BUILD_STATUS.md) for your first week tasks.

---

**Last Updated**: September 18, 2026
**Difficulty**: Beginner
**Time**: 30–60 minutes
