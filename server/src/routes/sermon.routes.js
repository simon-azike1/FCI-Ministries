const express = require('express');
const router = express.Router();
const {
  getAllSermons,
  getSermon,
  createSermon,
  updateSermon,
  deleteSermon,
  getCategories,
  getSpeakers,
  getFeaturedSermons,
} = require('../controllers/sermonController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllSermons);
router.get('/categories/list', getCategories);
router.get('/speakers/list', getSpeakers);
router.get('/featured/list', getFeaturedSermons);
router.get('/:id', getSermon);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin', 'editor'), createSermon);
router.put('/:id', protect, authorize('admin', 'editor'), updateSermon);
router.delete('/:id', protect, authorize('admin'), deleteSermon);

module.exports = router;
