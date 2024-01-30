import dotenv from 'dotenv';
import mongoose, { ConnectOptions } from 'mongoose';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    console.log('Connected to MongoDB successfully.');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

export default connectDB;