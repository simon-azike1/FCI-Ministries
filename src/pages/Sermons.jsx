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
      setSermons(response.data.data || []);
      setFilteredSermons(response.data.data || []);
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
      setCategories(response.data.data || []);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchSpeakers = async () => {
    try {
      const response = await sermonService.getSpeakers();
      setSpeakers(response.data.data || []);
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
            <p className="mt-md text-gray">{t('common.loading')}</p>
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
    <div className="sermons-page">
      <div className="container py-3xl">
        <h1 className="text-center mb-xl">{t('sermons.title')}</h1>

        {/* Featured Sermon Video Player */}
        {selectedSermon && (
          <div className="featured-sermon mb-2xl">
            <VideoPlayer
              url={selectedSermon.videoUrl}
              title={selectedSermon.title[currentLang]}
            />
            <div className="sermon-details">
              <h2 className="sermon-detail-title">{selectedSermon.title[currentLang]}</h2>
              <div className="sermon-detail-meta">
                {selectedSermon.speaker && (
                  <span className="detail-speaker">👤 {selectedSermon.speaker}</span>
                )}
                {selectedSermon.category && (
                  <span className="detail-category">📂 {selectedSermon.category}</span>
                )}
              </div>
              {selectedSermon.description?.[currentLang] && (
                <p className="sermon-detail-description">
                  {selectedSermon.description[currentLang]}
                </p>
              )}
              <button
                className="btn btn-secondary mt-md"
                onClick={() => setSelectedSermon(null)}
              >
                {t('sermons.backToList')}
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="sermons-filters mb-xl">
          <div className="filters-row">
            <input
              type="text"
              className="search-input"
              placeholder={t('sermons.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
              className="filter-select"
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
              className="filter-select"
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

            {(searchTerm || selectedCategory || selectedSpeaker) && (
              <button className="btn btn-outline" onClick={handleClearFilters}>
                {t('sermons.clearFilters')}
              </button>
            )}
          </div>
        </div>

        {/* Sermons Grid */}
        {filteredSermons.length === 0 ? (
          <div className="no-results">
            <p className="text-center text-gray text-xl">
              {t('sermons.noSermons')}
            </p>
          </div>
        ) : (
          <>
            <p className="results-count mb-lg">
              {t('sermons.showing')} {filteredSermons.length} {t('sermons.sermons')}
            </p>
            <div className="sermons-grid">
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
