const asyncHandler = require('express-async-handler');
const Ministry = require('../models/Ministry');

// @desc    Get all ministries
// @route   GET /api/v1/ministries
// @access  Public
exports.getAllMinistries = asyncHandler(async (req, res) => {
  const ministries = await Ministry.find({ isActive: true })
    .sort({ order: 1 });

  res.status(200).json({
    success: true,
    count: ministries.length,
    data: ministries,
  });
});

// @desc    Get single ministry
// @route   GET /api/v1/ministries/:id
// @access  Public
exports.getMinistry = asyncHandler(async (req, res) => {
  const ministry = await Ministry.findById(req.params.id);

  if (!ministry) {
    return res.status(404).json({
      success: false,
      error: 'Ministry not found',
    });
  }

  res.status(200).json({
    success: true,
    data: ministry,
  });
});

// @desc    Create new ministry
// @route   POST /api/v1/ministries
// @access  Private (Admin)
exports.createMinistry = asyncHandler(async (req, res) => {
  const ministry = await Ministry.create(req.body);

  res.status(201).json({
    success: true,
    data: ministry,
  });
});

// @desc    Update ministry
// @route   PUT /api/v1/ministries/:id
// @access  Private (Admin)
exports.updateMinistry = asyncHandler(async (req, res) => {
  let ministry = await Ministry.findById(req.params.id);

  if (!ministry) {
    return res.status(404).json({
      success: false,
      error: 'Ministry not found',
    });
  }

  ministry = await Ministry.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: ministry,
  });
});

// @desc    Delete ministry
// @route   DELETE /api/v1/ministries/:id
// @access  Private (Admin)
exports.deleteMinistry = asyncHandler(async (req, res) => {
  const ministry = await Ministry.findById(req.params.id);

  if (!ministry) {
    return res.status(404).json({
      success: false,
      error: 'Ministry not found',
    });
  }

  await ministry.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});
