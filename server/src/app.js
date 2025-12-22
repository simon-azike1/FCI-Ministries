const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* =======================
   Security Middleware
======================= */
app.use(helmet());

/* =======================
   CORS Configuration
======================= */
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5175',
  'https://fci-ministries-client.vercel.app',
  process.env.CLIENT_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow server-to-server, Postman, curl
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error('CORS not allowed for this origin'));
  },
  credentials: true
}));

/* =======================
   Sanitize Mongo Queries
======================= */
app.use(mongoSanitize());

/* =======================
   Rate Limiting
======================= */
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
});
app.use('/api/', limiter);

/* =======================
   Body Parsing
======================= */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

/* =======================
   Compression
======================= */
app.use(compression());

/* =======================
   Logging
======================= */
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/* =======================
   Health Check
======================= */
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

/* =======================
   API Routes
======================= */
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/sermons', require('./routes/sermon.routes'));
app.use('/api/v1/events', require('./routes/event.routes'));
app.use('/api/v1/contact', require('./routes/contact.routes'));
app.use('/api/v1/ministries', require('./routes/ministry.routes'));
// app.use('/api/v1/blog', require('./routes/blog.routes'));
// app.use('/api/v1/newsletter', require('./routes/newsletter.routes'));
// app.use('/api/v1/prayer', require('./routes/prayer.routes'));
// app.use('/api/v1/volunteers', require('./routes/volunteer.routes'));
// app.use('/api/v1/resources', require('./routes/resource.routes'));
// app.use('/api/v1/testimonies', require('./routes/testimony.routes'));

/* =======================
   404 Handler
======================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

/* =======================
   Error Handler (LAST)
======================= */
app.use(errorHandler);

module.exports = app;
