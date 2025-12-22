const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  rsvpEvent,
  getCategories,
  getUpcomingEvents,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllEvents);
router.get('/categories', getCategories);
router.get('/upcoming', getUpcomingEvents);
router.get('/:id', getEvent);
router.post('/:id/rsvp', rsvpEvent);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin', 'editor'), createEvent);
router.put('/:id', protect, authorize('admin', 'editor'), updateEvent);
router.delete('/:id', protect, authorize('admin'), deleteEvent);

module.exports = router;
