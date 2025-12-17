import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import './EventCard.css';

function EventCard({ event, currentLang, onRSVP }) {
  const { t } = useTranslation();

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
    <div className="event-card">
      {event.image && (
        <div className="event-image">
          <img src={event.image} alt={event.title[currentLang]} />
          {!isUpcoming() && (
            <div className="event-badge event-badge-past">{t('events.past')}</div>
          )}
          {isEventFull() && (
            <div className="event-badge event-badge-full">{t('events.full')}</div>
          )}
        </div>
      )}
      <div className="event-content">
        <div className="event-category">{event.category}</div>
        <h3 className="event-title">{event.title[currentLang]}</h3>

        <div className="event-meta">
          <div className="event-date">
            <span className="icon">📅</span>
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="event-time">
            <span className="icon">🕐</span>
            <span>{formatTime(event.startDate)}</span>
          </div>
          {event.location?.name && (
            <div className="event-location">
              <span className="icon">📍</span>
              <span>{event.location.name}</span>
            </div>
          )}
        </div>

        {event.description?.[currentLang] && (
          <p className="event-description">
            {event.description[currentLang].substring(0, 120)}
            {event.description[currentLang].length > 120 && '...'}
          </p>
        )}

        <div className="event-footer">
          {event.capacity && (
            <div className="event-capacity">
              <span className="icon">👥</span>
              <span>
                {getAvailableSpots()} {t('events.spotsLeft')}
              </span>
            </div>
          )}
          {isUpcoming() && (
            <button
              className={`btn ${isEventFull() ? 'btn-disabled' : 'btn-primary'}`}
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
