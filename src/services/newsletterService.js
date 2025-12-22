import api from './api';

const newsletterService = {
  // Subscribe to newsletter
  subscribe: async (email, name, language = 'fr') => {
    return await api.post('/newsletter/subscribe', { email, name, language });
  },

  // Unsubscribe from newsletter
  unsubscribe: async (email) => {
    return await api.post('/newsletter/unsubscribe', { email });
  },

  // Admin: Get all subscribers
  getAll: async (params = {}) => {
    const { page = 1, limit = 50, language, isSubscribed } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(language && { language }),
      ...(isSubscribed !== undefined && { isSubscribed }),
    });
    return await api.get(`/newsletter/subscribers?${queryParams}`);
  },

  // Admin: Delete subscriber
  delete: async (id) => {
    return await api.delete(`/newsletter/${id}`);
  },
};

export default newsletterService;
