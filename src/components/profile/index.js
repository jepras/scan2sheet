import React, { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { connect } from "react-redux";

import Personal from "./Personal";
import Sheets from "./Sheets";
import Account from "./Account";

import BarcodeScanner from "../common/img/barcode-scanner.png";

class Profile extends Component {
  render() {
    return (
      <div className="container">
        <div className="text-center py-5">
          <img
            src={BarcodeScanner}
            alt="Scan check"
            style={{ maxWidth: "10%" }}
          />
        </div>
        <div className="row">
          <div className="col-sm-4">
            <h4 className="h4">
              <span className="text-muted d-flex mb-3">Settings</span>
            </h4>
            <ul className="list-group mb-3">
              <Link to="/app/profile">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Personal</h6>
                    <small className="text-muted">
                      Update your personal information
                    </small>
                  </div>
                </li>
              </Link>
              <Link to="/app/profile/sheets">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Sheets</h6>
                    <small className="text-muted">
                      Add & update pricelists
                    </small>
                  </div>
                </li>
              </Link>
              <Link to="/app/profile/account">
                <li className="list-group-item d-flex justify-content-between lh-condensed">
                  <div>
                    <h6 className="my-0">Account</h6>
                    <small className="text-muted">
                      Check your subscription
                    </small>
                  </div>
                </li>
              </Link>
            </ul>
          </div>
          <div className="col-sm-8">
            <Switch>
              <Route exact path="/app/profile" component={Personal} />
              <Route path="/app/profile/sheets" component={Sheets} />
              <Route path="/app/profile/account" component={Account} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /* signOut: () => dispatch(signOut()) */
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
