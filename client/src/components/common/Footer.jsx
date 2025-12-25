import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const socialLinks = [
    {
      name: 'Facebook',
      label: 'Facebook',
      url: '#',
      color: 'bg-blue-600 hover:bg-blue-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      label: 'Instagram',
      url: '#',
      color: 'bg-pink-600 hover:bg-pink-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      label: 'YouTube',
      url: '#',
      color: 'bg-red-600 hover:bg-red-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Podcast',
      label: 'Podcast',
      url: '#',
      color: 'bg-purple-600 hover:bg-purple-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182c5.423 0 9.818 4.395 9.818 9.818 0 5.423-4.395 9.818-9.818 9.818-5.423 0-9.818-4.395-9.818-9.818 0-5.423 4.395-9.818 9.818-9.818zM12 5.455c-3.614 0-6.545 2.931-6.545 6.545 0 2.388 1.278 4.478 3.182 5.627v-3.445c-.91-.793-1.455-1.95-1.455-3.182 0-2.408 1.955-4.364 4.364-4.364s4.364 1.956 4.364 4.364c0 1.232-.545 2.389-1.455 3.182v3.445c1.904-1.149 3.182-3.239 3.182-5.627 0-3.614-2.931-6.545-6.545-6.545zm0 4.364c-1.204 0-2.182.978-2.182 2.181s.978 2.182 2.182 2.182 2.182-.979 2.182-2.182-.978-2.181-2.182-2.181zm-1.091 5.236v4.8c.346.095.707.145 1.091.145.384 0 .745-.05 1.091-.145v-4.8c-.338.145-.708.236-1.091.236s-.753-.091-1.091-.236z"/>
        </svg>
      )
    },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Events', path: '/events' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-secondary dark:from-black dark:via-gray-950 dark:to-gray-900 text-white relative overflow-hidden transition-colors">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Footer Content */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {/* Brand Section */}
          <motion.div variants={fadeInUp}>
            <div className="mb-4">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
                FCI Ministries
              </h3>
              <p className="text-primary font-semibold text-sm">Morocco</p>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              A community of faith, hope, and love. Building disciples and transforming lives through the Gospel of Jesus Christ.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-orange-400 font-semibold transition-colors duration-300 group"
              >
                <span>Learn More</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">▸</span>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">▸</span>
              {t('footer.contact') || 'Contact'}
            </h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📍</span>
                <div>
                  <p className="font-semibold text-sm text-gray-400 mb-1">{t('footer.address') || 'Address'}</p>
                  <p className="text-gray-300">
                    Casablanca, Morocco
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">✉️</span>
                <div>
                  <p className="font-semibold text-sm text-gray-400 mb-1">{t('footer.email') || 'Email'}</p>
                  <a 
                    href="mailto:info@fciministries.com" 
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    info@fciministries.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3 group">
                <span className="text-2xl group-hover:scale-110 transition-transform duration-300">📞</span>
                <div>
                  <p className="font-semibold text-sm text-gray-400 mb-1">Phone</p>
                  <a 
                    href="tel:+212123456789" 
                    className="text-gray-300 hover:text-primary transition-colors duration-300"
                  >
                    +212 123 456 789
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social & Newsletter */}
          <motion.div variants={fadeInUp}>
            <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">▸</span>
              {t('footer.followUs') || 'Follow Us'}
            </h4>
            <div className="flex flex-wrap gap-2 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className={`${social.color} px-3 py-2 rounded-lg text-white font-medium text-xs sm:text-sm transition-all duration-300 shadow-lg`}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.name}
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 dark:from-black/60 dark:to-gray-950/60 backdrop-blur-sm p-6 rounded-xl border border-gray-700 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 shadow-lg">
              <h5 className="font-bold mb-2 text-base text-white flex items-center gap-2">
                <span className="text-xl">✉️</span>
                Stay Updated
              </h5>
              <p className="text-gray-300 dark:text-gray-400 text-xs mb-4">Subscribe to our newsletter for updates and events.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 bg-gray-900/80 dark:bg-black/80 border border-gray-600 dark:border-gray-700 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2.5 bg-primary hover:bg-orange-600 rounded-lg font-bold text-white text-sm transition-colors duration-300 shadow-md"
                  aria-label="Subscribe"
                >
                  →
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="border-t border-gray-700"></div>

        {/* Bottom Bar */}
        <motion.div 
          className="py-8 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <p className="text-gray-400 text-sm text-center md:text-left">
            © {currentYear} FCI Ministries. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-gray-400 hover:text-primary transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-primary transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Decorative Bottom Border */}
      <div className="h-1 bg-gradient-to-r from-primary via-orange-500 to-primary"></div>
    </footer>
  );
}

export default Footer;
