import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

function GetInvolved() {
  const { t } = useTranslation();
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
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

  const opportunities = [
    {
      id: 'volunteer',
      titleKey: 'getInvolved.opportunities.volunteer.title',
      descKey: 'getInvolved.opportunities.volunteer.description',
      icon: '🤝',
      color: '#FF7700',
      highlights: [
        'Worship & Tech',
        'Children Ministry',
        'Welcome Team'
      ]
    },
    {
      id: 'small-groups',
      titleKey: 'getInvolved.opportunities.smallGroups.title',
      descKey: 'getInvolved.opportunities.smallGroups.description',
      icon: '👥',
      color: '#4ECDC4',
      highlights: [
        'Bible Study',
        'Prayer Groups',
        'Fellowship'
      ]
    },
    {
      id: 'ministry',
      titleKey: 'getInvolved.opportunities.ministry.title',
      descKey: 'getInvolved.opportunities.ministry.description',
      icon: '⭐',
      color: '#95E1D3',
      highlights: [
        'Teaching',
        'Counseling',
        'Missions'
      ]
    },
    {
      id: 'leadership',
      titleKey: 'getInvolved.opportunities.leadership.title',
      descKey: 'getInvolved.opportunities.leadership.description',
      icon: '🎯',
      color: '#FFE66D',
      highlights: [
        'Training',
        'Mentorship',
        'Internship'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section - Full width with background image */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/fci_leadership.jpg"
            alt="Get Involved"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/50"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[500px] py-20">
            {/* Left side - Text content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="text-left"
            >
              <motion.h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif leading-tight"
                variants={fadeInUp}
              >
                {t('getInvolved.title')}
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed"
                variants={fadeInUp}
              >
                {t('getInvolved.subtitle')}
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-orange-600 transition-all duration-300 shadow-xl text-center"
                >
                  {t('getInvolved.getStarted')} →
                </Link>
                <Link
                  to="/ministries"
                  className="inline-block px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white dark:bg-gray-800 hover:text-orange-600 transition-all duration-300 text-center"
                >
                  {t('getInvolved.viewMinistries')}
                </Link>
              </motion.div>
            </motion.div>

            {/* Right side - Empty for background image visibility */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Opportunities Section - Horizontal Cards */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 font-serif">{t('getInvolved.waysToServe')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">{t('getInvolved.waysSubtitle')}</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {opportunities.map((opportunity) => (
              <motion.div
                key={opportunity.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border-t-4"
                style={{ borderColor: opportunity.color }}
                variants={scaleIn}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -5 }}
              >
                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 text-center">
                    {t(opportunity.titleKey)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 text-center line-clamp-2">
                    {t(opportunity.descKey)}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-4">
                    {opportunity.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: opportunity.color }}
                        ></div>
                        <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Button */}
                  <motion.button
                    className="w-full py-2.5 text-white text-sm font-bold rounded-lg transition-opacity"
                    style={{ background: opportunity.color }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {t('getInvolved.learnMore')}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Card Grid */}
      <section className="py-20 bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-4 font-serif"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            {t('getInvolved.storiesTitle')}
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-24 h-1 bg-primary mx-auto mb-16"
          ></motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                quoteKey: "getInvolved.testimonials.blessing",
                name: "Blessing",
                role: "Children Ministries",
                color: "#FF6B6B"
              },
              {
                quoteKey: "getInvolved.testimonials.gradi",
                name: "Gradi",
                role: "Choir",
                color: "#4ECDC4"
              },
              {
                quoteKey: "getInvolved.testimonials.simon",
                name: "Simon A",
                role: "Media",
                color: "#95E1D3"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="relative bg-gradient-to-br from-gray-50 to-white dark:from-gray-700 dark:to-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-t-4"
                style={{ borderColor: testimonial.color }}
                variants={scaleIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3 opacity-20">"</div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4 leading-relaxed">
                  {t(testimonial.quoteKey)}
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                    style={{ background: testimonial.color }}
                  >
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Split background */}
      <section className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black dark:from-gray-950 dark:to-black text-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 font-serif text-white"
              variants={fadeInUp}
            >
              Start Your Journey Today
            </motion.h2>
            <motion.p
              className="text-xl mb-10 opacity-95 leading-relaxed text-white"
              variants={fadeInUp}
            >
              Join us in making a difference. Whether you're looking to serve, connect, or grow in faith, there's a place for you at FCI Ministries.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-block px-10 py-4 bg-white text-gray-900 text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/events"
                  className="inline-block px-10 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white text-lg font-bold rounded-full hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                >
                  {t('getInvolved.viewEvents')}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default GetInvolved;
