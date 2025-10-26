import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URL as string

if (!MONGODB_URI) {
  console.warn(
    'DATABASE_URL env is not set. Mongoose will not connect; repo will fallback to sample data.'
  )
}

let cached = (global as any).mongoose as {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function dbConnect() {
  if (!MONGODB_URI) return null
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {})
      .then((m: typeof mongoose) => m)
  }
  cached.conn = await cached.promise
  return cached.conn
}
