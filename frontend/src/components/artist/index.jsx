import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

import { ArtistTopTracks } from "./topTrack";
import "./artist.css";

export function ArtistPage() {
  let { id } = useParams();
  const [artistInfo, setArtistInfo] = useState();
  const history = useHistory();

  const fetchArtist = useCallback(() => {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/artist/${id}`, {
      headers: {
        "spotify-token": Cookies.get("spotifyToken"),
      },
    })
      .then((res) => res.json())
      .then((info) => {
        setArtistInfo(info);
      })
      .catch(() => {});
  }, [id]);

  useEffect(() => {
    if (Cookies.get("spotifyToken") == null) {
      history.push("/");
      return;
    }
    fetchArtist();
  }, [fetchArtist, history]);

  if (!artistInfo) {
    return null;
  }

  return (
    <div className="Page__container">
      <h1>{artistInfo.artist.name}</h1>
      <img
        className="artist__image"
        src={artistInfo.artist.images[0].url}
        alt=""
      />
      <div className="genre__container">
        {artistInfo.artist.genres.map((genre, index) => (
          <Genre genre={genre} key={index} />
        ))}
      </div>
      <ArtistTopTracks
        topTracks={artistInfo.topTracks}
        trackFeatures={artistInfo.trackFeatures}
      />
    </div>
  );
}

function Genre({ genre }) {
  return (
    <div className="genre">
      <span className="genre__name">{genre}</span>
    </div>
  );
}
