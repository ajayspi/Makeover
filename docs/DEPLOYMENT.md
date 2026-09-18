# 🚀 AuroMakeover - Deployment Guide

Production deployment guide for web, API, and database to go live.

---

## 📋 Pre-Deployment Checklist

Before deploying to production:

- [ ] All tests passing (`npm run test`)
- [ ] No TypeScript errors (`npm run type-check`)
- [ ] No linting errors (`npm run lint`)
- [ ] Environment variables added to production
- [ ] Database migrations ready
- [ ] API endpoints tested (Postman)
- [ ] Mobile responsive verified
- [ ] Lighthouse score 90+
- [ ] Security audit passed
- [ ] Error tracking (Sentry) configured
- [ ] Analytics (Mixpanel) configured
- [ ] Monitoring (Datadog) configured
- [ ] Domain & SSL certificate ready
- [ ] Backup plan documented

---

## 🌐 Step 1: Domain & DNS Setup

### Purchase Domain

1. **Register domain**:
   - Go to [GoDaddy](https://godaddy.com) or [NameCheap](https://namecheap.com)
   - Search: `auramakeover.in`
   - Complete purchase
   - Keep registration info safe

2. **Verify domain ownership**:
   - Add TXT record from registrar to verify

### Configure DNS

#### For Vercel (Web)

1. **Add Vercel nameservers**:
   - Vercel project → Settings → Domains
   - Add domain: `auramakeover.in`
   - Vercel provides 4 nameservers
   - Update nameservers at registrar

2. **Wait for DNS propagation**:
   - Can take 24–48 hours
   - Check with: `nslookup auramakeover.in`

#### For Railway (API)

1. **Add custom domain**:
   - Railway project → Settings → Custom Domains
   - Add: `api.auramakeover.in`
   - Railway provides CNAME
   - Add CNAME record at registrar

2. **SSL/TLS**:
   - Railway auto-generates SSL (Let's Encrypt)
   - No additional setup needed

### Example DNS Records

```
# Type    | Host               | Value
CNAME     | www               | cname.vercel-dns.com
CNAME     | api               | railway-cname.railway.app
TXT       | @                 | v=spf1 include:sendgrid.net ~all (for SendGrid)
```

---

## 🔧 Step 2: Environment Variables (Production)

### Vercel (Web)

1. **Go to project**:
   - [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select AuroMakeover project
   - Settings → Environment Variables

2. **Add variables**:
```
NEXT_PUBLIC_API_URL=https://api.auramakeover.in
```

### Railway (API)

1. **Go to project**:
   - [railway.app/dashboard](https://railway.app/dashboard)
   - Select AuroMakeover project
   - Variables tab

2. **Add all secrets**:
```
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
DATABASE_URL=postgresql://...
JWT_SECRET=<production-secret>
JWT_EXPIRY=7d
RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_SECRET=xxxxxx
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+919876543210
WATI_API_KEY=...
WATI_API_URL=https://api.wati.io
NODE_ENV=production
```

### Supabase (Database)

No additional setup needed. Database already production-ready.

---

## 📦 Step 3: Build & Test

### Test Production Build Locally

```bash
# Build frontend
npm run build:web

# Output should show:
# ✓ Compiled successfully
# ✓ Size optimizations done
# ✓ Ready for production

# Build backend
npm run build:server

# Output should show:
# ✓ Built successfully
```

### Run Production Build Locally

```bash
# Terminal 1: Start production backend
npm run start:server

# Terminal 2: Start production frontend
npm run start:web

# Test at http://localhost:3000
# Should NOT show development warnings
```

---

## 🚀 Step 4: Deploy Frontend (Vercel)

### Automatic Deployment

**Vercel auto-deploys when you push to `main` branch**

```bash
# Push to main branch
git add .
git commit -m "feat: Ready for production"
git push origin main

# Vercel automatically:
# 1. Detects code change
# 2. Installs dependencies
# 3. Runs build
# 4. Runs tests
# 5. Deploys to production
# 6. Updates DNS records
```

### Monitor Deployment

1. **Go to Vercel dashboard**:
   - [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select AuroMakeover project
   - Deployments tab

2. **Check status**:
   - Blue checkmark = success
   - Red X = failed (check logs)

3. **Preview deployment**:
   - Click deployment
   - "Visit" to see live site

### Rollback (if needed)

1. **Find working deployment**:
   - Deployments tab
   - Find previous working version

2. **Promote to production**:
   - Click "..." on deployment
   - Select "Promote to Production"

---

## 🚀 Step 5: Deploy Backend (Railway)

### Automatic Deployment

**Railway auto-deploys when you push to `main` branch**

```bash
# Push to main branch
git add .
git commit -m "feat: API ready for production"
git push origin main

# Railway automatically:
# 1. Detects code change
# 2. Starts deployment
# 3. Installs dependencies
# 4. Runs build
# 5. Starts server
# 6. Routes traffic to new version
```

### Monitor Deployment

1. **Go to Railway dashboard**:
   - [railway.app/dashboard](https://railway.app/dashboard)
   - Select AuroMakeover project
   - Deployments tab

2. **Check status**:
   - Green = active
   - Blue = deploying
   - Red = failed

3. **View logs**:
   - Click deployment
   - "Logs" tab to see console output

### Manual Deployment (if auto-deploy fails)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy
railway deploy
```

---

## 🗄️ Step 6: Database Migration (Production)

### Run Migrations

```bash
# On Railway or local terminal connected to prod DB:

# Run pending migrations
npm run db:migrate

# Output should show:
# ✓ Pending migration detected: 20260918_init
# ✓ Applying migration...
# ✓ Migration applied successfully
```

### Verify Database

```bash
# Check tables exist
npm run db:check

# Output should show:
# ✓ Connected to production database
# ✓ All tables present
# ✓ Data integrity verified
```

### Backup Before Migration

```bash
# Supabase auto-backs up daily
# Manual backup (Supabase):
# 1. Go to project → Settings → Backups
# 2. Click "Create Backup"
# 3. Backup created (can restore if needed)
```

---

## 🔐 Step 7: Security Hardening

### Enable HTTPS

- **Vercel**: Auto-enabled (automatic SSL from Let's Encrypt)
- **Railway**: Auto-enabled (automatic SSL from Let's Encrypt)
- **Verify**: Go to https://auramakeover.in (green lock icon)

### Security Headers

Already set in `server/src/index.ts`:

```typescript
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Strict-Transport-Security', 'max-age=31536000')
  next()
})
```

### Rate Limiting

Already set: 100 requests per 15 minutes per IP

### CORS Configuration

**Verify CORS is restricted**:

```typescript
// server/src/index.ts
app.use(cors({
  origin: ['https://auramakeover.in', 'https://www.auramakeover.in'],
  credentials: true
}))
```

### Environment Variables Security

- ✅ Never commit `.env` files
- ✅ All secrets in environment variables only
- ✅ Rotate secrets regularly (especially JWT_SECRET)

---

## 📊 Step 8: Monitoring Setup

### Sentry (Error Tracking)

1. **Create Sentry account**:
   - Go to [sentry.io](https://sentry.io)
   - Create organization: `AuroMakeover`
   - Create project: `web` (Next.js) and `api` (Node.js)

2. **Get DSN keys**:
   - Project Settings → Client Keys (DSN)
   - Add to environment variables

3. **Initialize in code**:
   - Already added in `web/` and `server/`
   - Errors automatically reported

### Mixpanel (Analytics)

1. **Create Mixpanel account**:
   - Go to [mixpanel.com](https://mixpanel.com)
   - Create project: `AuroMakeover`

2. **Get token**:
   - Project Settings → Token
   - Add to environment variables

3. **Track events**:
   - Already added in frontend
   - Signup, booking, payment events auto-tracked

### Datadog (Infrastructure)

1. **Create Datadog account**:
   - Go to [datadog.com](https://datadog.com)
   - Create organization

2. **Configure APM**:
   - Go to APM → Environments
   - Get API key
   - Add to environment variables

3. **Configure Dashboards**:
   - Create dashboard for:
     - API response times
     - Error rates
     - Database query times
     - CPU/memory usage

---

## 🧪 Step 9: Post-Deployment Testing

### Smoke Tests

Run these immediately after deployment:

```bash
# 1. Health check
curl https://api.auramakeover.in/api/auth/health

# Should return: {"success":true,"data":{"status":"ok"}}

# 2. Auth flow
curl -X POST https://api.auramakeover.in/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210"}'

# Should return: {"success":true,"data":{...}}

# 3. Web app
curl https://auramakeover.in

# Should return HTML (no 5xx errors)
```

### Full User Flow Test

1. **Open web app**: https://auramakeover.in
2. **Click "Book Now"**
3. **Login** with test phone
4. **Browse designs**
5. **View pricing**
6. **Start booking** (don't complete payment)
7. **Check logs** for any errors

### Performance Check

1. **Lighthouse audit**:
   - Open https://auramakeover.in
   - DevTools (F12) → Lighthouse
   - Run audit
   - Should score 90+ (green)

2. **Metrics**:
   - LCP (Largest Contentful Paint): <2.5s
   - FID (First Input Delay): <100ms
   - CLS (Cumulative Layout Shift): <0.1

---

## 📈 Step 10: Monitoring & Maintenance

### Daily Checks

- [ ] **Uptime**: All services running (Vercel, Railway, Supabase)
- [ ] **Error rate**: <0.5% (check Sentry)
- [ ] **Response time**: <500ms (check Datadog)
- [ ] **Database**: No slow queries (check logs)

### Weekly Checks

- [ ] **Analytics**: Weekly active users, bookings
- [ ] **Performance**: Lighthouse scores
- [ ] **Security**: No failed auth attempts (monitor)
- [ ] **Backups**: Database backups completed

### Monthly Checks

- [ ] **Costs**: Vercel, Railway, Supabase invoices
- [ ] **Dependencies**: Update security patches
- [ ] **SSL certificates**: Verify auto-renewal
- [ ] **Database**: Optimize slow queries

### Incident Response

If something goes wrong:

```bash
# 1. Check status pages
# - Vercel status: https://www.vercel-status.com
# - Railway status: https://railway.app/status
# - Supabase status: https://status.supabase.com

# 2. Check logs
# - Vercel: Dashboard → Deployments → Logs
# - Railway: Dashboard → Logs tab
# - Sentry: Sentry dashboard for errors

# 3. Rollback if needed
# - Vercel: Deployments tab → "Promote to Production" (previous version)
# - Railway: Deployments tab → click previous version

# 4. Communicate
# - Alert Founder/Team
# - Post incident update to status page
# - Document what happened
```

---

## 🔄 Step 11: Continuous Deployment (CI/CD)

### GitHub Actions

Already configured in `.github/workflows/`:

```yaml
on: push to main

1. Run tests
2. Run linting
3. Build frontend
4. Build backend
5. Auto-deploy to Vercel (frontend)
6. Auto-deploy to Railway (backend)
```

### View CI/CD Status

1. **Go to GitHub repo**:
   - https://github.com/ajayspi/Makeover

2. **Click "Actions" tab**:
   - See all workflow runs
   - Green checkmark = success
   - Red X = failed

3. **Click workflow**:
   - See step-by-step logs
   - Debug failures

---

## 📝 Step 12: Deployment Checklist

### Before Each Deployment

```
Code Quality:
- [ ] All tests passing
- [ ] No TypeScript errors
- [ ] No linting errors
- [ ] Code reviewed (PR approved)

Testing:
- [ ] Manual testing completed
- [ ] E2E tests passing
- [ ] Mobile testing done
- [ ] Lighthouse 90+

Security:
- [ ] No hardcoded secrets
- [ ] Security headers verified
- [ ] CORS configured correctly
- [ ] Rate limiting active

Documentation:
- [ ] Changelog updated
- [ ] README current
- [ ] API docs updated
- [ ] Breaking changes documented

Monitoring:
- [ ] Sentry configured
- [ ] Mixpanel configured
- [ ] Datadog configured
- [ ] Alert rules set up
```

### After Each Deployment

```
Verification:
- [ ] Health check passes
- [ ] Auth flow works
- [ ] Design gallery loads
- [ ] Payment flow works
- [ ] No console errors

Monitoring:
- [ ] Error rate normal
- [ ] Response time normal
- [ ] No unusual traffic spikes
- [ ] Database healthy

Documentation:
- [ ] Deployment logged
- [ ] Release notes posted
- [ ] Team notified
- [ ] Stakeholders updated
```

---

## 🎯 Scaling (Future)

### When traffic grows (Month 3+):

1. **Vercel**: Auto-scales (no action needed)
2. **Railway**: Add multiple instances
   - Settings → Resources
   - Increase container count
   - Auto load-balances

3. **Database**: Optimize
   - Add read replicas
   - Index slow queries
   - Archive old data

4. **CDN**: Already global (Vercel)
   - No additional setup

---

## 🔗 Useful Links

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard
- **Supabase Dashboard**: https://app.supabase.com
- **Sentry Dashboard**: https://sentry.io/dashboard
- **Mixpanel Dashboard**: https://mixpanel.com/home

---

## 📞 Troubleshooting

### Deployment Failed

1. **Check logs**:
   - Vercel: Deployments → Logs
   - Railway: Logs tab

2. **Common issues**:
   - Missing environment variable
   - Build error (TypeScript)
   - Test failure
   - Database migration error

3. **Fix and retry**:
   - Fix the issue locally
   - Push to main
   - Re-deploy automatically

### Performance Degradation

1. **Check monitoring**:
   - Datadog: API response times
   - Sentry: Error rates
   - Database: Query times

2. **Identify bottleneck**:
   - Slow API endpoint?
   - Slow database query?
   - Frontend issue?

3. **Optimize**:
   - Add database index
   - Cache API response
   - Code split frontend

---

**Last Updated**: September 18, 2026
**Status**: Ready for Week 9 go-live
