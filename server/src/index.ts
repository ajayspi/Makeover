import express from 'express';
import bookingsRouter from './routes/bookings';

const app = express();
app.use(express.json());

app.get('/api/auth/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok', uptime: process.uptime() } });
});

app.use('/api/bookings', bookingsRouter);

export default app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
