import { useState } from 'react';
import { format } from 'date-fns';
import eventService from '../../services/eventService';

function RSVPModal({ event, currentLang, onClose, onSuccess }) {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await eventService.rsvp(event._id, formData);
      setSuccess(true);
      setTimeout(onSuccess, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to submit RSVP');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSpots = () => {
    if (!event.capacity) return null;
    const total = event.rsvps?.reduce(
      (sum, r) => sum + (r.numberOfAttendees || 1),
      0
    ) || 0;
    return event.capacity - total;
  };

  const maxAttendees = () => {
    const available = getAvailableSpots();
    return available ? Math.min(available, 10) : 10;
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white w-full sm:max-w-lg rounded-t-2xl sm:rounded-2xl shadow-xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 border-b px-5 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">RSVP for Event</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-4 space-y-4">
          {/* Event Info */}
          <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-1">
            <h3 className="font-medium text-gray-900">
              {event.title[currentLang]}
            </h3>
            <p>📅 {format(new Date(event.startDate), 'MMMM dd, yyyy • h:mm a')}</p>
            {event.location?.name && <p>📍 {event.location.name}</p>}
            {event.capacity && (
              <p className="text-green-600 font-medium">
                {getAvailableSpots()} spots left
              </p>
            )}
          </div>

          {/* Success */}
          {success ? (
            <div className="text-center py-10 space-y-3">
              <div className="text-4xl text-green-500">✓</div>
              <h3 className="text-lg font-semibold">RSVP Confirmed!</h3>
              <p className="text-gray-600 text-sm">
                Thank you for confirming your attendance.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Inputs */}
              {[
                { label: 'Name', name: 'name', type: 'text', required: true },
                { label: 'Email', name: 'email', type: 'email', required: true },
                { label: 'Phone', name: 'phone', type: 'tel' },
              ].map(({ label, name, type, required }) => (
                <div key={name}>
                  <label className="block text-sm font-medium mb-1">
                    {label} {required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required={required}
                    className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              ))}

              {/* Attendees */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Number of Attendees <span className="text-red-500">*</span>
                </label>
                <select
                  name="numberOfAttendees"
                  value={formData.numberOfAttendees}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  {[...Array(maxAttendees())].map((_, i) => (
                    <option key={i} value={i + 1}>
                      {i + 1} {i + 1 === 1 ? 'person' : 'people'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm resize-none"
                />
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg">
                  ⚠ {error}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 border rounded-lg py-2 text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 bg-blue-600 text-white rounded-lg py-2 text-sm disabled:opacity-60"
                >
                  {loading ? 'Submitting...' : 'Confirm RSVP'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default RSVPModal;
