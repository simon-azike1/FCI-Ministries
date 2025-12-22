const asyncHandler = require('express-async-handler');
const Event = require('../models/Event');

// @desc    Get all events
// @route   GET /api/v1/events
// @access  Public
exports.getAllEvents = asyncHandler(async (req, res) => {
  const { category, upcoming, featured, page = 1, limit = 12 } = req.query;

  const query = { isPublished: true };

  // Filter by category
  if (category) {
    query.category = category;
  }

  // Filter upcoming events (events with endDate >= today)
  if (upcoming === 'true') {
    query.endDate = { $gte: new Date() };
  }

  // Filter featured events
  if (featured === 'true') {
    query.isFeatured = true;
  }

  const skip = (page - 1) * limit;

  const events = await Event.find(query)
    .sort({ startDate: 1 }) // Sort by start date ascending (upcoming first)
    .skip(skip)
    .limit(parseInt(limit));

  const total = await Event.countDocuments(query);

  res.status(200).json({
    success: true,
    count: events.length,
    total,
    page: parseInt(page),
    pages: Math.ceil(total / limit),
    data: events,
  });
});

// @desc    Get single event
// @route   GET /api/v1/events/:id
// @access  Public
exports.getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Event not found',
    });
  }

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Create new event
// @route   POST /api/v1/events
// @access  Private (Admin)
exports.createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event,
  });
});

// @desc    Update event
// @route   PUT /api/v1/events/:id
// @access  Private (Admin)
exports.updateEvent = asyncHandler(async (req, res) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Event not found',
    });
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: event,
  });
});

// @desc    Delete event
// @route   DELETE /api/v1/events/:id
// @access  Private (Admin)
exports.deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Event not found',
    });
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    RSVP to an event
// @route   POST /api/v1/events/:id/rsvp
// @access  Public
exports.rsvpEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return res.status(404).json({
      success: false,
      error: 'Event not found',
    });
  }

  const { name, email, numberOfGuests = 1, phone } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      success: false,
      error: 'Please provide name and email',
    });
  }

  // Check if user already RSVP'd
  const existingRSVP = event.rsvps.find(rsvp => rsvp.email === email);

  if (existingRSVP) {
    return res.status(400).json({
      success: false,
      error: 'You have already RSVP\'d to this event',
    });
  }

  // Check if event has capacity and if there's room
  if (event.capacity) {
    const totalRSVPs = event.rsvps.reduce((sum, rsvp) => sum + rsvp.numberOfGuests, 0);
    if (totalRSVPs + numberOfGuests > event.capacity) {
      return res.status(400).json({
        success: false,
        error: 'Event is at full capacity',
      });
    }
  }

  event.rsvps.push({
    name,
    email,
    phone,
    numberOfGuests,
    rsvpDate: new Date(),
  });

  await event.save();

  res.status(200).json({
    success: true,
    message: 'RSVP successful',
    data: event,
  });
});

// @desc    Get event categories
// @route   GET /api/v1/events/categories/list
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
  const categories = await Event.distinct('category');

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc    Get upcoming events
// @route   GET /api/v1/events/upcoming/list
// @access  Public
exports.getUpcomingEvents = asyncHandler(async (req, res) => {
  const events = await Event.find({
    isPublished: true,
    endDate: { $gte: new Date() },
  })
    .sort({ startDate: 1 })
    .limit(6);

  res.status(200).json({
    success: true,
    count: events.length,
    data: events,
  });
});
