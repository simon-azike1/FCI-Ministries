import { useState } from 'react';
import { Link } from 'react-router-dom';

function Resources() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'bible-study', name: 'Bible Study' },
    { id: 'devotionals', name: 'Devotionals' },
    { id: 'books', name: 'Books' },
    { id: 'podcasts', name: 'Podcasts' },
    { id: 'tools', name: 'Tools & Apps' },
  ];

  const resources = [
    {
      id: 1,
      category: 'bible-study',
      title: 'Bible Study Guides',
      description: 'Comprehensive guides for personal and group Bible study',
      icon: '📖',
      link: '#',
      type: 'PDF Downloads'
    },
    {
      id: 2,
      category: 'devotionals',
      title: 'Daily Devotionals',
      description: 'Start your day with God through our daily devotionals',
      icon: '☀️',
      link: '#',
      type: 'Online & Email'
    },
    {
      id: 3,
      category: 'books',
      title: 'Recommended Reading',
      description: 'Books that will strengthen your faith and understanding',
      icon: '📚',
      link: '#',
      type: 'Book List'
    },
    {
      id: 4,
      category: 'podcasts',
      title: 'Sermon Podcast',
      description: 'Listen to our sermons and teachings on the go',
      icon: '🎙️',
      link: '#',
      type: 'Audio'
    },
    {
      id: 5,
      category: 'tools',
      title: 'Bible Apps',
      description: 'Digital tools to help you study God\'s Word',
      icon: '📱',
      link: '#',
      type: 'Mobile & Web'
    },
    {
      id: 6,
      category: 'bible-study',
      title: 'Small Group Curriculum',
      description: 'Resources for leading and participating in small groups',
      icon: '👥',
      link: '#',
      type: 'Study Guides'
    },
    {
      id: 7,
      category: 'devotionals',
      title: 'Prayer Guides',
      description: 'Deepen your prayer life with structured prayer guides',
      icon: '🙏',
      link: '#',
      type: 'PDF & Online'
    },
    {
      id: 8,
      category: 'tools',
      title: 'Bible Reading Plans',
      description: 'One-year and topical Bible reading plans',
      icon: '📅',
      link: '#',
      type: 'PDF Downloads'
    },
  ];

  const filteredResources = selectedCategory === 'all'
    ? resources
    : resources.filter(r => r.category === selectedCategory);

  const bibleTools = [
    {
      name: 'YouVersion Bible App',
      description: 'Free Bible app with hundreds of translations',
      icon: '📱',
      url: 'https://www.bible.com'
    },
    {
      name: 'Blue Letter Bible',
      description: 'In-depth Bible study tools and commentaries',
      icon: '🔍',
      url: 'https://www.blueletterbible.org'
    },
    {
      name: 'Bible Gateway',
      description: 'Search and compare Bible translations',
      icon: '🌐',
      url: 'https://www.biblegateway.com'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-orange-600 text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">Resources</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">Tools and materials to help you grow in your faith</p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white dark:text-white mb-4 font-serif">Grow in Your Faith</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed mt-6">
              We've curated a collection of resources to help you grow deeper in your relationship with God.
              Whether you're looking for Bible study materials, devotionals, or spiritual growth tools,
              you'll find helpful resources here to support your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`px-6 py-2 border-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-primary border-primary text-white'
                    : 'bg-white border-gray-300 dark:border-gray-600 dark:border-gray-600 text-gray-700 dark:text-gray-300 dark:text-gray-300 hover:border-primary'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-white dark:bg-gray-800 dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
                <div className="text-5xl mb-4">{resource.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-300 leading-relaxed mb-4 flex-1">{resource.description}</p>
                <div className="text-xs text-primary font-semibold uppercase mb-4">{resource.type}</div>
                <a href={resource.link} className="text-primary font-semibold hover:text-primary-dark hover:underline transition-colors">
                  Access Resource →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bible Tools Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white dark:text-white mb-4 font-serif">Recommended Bible Tools</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 dark:text-gray-300 text-lg mb-12">Free online tools to help you study God's Word</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {bibleTools.map((tool, index) => (
              <a
                key={index}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-50 dark:bg-gray-800 dark:bg-gray-800 p-6 rounded-lg text-center no-underline text-inherit hover:bg-white dark:bg-gray-800 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 dark:text-gray-300 leading-relaxed mb-4">{tool.description}</p>
                <span className="text-primary font-semibold text-sm">Visit Website →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Sermon Archive */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white dark:text-white mb-4 font-serif">Sermon Archive</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed my-6">
                Access our complete library of sermon messages. Watch or listen to past teachings
                and revisit messages that impacted you.
              </p>
              <Link to="/sermons" className="inline-block px-8 py-3 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg">
                View All Sermons
              </Link>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600"
                alt="Sermon Archive"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-serif">Stay Connected</h2>
            <p className="text-lg mb-8 opacity-95">
              Subscribe to our weekly newsletter for encouragement, updates, and exclusive resources
              delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 mb-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 border-2 border-white/30 rounded-md text-base bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button type="submit" className="px-8 py-3 bg-white dark:bg-gray-800 text-primary font-bold rounded-md hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                Subscribe
              </button>
            </form>
            <p className="text-sm opacity-80">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 dark:text-white dark:text-white mb-4 font-serif">Frequently Asked Questions</h2>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">Are these resources free?</h3>
              <p className="text-base text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed">
                Yes! Most of our resources are completely free. Some recommended books or premium
                resources may have a cost, but we'll always note that clearly.
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">Can I share these resources?</h3>
              <p className="text-base text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed">
                Absolutely! Feel free to share our resources with friends, family, and your small group.
                We encourage you to use them for personal and group spiritual growth.
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">How often do you add new resources?</h3>
              <p className="text-base text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed">
                We regularly update our resource library with new content. Check back often or subscribe
                to our newsletter to stay informed about new additions.
              </p>
            </div>

            <div className="mb-8 pb-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white dark:text-white mb-2">Can I request specific resources?</h3>
              <p className="text-base text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed">
                Yes! We'd love to hear from you. Contact us with your suggestions and we'll do our best
                to provide resources that meet your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif text-gray-900">Need Help Finding Resources?</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 dark:text-gray-300 leading-relaxed mb-8">
              Our team is here to help you find the right resources for your spiritual journey.
              Don't hesitate to reach out with questions or requests.
            </p>
            <Link to="/contact" className="inline-block px-8 py-3 bg-primary text-white text-lg font-bold rounded-full hover:bg-primary-dark hover:scale-105 transition-all duration-300 shadow-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Resources;
