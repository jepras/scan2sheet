import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import "bulma/css/bulma.css";

import App from "./App";
import Landing from "./Landing";

class Wrapper extends Component {
  render() {
    const loggedIn = true;
    return (
      <Fragment>
        {/* if logged in <App>, if not <Landing> */}
        <Switch>
          <Route path="/app" component={App} />
          <Route path="/" component={Landing} />
          {/* <Route exact path="/about" component={About} /> // works */}
          {/* <Route
            path="/app"
            render={() =>
              loggedIn ? (
                <App />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
              )
            }
          /> */}
        </Switch>
      </Fragment>
    );
  }
}

export default Wrapper;
