import mongoose, { Document, Model } from 'mongoose';

interface IMentor extends Document {
  name: string;
  picture?: string;
  email: string;
  bio?: string;
  calendly?: string;
}

const mentorSchema = new mongoose.Schema<IMentor>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  picture:{
    type: String,
    required: false,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  bio: {
    type: String,
    trim: true,
  },
  calendly: {
    type: String,
    trim: true,
  },
});

let Mentor: Model<IMentor>;
try {
  Mentor = mongoose.model<IMentor>('Mentor');
} catch (error) {
  Mentor = mongoose.model<IMentor>('Mentor', mentorSchema);
}

export default Mentor;