import { useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { captureException } from "@sentry/react";

import { TopArtist } from "./topArtists";
import "../index.css";
import { TopTracks } from "./topTracks";
import { RecentlyPlayed } from "./recentlyPlayed";
import { fetchResource } from "components/api";

export function Dashboard() {
  const [artistList, setArtistList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getRecentlyPlayed = useCallback(() => {
    fetchResource(
      `${process.env.REACT_APP_API_ENDPOINT}/personal/recently_played`
    )
      .then((data) => {
        setRecentlyPlayed(data);
      })
      .catch((err) => {
        captureException(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTopTracks = useCallback(() => {
    return fetchResource(
      `${process.env.REACT_APP_API_ENDPOINT}/personal/top_tracks`
    )
      .then((topTracks) => {
        setTopTracks(topTracks);
        setLoading(false);
      })
      .catch((err) => captureException(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTopArtists = useCallback(() => {
    return fetchResource(
      `${process.env.REACT_APP_API_ENDPOINT}/personal/top_artists`
    )
      .then((data) => {
        setLoading(false);
        setArtistList(data);
      })
      .catch((e) => {
        captureException(e);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (Cookies.get("spotifyToken") == null) {
      history.push("/");
    }
    Promise.all([getTopArtists(), getTopTracks(), getRecentlyPlayed()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRecentlyPlayed, getTopArtists, getTopTracks]);

  return (
    <div>
      <h1 className="Hero__title">
        Your Top Artists in {new Date().getFullYear()}
      </h1>
      {loading && <div className="donut" />}
      <div className="list__container">
        <TopArtist artistList={artistList} />
      </div>
      <h1 className="Hero__title">Your Top Tracks</h1>
      {loading && <div className="donut" />}
      <div className="list__container">
        <TopTracks topTracks={topTracks} />
      </div>
      <h1 className="Hero__title">Recently Played </h1>
      {loading && <div className="donut" />}
      <div className="list__container">
        <RecentlyPlayed tracks={recentlyPlayed} />
      </div>
    </div>
  );
}
