import { Link } from 'react-router-dom'
import { formatDurationToMinutes } from "utils";

export function RecentlyPlayed({ tracks }) {
  if (tracks == null || tracks.length === 0) {
    return null;
  }

  return tracks.map(({ track }, index) => (
    <TrackDetail track={track} key={index} rank={index} />
  ));
}

function TrackDetail({ track, rank }) {
  return (
    <div className="recently__played__container">
      <h2 className="text-center">{rank + 1}</h2>
      <h1 className="artist-title">{track.name}</h1>
      <p>
        Artists:{" "}
        {track.artists.map((artist, index) => (
          <span>
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
      <audio controls src={track.preview_url}>
        Your browser does not support the
        <code>audio</code> element.
      </audio>
    </div>
  );
}
