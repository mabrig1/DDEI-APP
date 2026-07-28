const mongoose = require('mongoose');

/**
 * MongoDB connection, safe for both a long-running server and serverless.
 *
 * On a serverless host (Vercel) the module is evaluated once per cold start but
 * the process is then reused across many invocations. Connecting per request
 * would open a new pool every time and exhaust Atlas's connection limit within
 * minutes, so the connection *promise* is cached on globalThis — surviving
 * module re-evaluation — and every caller awaits the same one.
 */
const cache = globalThis.__dsbMongoose || (globalThis.__dsbMongoose = { conn: null, promise: null });

function poolSize() {
  if (process.env.MONGODB_MAX_POOL_SIZE) return Number(process.env.MONGODB_MAX_POOL_SIZE);
  // Each concurrent serverless instance holds its own pool, so a large pool
  // multiplies fast. A long-running server is the opposite case — one process,
  // so it can afford more.
  return process.env.VERCEL ? 5 : 10;
}

async function connectDB() {
  if (cache.conn) return cache.conn;

  if (!cache.promise) {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is not set');
    }

    mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected — driver will attempt to reconnect.');
      cache.conn = null;
    });

    cache.promise = mongoose
      // Fail fast when the database is unreachable instead of letting each
      // query buffer silently — buffered queries eventually reject inside route
      // handlers, which used to leave requests hanging with no HTTP response.
      .connect(uri, { serverSelectionTimeoutMS: 10000, maxPoolSize: poolSize() })
      .then((connection) => {
        console.log('MongoDB connected');
        return connection;
      })
      .catch((err) => {
        // Clear the cached promise so the next request retries, rather than
        // replaying this one failure for the life of the process.
        cache.promise = null;
        throw err;
      });
  }

  cache.conn = await cache.promise;
  return cache.conn;
}

module.exports = connectDB;
