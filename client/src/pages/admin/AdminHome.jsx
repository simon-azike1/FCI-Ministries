import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import eventService from '../../services/eventService';
import sermonService from '../../services/sermonService';
import ministryService from '../../services/ministryService';

function AdminHome() {
  const [stats, setStats] = useState({
    events: 0,
    sermons: 0,
    ministries: 0,
    loading: true,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [eventsData, sermonsData, ministriesData] = await Promise.all([
        eventService.getAll(),
        sermonService.getAll(),
        ministryService.getAll(),
      ]);

      setStats({
        events: (eventsData.data || []).length,
        sermons: (sermonsData.data || []).length,
        ministries: (ministriesData.data || []).length,
        loading: false,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      setStats({ ...stats, loading: false });
    }
  };

  const quickActions = [
    {
      title: 'Manage Events',
      description: 'Create, update, and delete upcoming events',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      link: '/admin/dashboard/events',
      color: 'from-blue-500 to-blue-600',
      count: stats.events,
    },
    {
      title: 'Manage Sermons',
      description: 'Upload sermons and manage YouTube links',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      link: '/admin/dashboard/sermons',
      color: 'from-red-500 to-red-600',
      count: stats.sermons,
    },
    {
      title: 'Manage Ministries',
      description: 'Update ministry information and details',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      link: '/admin/dashboard/ministries',
      color: 'from-green-500 to-green-600',
      count: stats.ministries,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-sm p-6 mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600">Manage your church website content with ease</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
      >
        {quickActions.map((action, index) => (
          <motion.div key={index} variants={itemVariants}>
            <Link to={action.link} className="block h-full">
              <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full transform hover:scale-[1.02]">
                <div className={`bg-gradient-to-r ${action.color} px-6 py-4`}>
                  <div className="flex items-center justify-between text-white">
                    {action.icon}
                    <div className="text-right">
                      <p className="text-3xl font-bold">{stats.loading ? '...' : action.count}</p>
                      <p className="text-sm opacity-90">Total</p>
                    </div>
                  </div>
                </div>
                <div className="px-6 py-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-gray-600 text-sm">{action.description}</p>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl shadow-sm p-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/admin/dashboard/events"
            className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors touch-manipulation min-h-[44px]"
          >
            <div className="bg-blue-500 text-white p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800">Add New Event</span>
          </Link>

          <Link
            to="/admin/dashboard/sermons"
            className="flex items-center space-x-3 p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors touch-manipulation min-h-[44px]"
          >
            <div className="bg-red-500 text-white p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800">Add New Sermon</span>
          </Link>

          <Link
            to="/admin/dashboard/ministries"
            className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors touch-manipulation min-h-[44px]"
          >
            <div className="bg-green-500 text-white p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="font-semibold text-gray-800">Add New Ministry</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminHome;
