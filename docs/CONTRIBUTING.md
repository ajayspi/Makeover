# 🤝 AuroMakeover - Contributing Guide

Thank you for your interest in contributing to AuroMakeover! This guide will help you get started.

---

## 📋 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on code, not the person
- Help others learn and grow
- Report issues privately (don't shame publicly)

---

## 🚀 Getting Started

### 1. Fork & Clone

```bash
# Fork on GitHub (click "Fork" button)

# Clone your fork
git clone https://github.com/YOUR_USERNAME/Makeover.git
cd Makeover

# Add upstream remote
git remote add upstream https://github.com/ajayspi/Makeover.git
```

### 2. Create Branch

```bash
# Update main from upstream
git fetch upstream
git rebase upstream/main

# Create feature branch
git checkout -b feat/your-feature-name
```

**Branch naming**:
- `feat/` — New feature
- `fix/` — Bug fix
- `docs/` — Documentation
- `refactor/` — Code refactor
- `test/` — Add/improve tests
- `perf/` — Performance improvement

### 3. Make Changes

```bash
# Make your changes
# Run tests
npm run test

# Run linter
npm run lint

# Check types
npm run type-check
```

### 4. Commit

```bash
git add .
git commit -m "feat: Add new feature description"
```

**Commit message format**:
```
<type>: <description>

<optional body explaining changes>

Fixes #123 (if applicable)
```

**Types**:
- `feat` — New feature
- `fix` — Bug fix
- `docs` — Documentation only
- `refactor` — Code refactor (no behavior change)
- `test` — Add tests
- `perf` — Performance improvement
- `ci` — CI/CD changes

**Example**:
```
feat: Add AR visualizer for design preview

- Integrate TensorFlow.js for wall detection
- Implement Three.js for design overlay
- Add camera permission handling
- Support fallback 360° preview

Fixes #456
```

### 5. Push & Open PR

```bash
# Push to your fork
git push origin feat/your-feature-name

# Open PR on GitHub
# - Title: Clear, descriptive
# - Description: What changed, why, how to test
# - Link issue: "Fixes #123"
```

---

## 📝 Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests added/updated
- [ ] Manual testing done
- [ ] Mobile testing done (if applicable)

## Screenshots (if UI change)
[Add screenshots]

## Related Issues
Fixes #123

## Checklist
- [ ] Code follows style guidelines
- [ ] Tests pass
- [ ] No TypeScript errors
- [ ] Documentation updated
- [ ] Commit messages are clear
```

---

## ✨ Code Style Guide

### TypeScript

```typescript
// ✅ Good: Clear types, proper naming
interface BookingRequest {
  designId: number;
  date: Date;
  address: string;
}

async function createBooking(req: BookingRequest): Promise<Booking> {
  // Implementation
}

// ❌ Bad: Any types, unclear naming
function create(data: any): any {
  // Implementation
}
```

### React Components

```typescript
// ✅ Good: Proper typing, memoization, clear names
interface BookingCardProps {
  booking: Booking;
  onCancel: (id: number) => void;
}

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onCancel
}) => {
  return (
    <div className="booking-card">
      {/* JSX */}
    </div>
  );
};

// ❌ Bad: No types, component not memoized
export function BookingCard(props) {
  // JSX
}
```

### Naming Conventions

```typescript
// ✅ Good: Clear, descriptive names
const getUserBookings = async (userId: number) => { }
const calculateTotalPrice = (bookings: Booking[]) => { }
const isValidPhoneNumber = (phone: string) => { }

// ❌ Bad: Unclear abbreviations
const getUB = async (uid: number) => { }
const calcTP = (b: any[]) => { }
const valid = (p: string) => { }
```

### File Organization

```
web/components/
├─ (layout)/
│  ├─ Header.tsx
│  ├─ Header.test.tsx
│  └─ Header.module.css
├─ (common)/
│  ├─ Button.tsx
│  ├─ Button.test.tsx
│  └─ Button.module.css
└─ (booking)/
   ├─ BookingFlow.tsx
   ├─ BookingFlow.test.tsx
   └─ BookingFlow.module.css
```

---

## 🧪 Testing Requirements

### Unit Tests (Components)

```typescript
// ✅ Good: Comprehensive tests
describe('BookingCard', () => {
  it('should display booking details', () => {
    const booking = {
      id: 123,
      designId: 5,
      date: new Date()
    };

    const { getByText } = render(
      <BookingCard booking={booking} onCancel={jest.fn()} />
    );

    expect(getByText(/Booking #123/)).toBeInTheDocument();
  });

  it('should call onCancel when cancel button clicked', () => {
    const onCancel = jest.fn();
    const booking = { id: 123 };

    const { getByText } = render(
      <BookingCard booking={booking} onCancel={onCancel} />
    );

    fireEvent.click(getByText('Cancel'));
    expect(onCancel).toHaveBeenCalledWith(123);
  });
});

// ❌ Bad: No tests
// ❌ Bad: Only tests happy path
```

### Integration Tests (API)

```typescript
// ✅ Good: Test API flow
describe('POST /api/bookings', () => {
  it('should create booking with valid data', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${token}`)
      .send({
        designId: 5,
        date: '2026-09-25',
        address: 'Test Address'
      });

    expect(res.status).toBe(201);
    expect(res.body.data.bookingId).toBeDefined();
  });

  it('should reject without auth token', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({ ... });

    expect(res.status).toBe(401);
  });
});
```

### E2E Tests (User Flows)

```typescript
// ✅ Good: Test complete user flow
describe('Booking Flow', () => {
  it('should complete booking end-to-end', async () => {
    // 1. Navigate to app
    await page.goto('http://localhost:3000');

    // 2. Login
    await page.fill('[name="phone"]', '+919876543210');
    await page.click('button:has-text("Send OTP")');

    // 3. Browse designs
    await page.click('[data-design="5"]');

    // 4. Start booking
    await page.click('button:has-text("Book This Design")');

    // 5. Fill details
    await page.fill('[name="date"]', '2026-09-25');

    // 6. Verify success
    await expect(page).toHaveURL(/\/booking\/.*\/confirmation/);
  });
});
```

---

## 📚 Documentation

### Comment Requirements

Only write comments for **why**, not **what**:

```typescript
// ✅ Good: Explains reasoning
async function createBooking(req: BookingRequest) {
  // Check date is not in past since we need 48-hour notice
  if (req.date < new Date(Date.now() + 48 * 60 * 60 * 1000)) {
    throw new Error('Minimum 48 hours notice required');
  }
}

// ❌ Bad: Comments describe obvious code
async function createBooking(req: BookingRequest) {
  // Check if date is valid
  if (req.date < now) {
    // Throw error
    throw new Error('Invalid date');
  }
}
```

### Update Documentation

When adding a feature:
- [ ] Add API endpoint to [API_DOCUMENTATION.md](./API_DOCUMENTATION.md)
- [ ] Add feature to [FEATURES.md](./FEATURES.md)
- [ ] Update [ARCHITECTURE.md](./ARCHITECTURE.md) if architecture changed
- [ ] Add examples to [SETUP.md](./SETUP.md) if setup changed

---

## 🎯 Review Process

### What Reviewers Look For

1. **Correctness**
   - Does the code work?
   - Are edge cases handled?
   - Are there bugs?

2. **Testing**
   - Are tests added/updated?
   - Do tests pass?
   - Is coverage sufficient?

3. **Style**
   - Does it follow conventions?
   - Is code readable?
   - Are names clear?

4. **Performance**
   - Any N+1 queries?
   - Unnecessary renders?
   - Memory leaks?

5. **Security**
   - Any auth issues?
   - SQL injection risks?
   - XSS vulnerabilities?

### Responding to Feedback

- **Accept constructive criticism** — reviewers want to help
- **Ask for clarification** — if feedback is unclear
- **Explain your reasoning** — if you disagree
- **Make requested changes** — or discuss alternatives
- **Mark as resolved** — after addressing

**Example response**:
```
Great catch! I didn't handle the case where bookings array is empty.
I've added a check and test for it. Please review updated code.

[Link to commit]
```

---

## 🐛 Reporting Issues

### Bug Report Template

```markdown
## Describe the bug
Clear description of what's wrong

## Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected behavior
What should happen

## Actual behavior
What actually happens

## Screenshots
[Add screenshots]

## Environment
- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Safari]
- Node version: [e.g. 18.17.0]

## Additional context
Any other relevant info
```

### Feature Request Template

```markdown
## Description
Clear description of desired feature

## Problem it solves
Why this feature is needed

## Proposed solution
How you'd like it to work

## Alternatives considered
Other approaches you've thought of

## Related issues
[Link to related issues]
```

---

## 📦 Dependency Updates

### Adding Dependencies

```bash
# Check if absolutely necessary
# Prefer built-in solutions first

# Add to shared (if used by multiple packages)
npm install --save --workspace=shared <package>

# Add to specific package
npm install --save --workspace=server <package>

# Update package.json and commit
git add package.json package-lock.json
git commit -m "chore: Add <package> for <reason>"
```

### Security Updates

```bash
# Check for vulnerabilities
npm audit

# Fix automatically (if safe)
npm audit fix

# Manual fix for complex cases
npm update <vulnerable-package>

# Commit security updates
git commit -m "chore: Update <package> for security"
```

---

## 🔄 Workflow Summary

```
1. Fork & clone
   ↓
2. Create branch (feat/bug-fix/etc)
   ↓
3. Make changes
   ↓
4. Add tests & documentation
   ↓
5. Run tests (npm run test)
   ↓
6. Run linter (npm run lint)
   ↓
7. Run type check (npm run type-check)
   ↓
8. Commit with clear message
   ↓
9. Push to fork
   ↓
10. Open PR on GitHub
   ↓
11. Address review feedback
   ↓
12. Merge when approved ✅
```

---

## 💡 Tips for Success

### Before Opening PR

- [ ] Rebase on latest `main`
- [ ] Run all tests locally
- [ ] Test on mobile (if UI change)
- [ ] Check TypeScript errors
- [ ] Check linting
- [ ] Update documentation
- [ ] Add meaningful commit messages

### In PR Description

- [ ] Explain **what** changed
- [ ] Explain **why** it changed
- [ ] Link related issues
- [ ] Add screenshots (if UI change)
- [ ] Note any breaking changes

### During Review

- [ ] Respond promptly
- [ ] Be open to feedback
- [ ] Ask questions if unclear
- [ ] Thank reviewers
- [ ] Learn from feedback

---

## 🏆 Recognition

Contributors are recognized in:
- [README.md](../README.md) — Contributors section
- GitHub — Contribution graph
- Release notes — Acknowledged for major contributions
- Project board — Featured contributions

---

## 📞 Getting Help

- **GitHub Issues** — Ask questions in issue comments
- **Pull Request Comments** — Ask questions during review
- **Discussions** — General questions about architecture/design
- **Email** — For urgent issues: ajay@auramakeover.in

---

## ✅ Quick Checklist

Before submitting PR:

```
[ ] Branch created from latest main
[ ] Changes are focused on one thing
[ ] Tests added/updated
[ ] Tests pass (npm run test)
[ ] No TypeScript errors (npm run type-check)
[ ] No linting errors (npm run lint)
[ ] Documentation updated
[ ] Commit messages are clear
[ ] No hardcoded secrets
[ ] No console.log() statements
[ ] Responsive on mobile (if UI)
[ ] PR has descriptive title
[ ] PR links related issues
```

---

## 🎉 Thank You!

Every contribution helps make AuroMakeover better. Whether it's code, documentation, bug reports, or feature requests — it's all valuable!

**Happy coding! 🚀**

---

**Last Updated**: September 18, 2026
