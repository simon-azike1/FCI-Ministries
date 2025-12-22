import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import sermonService from '../../services/sermonService';

function ManageSermons() {
  const [sermons, setSermons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    speaker: '',
    date: '',
    youtubeUrl: '',
    series: '',
    tags: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchSermons();
  }, []);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const response = await sermonService.getAll();
      setSermons(response.data || []);
    } catch (err) {
      setError('Failed to fetch sermons');
    } finally {
      setLoading(false);
    }
  };

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const youtubeId = extractYouTubeId(formData.youtubeUrl);
    if (!youtubeId) {
      setError('Invalid YouTube URL. Please enter a valid YouTube video URL.');
      return;
    }

    const sermonData = {
      title: {
        en: formData.title,
        fr: formData.title,
        ar: formData.title,
      },
      description: {
        en: formData.description,
        fr: formData.description,
        ar: formData.description,
      },
      speaker: formData.speaker,
      date: formData.date,
      videoUrl: formData.youtubeUrl,
      category: 'Sunday Service',
      series: formData.series,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      isPublished: true,
    };

    try {
      if (editingSermon) {
        await sermonService.update(editingSermon._id, sermonData);
        setSuccess('Sermon updated successfully!');
      } else {
        await sermonService.create(sermonData);
        setSuccess('Sermon created successfully!');
      }

      fetchSermons();
      resetForm();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.error || 'Failed to save sermon');
    }
  };

  const handleEdit = (sermon) => {
    setEditingSermon(sermon);

    // Handle both videoUrl (new) and videoId (seeded data)
    let youtubeUrl = sermon.videoUrl;
    if (!youtubeUrl && sermon.videoId) {
      youtubeUrl = `https://www.youtube.com/watch?v=${sermon.videoId}`;
    }

    setFormData({
      title: typeof sermon.title === 'string' ? sermon.title : sermon.title?.en || '',
      description: typeof sermon.description === 'string' ? sermon.description : sermon.description?.en || '',
      speaker: sermon.speaker,
      date: sermon.date.split('T')[0],
      youtubeUrl: youtubeUrl || '',
      series: sermon.series || '',
      tags: sermon.tags ? sermon.tags.join(', ') : '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sermon?')) return;

    try {
      await sermonService.delete(id);
      setSuccess('Sermon deleted successfully!');
      fetchSermons();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.error || 'Failed to delete sermon');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      speaker: '',
      date: '',
      youtubeUrl: '',
      series: '',
      tags: '',
    });
    setEditingSermon(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Sermons</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 touch-manipulation min-h-[44px]"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {showForm ? 'Cancel' : 'Add New Sermon'}
        </button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
        >
          {error}
        </motion.div>
      )}

      {success && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded"
        >
          {success}
        </motion.div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl shadow-sm p-6 mb-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Sermon Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[44px]"
                    placeholder="The Power of Faith"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Speaker</label>
                  <input
                    type="text"
                    name="speaker"
                    value={formData.speaker}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[44px]"
                    placeholder="Pastor John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Series (Optional)</label>
                  <input
                    type="text"
                    name="series"
                    value={formData.series}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[44px]"
                    placeholder="Walking in Faith Series"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  YouTube URL
                  <span className="text-sm text-gray-500 ml-2">(e.g., https://www.youtube.com/watch?v=VIDEO_ID)</span>
                </label>
                <input
                  type="url"
                  name="youtubeUrl"
                  value={formData.youtubeUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[44px]"
                  placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  placeholder="Sermon description..."
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Tags
                  <span className="text-sm text-gray-500 ml-2">(comma-separated, e.g., faith, prayer, worship)</span>
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[44px]"
                  placeholder="faith, prayer, worship"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 touch-manipulation min-h-[44px]"
                >
                  {editingSermon ? 'Update Sermon' : 'Add Sermon'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-xl hover:bg-gray-300 transition-colors touch-manipulation min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <svg className="animate-spin h-12 w-12 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : sermons.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <p className="text-gray-600 text-lg">No sermons found. Add your first sermon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sermons.map((sermon) => {
            // Extract video ID from videoId field or videoUrl
            const videoId = sermon.videoId || extractYouTubeId(sermon.videoUrl);

            return (
            <motion.div
              key={sermon._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative pb-[56.25%]">
                <img
                  src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                  alt={typeof sermon.title === 'string' ? sermon.title : sermon.title?.en || 'Sermon'}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors">
                  <svg className="w-16 h-16 text-white opacity-80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  {sermon.series && (
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
                      {sermon.series}
                    </span>
                  )}
                  <span className="text-sm text-gray-500 ml-auto">
                    {new Date(sermon.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {typeof sermon.title === 'string' ? sermon.title : sermon.title?.en || 'Untitled'}
                </h3>
                <p className="text-gray-600 text-sm mb-2">{sermon.speaker}</p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {typeof sermon.description === 'string' ? sermon.description : sermon.description?.en || ''}
                </p>
                {sermon.tags && sermon.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sermon.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(sermon)}
                    className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors touch-manipulation min-h-[44px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sermon._id)}
                    className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors touch-manipulation min-h-[44px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ManageSermons;
