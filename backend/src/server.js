require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const advisorRoutes = require('./routes/advisorRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const skillsRoutes = require('./routes/skillsRoutes');
const opportunityRoutes = require('./routes/opportunityRoutes');
const portfolioRoutes = require('./routes/portfolioRoutes');
const courseRoutes = require('./routes/courseRoutes');
const adminRoutes = require('./routes/adminRoutes');
const contentRoutes = require('./routes/contentRoutes');
const helpRoutes = require('./routes/helpRoutes');
const serviceUpdateRoutes = require('./routes/serviceUpdateRoutes');
const activityRoutes = require('./routes/activityRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok', service: 'destiny-skills-bridge-backend' }));

app.use('/api/auth', authRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/advisor', advisorRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/skills', skillsRoutes);
app.use('/api/opportunities', opportunityRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/help', helpRoutes);
app.use('/api/service-update', serviceUpdateRoutes);
app.use('/api/activity', activityRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  app.listen(PORT, () => console.log(`Destiny Skills Bridge API listening on port ${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;
