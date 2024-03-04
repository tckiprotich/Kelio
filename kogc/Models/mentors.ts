import mongoose, { Document, Model } from 'mongoose';

interface IMentor extends Document {
  firstName: string;
  lastName: string;
  email: string;
  about?: string;
  calendly?: string;
  readonly role: string;
}

const mentorSchema = new mongoose.Schema<IMentor>({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  about:{
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
  calendly: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    default: 'mentor',
  },
});

let Mentor: Model<IMentor>;
try {
  Mentor = mongoose.model<IMentor>('Mentor');
} catch (error) {
  Mentor = mongoose.model<IMentor>('Mentor', mentorSchema);
}

export default Mentor;