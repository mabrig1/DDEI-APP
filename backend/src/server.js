require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { publicConfig, isBackupEnabled } = require('./config/appwrite');
const { backupStatus } = require('./utils/appwriteBackup');
const { startAppwriteSync } = require('./utils/appwriteScheduler');

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
const vaultRoutes = require('./routes/vaultRoutes');

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || '*' }));
app.use(express.json());

// Safety net: never leave a request hanging without a response — a hung
// request surfaces in the browser as a bare "Failed to fetch" with no
// explanation. Guarantee a JSON error (with CORS headers) within 25s.
app.use((req, res, next) => {
  res.setTimeout(25000, () => {
    if (!res.headersSent) {
      res.status(504).json({ message: 'The server took too long to respond. Please try again in a moment.' });
    }
  });
  next();
});

app.get('/api/health', (req, res) => res.json({
  status: 'ok',
  service: 'destiny-skills-bridge-backend',
  backup: backupStatus(),
}));

// Tells the frontend where the read-only Appwrite failover lives. Everything
// here is public (the Appwrite project ID is a public identifier, like a
// Firebase config) — the API key never leaves the server. Served from the
// primary so the frontend can discover the backup while the primary is healthy
// and cache it for when it isn't; build.js can also bake the same values in at
// build time for hosts where the primary is already unreachable on first load.
app.get('/api/config/backup', (req, res) => {
  const { endpoint, projectId, databaseId } = publicConfig();
  res.json({
    backup: {
      provider: 'appwrite',
      enabled: isBackupEnabled(),
      endpoint,
      projectId,
      databaseId,
      // Only these tables are world-readable; see src/config/appwriteSchema.js.
      tables: { catalog: 'catalog', content: 'content', serviceUpdates: 'service_updates' },
    },
  });
});

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
app.use('/api/tools-vault', vaultRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function start() {
  await connectDB();
  // Backup mirroring is started after the primary DB is up: the reconciler
  // reads from MongoDB. It is a no-op when Appwrite is not configured.
  startAppwriteSync();
  app.listen(PORT, () => console.log(`Destiny Skills Bridge API listening on port ${PORT}`));
}

start().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

module.exports = app;
