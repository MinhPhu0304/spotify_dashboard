import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useEffect } from "react";

import "./App.css";
import { OAuthButton } from "components/home";
import { Dashboard } from "components/dashboard";
import { CallBackPage } from "components/callback";

function App() {
  useEffect(() => {
    // Warming up server
    fetch(`${process.env.REACT_APP_API_ENDPOINT}/ping`).catch(() => {}); 
  }, []);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/callback">
            <CallBackPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <OAuthButton />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
