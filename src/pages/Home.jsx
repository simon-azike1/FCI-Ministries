import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import eventService from '../services/eventService';
import sermonService from '../services/sermonService';

function Home() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [recentSermons, setRecentSermons] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/fci image.JPG")',
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        <motion.div 
          className="relative z-10 text-center text-white px-4"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 font-serif"
            variants={fadeInUp}
          >
            Welcome to FCI Ministries
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-95 max-w-4xl mx-auto"
            variants={fadeInUp}
          >
            A community of faith, hope, and love in Morocco
          </motion.p>
          <motion.div variants={fadeInUp}>
            <Link
              to="/events"
              className="inline-block px-8 py-4 bg-primary text-white text-lg font-bold rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Join Us This Sunday →
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Service Times Section */}
<section className="py-20 bg-gradient-to-b from-white via-orange-50/30 to-white relative overflow-hidden">
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
      <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">
        Service Times
      </h2> 
      <p className="text-center text-gray-600 text-lg">Join us in worship and fellowship</p>
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
        className="group relative bg-white p-8 rounded-2xl text-center shadow-lg border-2 border-transparent  overflow-hidden"
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
          <h3 className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
            Sunday Service
          </h3>
          <div className="h-1 w-16 bg-primary group-hover:bg-white mx-auto mb-4 transition-colors duration-300"></div>
          <p className="text-2xl font-semibold text-primary group-hover:text-white transition-colors duration-300 mb-2">
            12:00 PM - 2:00 PM
          </p>
          <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300">
            Every Sunday Morning
          </p>
        </div>

        {/* Decorative Corner */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 group-hover:bg-white/20 rounded-bl-full transition-colors duration-300"></div>
      </motion.div>

      {/* Prayer Meeting Card */}
      <motion.div 
        className="group relative bg-white p-8 rounded-2xl text-center shadow-lg border-2 border-transparent hover:border-orange-600 overflow-hidden"
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
          <h3 className="text-3xl font-bold mb-3 text-gray-900 group-hover:text-white transition-colors duration-300">
            Prayer Meeting
          </h3>
          <div className="h-1 w-16 bg-orange-600 group-hover:bg-white mx-auto mb-4 transition-colors duration-300"></div>
          <p className="text-2xl font-semibold text-orange-600 group-hover:text-white transition-colors duration-300 mb-2">
            7:00 PM
          </p>
          <p className="text-sm text-gray-600 group-hover:text-white/90 transition-colors duration-300">
            Every Wednesday Evening
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
          className="inline-flex items-center gap-2 text-primary hover:text-orange-600 font-semibold transition-colors duration-300"
        >
          <span>Need directions?</span>
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif"
              variants={fadeInUp}
            >
              Welcome Home
            </motion.h2>
            <motion.div 
              className="w-24 h-1 bg-primary mx-auto mb-8"
              variants={scaleIn}
            ></motion.div>
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed mb-6"
              variants={fadeInUp}
            >
              At FCI Ministries Morocco, we believe church is more than a building—it's a family.
              Whether you're seeking answers, looking for community, or wanting to deepen your faith,
              you'll find a welcoming place here.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-700 leading-relaxed mb-8"
              variants={fadeInUp}
            >
              Our mission is to glorify God by making disciples who love Jesus, grow in faith, and
              serve others with compassion. We're passionate about seeing lives transformed by the
              Gospel and building a vibrant community that reflects God's love.
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link
                to="/about"
                className="inline-block px-8 py-3 bg-gradient-to-r from-primary to-orange-600 text-white text-lg font-bold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Learn More About Us →
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      {!loading && upcomingEvents.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex justify-between items-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">Upcoming Events</h2>
              <Link
                to="/events"
                className="text-primary font-semibold hover:text-orange-600 transition-colors text-lg"
              >
                View All →
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
                    className="block bg-white border-2 border-gray-200 rounded-lg overflow-hidden  hover:shadow-lg transition-all duration-300"
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
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
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
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.div 
              className="flex justify-between items-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 font-serif">Recent Sermons</h2>
              <Link
                to="/sermons"
                className="text-primary font-semibold hover:text-orange-600 transition-colors text-lg"
              >
                View All →
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
                  className="bg-white p-6 rounded-lg shadow-sm"
                  variants={fadeInUp}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{sermon.title}</h3>
                  <p className="text-primary font-semibold mb-2">{sermon.speaker}</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{sermon.description}</p>
                  <div className="text-xs text-gray-500">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">
              Get Involved
            </h2>
            <p className="text-center text-gray-600 text-lg mb-12">
              Discover your place in our community
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            {[
              { emoji: '👶', title: "Children's Ministry", desc: 'Building strong foundations', path: '/ministries' },
              { emoji: '🎸', title: 'Youth Ministry', desc: 'Empowering young leaders', path: '/ministries' },
              { emoji: '🎵', title: 'Worship Team', desc: 'Leading people in worship', path: '/ministries' },
              { emoji: '❤️', title: 'Outreach', desc: 'Serving our community', path: '/ministries' }
            ].map((ministry, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ 
                  y: -8, 
                  backgroundColor: '#ffffff',
                  transition: { duration: 0.3 } 
                }}
              >
                <Link
                  to={ministry.path}
                  className="block bg-gray-50 p-6 rounded-lg text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="text-5xl mb-3">{ministry.emoji}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{ministry.title}</h3>
                  <p className="text-sm text-gray-600">{ministry.desc}</p>
                </Link>
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
              className="inline-block px-8 py-3 bg-primary hover:text-white text-black text-lg font-bold rounded-full hover:bg-orange-600 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Explore All Ministries →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-orange-600 text-white text-center">
        <motion.div 
          className="container mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-6 font-serif"
            variants={fadeInUp}
          >
            Ready to Take the Next Step?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 opacity-95 max-w-3xl mx-auto"
            variants={fadeInUp}
          >
            We'd love to connect with you. Whether you're new to faith or looking for a church home,
            we're here to walk with you on your spiritual journey.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={fadeInUp}
          >
            <Link
              to="/events"
              className="inline-block px-8 py-3 bg-black text-white text-lg font-bold rounded-full hover:bg-gray-100 hover:text-black hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Plan Your Visit
            </Link>
            <Link
              to="/contact"
              className="inline-block px-8 py-3 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;
