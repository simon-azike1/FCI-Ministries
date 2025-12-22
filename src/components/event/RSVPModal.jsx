import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import eventService from '../../services/eventService';
import './RSVPModal.css';

function RSVPModal({ event, currentLang, onClose, onSuccess }) {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    numberOfAttendees: 1,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await eventService.rsvp(event._id, formData);
      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || err.message || t('events.rsvpError'));
      console.error('RSVP Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSpots = () => {
    if (!event.capacity) return null;
    const totalRSVPs = event.rsvps?.reduce((sum, rsvp) => sum + (rsvp.numberOfAttendees || 1), 0) || 0;
    return event.capacity - totalRSVPs;
  };

  const maxAttendees = () => {
    const available = getAvailableSpots();
    return available ? Math.min(available, 10) : 10;
  };

  if (success) {
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="rsvp-success">
            <div className="success-icon">✓</div>
            <h2>{t('events.rsvpSuccess')}</h2>
            <p>{t('events.rsvpSuccessMessage')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content rsvp-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <div className="modal-header">
          <h2>{t('events.rsvpTitle')}</h2>
          <div className="event-info">
            <h3>{event.title[currentLang]}</h3>
            <p className="event-date">
              📅 {format(new Date(event.startDate), 'MMMM dd, yyyy')} at{' '}
              {format(new Date(event.startDate), 'h:mm a')}
            </p>
            {event.location?.name && (
              <p className="event-location">📍 {event.location.name}</p>
            )}
            {event.capacity && (
              <p className="spots-available">
                {getAvailableSpots()} {t('events.spotsLeft')}
              </p>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <label htmlFor="name">
              {t('events.name')} <span className="required">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={t('events.namePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">
              {t('events.email')} <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder={t('events.emailPlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">{t('events.phone')}</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder={t('events.phonePlaceholder')}
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfAttendees">
              {t('events.numberOfAttendees')} <span className="required">*</span>
            </label>
            <select
              id="numberOfAttendees"
              name="numberOfAttendees"
              value={formData.numberOfAttendees}
              onChange={handleChange}
              required
            >
              {[...Array(maxAttendees())].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i + 1 === 1 ? t('events.person') : t('events.people')}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="message">{t('events.message')}</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder={t('events.messagePlaceholder')}
            />
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠</span>
              {error}
            </div>
          )}

          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              {t('common.cancel')}
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? t('common.loading') : t('events.confirmRSVP')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RSVPModal;
