import Cookies from "js-cookie";

export const fetchResource = (resource) =>
  fetch(resource, {
    headers: {
      "spotify-token": Cookies.get("spotifyToken"),
    },
  }).then((res) => {
    if (res.status === 401) {
      window.location.pathname = "/";
      return;
    }
    return res.json();
  });
