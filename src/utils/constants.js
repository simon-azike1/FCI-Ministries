// Color Theme
export const COLORS = {
  primary: '#F37021',
  primaryLight: '#FF9854',
  primaryDark: '#D85F0F',
  secondary: '#000000',
  background: '#FFFFFF',
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray600: '#4B5563',
  gray900: '#111827',
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  info: '#3B82F6',
};

// API URL
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Languages
export const LANGUAGES = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ar', name: 'العربية', flag: '🇲🇦' },
];

// Service Times
export const SERVICE_TIMES = {
  sunday: {
    day: 'Sunday',
    time: '10:00 AM - 12:00 PM',
  },
  prayer: {
    day: 'Wednesday',
    time: '7:00 PM - 9:00 PM',
  },
};

// Sermon Categories
export const SERMON_CATEGORIES = [
  'Sunday Service',
  'Bible Study',
  'Prayer Meeting',
  'Special Event',
  'Conference',
  'Other',
];

// Event Categories
export const EVENT_CATEGORIES = [
  'Worship Service',
  'Bible Study',
  'Prayer Meeting',
  'Youth Event',
  'Outreach',
  'Conference',
  'Other',
];

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  EDITOR: 'editor',
  VIEWER: 'viewer',
};

// Pagination
export const ITEMS_PER_PAGE = 12;

// Date Format
export const DATE_FORMAT = 'MMM dd, yyyy';
export const TIME_FORMAT = 'h:mm a';
export const DATETIME_FORMAT = 'MMM dd, yyyy h:mm a';

// Timezone
export const TIMEZONE = 'Africa/Casablanca';

export default {
  COLORS,
  API_URL,
  LANGUAGES,
  SERVICE_TIMES,
  SERMON_CATEGORIES,
  EVENT_CATEGORIES,
  USER_ROLES,
  ITEMS_PER_PAGE,
  DATE_FORMAT,
  TIME_FORMAT,
  DATETIME_FORMAT,
  TIMEZONE,
};
