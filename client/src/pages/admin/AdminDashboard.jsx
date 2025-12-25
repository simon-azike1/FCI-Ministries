import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import authService from '../../services/authService';
import { useDarkMode } from '../../contexts/DarkModeContext';

function AdminDashboard() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const user = authService.getStoredUser();

  const handleLogout = async () => {
    await authService.logout();
    navigate('/admin/login');
  };

  const menuItems = [
    {
      name: 'Dashboard',
      path: '/admin/dashboard',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
    {
      name: 'Events',
      path: '/admin/dashboard/events',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Sermons',
      path: '/admin/dashboard/sermons',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      name: 'Ministries',
      path: '/admin/dashboard/ministries',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
        >
          <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || mobileMenuOpen) && (
          <>
            {/* Mobile Backdrop */}
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileMenuOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
              />
            )}

            {/* Sidebar */}
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-950 dark:to-gray-900 text-white shadow-2xl z-40 overflow-y-auto"
            >
              {/* Logo */}
              <div className="p-6 border-b border-gray-700 dark:border-gray-800">
                <div className="flex items-center space-x-3 mb-2">
                  <img src="/FCI__Logo-modified.png" alt="FCI Ministries" className="h-10 w-auto" />
                  <h1 className="text-2xl font-bold">FCI Admin</h1>
                </div>
                <p className="text-sm text-gray-400 mt-1">Content Management</p>
              </div>

              {/* User Info */}
              {user && (
                <div className="px-6 py-4 border-b border-gray-700 dark:border-gray-800">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {user.name?.charAt(0).toUpperCase() || 'A'}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{user.name || 'Admin'}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <nav className="p-4">
                <ul className="space-y-2">
                  {menuItems.map((item) => (
                    <li key={item.path}>
                      <NavLink
                        to={item.path}
                        end={item.path === '/admin/dashboard'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 touch-manipulation min-h-[44px] ${
                            isActive
                              ? 'bg-primary text-white shadow-lg'
                              : 'text-gray-300 hover:bg-gray-700 dark:hover:bg-gray-800 hover:text-white'
                          }`
                        }
                      >
                        {item.icon}
                        <span className="font-medium">{item.name}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Settings & Logout */}
              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 dark:border-gray-800 space-y-2">
                {/* Dark Mode Toggle */}
                <button
                  onClick={toggleDarkMode}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-700 hover:bg-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700 text-white rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px]"
                >
                  {isDarkMode ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Light Mode</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                      </svg>
                      <span className="font-medium">Dark Mode</span>
                    </>
                  )}
                </button>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 touch-manipulation min-h-[44px]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`min-h-screen transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        {/* Top Bar */}
        <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 lg:px-8 py-4 transition-colors">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden lg:block p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors touch-manipulation min-h-[44px] min-w-[44px]"
                title={sidebarOpen ? 'Collapse Sidebar' : 'Expand Sidebar'}
              >
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {sidebarOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  )}
                </svg>
              </button>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white ml-12 lg:ml-0">Admin Dashboard</h2>
            </div>
            <div className="flex items-center space-x-2">
              <span className="hidden sm:inline-block text-sm text-gray-600 dark:text-gray-400">Welcome back!</span>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
