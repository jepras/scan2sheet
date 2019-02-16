import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

/* exact /app/path or just /path */

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <p>App Page</p>
        {/* <LoggedInHeader />
        switch only renders one 
        <Switch>
          <Route path="/" component={AppPage} />
          <Route path="/pricelist/:id" component={OldHome} />
        </Switch>
        <Footer /> */}
      </React.Fragment>
    );
  }
}

export default App;
