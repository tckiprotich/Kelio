const mongoose = require('mongoose');

const mentorSchema = new mongoose.Schema({
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

const Mentor = mongoose.model.Mentor || mongoose.model('Mentor', mentorSchema);

module.exports = Mentor;