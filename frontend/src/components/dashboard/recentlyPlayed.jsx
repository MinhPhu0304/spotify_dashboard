import { Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { formatDurationToMinutes } from "utils";

export function RecentlyPlayed({ tracks }) {
  const [currentPlaying, setCurrentPlaying] = useState();

  if (tracks == null || tracks.length === 0) {
    return null;
  }

  return tracks.map(({ track }, index) => (
    <TrackDetail
      track={track}
      key={index}
      rank={index}
      onPause={() => setCurrentPlaying()}
      onPlay={(id) => setCurrentPlaying(id)}
      currentPlaying={currentPlaying}
    />
  ));
}

function TrackDetail({ track, rank, onPause, onPlay, currentPlaying }) {
  const audio = useRef();

  useEffect(() => {
    if (audio.current && currentPlaying !== track.id) {
      audio.current.pause();
    }
  }, [currentPlaying, track]);

  return (
    <div className="artists__container preview__container">
      <h2 className="text-center">{rank + 1}</h2>
      <h1 className="artist-title">{track.name}</h1>
      <p>
        Artists:{" "}
        {track.artists.map((artist, index) => (
          <span key={artist.id}>
            <Link className="artist__name" to={`/artist/${artist.id}`}>
              {artist.name}
            </Link>{" "}
            {index === track.artists.length - 1 ? "" : ", "}
          </span>
        ))}
      </p>
      <p className="artists__genres text-left">
        Duration: {formatDurationToMinutes(track.duration_ms)}
      </p>
      <p>Preview: </p>
      <audio
        controls
        src={track.preview_url}
        ref={audio}
        preload={false}
        onPlay={() => onPlay(track.id)}
        onPause={() => track.id === currentPlaying && onPause()}
      >
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
}
