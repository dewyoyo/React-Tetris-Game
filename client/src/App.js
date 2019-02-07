import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import NoMatch from "./pages/NoMatch";
import TopNav from "./components/TopNav";

function App() {
  return (
      <Router>
        <div>
          <TopNav />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/signup" render={(props) => <Auth {...props} action="signup" />} />
              <Route exact path="/login" render={(props) => <Auth {...props} action="login" />} />
              <Route component={NoMatch} />
            </Switch>
            </div>
        </div>
      </Router>
  );
}

export default App;
