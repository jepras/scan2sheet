import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import AppPage from "./components/app/AppPage";
import Profile from "./components/profile";
import Footer from "./components/common/Footer";
import LoggedInHeader from "./components/common/LoggedInHeader";

/* exact /app/path or just /path */

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <LoggedInHeader signOut={this.props.signOut} />

        <Switch>
          <Route path="/app" component={AppPage} />
          <Route path="/app/profile" component={Profile} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
