import api from './api';

const ministryService = {
  // Get all ministries
  getAll: async () => {
    return await api.get('/ministries');
  },

  // Get single ministry
  getById: async (id) => {
    return await api.get(`/ministries/${id}`);
  },

  // Admin: Create ministry
  create: async (ministryData) => {
    return await api.post('/ministries', ministryData);
  },

  // Admin: Update ministry
  update: async (id, ministryData) => {
    return await api.put(`/ministries/${id}`, ministryData);
  },

  // Admin: Delete ministry
  delete: async (id) => {
    return await api.delete(`/ministries/${id}`);
  },
};

export default ministryService;
