import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import { OAuthButton } from 'components/home'
import { Dashboard } from 'components/dashboard'

function App() {
  return (
    <Router>
      <div>
        <Switch>
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
