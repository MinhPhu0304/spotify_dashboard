import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import { OAuthButton } from "components/home";
import { Dashboard } from "components/dashboard";
import { CallBackPage } from "components/callback";
import { ArtistPage } from "components/artist";
import { ErrorBoundary } from "@sentry/react";

function App() {
  useEffect(() => {
    // Warming up server
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ping`).catch(() => {});
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/artist/:id" exact>
          <ErrorBoundary>
            <ArtistPage />
          </ErrorBoundary>
        </Route>
        <Route path="/callback">
          <ErrorBoundary>
            <CallBackPage />
          </ErrorBoundary>
        </Route>
        <Route path="/dashboard" exact>
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        </Route>
        <Route path="/">
          <ErrorBoundary>
            <OAuthButton />
          </ErrorBoundary>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
