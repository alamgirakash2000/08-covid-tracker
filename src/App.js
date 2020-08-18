import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./Home";
import VaccinePage from "./VaccinePage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Redirect exact from="/" to="/home" />
      <Switch>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route path="/vaccine">
          <VaccinePage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
