import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="has-text-centered">
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
