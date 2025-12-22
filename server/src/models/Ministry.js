const mongoose = require('mongoose');

const ministrySchema = new mongoose.Schema({
  name: {
    en: {
      type: String,
      required: [true, 'Please add an English name'],
      trim: true
    },
    fr: {
      type: String,
      required: [true, 'Please add a French name'],
      trim: true
    },
    ar: {
      type: String,
      required: [true, 'Please add an Arabic name'],
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
  leader: {
    type: String,
    required: [true, 'Please add a ministry leader name']
  },
  image: {
    type: String,
    default: 'default-ministry-image.jpg'
  },
  meetingTime: {
    en: String,
    fr: String,
    ar: String
  },
  contactEmail: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  contactPhone: String,
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number, // For display ordering
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for ordering
ministrySchema.index({ order: 1 });

module.exports = mongoose.model('Ministry', ministrySchema);
