import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/home";
import Front from "./components/home/Front";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Front} />
          <Route path="/pricelist/:id" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
