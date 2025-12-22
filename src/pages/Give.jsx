import { useState } from 'react';

function Give() {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [givingType, setGivingType] = useState('one-time');

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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-orange-600 text-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
            <path fill="rgba(255,255,255,0.1)" d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        <div className="container mx-auto px-4 relative z-10 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">Give</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto mb-8">Partner with us in making a difference</p>
          <p className="max-w-4xl mx-auto text-xl italic leading-relaxed opacity-90">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
            <span className="block mt-2 text-base not-italic font-semibold">2 Corinthians 9:7</span>
          </p>
        </div>
      </section>

      {/* Why Give Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">Why Give?</h2>
          <p className="text-center text-gray-600 text-lg mb-12">
            Your generosity makes a lasting impact in our church and community
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-6xl mb-4">⛪</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Worship & Teaching</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Support weekly services, Bible studies, and spiritual growth programs
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Community Outreach</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Feed the hungry, care for the needy, and serve our community
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Families & Youth</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Invest in programs that strengthen families and disciple the next generation
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="text-6xl mb-4">🌍</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Global Missions</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Support missionaries and spread the Gospel around the world
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">Ways to Give</h2>
          <p className="text-center text-gray-600 text-lg mb-12">Choose where your gift makes an impact</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {givingOptions.map((option) => (
              <div key={option.id} className="bg-white p-6 rounded-lg shadow-sm text-center hover:-translate-y-1 hover:shadow-md transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl" style={{ background: option.color }}>
                  {option.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{option.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{option.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Give Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto p-8 bg-gray-50 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold text-center mb-2">Make Your Gift Today</h2>
            <p className="text-center text-gray-600 mb-8">Every contribution helps us fulfill our mission</p>

            <div className="flex gap-4 mb-8">
              <button
                className={`flex-1 py-3 border-2 rounded-md text-base font-semibold transition-all duration-300 ${
                  givingType === 'one-time'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-700'
                }`}
                onClick={() => setGivingType('one-time')}
              >
                One-Time Gift
              </button>
              <button
                className={`flex-1 py-3 border-2 rounded-md text-base font-semibold transition-all duration-300 ${
                  givingType === 'recurring'
                    ? 'border-primary bg-primary text-white'
                    : 'border-gray-300 bg-white text-gray-700'
                }`}
                onClick={() => setGivingType('recurring')}
              >
                Monthly Giving
              </button>
            </div>

            <div className="mb-8">
              <label className="block text-base font-semibold mb-4">Select Amount (MAD)</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {suggestedAmounts.map((amount) => (
                  <button
                    key={amount}
                    className={`py-3 border-2 rounded-md text-base font-semibold transition-all duration-300 ${
                      selectedAmount === amount
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-300 bg-white text-gray-700'
                    }`}
                    onClick={() => handleAmountClick(amount)}
                  >
                    {amount} MAD
                  </button>
                ))}
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={customAmount}
                  onChange={handleCustomAmountChange}
                  className="w-full py-3 px-4 border-2 border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>

            <button className="w-full py-3 px-8 bg-primary text-white font-bold rounded-md text-lg hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 mb-4">
              Continue to Payment →
            </button>

            <p className="text-center text-sm text-gray-600">
              🔒 Secure and encrypted payment processing
            </p>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-12 font-serif">Other Ways to Give</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">🏦</div>
              <h3 className="text-2xl font-bold mb-4">Bank Transfer</h3>
              <div className="space-y-1 text-gray-700">
                <p><strong>Bank:</strong> Attijariwafa Bank</p>
                <p><strong>Account Name:</strong> FCI Ministries Morocco</p>
                <p><strong>Account Number:</strong> 1234 5678 9012 3456</p>
                <p><strong>IBAN:</strong> MA00 1234 5678 9012 3456 7890</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">✉️</div>
              <h3 className="text-2xl font-bold mb-4">Mail a Check</h3>
              <div className="space-y-1 text-gray-700">
                <p>Make checks payable to:</p>
                <p><strong>FCI Ministries Morocco</strong></p>
                <p>123 Church Street</p>
                <p>Casablanca, Morocco</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-4">Mobile Money</h3>
              <div className="space-y-1 text-gray-700">
                <p><strong>Orange Money:</strong> +212 6XX XX XX XX</p>
                <p><strong>Maroc Telecom:</strong> +212 6XX XX XX XX</p>
                <p className="text-sm text-gray-600 italic">Please notify us after transfer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-gray-900 mb-4 font-serif">Frequently Asked Questions</h2>

          <div className="max-w-4xl mx-auto mt-12">
            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is my donation tax-deductible?</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Yes! FCI Ministries Morocco is a registered non-profit organization. We provide tax receipts for all donations.
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">How is my donation used?</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Your donations support our ministry operations, community outreach, missions, and programs. We are committed to financial transparency and accountability.
              </p>
            </div>

            <div className="mb-8 pb-8 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Can I cancel my recurring donation?</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Yes, you can cancel or modify your recurring donation at any time by contacting our finance team.
              </p>
            </div>

            <div className="mb-8 pb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Is online giving secure?</h3>
              <p className="text-base text-gray-700 leading-relaxed">
                Absolutely! We use industry-standard encryption and security measures to protect your financial information.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 bg-gradient-to-br from-primary to-orange-500 text-white text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Thank You for Your Generosity!</h2>
            <p className="text-xl leading-relaxed opacity-95">
              Your partnership enables us to impact lives and spread hope throughout Morocco and beyond.
              Together, we are making an eternal difference.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Give;
