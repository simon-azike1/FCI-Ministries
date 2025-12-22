const express = require('express');
const router = express.Router();
const {
  getAllMinistries,
  getMinistry,
  createMinistry,
  updateMinistry,
  deleteMinistry,
} = require('../controllers/ministryController');
const { protect, authorize } = require('../middleware/auth');

// Public routes
router.get('/', getAllMinistries);
router.get('/:id', getMinistry);

// Protected routes (Admin only)
router.post('/', protect, authorize('admin', 'editor'), createMinistry);
router.put('/:id', protect, authorize('admin', 'editor'), updateMinistry);
router.delete('/:id', protect, authorize('admin'), deleteMinistry);

module.exports = router;
