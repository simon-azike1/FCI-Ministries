const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    en: {
      type: String,
      required: [true, 'Please add an English title'],
      trim: true
    },
    fr: {
      type: String,
      required: [true, 'Please add a French title'],
      trim: true
    },
    ar: {
      type: String,
      required: [true, 'Please add an Arabic title'],
      trim: true
    }
  },
  description: {
    en: {
      type: String,
      required: [true, 'Please add an English description']
    },
    fr: {
      type: String,
      required: [true, 'Please add a French description']
    },
    ar: {
      type: String,
      required: [true, 'Please add an Arabic description']
    }
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  location: {
    name: {
      type: String,
      required: [true, 'Please add a location name']
    },
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'service', 'Service',
      'worship', 'Worship Service',
      'bible', 'Bible Study',
      'prayer', 'Prayer Meeting',
      'youth', 'Youth Event',
      'outreach', 'Outreach',
      'conference', 'Conference',
      'other', 'Other'
    ]
  },
  image: {
    type: String,
    default: 'default-event-image.jpg'
  },
  capacity: {
    type: Number
  },
  rsvps: [{
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String,
    numberOfAttendees: {
      type: Number,
      default: 1
    },
    message: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: String,
  isPublished: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for searching
eventSchema.index({ startDate: 1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model('Event', eventSchema);
