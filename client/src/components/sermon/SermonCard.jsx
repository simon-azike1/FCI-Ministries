import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import './SermonCard.css';

function SermonCard({ sermon, onClick }) {
  const { i18n } = useTranslation();

  // Use i18n.language directly instead of prop to ensure reactivity
  const lang = i18n.language;

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

  // Extract YouTube video ID to get thumbnail
  const getYouTubeThumbnail = (sermon) => {
    // Try to extract from videoUrl first (new sermons)
    if (sermon.videoUrl) {
      const videoId = sermon.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
      if (videoId) {
        // Use hqdefault instead of maxresdefault for better compatibility
        return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }
    }
    // Fallback to videoId field (seeded data)
    if (sermon.videoId) {
      return `https://img.youtube.com/vi/${sermon.videoId}/hqdefault.jpg`;
    }
    return null;
  };

  const thumbnail = getYouTubeThumbnail(sermon);

  // Debug: log thumbnail URL
  console.log('Sermon:', sermon.title[lang], 'Thumbnail:', thumbnail);

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative aspect-video bg-gradient-to-br from-orange-400 to-orange-600">
        <div className="absolute inset-0 flex items-center justify-center text-white text-6xl z-0">
          🎥
        </div>
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={sermon.title[lang]}
            className="absolute inset-0 w-full h-full object-cover z-10"
            onLoad={(e) => console.log('Image loaded:', thumbnail)}
            onError={(e) => {
              console.error('Image failed to load:', thumbnail);
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white z-10">
            <p className="text-sm">No thumbnail</p>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="w-14 h-14 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="text-orange-500 text-2xl ml-1">▶</div>
          </div>
        </div>
        {sermon.duration && (
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {sermon.duration} min
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 text-sm leading-tight group-hover:text-orange-600 transition-colors">
          {sermon.title[lang]}
        </h3>
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          {sermon.speaker && (
            <span className="flex items-center">
              <span className="mr-1">👤</span>
              <span className="truncate">{sermon.speaker}</span>
            </span>
          )}
        </div>
        {sermon.date && (
          <p className="text-xs text-gray-500 mb-2">
            {format(new Date(sermon.date), 'MMM dd, yyyy')}
          </p>
        )}
        <div className="flex items-center justify-between text-xs">
          {sermon.category && (
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
              {sermon.category}
            </span>
          )}
          {sermon.views > 0 && (
            <span className="text-gray-500 flex items-center">
              <span className="mr-1">👁</span> {sermon.views}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SermonCard;
