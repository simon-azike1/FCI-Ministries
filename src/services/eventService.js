import api from './api';

const eventService = {
  // Get all events
  getAll: async (params = {}) => {
    const { page = 1, limit = 10, category, upcoming } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(upcoming && { upcoming: 'true' }),
    });
    return await api.get(`/events?${queryParams}`);
  },

  // Get upcoming events
  getUpcoming: async (limit = 5) => {
    return await api.get(`/events/upcoming?limit=${limit}`);
  },

  // Get single event
  getById: async (id) => {
    return await api.get(`/events/${id}`);
  },

  // RSVP to event
  rsvp: async (eventId, rsvpData) => {
    return await api.post(`/events/${eventId}/rsvp`, rsvpData);
  },

  // Get event RSVPs (admin)
  getRSVPs: async (eventId) => {
    return await api.get(`/events/${eventId}/rsvps`);
  },

  // Admin: Create event
  create: async (eventData) => {
    return await api.post('/events', eventData);
  },

  // Admin: Update event
  update: async (id, eventData) => {
    return await api.put(`/events/${id}`, eventData);
  },

  // Admin: Delete event
  delete: async (id) => {
    return await api.delete(`/events/${id}`);
  },
};

export default eventService;
