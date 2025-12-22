import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import eventService from '../services/eventService';
import EventCard from '../components/event/EventCard';
import RSVPModal from '../components/event/RSVPModal';

function Events() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

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
      setEvents(response.data.data || []);
      setFilteredEvents(response.data.data || []);
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
      const allEvents = response.data.data || [];
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

  if (loading) {
    return (
      <div className="py-3xl">
        <div className="container">
          <div className="text-center">
            <div className="loader"></div>
            <p className="mt-md text-gray">{t('common.loading')}</p>
          </div>
        </div>
      </div>
    );
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
    <div className="events-page">
      <div className="container py-3xl">
        <h1 className="text-center mb-xl">{t('events.title')}</h1>

        {/* Filters */}
        <div className="events-filters mb-xl">
          <div className="filters-row">
            <select
              className="filter-select"
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
              className={`btn ${showUpcoming ? 'btn-primary' : 'btn-outline'}`}
              onClick={toggleUpcoming}
            >
              {showUpcoming ? t('events.showingUpcoming') : t('events.showAll')}
            </button>

            {selectedCategory && (
              <button className="btn btn-outline" onClick={handleClearFilters}>
                {t('events.clearFilters')}
              </button>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {filteredEvents.length === 0 ? (
          <div className="no-results">
            <p className="text-center text-gray text-xl">
              {t('events.noEvents')}
            </p>
          </div>
        ) : (
          <>
            <p className="results-count mb-lg">
              {t('events.showing')} {filteredEvents.length} {t('events.events')}
            </p>
            <div className="events-grid">
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
