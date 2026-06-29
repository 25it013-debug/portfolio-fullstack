const express = require('express');
const router = express.Router();
const { getProfile, getProjects, getSkills } = require('../controllers/portfolioController');

router.get('/profile', getProfile);
router.get('/projects', getProjects);
router.get('/skills', getSkills);

module.exports = router;
