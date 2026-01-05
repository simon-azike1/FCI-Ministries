# FCI Ministries Morocco - Full Stack Church Website

A modern, multilingual (English, French, Arabic with RTL) church website built with the MERN stack (MongoDB, Express, React, Node.js).

## 🌟 Features

- **Multilingual Support**: English, French, and Arabic (with RTL support)
- **Sermon Library**: Video/audio sermons with search and categories
- **Events Management**: Event calendar with RSVP functionality
- **Ministries**: Showcase church ministries
- **Online Giving**: Donation system (UI ready for CMI/PayPal integration)
- **Contact Forms**: Contact, prayer requests, volunteer applications
- **Newsletter**: Email subscription system
- **Admin Panel**: Custom CMS for content management
- **SEO Optimized**: Meta tags, sitemap, structured data
- **Mobile-First**: Fully responsive design
- **Secure**: JWT authentication, rate limiting, input sanitization

## 🏗️ Project Structure

```
FCI_MINISTRIES/
├── client/                 # React frontend (Vite)
│   ├── public/
│   │   ├── locales/       # Translation files (en, fr, ar)
│   │   └── FCI__Logo-modified.png
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/      # API service layer
│       ├── context/       # React Context
│       ├── i18n.js        # Internationalization config
│       └── App.jsx
│
├── server/                 # Node.js/Express backend
│   ├── src/
│   │   ├── models/        # MongoDB schemas
│   │   ├── routes/        # API routes
│   │   ├── controllers/   # Business logic
│   │   ├── middleware/    # Auth, validation, error handling
│   │   ├── config/        # Database, CORS
│   │   └── utils/         # Helper functions
│   └── .env               # Environment variables
│
└── package.json           # Monorepo root
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account or local MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd FCI_MINISTRIES
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install

   # Install client dependencies
   cd client
   npm install

   # Install server dependencies
   cd ../server
   npm install
   ```

3. **Configure environment variables**

   Copy `.env.example` to `.env` in the server folder:
   ```bash
   cd server
   cp .env.example .env
   ```

   Edit `.env` with your values:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   CLIENT_URL=http://localhost:5173
   SENDGRID_API_KEY=your_sendgrid_key
   ```

4. **Start development servers**

   **Option 1: Run both servers concurrently (from root)**
   ```bash
   npm run dev
   ```

   **Option 2: Run separately**

   Terminal 1 - Backend:
   ```bash
   cd server
   npm run dev
   ```

   Terminal 2 - Frontend:
   ```bash
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000/api/v1
   - Health Check: http://localhost:5000/api/v1/health

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/v1/auth/login` - User login
- `POST /api/v1/auth/register` - Register new admin (protected)
- `POST /api/v1/auth/logout` - Logout
- `GET /api/v1/auth/me` - Get current user
- `PUT /api/v1/auth/change-password` - Change password

### Upcoming Endpoints (In Development)

- `/api/v1/sermons` - Sermon management
- `/api/v1/events` - Event management
- `/api/v1/ministries` - Ministry management
- `/api/v1/contact` - Contact form submissions
- `/api/v1/newsletter` - Newsletter subscriptions

## 🎨 Color Theme

- **Primary**: Orange (#F37021)
- **Secondary**: Black (#000000)
- **Background**: White (#FFFFFF)

## 🌍 Supported Languages

- **English** (en)
- **French** (fr) - Default for Morocco
- **Arabic** (ar) - With RTL support

## 🔒 Security Features

- JWT authentication
- Password hashing (bcrypt)
- Rate limiting
- MongoDB injection protection
- XSS protection
- CORS configuration
- Helmet security headers

## 📦 Tech Stack

### Frontend
- React 19
- Vite
- React Router
- i18next
- Axios
- React Hook Form + Zod
- Zustand (state management)

### Backend
- Node.js
- Express
- MongoDB + Mongoose
- JWT
- SendGrid (email)
- Cloudinary (file uploads)

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd client
npm run build
# Deploy dist folder to Vercel
```

### Backend (Render)
- Configure environment variables in Render dashboard
- Connect GitHub repository
- Auto-deploy on push to main branch

## 👥 Team

FCI Ministries Morocco

## 📄 License

MIT License - See LICENSE file for details

## 🙏 Support

For support, email support@fciministries.com or join our community.

---

**Note**: The `fci-ministries` folder in the root is redundant and can be manually deleted. All necessary files have been moved to the `client` folder.

<img width="1885" height="886" alt="image" src="https://github.com/user-attachments/assets/d50ab6f3-d590-482d-ad53-d68b7a362220" />

