import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import './EventCard.css';

function EventCard({ event, currentLang, onRSVP }) {
  const { t, i18n } = useTranslation();

  // Use i18n.language directly instead of prop to ensure reactivity
  const lang = i18n.language;

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

  const formatDate = (date) => {
    return format(new Date(date), 'MMM dd, yyyy');
  };

  const formatTime = (date) => {
    return format(new Date(date), 'h:mm a');
  };

  const isEventFull = () => {
    if (!event.capacity) return false;
    const totalRSVPs = event.rsvps?.reduce((sum, rsvp) => sum + (rsvp.numberOfAttendees || 1), 0) || 0;
    return totalRSVPs >= event.capacity;
  };

  const getAvailableSpots = () => {
    if (!event.capacity) return null;
    const totalRSVPs = event.rsvps?.reduce((sum, rsvp) => sum + (rsvp.numberOfAttendees || 1), 0) || 0;
    return event.capacity - totalRSVPs;
  };

  const isUpcoming = () => {
    return new Date(event.endDate) >= new Date();
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      {event.image && (
        <div className="relative h-48 bg-gray-200">
          <img
            src={event.image}
            alt={event.title[lang]}
            className="w-full h-full object-cover"
          />
          {!isUpcoming() && (
            <div className="absolute top-3 right-3 bg-gray-800 bg-opacity-90 text-white text-xs px-3 py-1 rounded-full">
              {t('events.past')}
            </div>
          )}
          {isEventFull() && (
            <div className="absolute top-3 right-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full font-medium">
              {t('events.full')}
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs px-3 py-1 rounded-full font-medium">
            {event.category}
          </div>
        </div>
      )}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight">
          {event.title[lang]}
        </h3>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center">
            <span className="mr-2">📅</span>
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">🕐</span>
            <span>{formatTime(event.startDate)}</span>
          </div>
          {event.location?.name && (
            <div className="flex items-center">
              <span className="mr-2">📍</span>
              <span className="truncate">{event.location.name}</span>
            </div>
          )}
        </div>

        {event.description?.[lang] && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {event.description[lang]}
          </p>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {event.capacity && (
            <div className="flex items-center text-sm text-gray-600">
              <span className="mr-1">👥</span>
              <span className="font-medium">
                {getAvailableSpots()} {t('events.spotsLeft')}
              </span>
            </div>
          )}
          {isUpcoming() && (
            <button
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                isEventFull()
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={onRSVP}
              disabled={isEventFull()}
            >
              {isEventFull() ? t('events.full') : t('events.rsvp')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;
