const { validationResult } = require('express-validator');
const { getIsConnected } = require('../config/db');
const ContactMessage = require('../models/ContactMessage');
const { sendContactNotification } = require('../services/emailService');

// In-memory array store for demo mode if Mongo is disconnected
const memoryMessages = [];

// @desc    Submit contact message
// @route   POST /api/contact
const submitContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please check your inputs.',
      errors: errors.array()
    });
  }

  const { name, email, subject, message } = req.body;

  try {
    let savedMessage;
    if (getIsConnected()) {
      savedMessage = await ContactMessage.create({ name, email, subject, message });
    } else {
      savedMessage = { _id: `msg-${Date.now()}`, name, email, subject, message, createdAt: new Date() };
      memoryMessages.push(savedMessage);
    }

    // Trigger background email dispatch asynchronously
    const emailResult = await sendContactNotification({ name, email, subject, message });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: {
        id: savedMessage._id,
        emailSent: emailResult.success
      }
    });
  } catch (error) {
    console.error('[Contact Controller Error]', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your message. Please try again later.'
    });
  }
};

module.exports = { submitContactForm };
