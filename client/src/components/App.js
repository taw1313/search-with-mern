import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Articles from "../pages/Articles";
import Search from "../pages/Search";
import Nav from "./Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={Search} />
        <Route exact path="/articles" component={Articles} />
      </Switch>
    </div>
  </Router>
);

export default App;