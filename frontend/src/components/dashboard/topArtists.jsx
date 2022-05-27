import { first, startCase } from "lodash";
import { Link } from "react-router-dom";

import { formatNumber } from "utils";

export function TopArtist({ artistList }) {
  if (artistList == null || artistList.lenght === 0) {
    return null;
  }

  return artistList.map((artist, index) => (
    <ArtistDetail artist={artist} key={index} rank={index} />
  ));
}

function ArtistDetail({ artist, rank }) {
  return (
    <div className="artists__container">
      <h2 className="text-center">{rank + 1}</h2>
      <img
        src={first(artist.images).url}
        className="artist__image"
        alt=""
        loading="lazy"
      />

      <h1>
        <Link className="artist__name" to={`/artist/${artist.id}`}>{artist.name}</Link>
      </h1>
      <p>Followers: {formatNumber(artist.followers.total)}</p>
      <p className="artists__genres text-left">
        {convertAllToStartCases(artist.genres).join(", ")}
      </p>
    </div>
  );
}

function convertAllToStartCases(stringArrays) {
  return stringArrays.map((value) => startCase(value));
}
