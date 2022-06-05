import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import { OAuthButton } from "components/home";
import { Dashboard } from "components/dashboard";
import { CallBackPage } from "components/callback";
import { ArtistPage } from 'components/artist'

function App() {
  useEffect(() => {
    // Warming up server
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ping`).catch(() => {}); 
  }, []);

  return (
    <Router>
        <Switch>
          <Route path="/artist/:id" exact>
            <ArtistPage />
          </Route>
          <Route path="/callback">
            <CallBackPage />
          </Route>
          <Route path="/dashboard" exact>
            <Dashboard />
          </Route>
          <Route path="/">
            <OAuthButton />
          </Route>
        </Switch>
    </Router>
  );
}

export default App;
