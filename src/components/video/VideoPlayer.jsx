import { useState } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

function VideoPlayer({ url, title }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="video-player">
      <div className="video-wrapper">
        <ReactPlayer
          url={url}
          playing={playing}
          controls
          width="100%"
          height="100%"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />
      </div>
      {title && <p className="video-title">{title}</p>}
    </div>
  );
}

export default VideoPlayer;
