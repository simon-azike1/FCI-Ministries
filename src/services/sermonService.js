import api from './api';

const sermonService = {
  // Get all sermons (public)
  getAll: async (params = {}) => {
    const { page = 1, limit = 10, category, search, language } = params;
    const queryParams = new URLSearchParams({
      page,
      limit,
      ...(category && { category }),
      ...(search && { search }),
      ...(language && { language }),
    });
    return await api.get(`/sermons?${queryParams}`);
  },

  // Get single sermon
  getById: async (id) => {
    return await api.get(`/sermons/${id}`);
  },

  // Get sermon by slug
  getBySlug: async (slug) => {
    return await api.get(`/sermons/slug/${slug}`);
  },

  // Search sermons
  search: async (query, language = 'en') => {
    return await api.get(`/sermons/search?q=${query}&language=${language}`);
  },

  // Get categories
  getCategories: async () => {
    return await api.get('/sermons/categories');
  },

  // Get series
  getSeries: async () => {
    return await api.get('/sermons/series');
  },

  // Increment view count
  incrementView: async (id) => {
    return await api.put(`/sermons/${id}/view`);
  },

  // Admin: Create sermon
  create: async (sermonData) => {
    return await api.post('/sermons', sermonData);
  },

  // Admin: Update sermon
  update: async (id, sermonData) => {
    return await api.put(`/sermons/${id}`, sermonData);
  },

  // Admin: Delete sermon
  delete: async (id) => {
    return await api.delete(`/sermons/${id}`);
  },
};

export default sermonService;
