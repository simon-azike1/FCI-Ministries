import { useState } from 'react';
import { motion } from 'framer-motion';

function Give() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [givingType, setGivingType] = useState('one-time');
  const [selectedCategory, setSelectedCategory] = useState('tithe');

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
        staggerChildren: 0.12
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

  const suggestedAmounts = [25, 50, 100, 250, 500, 1000];

  const givingOptions = [
    {
      id: 'tithe',
      title: 'Tithes & Offerings',
      description: 'Support the general ministry and operations of FCI Ministries Morocco.',
      icon: '🙏',
      color: '#FF7700',
    },
    {
      id: 'missions',
      title: 'Missions & Outreach',
      description: 'Help us spread the Gospel and serve communities in need.',
      icon: '🌍',
      color: '#4ECDC4',
    },
    {
      id: 'building',
      title: 'Building Fund',
      description: 'Contribute to our church expansion and facility improvements.',
      icon: '🏛️',
      color: '#95E1D3',
    },
    {
      id: 'youth',
      title: 'Youth & Children',
      description: 'Invest in the next generation through our youth and children programs.',
      icon: '👶',
      color: '#FFE66D',
    },
  ];

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section - Background Image */}
      <section className="relative text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/give43.jpg"
            alt="Give"
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
                Give
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl mb-8 opacity-95 leading-relaxed"
                variants={fadeInUp}
              >
                Your generosity enables us to impact lives and spread hope throughout Morocco and beyond.
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                variants={fadeInUp}
              >
                <a
                  href="#give-now"
                  className="inline-block px-8 py-4 bg-white text-black text-lg font-bold rounded-full hover:bg-gray-100 transition-all duration-300 shadow-xl text-center"
                >
                  Give Now →
                </a>
                <a
                  href="#other-ways"
                  className="inline-block px-8 py-4 border-2 border-white text-white text-lg font-bold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-center"
                >
                  Other Ways to Give
                </a>
              </motion.div>
            </motion.div>

            {/* Right side - Empty for background image visibility */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* Impact Areas - Horizontal Layout */}
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
            {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">Your Impact</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">See how your generosity makes a lasting difference in our church and community</p> */}
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            {[
              {
                title: 'Worship & Teaching',
                desc: 'Weekly services reach 500+ people with the Gospel. Bible studies and discipleship programs equip believers to grow in their faith.',
                stat: '500+',
                label: 'Weekly Attendees'
              },
              {
                title: 'Community Outreach',
                desc: 'Monthly food distributions, homeless outreach, and community programs serve those in need with the love of Christ.',
                stat: '200+',
                label: 'Families Served'
              },
              {
                title: 'Families & Youth',
                desc: 'Children\'s ministry, youth programs, and family resources invest in the next generation of faith leaders.',
                stat: '150+',
                label: 'Kids & Teens'
              },
              {
                title: 'Global Missions',
                desc: 'Support missionaries spreading the Gospel around the world and bringing hope to unreached communities.',
                stat: '10+',
                label: 'Mission Partners'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-primary"
                variants={index % 2 === 0 ? slideInLeft : slideInRight}
                whileHover={{ x: 5 }}
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm">{item.desc}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">{item.stat}</span>
                    <span className="text-gray-500 font-medium text-sm">{item.label}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Give Form Section - Enhanced Card Layout */}
      <section id="give-now" className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-serif">Make Your Gift</h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">Every contribution helps us fulfill our mission</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Giving Categories - Left Sidebar */}
            <motion.div
              className="lg:col-span-1"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainer}
            >
              <h3 className="text-xl font-bold mb-4 text-gray-900">Choose a Category</h3>
              <div className="space-y-2">
                {givingOptions.map((option) => (
                  <motion.button
                    key={option.id}
                    className={`w-full p-3 rounded-lg text-left transition-all duration-300 border-2 ${
                      selectedCategory === option.id
                        ? 'border-primary bg-primary text-white shadow-lg'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-primary/30 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedCategory(option.id)}
                    variants={scaleIn}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="font-bold text-base">{option.title}</div>
                    <div className={`text-xs mt-1 ${selectedCategory === option.id ? 'text-white/90' : 'text-gray-500'}`}>
                      {option.description.substring(0, 40)}...
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Giving Form - Right Main Area */}
            <motion.div
              className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              {/* Giving Type Toggle */}
              <div className="flex gap-3 mb-8">
                <motion.button
                  className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all ${
                    givingType === 'one-time'
                      ? 'bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setGivingType('one-time')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  One-Time Gift
                </motion.button>
                <motion.button
                  className={`flex-1 py-4 rounded-xl text-lg font-bold transition-all ${
                    givingType === 'recurring'
                      ? 'bg-gradient-to-r from-primary to-orange-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  onClick={() => setGivingType('recurring')}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Monthly Giving
                </motion.button>
              </div>

              {/* Amount Selection */}
              <div className="mb-8">
                <label className="block text-lg font-bold mb-4 text-gray-900">Select Amount (MAD)</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {suggestedAmounts.map((amount) => (
                    <motion.button
                      key={amount}
                      className={`py-4 rounded-xl text-lg font-bold transition-all ${
                        selectedAmount === amount
                          ? 'bg-primary text-white shadow-lg'
                          : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:border-primary/30'
                      }`}
                      onClick={() => handleAmountClick(amount)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {amount}
                    </motion.button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Or enter custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full py-4 px-6 border-2 border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* Summary Box */}
              <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl mb-6 border border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-bold text-gray-900">
                    {givingOptions.find(opt => opt.id === selectedCategory)?.title}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-bold text-gray-900">
                    {givingType === 'one-time' ? 'One-Time Gift' : 'Monthly Recurring'}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-3xl font-bold text-primary">
                    {selectedAmount || customAmount || '0'} MAD
                  </span>
                </div>
              </div>

              <motion.button
                className="w-full py-5 bg-gradient-to-r from-primary to-orange-600 text-white font-bold rounded-xl text-xl hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Continue to Secure Payment →
              </motion.button>

              <p className="text-center text-sm text-gray-600 mt-4 flex items-center justify-center gap-2">
                <span className="text-green-600">🔒</span>
                Secure 256-bit encrypted payment processing
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give - Timeline Style */}
      <section id="other-ways" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 font-serif"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Other Ways to Give
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-24 h-1 bg-primary mx-auto mb-16"
          ></motion.div>

          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                title: 'Bank Transfer',
                details: [
                  { label: 'Bank', value: 'Attijariwafa Bank' },
                  { label: 'Account Name', value: 'FCI Ministries Morocco' },
                  { label: 'Account Number', value: '1234 5678 9012 3456' },
                  { label: 'IBAN', value: 'MA00 1234 5678 9012 3456 7890' }
                ]
              },
              {
                title: 'Mail a Check',
                details: [
                  { label: 'Payable to', value: 'FCI Ministries Morocco' },
                  { label: 'Address', value: '123 Church Street, Casablanca, Morocco' }
                ]
              },
              {
                title: 'Mobile Money',
                details: [
                  { label: 'Orange Money', value: '+212 6XX XX XX XX' },
                  { label: 'Maroc Telecom', value: '+212 6XX XX XX XX' },
                  { label: 'Note', value: 'Please notify us after transfer' }
                ]
              }
            ].map((method, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border-l-4 border-primary"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                <div className="space-y-2">
                  {method.details.map((detail, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-gray-600 font-medium min-w-[120px] text-sm">{detail.label}:</span>
                      <span className="text-gray-900 font-semibold text-sm">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQs - Accordion Style */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4 font-serif"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="w-24 h-1 bg-primary mx-auto mb-16"
          ></motion.div>

          <motion.div
            className="max-w-3xl mx-auto space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {[
              {
                q: 'Is my donation tax-deductible?',
                a: 'Yes! FCI Ministries Morocco is a registered non-profit organization. We provide tax receipts for all donations.'
              },
              {
                q: 'How is my donation used?',
                a: 'Your donations support our ministry operations, community outreach, missions, and programs. We are committed to financial transparency and accountability.'
              },
              {
                q: 'Can I cancel my recurring donation?',
                a: 'Yes, you can cancel or modify your recurring donation at any time by contacting our finance team.'
              },
              {
                q: 'Is online giving secure?',
                a: 'Absolutely! We use industry-standard 256-bit encryption and secure payment processors to protect your financial information.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">Q:</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-gray-700 leading-relaxed pl-6 text-sm">{faq.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary to-orange-500 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <motion.div
          className="container mx-auto px-4 text-center relative z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <motion.div
              className="text-8xl mb-6"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            >
              {/* ❤️ */}
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">Thank You for Your Generosity!</h2>
            <p className="text-2xl max-w-3xl mx-auto leading-relaxed opacity-95">
              Your partnership enables us to impact lives and spread hope throughout Morocco and beyond. Together, we are making an eternal difference.
            </p>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

export default Give;
