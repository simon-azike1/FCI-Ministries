import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import './SermonCard.css';

function SermonCard({ sermon, onClick }) {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  // Extract YouTube video ID to get thumbnail
  const getYouTubeThumbnail = (url) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : null;
  };

  const thumbnail = getYouTubeThumbnail(sermon.videoUrl);

  return (
    <div className="sermon-card" onClick={onClick}>
      <div className="sermon-thumbnail">
        {thumbnail ? (
          <img src={thumbnail} alt={sermon.title[currentLang]} />
        ) : (
          <div className="sermon-thumbnail-placeholder">🎥</div>
        )}
        <div className="play-overlay">
          <div className="play-button">▶</div>
        </div>
      </div>
      <div className="sermon-content">
        <h3 className="sermon-title">{sermon.title[currentLang]}</h3>
        <p className="sermon-meta">
          {sermon.speaker && <span className="sermon-speaker">{sermon.speaker}</span>}
          {sermon.date && (
            <span className="sermon-date">
              {format(new Date(sermon.date), 'MMM dd, yyyy')}
            </span>
          )}
        </p>
        {sermon.description?.[currentLang] && (
          <p className="sermon-description">
            {sermon.description[currentLang].substring(0, 100)}
            {sermon.description[currentLang].length > 100 && '...'}
          </p>
        )}
        <div className="sermon-footer">
          {sermon.category && (
            <span className="sermon-category">{sermon.category}</span>
          )}
          {sermon.views > 0 && (
            <span className="sermon-views">👁 {sermon.views}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SermonCard;
