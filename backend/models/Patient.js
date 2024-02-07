const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  bloodType: { type: String, required: true },
  allergies: { type: [String], default: [] },
  medications: { type: [String], default: [] },
  medicalHistory: { type: String, default: '' },
  UserID: { type: String, required: true }
});

module.exports = mongoose.model('Patient', patientSchema);
