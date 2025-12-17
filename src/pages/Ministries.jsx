import { Link } from 'react-router-dom';

function Ministries() {

  const ministries = [
    {
      id: 'children',
      name: "Children's Ministry",
      description: "Building strong foundations in children through Bible teaching, worship, and fun activities. We provide a safe and nurturing environment for children ages 0-12 to learn about God's love.",
      icon: '👶',
      leader: 'Pastor Emily Chen',
      email: 'children@fciministries.ma',
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
      schedule: 'Quarterly: Marriage Enrichment',
      image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600',
      color: '#C1666B',
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">Our Ministries</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">Find your place to serve and grow</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">Discover Your Ministry</h2>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              At FCI Ministries Morocco, we believe that everyone has a place to belong and a purpose to fulfill.
              Our ministries are designed to help you grow spiritually, connect with others, and serve God's kingdom.
              Whether you're looking to serve, grow, or connect, there's a place for you here.
            </p>
          </div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ministries.map((ministry) => (
              <div key={ministry.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative h-48">
                  <img src={ministry.image} alt={ministry.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0" style={{ background: `linear-gradient(to bottom, transparent, ${ministry.color}dd)` }}></div>
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{ background: ministry.color }}>
                    {ministry.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{ministry.name}</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">{ministry.description}</p>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">👤</span>
                      <span className="font-semibold mr-2">Leader:</span>
                      <span>{ministry.leader}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📅</span>
                      <span className="font-semibold mr-2">Schedule:</span>
                      <span>{ministry.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span className="mr-2">📧</span>
                      <span className="font-semibold mr-2">Contact:</span>
                      <a href={`mailto:${ministry.email}`} className="text-primary hover:underline">{ministry.email}</a>
                    </div>
                  </div>

                  <button className="w-full py-3 text-white font-bold rounded-md hover:opacity-90 transition-opacity" style={{ background: ministry.color }}>
                    Get Involved
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-gray-900">Ready to Serve?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Join us in making a difference. Connect with a ministry leader today to learn more about getting involved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/get-involved" className="inline-block px-8 py-3 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg">
                Get Involved
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

export default Ministries;
