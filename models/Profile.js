const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  avatarUrl: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80' },
  location: { type: String, default: 'San Francisco, CA' },
  email: { type: String, required: true },
  github: { type: String, default: '#' },
  linkedin: { type: String, default: '#' },
  twitter: { type: String, default: '#' },
  stats: {
    yearsExperience: { type: Number, default: 5 },
    projectsCompleted: { type: Number, default: 24 },
    happyClients: { type: Number, default: 18 }
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
