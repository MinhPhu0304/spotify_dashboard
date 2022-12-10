import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import { OAuthButton } from "components/home";
import { Dashboard } from "components/dashboard";
import { CallBackPage } from "components/callback";
import { ArtistPage } from "components/artist";
import { ErrorBoundary } from "@sentry/react";
import { SongDetail } from "components/song";

function App() {
  useEffect(() => {
    // Warming up server
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ping`).catch(() => {});
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/song/:id"
          element={
            <ErrorBoundary>
              <SongDetail />
            </ErrorBoundary>
          }
        />
        <Route
          path="/artist/:id"
          element={
            <ErrorBoundary>
              <ArtistPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/callback"
          element={
            <ErrorBoundary>
              <CallBackPage />
            </ErrorBoundary>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          }
        />
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <OAuthButton />
            </ErrorBoundary>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
