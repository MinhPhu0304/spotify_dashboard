import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useCallback, useRef } from "react";
import Cookies from "js-cookie";
import { fetchResource } from "components/api";
import { captureException } from "@sentry/react";
import { formatDurationToMinutes } from "utils";

import "../index.css";
import "./song.css";

function PreviewTrack({ track, currentPlaying, setCurrentPlaying }) {
  const audio = useRef();

  useEffect(() => {
    if (audio.current && currentPlaying !== track.id) {
      audio.current.pause();
    }
  }, [currentPlaying, track]);

  return (
    <audio
      controls
      preload="none"
      controlsList="nodownload noplaybackrate"
      ref={audio}
      src={track.preview_url}
      onPlay={() => setCurrentPlaying(track.id)}
      onPause={() => track.id === currentPlaying && setCurrentPlaying()}
    />
  );
}

export function SongDetail() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [songInfo, setSongInfo] = useState();
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState();

  const fetchSongDetail = useCallback(() => {
    setLoading(true);
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
    return <div className="donut" />;
  }

  return (
    <div className="song_page__container">
      <h1>{songInfo.detail.name}</h1>
      <img
        className="artist__image"
        src={songInfo.detail.album.images[0].url}
        alt={songInfo.detail.album.name}
        loading="lazy"
      />

      <div className="song_feature__container">
        <p>Popularity: {songInfo.detail.popularity}</p>
        <p>Available in {songInfo.detail.available_markets.length} countries</p>
        <p>Duration {formatDurationToMinutes(songInfo.detail.duration_ms)}</p>
        {songInfo.detail.album.release_date_precision === "day" ? (
          <p>Release day: {(new Date(songInfo.detail.album.release_date)).toDateString()}</p>
        ) : null}
      </div>
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
                <PreviewTrack
                  track={track}
                  currentPlaying={currentPlaying}
                  setCurrentPlaying={setCurrentPlaying}
                />
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
