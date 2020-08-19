import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./Home";
import VaccinePage from "./VaccinePage.jsx";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/vaccine" component={VaccinePage}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
