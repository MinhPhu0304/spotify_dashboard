import { first } from "lodash";

import "./artist.css";
import { formatDurationToMinutes } from "utils";

export function TopTracks({ topTracks }) {
  if (topTracks == null || topTracks.length === 0) {
    return null;
  }

  return topTracks.map((track, index) => (
    <TrackDetail track={track} key={index} rank={index} />
  ));
}

function TrackDetail({ track, rank }) {
  return (
    <div className="artists__container">
      <h2 className="text-center">{rank + 1}</h2>
      <img
        src={first(track.album.images).url}
        className="artist__image"
        loading="lazy"
      />

      <h1 className="artist-title">{track.name}</h1>
      <p>Artists: {formatArtists(track.artists)}</p>
      <p className="artists__genres text-left">
        Duration: {formatDurationToMinutes(track.duration_ms)}
      </p>
    </div>
  );
}

function formatArtists(artists) {
  return artists.map((value) => value.name).join(", ");
}

// function convertAllToStartCases(stringArrays) {
//   return stringArrays.map((value) => startCase(value));
// }
