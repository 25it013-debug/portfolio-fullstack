const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const { submitContactForm } = require('../controllers/contactController');

const contactValidations = [
  body('name').trim().notEmpty().withMessage('Name is required.').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long.'),
  body('email').trim().notEmpty().withMessage('Email is required.').isEmail().withMessage('Please provide a valid email address.').normalizeEmail(),
  body('subject').trim().notEmpty().withMessage('Subject is required.').isLength({ min: 3 }).withMessage('Subject must be at least 3 characters long.'),
  body('message').trim().notEmpty().withMessage('Message is required.').isLength({ min: 10 }).withMessage('Message must be at least 10 characters long.')
];

router.post('/', contactValidations, submitContactForm);

module.exports = router;
