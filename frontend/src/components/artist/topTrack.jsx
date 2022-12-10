import { useState, useRef, useEffect } from "react";

export function ArtistTopTracks({ topTracks, trackFeatures }) {
  const [currentPlaying, setCurrentPlaying] = useState();
  return (
    <>
      <h1>Popular</h1>
      <div className="list__container">
        {topTracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            feature={trackFeatures[track.id]}
            currentPlaying={currentPlaying}
            onPlay={(e) => setCurrentPlaying(e)}
            onPause={() => setCurrentPlaying()}
          />
        ))}
      </div>
    </>
  );
}

function Track({ track, feature, onPause, onPlay, currentPlaying }) {
  const audio = useRef();

  useEffect(() => {
    if (audio.current && currentPlaying !== track.id) {
      audio.current.pause();
    }
  }, [currentPlaying, track]);

  return (
    <div className="Top_tracks__card artists__container preview__container">
      <a
        href={track.external_urls.spotify}
        target="_blank"
        className="artist__name"
        rel="noreferrer"
      >
        <h3>{track.name}</h3>
      </a>
      <img
        className="album__image"
        src={track.album.images[0].url}
        alt=""
        loading="lazy"
      />
      <div>
        <p>Acousticness: {feature.acousticness}</p>
        <p>Danceability: {feature.danceability}</p>
        <p>Energy: {feature.energy}</p>
        <p>Instrumentalness: {feature.instrumentalness}</p>
        <p>Liveness: {feature.liveness}</p>
        <p>Tempo: {feature.tempo}</p>
        <p>Valence: {feature.valence}</p>
      </div>
      <audio
        src={track.preview_url}
        onPlay={() => onPlay(track.id)}
        onPause={() => track.id === currentPlaying && onPause()}
        preload='none'
        controls
        ref={audio}
        controlsList="nodownload noplaybackrate"
      />
    </div>
  );
}
