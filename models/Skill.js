const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true, enum: ['Frontend', 'Backend', 'Database', 'Tools & DevOps'] },
  proficiency: { type: Number, required: true, min: 0, max: 100 },
  icon: { type: String, default: 'code' }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
