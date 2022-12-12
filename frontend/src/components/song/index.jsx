import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { fetchResource } from "components/api";
import { captureException } from "@sentry/react";
import { formatDurationToMinutes } from "utils";

import "../index.css";
import "./song.css";

export function SongDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [songInfo, setSongInfo] = useState();
  const [loading, setLoading] = useState(true);

  const fetchSongDetail = useCallback(() => {
    fetchResource(`${process.env.REACT_APP_API_ENDPOINT}/song/${id}`)
      .then(setSongInfo)
      .then(() => setLoading(false))
      .catch((err) => {
        captureException(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (Cookies.get("spotifyToken") == null) {
      navigate("/");
      return;
    }
    fetchSongDetail();
  }, [fetchSongDetail, navigate]);

  if (loading) {
    return null;
  }

  return (
    <div className="song_page__container">
      <h1>{songInfo.detail.name}</h1>
      <img
        className="artist__image"
        src={songInfo.detail.album.images[0].url}
        alt={songInfo.detail.album.name}
      />
      <h1>Related tracks</h1>
      <div className="song_list__container">
        {songInfo.recommendations.map((track, i) => {
          return (
            <div key={track.id} className="song__container">
              <div className="song_info__container">
                <h2 className="text-center">{i + 1}</h2>

                <h1>
                  <Link className="artist__name" to={`/song/${track.id}`}>
                    {track.name}
                  </Link>
                </h1>
                <p>
                  Artists:{" "}
                  {track.artists.map((artist, index) => (
                    <span key={artist.id}>
                      <Link
                        className="artist__name"
                        to={`/artist/${artist.id}`}
                      >
                        {artist.name}
                      </Link>{" "}
                      {index === track.artists.length - 1 ? "" : ", "}
                    </span>
                  ))}
                </p>
                <p>Duration: {formatDurationToMinutes(track.duration_ms)}</p>
                <br />
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  className="text-green"
                  rel="noreferrer"
                >
                  Play on spotify
                </a>
              </div>
              {track.preview_url ? (
                <audio controls src={track.preview_url} preload="none" />
              ) : (
                <p>Preview unavailable</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
