const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true, enum: ['Full-Stack', 'Frontend', 'Backend', 'AI & Data'] },
  tags: [{ type: String }],
  imageUrl: { type: String, required: true },
  liveUrl: { type: String, default: '#' },
  githubUrl: { type: String, default: '#' },
  featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
