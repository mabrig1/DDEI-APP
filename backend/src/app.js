/**
 * The Express application — routes and middleware only, no server.
 *
 * Kept separate from server.js so the same app can be started two ways:
 *   • src/server.js  — long-running Node process (local dev, any VM/container host)
 *   • api/index.js   — Vercel serverless function
 *
 * Nothing here opens a database connection or binds a port; both entrypoints
 * handle that in the way their environment needs.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const { corsOptions } = require('./config/cors');
const { publicConfig, isBackupEnabled } = require('./config/appwrite');
const { backupStatus } = require('./utils/appwriteBackup');

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
const partnerRoutes = require('./routes/partnerRoutes');
const { rateLimit, securityHeaders } = require('./middleware/security');

const app = express();

// Vercel (and most proxies) terminate TLS upstream. Without this, req.ip and
// req.protocol report the proxy rather than the visitor.
app.set('trust proxy', 1);

// CLIENT_ORIGIN accepts a comma-separated list — see src/config/cors.js.
app.use(securityHeaders);
app.use(cors(corsOptions()));

app.use(express.json({
  limit: '100kb',
  verify(req, res, buffer) {
    if (req.originalUrl === '/api/payments/webhook') req.rawBody = Buffer.from(buffer);
  },
}));
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300, namespace: 'api' }));

// Safety net: never leave a request hanging without a response — a hung
// request surfaces in the browser as a bare "Failed to fetch" with no
// explanation. Guarantee a JSON error (with CORS headers) before the host
// gives up on us. Serverless platforms kill the invocation at their own limit,
// so on Vercel this has to fire well inside that window to be of any use.
const RESPONSE_TIMEOUT_MS = Number(process.env.RESPONSE_TIMEOUT_MS)
  || (process.env.VERCEL ? 20000 : 25000);

app.use((req, res, next) => {
  res.setTimeout(RESPONSE_TIMEOUT_MS, () => {
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
app.use('/api/partners', partnerRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
