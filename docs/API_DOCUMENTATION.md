# 📚 AuroMakeover - API Documentation

**Base URL**: `http://localhost:5000` (development) | `https://api.auramakeover.in` (production)

**Authentication**: All endpoints (except /auth/send-otp, /auth/verify-otp, /health) require JWT token in header:
```
Authorization: Bearer <access_token>
```

---

## 🔐 Authentication Endpoints

### POST /api/auth/send-otp
Send OTP to phone number via SMS or WhatsApp

**Request**:
```json
{
  "phone": "+919876543210"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "phone": "+919876543210",
    "expiresIn": 600,
    "channel": "sms"
  }
}
```

**Errors**:
- 400: Invalid phone format
- 429: Too many OTP requests (rate limited)

---

### POST /api/auth/verify-otp
Verify OTP and receive JWT tokens

**Request**:
```json
{
  "phone": "+919876543210",
  "otp": "123456"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "phone": "+919876543210",
      "email": null,
      "name": null,
      "role": "CUSTOMER",
      "createdAt": "2026-09-18T10:30:00Z"
    },
    "tokens": {
      "accessToken": "eyJhbGc...",
      "refreshToken": "eyJhbGc...",
      "expiresIn": 604800
    }
  }
}
```

**Errors**:
- 400: Invalid OTP format
- 401: Invalid or expired OTP
- 404: Phone not found (should not be exposed to user)

---

### POST /api/auth/refresh-token
Refresh access token using refresh token

**Request**:
```json
{
  "refreshToken": "eyJhbGc..."
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "expiresIn": 604800
  }
}
```

**Errors**:
- 401: Invalid or expired refresh token

---

### GET /api/auth/me
Get current authenticated user profile

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "phone": "+919876543210",
    "email": "user@example.com",
    "name": "Ajay Kiran",
    "role": "CUSTOMER",
    "address": "Hyderabad, Telangana",
    "preferences": {
      "newsletter": true,
      "notifications": true
    },
    "createdAt": "2026-09-18T10:30:00Z",
    "updatedAt": "2026-09-18T15:30:00Z"
  }
}
```

**Errors**:
- 401: Unauthorized (missing/invalid token)

---

### PUT /api/auth/profile
Update user profile

**Request**:
```json
{
  "email": "newmail@example.com",
  "name": "Ajay Kiran",
  "address": "Gachibowli, Hyderabad",
  "preferences": {
    "newsletter": true,
    "notifications": true
  }
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "phone": "+919876543210",
    "email": "newmail@example.com",
    "name": "Ajay Kiran",
    "address": "Gachibowli, Hyderabad",
    "updatedAt": "2026-09-18T15:30:00Z"
  }
}
```

**Errors**:
- 400: Validation error
- 401: Unauthorized
- 409: Email already in use

---

### POST /api/auth/logout
Logout (optional, for frontend cleanup)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "message": "Logged out successfully"
  }
}
```

---

### GET /api/auth/health
Health check (public endpoint)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "timestamp": "2026-09-18T15:30:00Z",
    "uptime": 86400
  }
}
```

---

## 📅 Booking Endpoints

### POST /api/bookings
Create a new booking

**Request**:
```json
{
  "designId": 5,
  "tierId": 2,
  "date": "2026-09-25",
  "timeSlot": "morning",
  "address": "Apt 123, Gachibowli, Hyderabad",
  "addOnIds": [1, 3, 5],
  "totalPrice": 58500
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": 456,
    "userId": 1,
    "designId": 5,
    "tierId": 2,
    "status": "PENDING_PAYMENT",
    "date": "2026-09-25",
    "timeSlot": "morning",
    "address": "Apt 123, Gachibowli, Hyderabad",
    "totalPrice": 58500,
    "createdAt": "2026-09-18T15:30:00Z"
  }
}
```

**Errors**:
- 400: Validation error (invalid date, past date, etc.)
- 401: Unauthorized
- 404: Design or tier not found

---

### GET /api/bookings
List all user bookings (paginated)

**Query Parameters**:
```
?status=CONFIRMED&limit=20&offset=0
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 456,
      "designId": 5,
      "status": "CONFIRMED",
      "date": "2026-09-25",
      "totalPrice": 58500,
      "createdAt": "2026-09-18T15:30:00Z"
    }
  ],
  "pagination": {
    "total": 5,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

---

### GET /api/bookings/:id
Get booking details

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 456,
    "userId": 1,
    "designId": 5,
    "tierId": 2,
    "status": "CONFIRMED",
    "date": "2026-09-25",
    "timeSlot": "morning",
    "address": "Apt 123, Gachibowli, Hyderabad",
    "totalPrice": 58500,
    "addOns": [
      { "id": 1, "name": "3D PVC Panels", "price": 10000 }
    ],
    "payment": {
      "id": 789,
      "status": "SUCCESS",
      "razorpayOrderId": "order_1234567890",
      "amount": 58500
    },
    "installation": {
      "id": 101,
      "status": "PENDING_TECHNICIAN_ASSIGNMENT",
      "technician": null,
      "startDate": "2026-09-25T09:00:00Z"
    },
    "createdAt": "2026-09-18T15:30:00Z"
  }
}
```

**Errors**:
- 401: Unauthorized
- 404: Booking not found

---

### PUT /api/bookings/:id
Update booking (only if status is PENDING_PAYMENT or PENDING_CONFIRMATION)

**Request**:
```json
{
  "date": "2026-09-26",
  "timeSlot": "afternoon",
  "address": "New Address, Hyderabad"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 456,
    "date": "2026-09-26",
    "timeSlot": "afternoon",
    "address": "New Address, Hyderabad"
  }
}
```

**Errors**:
- 400: Cannot modify confirmed/completed bookings
- 401: Unauthorized
- 404: Booking not found

---

### DELETE /api/bookings/:id
Cancel booking (30-day reversal guarantee)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 456,
    "status": "CANCELLED",
    "refundAmount": 58500,
    "refundStatus": "INITIATED"
  }
}
```

**Errors**:
- 400: Cannot cancel (outside 30-day window)
- 401: Unauthorized
- 404: Booking not found

---

### GET /api/bookings/:id/tracking
Real-time installation tracking (WebSocket)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "bookingId": 456,
    "technician": {
      "id": 10,
      "name": "Raj Kumar",
      "phone": "+919876543210",
      "rating": 4.8,
      "reviews": 245
    },
    "location": {
      "latitude": 17.3850,
      "longitude": 78.4867,
      "accuracy": 10,
      "lastUpdate": "2026-09-25T09:15:00Z"
    },
    "eta": 15,
    "status": "TECHNICIAN_ON_THE_WAY"
  }
}
```

---

## 💳 Payment Endpoints

### POST /api/payments/razorpay
Create Razorpay order

**Request**:
```json
{
  "bookingId": 456,
  "amount": 58500,
  "paymentMethod": "upi"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "orderId": "order_123456",
    "amount": 58500,
    "currency": "INR",
    "keyId": "rzp_test_123456",
    "description": "Smart Tier Booking - Design #5"
  }
}
```

**Errors**:
- 400: Invalid booking or amount
- 404: Booking not found

---

### POST /api/payments/webhook
Razorpay webhook (server-to-server, no auth required)

**Request** (from Razorpay):
```json
{
  "event": "payment.authorized",
  "payload": {
    "payment": {
      "entity": {
        "id": "pay_123456",
        "entity": "payment",
        "amount": 58500,
        "status": "authorized",
        "order_id": "order_123456",
        "razorpay_signature": "abc123..."
      }
    }
  }
}
```

**Process**:
1. Verify webhook signature
2. Update payment status in DB
3. Update booking status to CONFIRMED
4. Trigger email notification
5. Assign technician (async)

**Response** (200):
```json
{
  "success": true
}
```

---

### GET /api/payments/:id
Get payment details

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 789,
    "bookingId": 456,
    "razorpayOrderId": "order_123456",
    "razorpayPaymentId": "pay_123456",
    "amount": 58500,
    "currency": "INR",
    "status": "SUCCESS",
    "method": "upi",
    "emi": null,
    "bnpl": null,
    "createdAt": "2026-09-18T15:30:00Z"
  }
}
```

---

## 🎨 Design Endpoints

### GET /api/designs
List all designs (public, paginated)

**Query Parameters**:
```
?category=modern&priceMin=20000&priceMax=100000&rating=4.5&limit=20&offset=0
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "Modern Minimalist",
      "description": "Clean lines and neutral colors",
      "category": "modern",
      "images": [
        {
          "before": "https://...",
          "after": "https://..."
        }
      ],
      "averageRating": 4.8,
      "reviewCount": 245,
      "priceRange": {
        "min": 48000,
        "max": 62000
      },
      "tiers": [2, 3],
      "createdAt": "2026-09-18T15:30:00Z"
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

### GET /api/designs/:id
Get design details

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 5,
    "name": "Modern Minimalist",
    "description": "Clean lines and neutral colors",
    "category": "modern",
    "images": [
      {
        "before": "https://...",
        "after": "https://..."
      },
      {
        "before": "https://...",
        "after": "https://..."
      }
    ],
    "materials": [
      {
        "name": "Premium Wallpaper",
        "quantity": 1,
        "unit": "roll"
      },
      {
        "name": "Motorized Blinds",
        "quantity": 2,
        "unit": "panel"
      }
    ],
    "averageRating": 4.8,
    "reviewCount": 245,
    "reviews": [
      {
        "id": 1001,
        "rating": 5,
        "text": "Amazing transformation!",
        "userName": "Priya",
        "createdAt": "2026-09-18T15:30:00Z"
      }
    ],
    "priceRange": {
      "min": 48000,
      "max": 62000
    },
    "tiers": [
      { "id": 2, "name": "Smart", "price": 55000 },
      { "id": 3, "name": "Designer", "price": 75000 }
    ],
    "relatedDesigns": [6, 7, 8],
    "createdAt": "2026-09-18T15:30:00Z"
  }
}
```

---

### GET /api/designs/search
Search designs by keyword

**Query Parameters**:
```
?q=modern+minimalist&limit=20
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 5,
      "name": "Modern Minimalist",
      "images": [{ "before": "...", "after": "..." }],
      "averageRating": 4.8
    }
  ],
  "pagination": {
    "total": 8,
    "limit": 20,
    "offset": 0,
    "hasMore": false
  }
}
```

---

## 🔄 Subscription Endpoints

### POST /api/subscriptions
Create a subscription

**Request**:
```json
{
  "planId": 1,
  "designIds": [5, 6, 7],
  "paymentMethod": "card"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": 201,
    "userId": 1,
    "planId": 1,
    "planName": "Smart Concierge",
    "planPrice": 4500,
    "status": "ACTIVE",
    "nextRefreshDate": "2026-12-18",
    "createdAt": "2026-09-18T15:30:00Z"
  }
}
```

---

### GET /api/subscriptions
List user subscriptions

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 201,
      "planName": "Smart Concierge",
      "status": "ACTIVE",
      "nextRefreshDate": "2026-12-18",
      "cycleCount": 1
    }
  ]
}
```

---

### PUT /api/subscriptions/:id
Update subscription (pause, resume)

**Request**:
```json
{
  "action": "pause"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 201,
    "status": "PAUSED",
    "resumeDate": null
  }
}
```

---

### DELETE /api/subscriptions/:id
Cancel subscription

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 201,
    "status": "CANCELLED",
    "message": "Subscription cancelled. No future charges."
  }
}
```

---

## 👥 User Endpoints

### PUT /api/users/me
Update user profile

**Request**:
```json
{
  "name": "Ajay Kiran",
  "email": "ajay@example.com",
  "address": "Gachibowli, Hyderabad"
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ajay Kiran",
    "email": "ajay@example.com"
  }
}
```

---

### GET /api/users/referral-code
Get user's referral code

**Response** (200):
```json
{
  "success": true,
  "data": {
    "referralCode": "REF_AJAY_KIRAN_ABC123",
    "referralUrl": "https://auramakeover.in?ref=REF_AJAY_KIRAN_ABC123",
    "totalReferrals": 5,
    "totalEarnings": 2500,
    "pendingEarnings": 500
  }
}
```

---

## 🔗 Referral Endpoints

### POST /api/referrals/apply
Apply referral coupon at checkout

**Request**:
```json
{
  "referralCode": "REF_AJAY_KIRAN_ABC123",
  "bookingId": 456
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "couponApplied": true,
    "discountAmount": 500,
    "newTotal": 58000,
    "referrerEarnings": 500
  }
}
```

**Errors**:
- 400: Invalid referral code
- 409: Coupon already applied

---

### GET /api/referrals/leaderboard
Top referrers leaderboard

**Query Parameters**:
```
?period=month&limit=10
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "name": "Priya Sharma",
      "referrals": 42,
      "earnings": 21000,
      "rating": 4.9
    }
  ]
}
```

---

## ⭐ Review Endpoints

### POST /api/reviews
Submit a review for a booking

**Request**:
```json
{
  "bookingId": 456,
  "designId": 5,
  "rating": 5,
  "text": "Amazing transformation! Highly recommended!",
  "photos": [
    "https://..."
  ]
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "id": 2001,
    "bookingId": 456,
    "rating": 5,
    "text": "Amazing transformation! Highly recommended!",
    "createdAt": "2026-09-25T15:30:00Z"
  }
}
```

---

### GET /api/reviews/design/:designId
Get reviews for a design

**Query Parameters**:
```
?limit=20&offset=0&sort=recent
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 2001,
      "designId": 5,
      "rating": 5,
      "text": "Amazing transformation!",
      "userName": "Ajay K.",
      "photos": ["https://..."],
      "createdAt": "2026-09-25T15:30:00Z"
    }
  ],
  "pagination": {
    "total": 245,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## 🛠️ Admin Endpoints

### GET /api/admin/analytics
Dashboard analytics (admin only)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "metrics": {
      "totalBookings": 1530,
      "totalRevenue": 99450000,
      "totalCustomers": 1200,
      "avgOrderValue": 65000,
      "repeatRate": 0.35,
      "referralRate": 0.40
    },
    "monthlyTrend": [
      {
        "month": "2026-09",
        "bookings": 50,
        "revenue": 3250000
      }
    ],
    "topDesigns": [
      {
        "designId": 5,
        "name": "Modern Minimalist",
        "bookings": 245,
        "revenue": 13520000
      }
    ],
    "customerSegments": {
      "renters": 0.30,
      "firstTimeHomeBuyers": 0.25,
      "designers": 0.15,
      "landlords": 0.20,
      "corporates": 0.10
    }
  }
}
```

**Errors**:
- 401: Unauthorized
- 403: Not an admin

---

## 🔔 Support Endpoints

### POST /api/support/contact
Submit a support request

**Request**:
```json
{
  "name": "Ajay Kiran",
  "email": "ajay@example.com",
  "subject": "Question about warranty",
  "message": "Can I extend the 30-day warranty?"
}
```

**Response** (201):
```json
{
  "success": true,
  "data": {
    "ticketId": "TKT_123456",
    "status": "OPEN",
    "createdAt": "2026-09-18T15:30:00Z"
  }
}
```

---

### GET /api/support/faq
Get FAQ (public endpoint)

**Query Parameters**:
```
?category=warranty&limit=10
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1001,
      "question": "What is included in the 30-day reversal guarantee?",
      "answer": "We will remove the wallpaper and restore the room to its original state...",
      "category": "warranty",
      "helpful": 245
    }
  ]
}
```

---

## Error Response Format

All errors follow this standard format:

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid phone format",
    "status": 400,
    "timestamp": "2026-09-18T15:30:00Z",
    "details": {
      "field": "phone",
      "expected": "E.164 format (+919876543210)",
      "received": "9876543210"
    }
  }
}
```

---

## Rate Limiting

All endpoints are rate-limited to 100 requests per 15 minutes per IP address.

**Headers**:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1632000600
```

**Error** (429):
```json
{
  "success": false,
  "error": {
    "code": "TOO_MANY_REQUESTS",
    "message": "Rate limit exceeded. Try again in 15 minutes.",
    "status": 429
  }
}
```

---

## Pagination

Endpoints with list responses support pagination:

**Query Parameters**:
```
limit: 20 (default), 50 (max)
offset: 0 (default)
```

**Response Format**:
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 1530,
    "limit": 20,
    "offset": 0,
    "hasMore": true
  }
}
```

---

## WebSocket Events (Real-Time)

### Installation Tracking (WebSocket)

**Connect**:
```javascript
const ws = new WebSocket('wss://api.auramakeover.in/ws/bookings/456');
ws.send(JSON.stringify({ action: 'subscribe', bookingId: 456 }));
```

**Events**:
```json
{
  "event": "TECHNICIAN_ASSIGNED",
  "data": {
    "technicianId": 10,
    "name": "Raj Kumar",
    "rating": 4.8
  }
}
```

```json
{
  "event": "TECHNICIAN_ON_THE_WAY",
  "data": {
    "latitude": 17.3850,
    "longitude": 78.4867,
    "eta": 15
  }
}
```

```json
{
  "event": "TECHNICIAN_ARRIVED",
  "data": {
    "timestamp": "2026-09-25T09:15:00Z"
  }
}
```

---

## Testing Endpoints

Use these for testing during development:

**Postman Collection**: [Download](https://github.com/ajayspi/Makeover/blob/main/postman-collection.json)

**cURL Examples**:
```bash
# Send OTP
curl -X POST http://localhost:5000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210"}'

# Verify OTP
curl -X POST http://localhost:5000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phone":"+919876543210","otp":"123456"}'

# Get bookings
curl -X GET http://localhost:5000/api/bookings \
  -H "Authorization: Bearer <token>"
```

---

**Last Updated**: September 18, 2026
**Status**: Phase 0 Complete (Auth endpoints), Phase 1 In Progress
