import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is missing');
}

// Declare a global interface for caching the connection
declare global {
  var mongoose: { conn: Mongoose | null; promise: Promise<Mongoose> | null };
}

// Initialize the cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'evently',
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
