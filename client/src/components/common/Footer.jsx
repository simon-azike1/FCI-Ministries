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
    { icon: '📘', label: 'Facebook', url: '#', color: 'hover:text-blue-400' },
    { icon: '📷', label: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: '📹', label: 'YouTube', url: '#', color: 'hover:text-red-400' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Ministries', path: '/ministries' },
    { name: 'Events', path: '/events' },
    { name: 'Sermons', path: '/sermons' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-secondary text-white relative overflow-hidden">
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
            <div className="flex gap-4 mb-8">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  className={`text-3xl ${social.color} transition-all duration-300 hover:scale-125`}
                  whileHover={{ y: -5, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700 hover:border-primary/50 transition-colors duration-300">
              <h5 className="font-semibold mb-3 text-sm">📬 Stay Updated</h5>
              <p className="text-gray-400 text-xs mb-4">Subscribe to our newsletter for updates and events.</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm focus:outline-none focus:border-primary transition-colors duration-300"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-primary hover:bg-orange-600 rounded-lg font-semibold text-sm transition-colors duration-300"
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
