import request from 'supertest';
import app from '../index';

describe('Designs API', () => {
  it('should list designs', async () => {
    const res = await request(app).get('/api/designs');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should get a design by ID', async () => {
    const res = await request(app).get('/api/designs/5');

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.id).toBe(5);
    expect(res.body.data.name).toBe('Modern Minimalist');
  });

  it('should return 404 for non-existent design', async () => {
    const res = await request(app).get('/api/designs/999');

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
