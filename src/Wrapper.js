import React, { Component, Fragment } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import "bulma/css/bulma.css";

import App from "./App";
import Landing from "./Landing";

class Wrapper extends Component {
  render() {
    let loggedIn = true;
    return (
      <Fragment>
        {/* if logged in <App>, if not <Landing> */}
        <Switch>
          <Route
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
          />
          <Route path="/" component={Landing} />
        </Switch>
      </Fragment>
    );
  }
}

export default Wrapper;
