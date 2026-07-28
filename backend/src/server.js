/**
 * Long-running server entrypoint — `npm start` / `npm run dev`.
 *
 * Connects to MongoDB, starts the Appwrite backup reconciler, then listens.
 * The Express app itself lives in src/app.js so the Vercel serverless
 * entrypoint (api/index.js) can reuse it without binding a port.
 */

const app = require('./app');
const connectDB = require('./config/db');
const { startAppwriteSync } = require('./utils/appwriteScheduler');

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
