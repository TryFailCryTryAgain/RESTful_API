import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb+srv://davidksegerbo:hBwIcXChhRHLyeP1@cluster0.ygtqs.mongodb.net/API'; // Replace with your MongoDB URI

let cachedDb: mongoose.Connection | null = null;

export async function connectToDatabase(): Promise<mongoose.Connection> {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to MongoDB using Mongoose
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);

  // Cache the connection
  cachedDb = mongoose.connection;

  // Log connection status
  cachedDb.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  cachedDb.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });

  return cachedDb;
}