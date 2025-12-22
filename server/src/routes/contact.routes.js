const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactController');
const { protect, authorize } = require('../middleware/auth');

// Public route
router.post('/', submitContact);

// Protected routes (Admin only)
router.get('/', protect, authorize('admin', 'editor'), getAllContacts);
router.get('/:id', protect, authorize('admin', 'editor'), getContact);
router.put('/:id', protect, authorize('admin', 'editor'), updateContact);
router.delete('/:id', protect, authorize('admin'), deleteContact);

module.exports = router;
