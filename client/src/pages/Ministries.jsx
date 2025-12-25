import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import ministryService from '../services/ministryService';

function Ministries() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    fetchMinistries();
  }, []);

  const fetchMinistries = async () => {
    try {
      setLoading(true);
      const response = await ministryService.getAll();
      setMinistries(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching ministries:', err);
      // Fallback to hardcoded data if API fails
      setMinistries(hardcodedMinistries);
    } finally {
      setLoading(false);
    }
  };

  // Color scheme for ministries
  const colors = [
    '#FF6B6B', '#4ECDC4', '#95E1D3', '#FFE66D',
    '#FF8C42', '#E85D75', '#1A535C', '#C1666B'
  ];

  const hardcodedMinistries = [
    {
      id: 'children',
      name: "Children's Ministry",
      description: "Building strong foundations in children through Bible teaching, worship, and fun activities. We provide a safe and nurturing environment for children ages 0-12 to learn about God's love.",
      icon: '👶',
      leader: 'Pastor Emily Chen',
      email: 'children@fciministries.ma',
      whatsapp: '+212 762-732631',
      schedule: 'Sundays 10:00 AM',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
      color: '#FF6B6B',
    },
    {
      id: 'youth',
      name: 'Youth Ministry',
      description: "Empowering young people ages 13-25 to live radically for Jesus. Weekly gatherings include worship, teaching, games, and authentic fellowship. We're building the next generation of leaders.",
      icon: '🎸',
      leader: 'Pastor Mark Williams',
      email: 'youth@fciministries.ma',
      whatsapp: '+212600000002',
      schedule: 'Fridays 7:00 PM',
      image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600',
      color: '#4ECDC4',
    },
    {
      id: 'worship',
      name: 'Worship Ministry',
      description: "Leading people into the presence of God through music and worship. We're always looking for singers, musicians, and technical volunteers to join our team.",
      icon: '🎵',
      leader: 'David Martinez',
      email: 'worship@fciministries.ma',
      whatsapp: '+212600000003',
      schedule: 'Practice: Wednesdays 7:00 PM',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600',
      color: '#95E1D3',
    },
    {
      id: 'prayer',
      name: 'Prayer Ministry',
      description: "Interceding for our church, community, and nation. Join us for weekly prayer meetings and be part of our 24/7 prayer chain. Prayer changes everything.",
      icon: '🙏',
      leader: 'Sister Grace Thompson',
      email: 'prayer@fciministries.ma',
      whatsapp: '+212600000004',
      schedule: 'Wednesdays 6:00 AM & 7:00 PM',
      image: 'https://images.unsplash.com/photo-1509266272358-7701da638078?w=600',
      color: '#FFE66D',
    },
    {
      id: 'outreach',
      name: 'Community Outreach',
      description: "Serving our community with the love of Christ through food drives, homeless outreach, prison ministry, and community programs. Love in action makes a difference.",
      icon: '❤️',
      leader: 'Pastor James Anderson',
      email: 'outreach@fciministries.ma',
      whatsapp: '+212600000005',
      schedule: 'Monthly: 3rd Saturday',
      image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600',
      color: '#FF8C42',
    },
    {
      id: 'women',
      name: "Women's Ministry",
      description: "Empowering women to grow in faith and fellowship. Monthly gatherings, Bible studies, conferences, and special events designed to encourage and equip women of all ages.",
      icon: '💐',
      leader: 'Sister Rachel Brown',
      email: 'women@fciministries.ma',
      whatsapp: '+212600000006',
      schedule: 'Monthly: 2nd Saturday 10:00 AM',
      image: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=600',
      color: '#E85D75',
    },
    {
      id: 'men',
      name: "Men's Ministry",
      description: "Equipping men to be godly leaders in their homes, workplaces, and communities. Bible studies, accountability groups, and fellowship activities for men of all ages.",
      icon: '💪',
      leader: 'Pastor Michael Brown',
      email: 'men@fciministries.ma',
      whatsapp: '+212600000007',
      schedule: 'Monthly: 1st Saturday 7:00 AM',
      image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600',
      color: '#1A535C',
    },
    {
      id: 'marriage',
      name: 'Marriage Ministry',
      description: "Strengthening marriages through biblical principles, couples' retreats, date nights, and counseling. Building strong families starts with strong marriages.",
      icon: '💑',
      leader: 'Pastor John & Sarah Smith',
      email: 'marriage@fciministries.ma',
      whatsapp: '+212600000008',
      schedule: 'Quarterly: Marriage Enrichment',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
      color: '#C1666B',
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="loader inline-block w-12 h-12 border-4 border-gray-200 dark:border-gray-700 border-t-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">{t('common.loading') || 'Loading...'}</p>
        </div>
      </div>
    );
  }

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
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

  const slideIn = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Background Image */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/fci_choir.jpg"
            alt="Ministries"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[400px] py-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-left"
            >
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif"
                variants={fadeInUp}
              >
                {t('ministries.title')}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl lg:text-2xl opacity-95"
                variants={fadeInUp}
              >
                {t('ministries.subtitle')}
              </motion.p>
            </motion.div>
            {/* Right side - Empty for background image visibility */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{t('ministries.intro')}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {t('ministries.introText')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries - Card Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {ministries.map((ministry, index) => {
              const ministryName = ministry.name?.[currentLang] || ministry.name?.en || ministry.name;
              const ministryDesc = ministry.description?.[currentLang] || ministry.description?.en || ministry.description;
              const ministrySchedule = ministry.meetingTime?.[currentLang] || ministry.meetingTime?.en || ministry.schedule;
              const ministryEmail = ministry.contactEmail || ministry.email;
              const ministryWhatsApp = ministry.contactPhone || ministry.whatsapp || ministry.contactWhatsApp;
              const color = colors[index % colors.length];

              // Create WhatsApp link with pre-filled message
              const whatsappMessage = `Hello! I'm interested in joining the ${ministryName}. I would like to learn more about how I can get involved.`;
              const cleanPhoneNumber = ministryWhatsApp ? ministryWhatsApp.replace(/[^0-9]/g, '') : null;
              const whatsappLink = cleanPhoneNumber
                ? `https://wa.me/${cleanPhoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
                : null;

              // Handle WhatsApp click
              const handleWhatsAppClick = (e) => {
                e.preventDefault();
                console.log('=== WhatsApp Button Clicked ===');
                console.log('Ministry:', ministryName);
                console.log('Raw Phone Number:', ministryWhatsApp);
                console.log('Clean Phone:', cleanPhoneNumber);
                console.log('Full WhatsApp Link:', whatsappLink);

                if (whatsappLink) {
                  console.log('Opening WhatsApp...');
                  const opened = window.open(whatsappLink, '_blank', 'noopener,noreferrer');
                  if (!opened) {
                    console.error('Failed to open WhatsApp - popup might be blocked');
                    // Fallback: try direct navigation
                    window.location.href = whatsappLink;
                  }
                } else {
                  console.error('No WhatsApp link available for this ministry');
                  alert('WhatsApp contact not available for this ministry');
                }
              }

              return (
                <motion.div
                  key={ministry._id || ministry.id}
                  className="bg-white dark:bg-gray-800 dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                  variants={slideIn}
                  whileHover={{ y: -5 }}
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={ministry.image}
                      alt={ministryName}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-white text-xs font-bold"
                      style={{ background: color }}
                    >
                      {ministryName}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="mb-4">
                      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
                        {ministryDesc}
                      </p>
                    </div>

                    {/* Leader Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold min-w-[60px]">{t('ministries.leader')}:</span>
                        <span className="text-gray-900 dark:text-white text-xs font-medium">{ministry.leader}</span>
                      </div>
                      {ministrySchedule && (
                        <div className="flex items-start gap-2">
                          <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold min-w-[60px]">{t('ministries.schedule')}:</span>
                          <span className="text-gray-900 dark:text-white text-xs font-medium">{ministrySchedule}</span>
                        </div>
                      )}
                      <div className="flex items-start gap-2">
                        <span className="text-gray-500 dark:text-gray-400 text-xs font-semibold min-w-[60px]">Email:</span>
                        <a
                          href={`mailto:${ministryEmail}`}
                          className="text-primary text-xs hover:underline"
                        >
                          {ministryEmail}
                        </a>
                      </div>
                    </div>

                    {/* Button */}
                    <button
                      onClick={handleWhatsAppClick}
                      className="w-full py-2.5 text-white text-sm font-bold rounded-lg hover:opacity-90 transition-opacity cursor-pointer relative z-10"
                      style={{ background: color }}
                      type="button"
                    >
                      {t('ministries.getInvolved')}
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white dark:bg-gray-900 text-center transition-colors">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-gray-900 dark:text-white">{t('ministries.readyToServe')}</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              {t('ministries.readyText')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-involved" className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-orange-500 hover:text-black text-white text-base sm:text-lg font-bold rounded-full hover:bg-white dark:bg-gray-800 hover:scale-105 transition-all duration-300 shadow-lg touch-manipulation min-h-[44px]">
                {t('ministries.getInvolved')}
              </Link>
              <Link to="/contact" className="inline-block px-6 sm:px-8 py-3 sm:py-4 border-2 border-black text-primary text-base sm:text-lg font-bold rounded-full hover:bg-black hover:text-white transition-all duration-300 touch-manipulation min-h-[44px]">
                {t('nav.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Ministries;
