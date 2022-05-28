export function ArtistTopTracks({ topTracks, trackFeatures }) {
  return (
    <>
      <h1>Popular</h1>
      <div className="Top_tracks_list__container">
        {topTracks.map((track) => (
          <Track
            key={track.id}
            track={track}
            feature={trackFeatures[track.id]}
          />
        ))}
      </div>
    </>
  );
}

function Track({ track, feature }) {
  return (
    <div className="Top_tracks__card">
      <h3>{track.name}</h3>
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
        controls
        controlsList="nodownload noplaybackrate"
      />
    </div>
  );
}
