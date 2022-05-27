import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { TopArtist } from "./topArtists";
import "../home/styles.css";
import "./index.css";
import { TopTracks } from "./topTracks";

export function Dashboard() {
  const [artistList, setArtistList] = useState([]);
  const [topTracks, setTopTracks] = useState([]);
  const [loading, toggleLoading] = useState(true);
  useEffect(() => {
    getTopArtists();
    getTopTracks();
  }, []);

  const getTopArtists = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_ENDPOINT}/personal/top_artists`,
      {
        headers: {
          "spotify-token": Cookies.get("spotifyToken"),
        },
      }
    );
    if (response.ok) {
      const data = await response.json().finally(() => toggleLoading(!loading));
      setArtistList(data);
      toggleLoading(!loading);
    }
  };

  const getTopTracks = () => {
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/personal/top_tracks`, {
      headers: {
        "spotify-token": Cookies.get("spotifyToken"),
      },
    })
      .then((res) => res.json())
      .then(setTopTracks)
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h1>Your Top Artists in {new Date().getFullYear()}</h1>
      <div
        className="donut"
        style={{ display: loading ? "inline-block" : "none" }}
      />
      <div className="Top_artists_list__container">
        <TopArtist artistList={artistList} />
      </div>
      <h1>Your Top Tracks</h1>
      <div
        className="donut"
        style={{ display: loading ? "inline-block" : "none" }}
      />
      <div className="Top_artists_list__container">
        <TopTracks topTracks={topTracks} />
      </div>
    </div>
  );
}
