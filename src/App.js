import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";

import AppPage from "./components/app/AppPage";
import Profile from "./components/profile";
import Scan from "./components/scan";
import Dashboard from "./components/dashboard";
import Footer from "./components/common/Footer";
import LoggedInHeader from "./components/common/LoggedInHeader";

/* exact /app/path or just /path */

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <LoggedInHeader signOut={this.props.signOut} />

        <Switch>
          <Route exact path="/app" component={AppPage} />
          <Route path="/app/profile" component={Profile} />
          <Route path="/app/scan" component={Scan} />
          <Route path="/app/dashboard" component={Dashboard} />
        </Switch>

        <ToastContainer autoClose={4000} />
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
