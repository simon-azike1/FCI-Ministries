import { Link } from 'react-router-dom';

function GetInvolved() {

  const opportunities = [
    {
      id: 'volunteer',
      title: 'Volunteer',
      description: 'Serve in our ministries and make a difference every week',
      icon: '🤝',
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
      title: 'Join a Small Group',
      description: 'Connect with others in a community of faith and growth',
      icon: '👥',
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
      title: 'Serve in Ministry',
      description: 'Use your gifts and talents to serve God\'s kingdom',
      icon: '⭐',
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
      title: 'Leadership Development',
      description: 'Grow as a leader and mentor others in their faith journey',
      icon: '🎯',
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
      title: 'Connect',
      description: 'Attend our Sunday service and newcomer\'s class',
      icon: '🏠'
    },
    {
      step: 2,
      title: 'Discover',
      description: 'Find your gifts and explore serving opportunities',
      icon: '🔍'
    },
    {
      step: 3,
      title: 'Engage',
      description: 'Join a ministry team or small group',
      icon: '🚀'
    },
    {
      step: 4,
      title: 'Grow',
      description: 'Develop your skills and make an impact',
      icon: '🌱'
    }
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
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">Get Involved</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">Discover your purpose and make an impact</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-serif">You Were Made for More</h2>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              God has created you with unique gifts, passions, and purpose. At FCI Ministries Morocco,
              we believe that everyone has a place to serve and grow. Whether you're new to faith or
              have been walking with Jesus for years, there's a place for you to make an impact.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mt-6">
              Getting involved isn't just about filling a role – it's about discovering your purpose,
              building meaningful relationships, and making an eternal difference in the lives of others.
            </p>
          </div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">Ways to Get Involved</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Find the perfect fit for your gifts and passions</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {opportunities.map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="p-6 text-center text-white" style={{ background: opportunity.color }}>
                  <div className="text-5xl mb-3">{opportunity.icon}</div>
                  <h3 className="text-2xl font-bold">{opportunity.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-700 mb-4">{opportunity.description}</p>
                  <ul className="space-y-2 mb-6">
                    {opportunity.options.map((option, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 font-bold mr-2">✓</span>
                        <span className="text-gray-700">{option}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 text-white font-bold rounded-md hover:opacity-90 transition-opacity" style={{ background: opportunity.color }}>
                    Learn More
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">Your Next Steps</h2>
          <p className="text-center text-gray-600 text-lg mb-12">A simple path to finding your place</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {nextSteps.map((step) => (
              <div key={step.step} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  {step.step}
                </div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12 font-serif">Hear From Our Volunteers</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic mb-4 leading-relaxed">
                "Serving in the children's ministry has been one of the most rewarding experiences of my life.
                Seeing kids encounter God's love is incredible!"
              </p>
              <div className="text-gray-900 font-semibold">
                <strong>Sarah M.</strong> - Children's Ministry Volunteer
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic mb-4 leading-relaxed">
                "I found my purpose through serving. The worship team has become like family to me,
                and I've grown so much in my faith and musical gifts."
              </p>
              <div className="text-gray-900 font-semibold">
                <strong>David K.</strong> - Worship Team Member
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-700 italic mb-4 leading-relaxed">
                "Joining a small group changed everything for me. I found authentic community and
                have formed friendships that will last a lifetime."
              </p>
              <div className="text-gray-900 font-semibold">
                <strong>Rachel T.</strong> - Small Group Member
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-gray-900">Ready to Take the Next Step?</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              We'd love to help you find the perfect place to serve and grow. Fill out our interest form
              or contact us to learn more about getting involved at FCI Ministries Morocco.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="inline-block px-8 py-3 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg">
                Contact Us
              </Link>
              <Link to="/events" className="inline-block px-8 py-3 border-2 border-primary text-primary text-lg font-bold rounded-full hover:bg-primary hover:text-white transition-all duration-300">
                View Events
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetInvolved;
