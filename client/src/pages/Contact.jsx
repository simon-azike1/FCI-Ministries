import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import contactService from '../services/contactService';

function Contact() {
  const { t, i18n } = useTranslation();

  // Force re-render when language changes
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };
    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
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
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactService.submit(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative text-white h-[80vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/fci_family.jpg"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Decorative SVG Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <motion.div
          className="container mx-auto px-4 relative z-10 max-w-4xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
            className="inline-block mb-6"
          >
            {/* <span className="text-6xl">✉️</span> */}
          </motion.div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-serif drop-shadow-lg">{t('contact.title')}</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto mb-6 drop-shadow-md">{t('contact.subtitle')}</p>

          <motion.p
            className="text-base md:text-lg opacity-90 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('contact.getInTouchText')}
          </motion.p>

          {/* Quick Contact Links */}
          <motion.div
            className="flex flex-wrap justify-center gap-6 mt-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* <div className="flex items-center gap-2 text-base md:text-lg">
              <span className="text-2xl">📍</span>
              <span className="opacity-90">123 Church Street, Casablanca</span>
            </div> */}
            {/* <div className="flex items-center gap-2 text-base md:text-lg">
              <span className="text-2xl">📞</span>
              <span className="opacity-90">+212 XXX XX XX XX</span>
            </div> */}
            {/* <div className="flex items-center gap-2 text-base md:text-lg">
              <span className="text-2xl">⏰</span>
              <span className="opacity-90">Mon-Fri: 9AM - 5PM</span>
            </div> */}
          </motion.div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-gray-100 relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeInUp}
            >
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl"></div>

              <div className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="inline-block mb-4"
                  >
                    {/* <span className="text-5xl">✉️</span> */}
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 font-serif">
                    {t('contact.sendMessage')}
                  </h2>
                  <p className="text-gray-600">{t('contact.formSubtitle')}</p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                  >
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {/* <span className="text-primary">👤</span> */}
                      {t('contact.name')} {t('contact.required')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-300 min-h-[44px]"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </motion.div>

                  {/* Email Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {/* <span className="text-primary">📧</span> */}
                      {t('contact.email')} {t('contact.required')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-300 min-h-[44px]"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </motion.div>

                  {/* Phone Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                  >
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {/* <span className="text-primary">📱</span> */}
                      {t('contact.phone')}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-300 min-h-[44px]"
                      placeholder={t('contact.phonePlaceholder')}
                    />
                  </motion.div>

                  {/* Subject Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                  >
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {/* <span className="text-primary">📝</span> */}
                      {t('contact.subject')} {t('contact.required')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-300 min-h-[44px]"
                      placeholder={t('contact.subjectPlaceholder')}
                    />
                  </motion.div>

                  {/* Message Field */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      {/* <span className="text-primary">💬</span> */}
                      {t('contact.message')} {t('contact.required')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="5"
                      maxLength="500"
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent focus:bg-white transition-all duration-300 resize-none"
                      placeholder={t('contact.messagePlaceholder')}
                    ></textarea>
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {formData.message.length} / 500 characters
                    </div>
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-gradient-to-r from-primary to-orange-600 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group touch-manipulation min-h-[44px]"
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={false}
                      ></motion.div>

                      <span className="relative z-10 flex items-center justify-center gap-2">
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="inline-block"
                            >
                              ⏳
                            </motion.span>
                            {t('contact.sending')}
                          </>
                        ) : (
                          <>
                            {t('contact.send')}
                            <motion.span
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              →
                            </motion.span>
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.div>

                  {/* Success/Error Messages */}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-green-50 border-2 border-green-200 rounded-xl text-green-700 text-center flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">✅</span>
                      <span className="font-semibold">{t('contact.successMessage')}</span>
                    </motion.div>
                  )}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-center flex items-center justify-center gap-2"
                    >
                      <span className="text-2xl">❌</span>
                      <span className="font-semibold">{error}</span>
                    </motion.div>
                  )}
                </form>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  className="mt-8 pt-6 border-t border-gray-200 text-center"
                >
                  <p className="text-sm text-gray-600 mb-3">
                    {t('contact.privacyText')}
                  </p>
                  <div className="flex justify-center gap-6 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      {t('contact.secure')}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      {t('contact.encrypted')}
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="text-green-500">✓</span>
                      {t('contact.private')}
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              className="space-y-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp}>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">{t('contact.getInTouch')}</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  {t('contact.getInTouchText')}
                </p>
              </motion.div>

              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                variants={staggerContainer}
              >
                {/* Address */}
                <motion.div
                  className="bg-gray-50 p-6 rounded-lg transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ y: -5, backgroundColor: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {/* 📍 */}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('contact.visitUs')}</h3>
                  <p className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                    {t('contact.address')}
                  </p>
                </motion.div>

                {/* Email */}
                <motion.div
                  className="bg-gray-50 p-6 rounded-lg transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ y: -5, backgroundColor: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {/* 📧 */}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('contact.emailUs')}</h3>
                  <a href="mailto:info@fciministries.ma" className="text-primary hover:text-orange-600 transition-colors">
                    info@fciministries.ma
                  </a>
                </motion.div>

                {/* Phone */}
                <motion.div
                  className="bg-gray-50 p-6 rounded-lg transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ y: -5, backgroundColor: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {/* 📱 */}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('contact.callUs')}</h3>
                  <a href="tel:+212600000000" className="text-primary hover:text-orange-600 transition-colors">
                    +212 6XX XX XX XX
                  </a>
                </motion.div>

                {/* Office Hours */}
                <motion.div
                  className="bg-gray-50 p-6 rounded-lg transition-all duration-300"
                  variants={scaleIn}
                  whileHover={{ y: -5, backgroundColor: '#ffffff', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                >
                  <motion.div
                    className="text-4xl mb-3"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                  >
                    {/* 🕐 */}
                  </motion.div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t('contact.officeHours')}</h3>
                  <p className="text-gray-600" style={{ whiteSpace: 'pre-line' }}>
                    {t('contact.officeHoursText')}
                  </p>
                </motion.div>
              </motion.div>

              {/* Social Media */}
              <motion.div
                className="bg-gradient-to-br from-primary to-orange-600 p-8 rounded-lg text-white relative overflow-hidden"
                variants={fadeInUp}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4">{t('contact.connectWithUs')}</h3>
                  <p className="mb-6 opacity-95">{t('contact.socialText')}</p>
                  <div className="flex space-x-4">
                    <motion.a
                      href="#"
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl"
                      aria-label="Facebook"
                      whileHover={{ scale: 1.2, rotate: 5, backgroundColor: 'rgba(255,255,255,0.3)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      📘
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl"
                      aria-label="Instagram"
                      whileHover={{ scale: 1.2, rotate: 5, backgroundColor: 'rgba(255,255,255,0.3)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      📷
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl"
                      aria-label="YouTube"
                      whileHover={{ scale: 1.2, rotate: 5, backgroundColor: 'rgba(255,255,255,0.3)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ▶️
                    </motion.a>
                    <motion.a
                      href="#"
                      className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl"
                      aria-label="Twitter"
                      whileHover={{ scale: 1.2, rotate: 5, backgroundColor: 'rgba(255,255,255,0.3)' }}
                      whileTap={{ scale: 0.9 }}
                    >
                      🐦
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 font-serif"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {t('contact.findUs')}
          </motion.h2>
          <motion.div
            className="rounded-2xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
              <div className="text-center">
                <p className="text-6xl mb-4">🗺️</p>
                <p className="text-gray-600 text-lg font-semibold">{t('contact.mapComingSoon')}</p>
                <p className="text-gray-500 text-sm mt-2">{t('contact.mapLocation')}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
