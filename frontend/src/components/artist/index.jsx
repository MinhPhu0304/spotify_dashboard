import { useEffect, useState, useCallback } from "react";
import { captureException } from "@sentry/react";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

import { ArtistTopTracks } from "./topTrack";
import "../index.css";
import "./artist.css";
import { TopArtist } from "components/dashboard/topArtists";
import { fetchResource } from "components/api";
import { Bio } from "./bio";

export function ArtistPage() {
  let { id } = useParams();
  const [artistInfo, setArtistInfo] = useState();
  const [relatedArtists, setRelatedArtists] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchArtist = useCallback(() => {
    setLoading(true);
    return fetchResource(`${process.env.REACT_APP_API_ENDPOINT}/artist/${id}`)
      .then((info) => {
        setArtistInfo(info);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        captureException(e);
      });
  }, [id]);

  const fetchRelatedArtist = useCallback(
    () =>
      fetchResource(
        `${process.env.REACT_APP_API_ENDPOINT}/artist/${id}/related-artists`
      )
        .then(setRelatedArtists)
        .catch(captureException),
    [id]
  );

  useEffect(() => {
    if (Cookies.get("spotifyToken") == null) {
      navigate("/");
      return;
    }
    Promise.all([fetchRelatedArtist(), fetchArtist()]);
  }, [fetchArtist, fetchRelatedArtist, navigate]);

  useEffect(() => {
    if (artistInfo) {
      document.title = artistInfo.artist.name;
    }
  }, [artistInfo]);

  if (loading) {
    return <div className="donut" />;
  }

  if (!artistInfo) {
    return null;
  }

  return (
    <div className="Hero__title">
      <h1>{artistInfo.artist.name}</h1>
      <img
        className="artist__image"
        src={artistInfo.artist.images[0].url}
        alt={artistInfo.artist.name}
      />
      <div className="genre__container">
        {artistInfo.artist.genres.map((genre, index) => (
          <Genre genre={genre} key={index} />
        ))}
      </div>
      <Bio bioParts={artistInfo.bio} />
      <ArtistTopTracks
        topTracks={artistInfo.topTracks}
        trackFeatures={artistInfo.trackFeatures}
      />
      <h1>Related</h1>
      <div className="list__container">
        <TopArtist artistList={relatedArtists} />
      </div>
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
