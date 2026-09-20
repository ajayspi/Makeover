import express from 'express';
import bookingsRouter from './routes/bookings';
import designsRouter from './routes/designs';

const app = express();
app.use(express.json());

app.get('/api/auth/health', (req, res) => {
  res.json({ success: true, data: { status: 'ok', uptime: process.uptime() } });
});

app.use('/api/bookings', bookingsRouter);
app.use('/api/designs', designsRouter);

export default app;

if (require.main === module) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}
