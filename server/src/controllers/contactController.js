const asyncHandler = require('express-async-handler');
const Contact = require('../models/Contact');

// @desc    Submit contact form
// @route   POST /api/v1/contact
// @access  Public
exports.submitContact = asyncHandler(async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: 'Please provide all required fields',
    });
  }

  // Get IP address
  const ipAddress = req.ip || req.connection.remoteAddress;

  const contact = await Contact.create({
    name,
    email,
    phone,
    subject,
    message,
    ipAddress,
  });

  res.status(201).json({
    success: true,
    message: 'Your message has been sent successfully. We will get back to you soon!',
    data: contact,
  });
});

// @desc    Get all contact messages
// @route   GET /api/v1/contact
// @access  Private (Admin)
exports.getAllContacts = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;

  const query = {};

  // Filter by status
  if (status) {
    query.status = status;
  }

  const skip = (page - 1) * limit;

  const contacts = await Contact.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Contact.countDocuments(query);

  res.status(200).json({
    success: true,
    count: contacts.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: contacts,
  });
});

// @desc    Get single contact message
// @route   GET /api/v1/contact/:id
// @access  Private (Admin)
exports.getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      error: 'Contact message not found',
    });
  }

  // Mark as read
  if (contact.status === 'new') {
    contact.status = 'read';
    await contact.save();
  }

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// @desc    Update contact message status
// @route   PUT /api/v1/contact/:id
// @access  Private (Admin)
exports.updateContact = asyncHandler(async (req, res) => {
  let contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      error: 'Contact message not found',
    });
  }

  contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: contact,
  });
});

// @desc    Delete contact message
// @route   DELETE /api/v1/contact/:id
// @access  Private (Admin)
exports.deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);

  if (!contact) {
    return res.status(404).json({
      success: false,
      error: 'Contact message not found',
    });
  }

  await contact.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
