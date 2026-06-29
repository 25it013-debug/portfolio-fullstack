const { getIsConnected } = require('../config/db');
const Profile = require('../models/Profile');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const { defaultProfile, defaultProjects, defaultSkills } = require('../seed/seedData');

// @desc    Get Developer Profile Data
// @route   GET /api/profile
const getProfile = async (req, res) => {
  try {
    if (getIsConnected()) {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = await Profile.create(defaultProfile);
      }
      return res.status(200).json({ success: true, data: profile });
    } else {
      return res.status(200).json({ success: true, data: defaultProfile, fallback: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving profile data.' });
  }
};

// @desc    Get All Portfolio Projects
// @route   GET /api/projects
const getProjects = async (req, res) => {
  try {
    const { category, featured } = req.query;
    if (getIsConnected()) {
      let query = {};
      if (category && category !== 'All') query.category = category;
      if (featured === 'true') query.featured = true;

      const projects = await Project.find(query).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    } else {
      let projects = [...defaultProjects];
      if (category && category !== 'All') {
        projects = projects.filter(p => p.category === category);
      }
      if (featured === 'true') {
        projects = projects.filter(p => p.featured);
      }
      return res.status(200).json({ success: true, count: projects.length, data: projects, fallback: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving projects.' });
  }
};

// @desc    Get All Technical Skills
// @route   GET /api/skills
const getSkills = async (req, res) => {
  try {
    if (getIsConnected()) {
      const skills = await Skill.find().sort({ category: 1, proficiency: -1 });
      return res.status(200).json({ success: true, count: skills.length, data: skills });
    } else {
      return res.status(200).json({ success: true, count: defaultSkills.length, data: defaultSkills, fallback: true });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error retrieving skills.' });
  }
};

module.exports = { getProfile, getProjects, getSkills };
