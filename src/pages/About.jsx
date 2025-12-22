import { Link } from 'react-router-dom';

function About() {

  const leadership = [
    {
      name: 'Pastor John Smith',
      role: 'Senior Pastor',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      bio: 'Leading FCI Ministries with passion and dedication for over 15 years.',
    },
    {
      name: 'Pastor Sarah Johnson',
      role: 'Associate Pastor',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      bio: 'Passionate about worship, women\'s ministry, and spiritual growth.',
    },
    {
      name: 'Pastor David Lee',
      role: 'Youth Pastor',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Empowering the next generation to live boldly for Christ.',
    },
    {
      name: 'Pastor Emily Chen',
      role: 'Children\'s Pastor',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      bio: 'Building strong spiritual foundations in children through love and teaching.',
    },
  ];

  const beliefs = [
    {
      title: 'The Bible',
      description: 'We believe the Bible is the inspired Word of God, our ultimate authority for faith and life.',
      icon: '📖',
    },
    {
      title: 'The Trinity',
      description: 'We believe in one God eternally existing in three persons: Father, Son, and Holy Spirit.',
      icon: '✝️',
    },
    {
      title: 'Salvation',
      description: 'We believe salvation is a gift of God\'s grace through faith in Jesus Christ alone.',
      icon: '🙏',
    },
    {
      title: 'The Church',
      description: 'We believe the Church is the body of Christ, called to worship, grow, and serve together.',
      icon: '⛪',
    },
    {
      title: 'The Great Commission',
      description: 'We believe in sharing the Gospel and making disciples of all nations.',
      icon: '🌍',
    },
    {
      title: 'Eternal Life',
      description: 'We believe in the resurrection and eternal life for all who trust in Christ.',
      icon: '👑',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-orange-600 text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">About Us</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">Our story, mission, and the people behind FCI Ministries</p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">Our Story</h2>
              <div className="w-20 h-1 bg-primary mb-6"></div>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                FCI Ministries Morocco was founded with a vision to bring the transforming love of Christ
                to the people of Morocco. What started as a small gathering of believers has grown into
                a vibrant community of faith that spans across the nation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-4">
                For over two decades, we have been committed to serving our community through worship,
                teaching, compassionate outreach, and authentic fellowship. Our church is a place where
                people from all walks of life can encounter God, grow in their faith, and discover their purpose.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we continue to pursue our calling to be a light in Morocco, sharing the hope and
                love of Jesus Christ with everyone we meet. We believe that every person matters to God,
                and we are passionate about helping people take their next step in their spiritual journey.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=800"
                alt="Church Community"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To glorify God by making disciples who love Jesus, grow in faith, and serve others with compassion.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-6xl mb-4">👁️</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                A thriving community where everyone discovers their purpose, grows in their relationship with God, and impacts the world for Christ.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm text-center md:col-span-2">
              <div className="text-6xl mb-4">💎</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left max-w-4xl mx-auto">
                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span> <span>Faith in Jesus Christ</span></li>
                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span> <span>Love for God and People</span></li>
                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span> <span>Unity in Diversity</span></li>
                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span> <span>Excellence in Service</span></li>
                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span> <span>Compassion and Justice</span></li>
                <li className="flex items-start"><span className="text-green-500 font-bold mr-2">✓</span> <span>Integrity and Authenticity</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What We Believe Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">What We Believe</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Our foundational beliefs based on Scripture</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {beliefs.map((belief, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                <div className="text-5xl mb-4">{belief.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{belief.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{belief.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">Meet Our Leadership</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Dedicated pastors committed to serving God and our community</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="h-64 overflow-hidden">
                  <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name}</h3>
                  <p className="text-primary font-semibold mb-3">{leader.role}</p>
                  <p className="text-sm text-gray-600">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-gray-900">Join Our Church Family</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We'd love to meet you! Join us for a service or reach out to learn more about how you can be part of our community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/events" className="inline-block px-8 py-3 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg">
                Visit Us
              </Link>
              <Link to="/contact" className="inline-block px-8 py-3 border-2 border-primary text-primary text-lg font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
