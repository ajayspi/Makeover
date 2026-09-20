import request from 'supertest';
import app from '../index';

describe('Bookings API', () => {
  let createdBookingId: number;

  it('should create a new booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        designId: 5,
        tierId: 2,
        date: '2026-09-25',
        timeSlot: 'morning',
        address: 'Apt 123, Gachibowli, Hyderabad',
        addOnIds: [1, 3, 5],
        totalPrice: 58500
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.status).toBe('PENDING_PAYMENT');

    createdBookingId = res.body.data.id;
  });

  it('should list bookings', async () => {
    const res = await request(app).get('/api/bookings');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should get a booking by ID', async () => {
    const res = await request(app).get(`/api/bookings/${createdBookingId}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(createdBookingId);
  });

  it('should update a booking', async () => {
      const res = await request(app)
        .put(`/api/bookings/${createdBookingId}`)
        .send({
            date: '2026-09-26',
            timeSlot: 'afternoon'
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.date).toBe('2026-09-26');
      expect(res.body.data.timeSlot).toBe('afternoon');
  });

  it('should cancel a booking', async () => {
      const res = await request(app).delete(`/api/bookings/${createdBookingId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('CANCELLED');
  });
});
