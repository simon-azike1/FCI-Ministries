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

  const slideInLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  };

  const opportunities = [
    {
      id: 'volunteer',
      titleKey: 'getInvolved.opportunities.volunteer.title',
      descKey: 'getInvolved.opportunities.volunteer.description',
      // icon: '🤝',
      color: '#FF7700',
      options: [
        'Worship Team (Music & Tech)',
        'Children & Youth Ministry',
        'Hospitality & Welcome Team',
        'Prayer Team',
        'Media & Creative',
        'Community Outreach'
      ]
    },
    {
      id: 'small-groups',
      titleKey: 'getInvolved.opportunities.smallGroups.title',
      descKey: 'getInvolved.opportunities.smallGroups.description',
      // icon: '👥',
      color: '#4ECDC4',
      options: [
        'Bible Study Groups',
        'Prayer Groups',
        'Men\'s Groups',
        'Women\'s Groups',
        'Young Adults',
        'Couples & Families'
      ]
    },
    {
      id: 'ministry',
      titleKey: 'getInvolved.opportunities.ministry.title',
      descKey: 'getInvolved.opportunities.ministry.description',
      // icon: '⭐',
      color: '#95E1D3',
      options: [
        'Teaching & Discipleship',
        'Counseling & Care',
        'Administration',
        'Missions & Evangelism',
        'Special Events',
        'Maintenance & Operations'
      ]
    },
    {
      id: 'leadership',
      titleKey: 'getInvolved.opportunities.leadership.title',
      descKey: 'getInvolved.opportunities.leadership.description',
      // icon: '🎯',
      color: '#FFE66D',
      options: [
        'Leadership Training',
        'Mentorship Program',
        'Ministry Internship',
        'Bible School',
        'Coaching & Development'
      ]
    }
  ];

  const nextSteps = [
    {
      step: 1,
      titleKey: 'getInvolved.steps.connect.title',
      descKey: 'getInvolved.steps.connect.description',
    },
    {
      step: 2,
      titleKey: 'getInvolved.steps.discover.title',
      descKey: 'getInvolved.steps.discover.description',
    },
    {
      step: 3,
      titleKey: 'getInvolved.steps.engage.title',
      descKey: 'getInvolved.steps.engage.description',
    },
    {
      step: 4,
      titleKey: 'getInvolved.steps.grow.title',
      descKey: 'getInvolved.steps.grow.description',
    }
  ];

  return (
    <div className="min-h-screen">
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
                  className="inline-block px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl text-center"
                >
                  {t('getInvolved.getStarted')} →
                </Link>
                <Link
                  to="/ministries"
                  className="inline-block px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-orange-600 transition-all duration-300 text-center"
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">{t('getInvolved.waysToServe')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t('getInvolved.waysSubtitle')}</p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {opportunities.map((opportunity, index) => (
              <motion.div
                key={opportunity.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-100"
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                transition={{ duration: 0.5 }}
                whileHover={{ y: -3 }}
              >
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Title Section */}
                  <div
                    className="p-6 flex flex-col justify-center text-white"
                    style={{ background: `linear-gradient(135deg, ${opportunity.color}, ${opportunity.color}dd)` }}
                  >
                    <h3 className="text-2xl font-bold mb-2">{t(opportunity.titleKey)}</h3>
                    <p className="text-white/90 text-sm">{t(opportunity.descKey)}</p>
                  </div>

                  {/* Options List */}
                  <div className="md:col-span-2 p-6 flex flex-col justify-center">
                    <div className="grid sm:grid-cols-2 gap-2">
                      {opportunity.options.map((option, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded hover:bg-gray-50 transition-colors"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <div
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: opportunity.color }}
                          ></div>
                          <span className="text-gray-700 text-sm font-medium">{option}</span>
                        </motion.div>
                      ))}
                    </div>
                    <motion.button
                      className="mt-4 px-5 py-2 text-white text-sm font-bold rounded-lg self-start"
                      style={{ background: opportunity.color }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {t('getInvolved.learnMore')}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Next Steps - Timeline Style */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">{t('getInvolved.yourJourney')}</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">{t('getInvolved.journeySubtitle')}</p>
          </motion.div>

          <motion.div
            className="max-w-4xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {nextSteps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative flex gap-6 mb-8 last:mb-0"
                variants={fadeInUp}
                transition={{ duration: 0.5 }}
              >
                {/* Timeline line */}
                {index < nextSteps.length - 1 && (
                  <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary to-orange-400"></div>
                )}

                {/* Step number circle */}
                <motion.div
                  className="relative z-10 flex-shrink-0"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-orange-500 text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {step.step}
                  </div>
                </motion.div>

                {/* Content card */}
                <motion.div
                  className="flex-1 bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                  whileHover={{ x: 5, backgroundColor: "#fafafa" }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{t(step.titleKey)}</h3>
                  <p className="text-gray-600">{t(step.descKey)}</p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials - Card Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 font-serif"
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
                className="relative bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-t-4"
                style={{ borderColor: testimonial.color }}
                variants={scaleIn}
                whileHover={{ y: -5 }}
              >
                <div className="text-4xl mb-3 opacity-20">"</div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">
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
                    <div className="font-bold text-gray-900 text-sm">{testimonial.name}</div>
                    <div className="text-xs text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section - Split background */}
      <section className="relative bg-gradient-to-r from-primary to-orange-500 text-white overflow-hidden">
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
              className="text-4xl md:text-5xl font-bold mb-6 font-serif"
              variants={fadeInUp}
            >
              {t('getInvolved.readyTitle')}
            </motion.h2>
            <motion.p
              className="text-xl mb-10 opacity-95 leading-relaxed"
              variants={fadeInUp}
            >
              {t('getInvolved.readyText')}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              variants={fadeInUp}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-block px-10 py-4 bg-white text-primary text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  {t('getInvolved.contactUs')}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/events"
                  className="inline-block px-10 py-4 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-primary transition-all duration-300"
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
