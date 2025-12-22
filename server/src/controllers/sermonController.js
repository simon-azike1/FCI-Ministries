const asyncHandler = require('express-async-handler');
const Sermon = require('../models/Sermon');

// @desc    Get all sermons
// @route   GET /api/v1/sermons
// @access  Public
exports.getAllSermons = asyncHandler(async (req, res) => {
  const { category, speaker, search, page = 1, limit = 12 } = req.query;

  const query = { isPublished: true };

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Filter by speaker
  if (speaker) {
    query.speaker = { $regex: speaker, $options: 'i' };
  }

  // Search in title and description (all languages)
  if (search) {
    query.$or = [
      { 'title.en': { $regex: search, $options: 'i' } },
      { 'title.fr': { $regex: search, $options: 'i' } },
      { 'title.ar': { $regex: search, $options: 'i' } },
      { 'description.en': { $regex: search, $options: 'i' } },
      { 'description.fr': { $regex: search, $options: 'i' } },
      { 'description.ar': { $regex: search, $options: 'i' } },
    ];
  }

  const skip = (page - 1) * limit;

  const sermons = await Sermon.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Sermon.countDocuments(query);

  res.status(200).json({
    success: true,
    count: sermons.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: sermons,
  });
});

// @desc    Get single sermon
// @route   GET /api/v1/sermons/:id
// @access  Public
exports.getSermon = asyncHandler(async (req, res) => {
  const sermon = await Sermon.findById(req.params.id);

  if (!sermon) {
    return res.status(404).json({
      success: false,
      error: 'Sermon not found',
    });
  }

  // Increment views
  sermon.views += 1;
  await sermon.save();

  res.status(200).json({
    success: true,
    data: sermon,
  });
});

// @desc    Create new sermon
// @route   POST /api/v1/sermons
// @access  Private (Admin)
exports.createSermon = asyncHandler(async (req, res) => {
  const sermon = await Sermon.create(req.body);

  res.status(201).json({
    success: true,
    data: sermon,
  });
});

// @desc    Update sermon
// @route   PUT /api/v1/sermons/:id
// @access  Private (Admin)
exports.updateSermon = asyncHandler(async (req, res) => {
  let sermon = await Sermon.findById(req.params.id);

  if (!sermon) {
    return res.status(404).json({
      success: false,
      error: 'Sermon not found',
    });
  }

  sermon = await Sermon.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: sermon,
  });
});

// @desc    Delete sermon
// @route   DELETE /api/v1/sermons/:id
// @access  Private (Admin)
exports.deleteSermon = asyncHandler(async (req, res) => {
  const sermon = await Sermon.findById(req.params.id);

  if (!sermon) {
    return res.status(404).json({
      success: false,
      error: 'Sermon not found',
    });
  }

  await sermon.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Get sermon categories
// @route   GET /api/v1/sermons/categories/list
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Sermon.distinct('category');

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc    Get sermon speakers
// @route   GET /api/v1/sermons/speakers/list
// @access  Public
exports.getSpeakers = asyncHandler(async (req, res) => {
  const speakers = await Sermon.distinct('speaker');

  res.status(200).json({
    success: true,
    data: speakers,
  });
});

// @desc    Get featured sermons
// @route   GET /api/v1/sermons/featured/list
// @access  Public
exports.getFeaturedSermons = asyncHandler(async (req, res) => {
  const sermons = await Sermon.find({ isFeatured: true, isPublished: true })
    .sort({ date: -1 })
    .limit(6);

  res.status(200).json({
    success: true,
    count: sermons.length,
    data: sermons,
  });
});
