import React, { Component } from "react";
import { Route } from "react-router-dom";

import "./App.css";
import Home from "./components/home";

class App extends Component {
  render() {
    return (
      <div className="has-text-centered">
        <Route exact path="/" component={Home} />
      </div>
    );
  }
}

export default App;
