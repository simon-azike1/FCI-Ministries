import { useState } from 'react';
import contactService from '../services/contactService';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await contactService.submit(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Scroll to success message
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
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
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 font-serif">Contact Us</h1>
          <p className="text-lg md:text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">We'd love to hear from you</p>
        </div>
      </section>

      {/* Success/Error Messages */}
      {success && (
        <div className="container mx-auto px-4 py-4 mt-8">
          <div className="bg-green-50 border-2 border-green-500 text-green-800 p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl font-bold mb-2">✓ Message Sent Successfully!</h3>
            <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="container mx-auto px-4 py-4 mt-8">
          <div className="bg-red-50 border-2 border-red-500 text-red-800 p-6 rounded-lg animate-fade-in">
            <h3 className="text-xl font-bold mb-2">✗ Error</h3>
            <p>{error}</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Send Us a Message</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="+212 6XX XX XX XX"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 bg-gradient-to-r from-primary to-orange-600 text-white text-lg font-bold rounded-md hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6 font-serif">Get In Touch</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-8">
                  Whether you're new to our church, have questions about our services, or want to get involved,
                  we're here to help. Don't hesitate to reach out!
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Address */}
                <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-3">📍</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Visit Us</h3>
                  <p className="text-gray-600">
                    123 Church Street<br />
                    Casablanca, Morocco
                  </p>
                </div>

                {/* Email */}
                <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-3">📧</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Email Us</h3>
                  <a href="mailto:info@fciministries.ma" className="text-primary hover:text-orange-600 transition-colors">
                    info@fciministries.ma
                  </a>
                </div>

                {/* Phone */}
                <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-3">📱</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Call Us</h3>
                  <a href="tel:+212600000000" className="text-primary hover:text-orange-600 transition-colors">
                    +212 6XX XX XX XX
                  </a>
                </div>

                {/* Office Hours */}
                <div className="bg-gray-50 p-6 rounded-lg hover:bg-white hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-3">🕐</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Office Hours</h3>
                  <p className="text-gray-600">
                    Mon-Fri: 9:00 AM - 5:00 PM<br />
                    Sat-Sun: Closed
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-primary to-orange-600 p-8 rounded-lg text-white">
                <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
                <p className="mb-6 opacity-95">Follow us on social media to stay updated with our latest events and messages</p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300"
                    aria-label="Facebook"
                  >
                    📘
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300"
                    aria-label="Instagram"
                  >
                    📷
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300"
                    aria-label="YouTube"
                  >
                    ▶️
                  </a>
                  <a
                    href="#"
                    className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl hover:bg-white/30 hover:scale-110 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    🐦
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Optional) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12 font-serif">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9 bg-gray-300 rounded-lg overflow-hidden shadow-lg">
            {/* You can add a Google Maps iframe here */}
            <div className="w-full h-96 flex items-center justify-center bg-gray-200">
              <p className="text-gray-600 text-lg">Map will be displayed here</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Contact;
