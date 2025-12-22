import api from './api';

const contactService = {
  // Submit contact form
  submit: async (contactData) => {
    return await api.post('/contact', contactData);
  },

  // Admin: Get all messages
  getAll: async (params = {}) => {
    const { page = 1, limit = 20, status } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(status && { status }),
    });
    return await api.get(`/contact?${queryParams}`);
  },

  // Admin: Get single message
  getById: async (id) => {
    return await api.get(`/contact/${id}`);
  },

  // Admin: Update message status
  updateStatus: async (id, status) => {
    return await api.put(`/contact/${id}`, { status });
  },

  // Admin: Delete message
  delete: async (id) => {
    return await api.delete(`/contact/${id}`);
  },
};

export default contactService;
