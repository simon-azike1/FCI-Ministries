const mongoose = require('mongoose');
const slugify = require('slugify');

const sermonSchema = new mongoose.Schema({
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
  slug: {
    type: String,
    unique: true
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
  speaker: {
    type: String,
    required: [true, 'Please add a speaker name']
  },
  date: {
    type: Date,
    required: [true, 'Please add a sermon date'],
    default: Date.now
  },
  videoUrl: {
    type: String,
    required: [true, 'Please add a video URL (YouTube)'],
    match: [
      /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/,
      'Please add a valid YouTube URL'
    ]
  },
  audioUrl: {
    type: String,
    match: [
      /^https?:\/\/.+$/,
      'Please add a valid URL'
    ]
  },
  transcript: {
    en: String,
    fr: String,
    ar: String
  },
  notes: {
    type: String, // URL to downloadable notes
  },
  series: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Sunday Service', 'Bible Study', 'Prayer Meeting', 'Special Event', 'Conference', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  thumbnail: {
    type: String,
    default: 'default-sermon-thumbnail.jpg'
  },
  duration: {
    type: Number, // Duration in minutes
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishedAt: {
    type: Date
  },
  views: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create slug from English title
sermonSchema.pre('save', function(next) {
  if (this.title && this.title.en) {
    this.slug = slugify(this.title.en, { lower: true, strict: true });
  }

  if (this.isPublished && !this.publishedAt) {
    this.publishedAt = Date.now();
  }

  next();
});

// Index for search performance
sermonSchema.index({ 'title.en': 'text', 'title.fr': 'text', 'title.ar': 'text' });
sermonSchema.index({ speaker: 1 });
sermonSchema.index({ category: 1 });
sermonSchema.index({ date: -1 });

module.exports = mongoose.model('Sermon', sermonSchema);
