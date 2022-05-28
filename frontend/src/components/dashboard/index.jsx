import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import { captureException } from "@sentry/react";

import { TopArtist } from "./topArtists";
import "../home/styles.css";
import "./index.css";
import "./artist.css";
import { TopTracks } from "./topTracks";
import { RecentlyPlayed } from "./recentlyPlayed";

export function Dashboard() {
  const [artistList, setArtistList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const getRecentlyPlayed = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/personal/recently_played`, {
      headers: {
        "spotify-token": Cookies.get("spotifyToken"),
      },
    })
      .then((res) => {
        if (res.status === 401) {
          history.push("/");
        } else {
          return res.json();
        }
      })
      .then((data) => {
        setRecentlyPlayed(data);
      })
      .catch((err) => {
        captureException(err);
      });
  };

  useEffect(() => {
    if (Cookies.get("spotifyToken") == null) {
      history.push("/");
    }
    Promise.all([getTopArtists(), getTopTracks(), getRecentlyPlayed()]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getTopArtists = () => {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/personal/top_artists`, {
      headers: {
        "spotify-token": Cookies.get("spotifyToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setArtistList(data);
      })
      .catch((e) => {
        captureException(e);
        setLoading(false);
      });
  };

  const getTopTracks = () => {
    return fetch(`${process.env.REACT_APP_API_ENDPOINT}/personal/top_tracks`, {
      headers: {
        "spotify-token": Cookies.get("spotifyToken"),
      },
    })
      .then((res) => res.json())
      .then(setTopTracks)
      .catch((err) => captureException(err));
  };

  return (
    <div>
      <h1 className="Hero__title">
        Your Top Artists in {new Date().getFullYear()}
      </h1>
      <div
        className="donut"
        style={{ display: loading ? "inline-block" : "none" }}
      />
      <div className="Top_artists_list__container">
        <TopArtist artistList={artistList} />
      </div>
      <h1 className="Hero__title">Your Top Tracks</h1>
      <div
        className="donut"
        style={{ display: loading ? "inline-block" : "none" }}
      />
      <div className="Top_artists_list__container">
        <TopTracks topTracks={topTracks} />
      </div>
      <h1 className="Hero__title">Recently Played </h1>
      <div
        className="donut"
        style={{ display: loading ? "inline-block" : "none" }}
      />
      <div className="Top_artists_list__container">
        <RecentlyPlayed tracks={recentlyPlayed} />
      </div>
    </div>
  );
}
