import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

export function ArtistPage() {
  let { id } = useParams();
  const [artistInfo, setArtistInfo] = useState();
  const history = useHistory()

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
      history.pushState("/")
      return
    } 
    fetchArtist();
  }, [fetchArtist, history]);

  if (!artistInfo) {
    return null;
  }

  return (
    <>
      <h1>{artistInfo.artist.name}</h1>
    </>
  );
}
