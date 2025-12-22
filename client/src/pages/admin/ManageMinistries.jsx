import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ministryService from '../../services/ministryService';

function ManageMinistries() {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    leader: '',
    contactEmail: '',
    contactPhone: '',
    meetingSchedule: '',
    image: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      setLoading(true);
      const response = await ministryService.getAll();
      setMinistries(response.data || []);
    } catch (err) {
      setError('Failed to fetch ministries');
    } finally {
      setLoading(false);
    }
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

    const ministryData = {
      name: {
        en: formData.name,
        fr: formData.name,
        ar: formData.name,
      },
      description: {
        en: formData.description,
        fr: formData.description,
        ar: formData.description,
      },
      leader: formData.leader,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      meetingTime: {
        en: formData.meetingSchedule,
        fr: formData.meetingSchedule,
        ar: formData.meetingSchedule,
      },
      image: formData.image,
    };

    try {
      if (editingMinistry) {
        await ministryService.update(editingMinistry._id, ministryData);
        setSuccess('Ministry updated successfully!');
      } else {
        await ministryService.create(ministryData);
        setSuccess('Ministry created successfully!');
      }

      fetchMinistries();
      resetForm();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.error || 'Failed to save ministry');
    }
  };

  const handleEdit = (ministry) => {
    setEditingMinistry(ministry);
    setFormData({
      name: typeof ministry.name === 'string' ? ministry.name : ministry.name?.en || '',
      description: typeof ministry.description === 'string' ? ministry.description : ministry.description?.en || '',
      leader: ministry.leader || '',
      contactEmail: ministry.contactEmail || '',
      contactPhone: ministry.contactPhone || '',
      meetingSchedule: typeof ministry.meetingTime === 'string' ? ministry.meetingTime : ministry.meetingTime?.en || ministry.meetingSchedule || '',
      image: ministry.image || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ministry?')) return;

    try {
      await ministryService.delete(id);
      setSuccess('Ministry deleted successfully!');
      fetchMinistries();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.error || 'Failed to delete ministry');
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      leader: '',
      contactEmail: '',
      contactPhone: '',
      meetingSchedule: '',
      image: '',
    });
    setEditingMinistry(null);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">Manage Ministries</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 touch-manipulation min-h-[44px]"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {showForm ? 'Cancel' : 'Add New Ministry'}
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
              {editingMinistry ? 'Edit Ministry' : 'Add New Ministry'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Ministry Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[44px]"
                    placeholder="Youth Ministry"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Leader</label>
                  <input
                    type="text"
                    name="leader"
                    value={formData.leader}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[44px]"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Contact Email</label>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[44px]"
                    placeholder="youth@fciministries.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[44px]"
                    placeholder="+1234567890"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Meeting Schedule</label>
                  <input
                    type="text"
                    name="meetingSchedule"
                    value={formData.meetingSchedule}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[44px]"
                    placeholder="Every Friday at 7PM"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent min-h-[44px]"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  placeholder="Ministry description..."
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 px-6 rounded-xl hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 touch-manipulation min-h-[44px]"
                >
                  {editingMinistry ? 'Update Ministry' : 'Add Ministry'}
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
          <svg className="animate-spin h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      ) : ministries.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <p className="text-gray-600 text-lg">No ministries found. Add your first ministry!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ministries.map((ministry) => (
            <motion.div
              key={ministry._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {ministry.image && (
                <img src={ministry.image} alt={typeof ministry.name === 'string' ? ministry.name : ministry.name?.en || 'Ministry'} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {typeof ministry.name === 'string' ? ministry.name : ministry.name?.en || 'Untitled'}
                </h3>
                {ministry.leader && (
                  <p className="text-gray-600 text-sm mb-2">
                    <span className="font-semibold">Leader:</span> {ministry.leader}
                  </p>
                )}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {typeof ministry.description === 'string' ? ministry.description : ministry.description?.en || ''}
                </p>
                {(ministry.meetingSchedule || ministry.meetingTime) && (
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {typeof ministry.meetingTime === 'string' ? ministry.meetingTime : ministry.meetingTime?.en || ministry.meetingSchedule || 'N/A'}
                  </div>
                )}
                {ministry.contactEmail && (
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {ministry.contactEmail}
                  </div>
                )}
                {ministry.contactPhone && (
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {ministry.contactPhone}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(ministry)}
                    className="flex-1 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors touch-manipulation min-h-[44px]"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(ministry._id)}
                    className="flex-1 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-red-600 transition-colors touch-manipulation min-h-[44px]"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ManageMinistries;
