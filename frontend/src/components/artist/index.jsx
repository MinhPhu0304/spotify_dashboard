import { useEffect, useState, useCallback } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

export function ArtistPage() {
  let { id } = useParams();
  const [artistInfo, setArtistInfo] = useState();

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
    fetchArtist();
  }, [fetchArtist]);

  if (!artistInfo) {
    return null;
  }

  return (
    <>
      <h1>{artistInfo.artist.name}</h1>
    </>
  );
}
