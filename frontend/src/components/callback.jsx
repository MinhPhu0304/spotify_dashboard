import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

export function CallBackPage() {
  const navigate = useNavigate();
  const [loading, toggleLoading] = useState(true);
  const [failedLogin, setFailedLogin] = useState(false);
  useEffect(() => {
    const params = new URL(document.location).searchParams;
    toggleLoading(!loading);
    if (params.get("token") != null) {
      Cookies.set("spotifyToken", params.get("token"), { expires: 2 / 48 }); //expire 1 hour from now
      setTimeout(() => navigate("/dashboard"), 200);
    } else {
      setFailedLogin(true);
    }
  }, [loading, navigate]);
  return (
    <div>
      <h1>Almost there</h1>
      {loading && <div className="donut" />}
      <div>
        {failedLogin && <p> Failed to authenticate you with Spotify </p>}
      </div>
    </div>
  );
}
