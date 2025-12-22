import './VideoPlayer.css';

function VideoPlayer({ url, title }) {
  // Extract YouTube video ID from URL
  const extractYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = extractYouTubeId(url);

  if (!videoId) {
    return (
      <div className="video-player">
        <div className="video-wrapper bg-gray-200 flex items-center justify-center" style={{ minHeight: '400px' }}>
          <p className="text-red-500 text-lg">Invalid YouTube URL</p>
        </div>
        {title && <p className="video-title">{title}</p>}
      </div>
    );
  }

  return (
    <div className="video-player">
      <div className="video-wrapper">
        <iframe
          style={{ position: 'absolute', top: 0, left: 0 }}
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0`}
          title={title || 'YouTube video player'}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}

export default VideoPlayer;
