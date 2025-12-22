import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import sermonService from '../services/sermonService';
import VideoPlayer from '../components/video/VideoPlayer';
import SermonCard from '../components/sermon/SermonCard';

function Sermons() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [selectedSermon, setSelectedSermon] = useState(null);
  const [categories, setCategories] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('');

  // Force re-render when language changes
  const [, forceUpdate] = useState({});

  useEffect(() => {
    const handleLanguageChange = () => {
      forceUpdate({});
    };

    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    fetchSermons();
    fetchCategories();
    fetchSpeakers();
  }, []);

  useEffect(() => {
    filterSermons();
  }, [sermons, searchTerm, selectedCategory, selectedSpeaker]);

  const fetchSermons = async () => {
    try {
      setLoading(true);
      const response = await sermonService.getAllSermons();
      setSermons(response.data || []);
      setFilteredSermons(response.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching sermons:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await sermonService.getCategories();
      setCategories(response.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSpeakers = async () => {
    try {
      const response = await sermonService.getSpeakers();
      setSpeakers(response.data || []);
    } catch (err) {
      console.error('Error fetching speakers:', err);
    }
  };

  const filterSermons = () => {
    let filtered = [...sermons];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((sermon) => {
        const title = sermon.title[currentLang]?.toLowerCase() || '';
        const description = sermon.description[currentLang]?.toLowerCase() || '';
        const speaker = sermon.speaker?.toLowerCase() || '';
        const search = searchTerm.toLowerCase();

        return title.includes(search) || description.includes(search) || speaker.includes(search);
      });
    }

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter((sermon) => sermon.category === selectedCategory);
    }

    // Speaker filter
    if (selectedSpeaker) {
      filtered = filtered.filter((sermon) => sermon.speaker === selectedSpeaker);
    }

    setFilteredSermons(filtered);
  };

  const extractYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url?.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const getVideoUrl = (sermon) => {
    // Handle both videoUrl (new sermons) and videoId (seeded data)
    if (sermon.videoUrl) {
      const videoId = extractYouTubeId(sermon.videoUrl);
      if (videoId) {
        return `https://www.youtube.com/watch?v=${videoId}`;
      }
      return sermon.videoUrl;
    }
    if (sermon.videoId) {
      return `https://www.youtube.com/watch?v=${sermon.videoId}`;
    }
    return '';
  };

  const handleSermonClick = (sermon) => {
    setSelectedSermon(sermon);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedSpeaker('');
  };

  if (loading) {
    return (
      <div className="py-3xl">
        <div className="container">
          <div className="text-center">
            <div className="loader"></div>
            <p className="mt-md text-gray">{t('sermons.loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && sermons.length === 0) {
    return (
      <div className="py-3xl">
        <div className="container">
          <div className="text-center">
            <p className="text-error">{t('sermons.errorLoading')}: {error}</p>
            <button className="btn btn-primary mt-md" onClick={fetchSermons}>
              {t('common.retry')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative text-white py-24 md:py-32 overflow-hidden bg-gray-800">
        <img
          src="/person1.jpg"
          alt="Hero background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 drop-shadow-lg">{t('sermons.title')}</h1>
          <p className="text-center text-lg opacity-90 max-w-2xl mx-auto drop-shadow-md">
            {t('sermons.subtitle')}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Featured Sermon Video Player */}
        {selectedSermon && (
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg mb-8 overflow-hidden">
            <VideoPlayer
              url={getVideoUrl(selectedSermon)}
              title={selectedSermon.title[currentLang]}
            />
            <div className="p-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">{selectedSermon.title[currentLang]}</h2>
              <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
                {selectedSermon.speaker && (
                  <span className="flex items-center"><span className="mr-1">👤</span> {selectedSermon.speaker}</span>
                )}
                {selectedSermon.category && (
                  <span className="flex items-center"><span className="mr-1">📂</span> {selectedSermon.category}</span>
                )}
                {selectedSermon.date && (
                  <span className="flex items-center"><span className="mr-1">📅</span> {new Date(selectedSermon.date).toLocaleDateString()}</span>
                )}
              </div>
              {selectedSermon.description?.[currentLang] && (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {selectedSermon.description[currentLang]}
                </p>
              )}
              <button
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                onClick={() => setSelectedSermon(null)}
              >
                ← {t('sermons.backToList')}
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              className="col-span-1 md:col-span-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder={t('sermons.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">{t('sermons.allCategories')}</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
            >
              <option value="">{t('sermons.allSpeakers')}</option>
              {speakers.map((speaker) => (
                <option key={speaker} value={speaker}>
                  {speaker}
                </option>
              ))}
            </select>
          </div>

          {(searchTerm || selectedCategory || selectedSpeaker) && (
            <button
              className="mt-4 px-4 py-2 text-orange-600 hover:text-orange-700 font-medium"
              onClick={handleClearFilters}
            >
              ✕ {t('sermons.clearFilters')}
            </button>
          )}
        </div>

        {/* Sermons Grid */}
        {filteredSermons.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">
              {t('sermons.noSermons')}
            </p>
          </div>
        ) : (
          <>
            <p className="text-gray-600 mb-4 font-medium">
              {t('sermons.showing')} {filteredSermons.length} {filteredSermons.length === 1 ? t('sermons.sermon') : t('sermons.sermons')}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredSermons.map((sermon) => (
                <SermonCard
                  key={sermon._id}
                  sermon={sermon}
                  onClick={() => handleSermonClick(sermon)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sermons;
