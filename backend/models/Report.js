import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Anonymous',
    maxlength: 100
  },
  category: {
    type: String,
    required: true,
    enum: ['Pothole', 'Streetlight', 'Garbage', 'Water', 'Sewage', 'Other']
  },
  urgency: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  loc: {
    type: String,
    maxlength: 200
  },
  lat: {
    type: Number
  },
  lng: {
    type: Number
  },
  desc: {
    type: String,
    required: true,
    maxlength: 1000
  },
  photo: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'resolved'],
    default: 'pending'
  },
  when: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Report', reportSchema);