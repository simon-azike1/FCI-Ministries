import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import eventService from '../services/eventService';
import EventCard from '../components/event/EventCard';
import RSVPModal from '../components/event/RSVPModal';
import Loader from '../components/common/Loader';

function Events() {
  const { t, i18n } = useTranslation();
  // Use i18n.language directly in JSX to ensure re-renders when language changes
  const currentLang = i18n.language;

  // Force re-render when language changes
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showUpcoming, setShowUpcoming] = useState(true);

  // RSVP Modal state
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showRSVPModal, setShowRSVPModal] = useState(false);

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, showUpcoming]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const params = showUpcoming ? { upcoming: true } : {};
      const response = await eventService.getAll(params);
      setEvents(response.data || []);
      setFilteredEvents(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await eventService.getAll();
      const allEvents = response.data || [];
      const uniqueCategories = [...new Set(allEvents.map(event => event.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const filterEvents = () => {
    let filtered = [...events];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    setFilteredEvents(filtered);
  };

  const handleRSVPClick = (event) => {
    setSelectedEvent(event);
    setShowRSVPModal(true);
  };

  const handleRSVPSuccess = () => {
    setShowRSVPModal(false);
    setSelectedEvent(null);
    fetchEvents(); // Refresh events to update RSVP counts
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
  };

  const toggleUpcoming = () => {
    setShowUpcoming(!showUpcoming);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return <Loader fullScreen={true} />;
  }

  if (error && events.length === 0) {
    return (
      <div className="py-3xl">
        <div className="container">
          <div className="text-center">
            <p className="text-error">{t('events.errorLoading')}: {error}</p>
            <button className="btn btn-primary mt-md" onClick={fetchEvents}>
              {t('common.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Hero Section with Video Background */}
      <section className="relative h-[80vh] flex items-center justify-center text-white overflow-hidden">
        {/* Video Background - Cloudinary */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://res.cloudinary.com/djizgbimn/video/upload/event_lelkov.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Text Content */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">
            {t('events.title')}
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl opacity-90">
            {t('events.subtitle')}
          </p>
        </motion.div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-center">
            <select
              className="flex-1 min-w-[200px] px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">{t('events.allCategories')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <button
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                showUpcoming
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              onClick={toggleUpcoming}
            >
              {showUpcoming ? `📅 ${t('events.showUpcoming')}` : t('events.showAll')}
            </button>

            {selectedCategory && (
              <button
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
                onClick={handleClearFilters}
              >
                ✕ {t('events.clearFilters')}
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">
              {t('events.noEvents')}
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4 font-medium">
              {t('events.showing')} {filteredEvents.length} {filteredEvents.length === 1 ? t('events.event') : t('events.events')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event._id}
                  event={event}
                  currentLang={currentLang}
                  onRSVP={() => handleRSVPClick(event)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* RSVP Modal */}
      {showRSVPModal && selectedEvent && (
        <RSVPModal
          event={selectedEvent}
          currentLang={currentLang}
          onClose={() => setShowRSVPModal(false)}
          onSuccess={handleRSVPSuccess}
        />
      )}
    </div>
  );
}

export default Events;
