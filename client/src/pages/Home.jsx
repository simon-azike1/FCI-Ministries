import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import eventService from '../services/eventService';
import sermonService from '../services/sermonService';

function Home() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentSermons, setRecentSermons] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchUpcomingEvents();
    fetchRecentSermons();
  }, []);

  const fetchUpcomingEvents = async () => {
    try {
      const response = await eventService.getUpcoming(3);
      setUpcomingEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchRecentSermons = async () => {
    try {
      const response = await sermonService.getLatest(3);
      setRecentSermons(response.data.data || []);
    } catch (error) {
      console.error('Error fetching sermons:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatEventDate = (date) => {
    const eventDate = new Date(date);
    return new Intl.DateTimeFormat('en', {
      month: 'short',
      day: 'numeric',
    }).format(eventDate);
  };

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
        staggerChildren: 0.2
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

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-80px)] h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/fci image.JPG")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div
          className="relative z-10 text-center text-white px-4 sm:px-6 py-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 font-serif leading-tight"
            variants={fadeInUp}
          >
            {t('homeExtended.welcomeToFCI')}
          </motion.h1>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 opacity-95 max-w-4xl mx-auto px-4"
            variants={fadeInUp}
          >
            {t('homeExtended.communitySubtitle')}
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/events"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white text-base sm:text-lg font-bold rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-2xl touch-manipulation min-h-[44px]"
            >
              {t('homeExtended.joinSunday')}
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Service Times Section */}
<section className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 relative overflow-hidden transition-colors">
  {/* Animated Background Elements */}
  <motion.div 
    className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  ></motion.div>
  <motion.div 
    className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300/10 rounded-full blur-3xl"
    animate={{
      scale: [1, 1.3, 1],
      opacity: [0.2, 0.4, 0.2],
    }}
    transition={{
      duration: 10,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  ></motion.div>

  <div className="container mx-auto px-4 relative z-10">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeInUp}
      className="text-center mb-16"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="inline-block mb-4"
      >
        {/* <span className="text-6xl">🕐</span> */}
      </motion.div>
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 font-serif">
        {t('homeExtended.serviceTimes')}
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 text-lg">{t('homeExtended.serviceTimesSubtitle')}</p>
    </motion.div>

    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      {/* Sunday Service Card */}
      <motion.div
        className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl text-center shadow-lg border-2 border-transparent dark:border-gray-700 overflow-hidden"
        variants={scaleIn}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        {/* Gradient Background on Hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        ></motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div 
            className="text-7xl mb-6 filter drop-shadow-lg"
            whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
          >
            {/* ⛪ */}
          </motion.div>
          <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">
            {t('homeExtended.sundayService')}
          </h3>
          <div className="h-1 w-16 bg-primary group-hover:bg-white mx-auto mb-4 transition-colors duration-300"></div>
          <p className="text-2xl font-semibold text-primary dark:text-orange-400 group-hover:text-white transition-colors duration-300 mb-2">
            {t('homeExtended.sundayTime')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors duration-300">
            {t('homeExtended.sundayDesc')}
          </p>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 group-hover:bg-white/20 rounded-bl-full transition-colors duration-300"></div>
      </motion.div>

      {/* Prayer Meeting Card */}
      <motion.div
        className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl text-center shadow-lg border-2 border-transparent dark:border-gray-700 hover:border-orange-600 overflow-hidden"
        variants={scaleIn}
        whileHover={{ y: -8, transition: { duration: 0.3 } }}
      >
        {/* Gradient Background on Hover */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-orange-600 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          initial={false}
        ></motion.div>
        
        {/* Content */}
        <div className="relative z-10">
          <motion.div 
            className="text-7xl mb-6 filter drop-shadow-lg"
            whileHover={{ scale: [1, 1.2, 1], transition: { duration: 0.5 } }}
          >
            {/* 🙏 */}
          </motion.div>
          <h3 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300">
            {t('homeExtended.prayerMeeting')}
          </h3>
          <div className="h-1 w-16 bg-orange-600 dark:bg-orange-400 group-hover:bg-white mx-auto mb-4 transition-colors duration-300"></div>
          <p className="text-2xl font-semibold text-orange-600 dark:text-orange-400 group-hover:text-white transition-colors duration-300 mb-2">
            {t('homeExtended.prayerTime')}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300 group-hover:text-white/90 transition-colors duration-300">
            {t('homeExtended.prayerDesc')}
          </p>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-orange-600/10 group-hover:bg-white/20 rounded-bl-full transition-colors duration-300"></div>
      </motion.div>
    </motion.div>

    {/* Additional Info */}
    <motion.div
      className="mt-12 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      {/* <p className="text-gray-600 mb-4">
        <span className="inline-block mr-2">📍</span>
        <span className="font-medium">FCI Ministries, Morocco</span>
      </p> */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 text-primary dark:text-orange-400 hover:text-orange-600 dark:hover:text-orange-300 font-semibold transition-colors duration-300"
        >
          <span>{t('homeExtended.needDirections')}</span>
          <motion.span
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  </div>
</section>


      {/* Welcome Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-serif"
              variants={fadeInUp}
            >
              {t('homeExtended.welcomeHome')}
            </motion.h2>
            <motion.div
              className="w-24 h-1 bg-primary mx-auto mb-8"
              variants={scaleIn}
            ></motion.div>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6"
              variants={fadeInUp}
            >
              {t('homeExtended.welcomeText1')}
            </motion.p>
            <motion.p
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
              variants={fadeInUp}
            >
              {t('homeExtended.welcomeText2')}
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/about"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary to-orange-600 text-white text-base sm:text-lg font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300 touch-manipulation min-h-[44px]"
              >
                {t('homeExtended.learnMoreAbout')}
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {!loading && upcomingEvents.length > 0 && (
        <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
          <div className="container mx-auto px-4">
            <motion.div
              className="flex justify-between items-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif">{t('homeExtended.upcomingEvents')}</h2>
              <Link
                to="/events"
                className="text-primary dark:text-orange-400 font-semibold hover:text-orange-600 dark:hover:text-orange-300 transition-colors text-lg"
              >
                {t('homeExtended.viewAll')}
              </Link>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event._id}
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <Link
                    to="/events"
                    className="block bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-primary to-orange-600">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-4xl font-bold">{formatEventDate(event.date).split(' ')[1]}</div>
                          <div className="text-xl uppercase">{formatEventDate(event.date).split(' ')[0]}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{event.title?.[currentLang] || event.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2">{event.description?.[currentLang] || event.description}</p>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <span className="mr-2">📍</span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Recent Sermons Section */}
      {!loading && recentSermons.length > 0 && (
        <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex justify-between items-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white font-serif">{t('homeExtended.recentSermons')}</h2>
              <Link
                to="/sermons"
                className="text-primary dark:text-orange-400 font-semibold hover:text-orange-600 dark:hover:text-orange-300 transition-colors text-lg"
              >
                {t('homeExtended.viewAll')}
              </Link>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {recentSermons.map((sermon) => (
                <motion.div
                  key={sermon._id}
                  className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{sermon.title?.[currentLang] || sermon.title}</h3>
                  <p className="text-primary dark:text-orange-400 font-semibold mb-2">{sermon.speaker}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{sermon.description?.[currentLang] || sermon.description}</p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(sermon.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Ministries Preview */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 font-serif">
              {t('homeExtended.getInvolved')}
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-300 text-lg mb-12">
              {t('homeExtended.getInvolvedSubtitle')}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { image: '/fci_child.jpg', titleKey: 'childrenMinistry', descKey: 'childrenDesc' },
              { image: '/fci_choir.jpg', titleKey: 'worshipTeam', descKey: 'worshipDesc' },
              { image: '/fci_family.jpg', titleKey: 'outreach', descKey: 'outreachDesc' }
            ].map((ministry, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                variants={scaleIn}
                whileHover={{
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Ministry Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={ministry.image}
                    alt={t(`homeExtended.${ministry.titleKey}`)}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                {/* Ministry Content */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{t(`homeExtended.${ministry.titleKey}`)}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t(`homeExtended.${ministry.descKey}`)}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <Link
              to="/ministries"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-primary hover:text-white text-black text-base sm:text-lg font-bold rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg touch-manipulation min-h-[44px]"
            >
              {t('homeExtended.exploreMinistries')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-800 via-gray-900 to-black dark:from-gray-950 dark:to-black text-white text-center overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <motion.div
          className="container mx-auto px-4 relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6 font-serif text-white"
            variants={fadeInUp}
          >
            {t('homeExtended.readyNextStep')}
          </motion.h2>
          <motion.p
            className="text-xl mb-8 opacity-95 max-w-3xl mx-auto text-white"
            variants={fadeInUp}
          >
            {t('homeExtended.readyNextStepText')}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/events"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-900 text-base sm:text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl touch-manipulation min-h-[44px]"
              >
                {t('homeExtended.planVisit')}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-base sm:text-lg font-bold rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300 touch-manipulation min-h-[44px]"
              >
                {t('homeExtended.contactUs')}
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
