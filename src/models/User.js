const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  // Bio Data
  dob: { type: Date },
  gender: { type: String, enum: ['male', 'female'] },
  marital_status: { type: String, enum: ['single', 'married', 'divorced', 'widowed'] },
  nationality: { type: String },
  state_origin: { type: String },
  lga: { type: String },
  passport_url: { type: String },
  nin_number: { type: String },
  nin_document_url: { type: String },
  
  // Contact Info
  address: { type: String },
  city: { type: String },
  state_residence: { type: String },
  nok_name: { type: String },
  nok_phone: { type: String },
  nok_address: { type: String },
  
  // Skill Info
  qualification: { type: String },
  employment_status: { type: String },
  program_interest: { type: String },
  experience_level: { type: String },
  
  // Reference Info
  ref_name: { type: String },
  ref_relationship: { type: String },
  ref_phone: { type: String },
  ref_email: { type: String },
  
  profileCompleted: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);
