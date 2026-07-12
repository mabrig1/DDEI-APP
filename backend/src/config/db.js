const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not set');
  }
  // Fail fast when the database is unreachable instead of letting each query
  // buffer silently — buffered queries eventually reject inside route
  // handlers, which used to leave requests hanging with no HTTP response.
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 });
  mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
  mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected — driver will attempt to reconnect.'));
  console.log('MongoDB connected');
}

module.exports = connectDB;
