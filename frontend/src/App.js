import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import { OAuthButton } from 'components/home'
import { Dashboard } from 'components/dashboard'
import { CallBackPage } from 'components/callback'

function App() {
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
