const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  name: {
    type: String,
    trim: true
  },
  language: {
    type: String,
    enum: ['en', 'fr', 'ar'],
    default: 'fr'
  },
  isSubscribed: {
    type: Boolean,
    default: true
  },
  subscribedAt: {
    type: Date,
    default: Date.now
  },
  unsubscribedAt: Date
}, {
  timestamps: true
});

// Index for active subscribers
newsletterSchema.index({ isSubscribed: 1 });
newsletterSchema.index({ language: 1 });

module.exports = mongoose.model('Newsletter', newsletterSchema);
