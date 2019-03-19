import React, { Component } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import firebase from "../../config/fbConfig";
import config from "../../config/config";

import {
  updateLink,
  linkSubmit,
  profileSubmit,
  authGoogle,
  unlink
} from "../../store/actions/profileActions";

const gapi = window.gapi;

class Sheets extends Component {
  componentDidMount() {
    // WORKING!!! Load "client" & "auth2" libraries
    gapi.load("client:auth2", {
      callback: function() {
        // Initialize client & auth libraries
        gapi.client
          .init({
            apiKey: config.apiKey,
            clientId: config.clientId,
            discoveryDocs: [
              "https://sheets.googleapis.com/$discovery/rest?version=v4"
            ],
            scope: "https://www.googleapis.com/auth/spreadsheets"
          })
          .then(
            function(success) {
              // Libraries are initialized successfully
              // You can now make API calls
              console.log("gapi client loaded and initiated", success);
            },
            function(error) {
              // Error occurred
              // console.log(error) to find the reason
              console.log("error");
            }
          );
      },
      onerror: function() {
        // Failed to load libraries
        console.log("error");
      }
    });
  }

  // WWORKING!!! Login button to sign in client
  /* login = () => {
    gapi.auth2
      .getAuthInstance()
      .signIn({
        scope: "https://www.googleapis.com/auth/spreadsheets"
      })
      .then(
        function(success) {
          // Login API call is successful
          console.log("success from login", success);
        },
        function(error) {
          // Error occurred
          console.log(error);
        }
      );
  }; */

  // WORKING!!! Checking user data and getting auth instance
  checkUserData = () => {
    var googleAuth = gapi.auth2.getAuthInstance();
    console.log("google auth", googleAuth);
    console.log("signed in: " + googleAuth.isSignedIn.get());
    var user = googleAuth.currentUser.get();
    console.log("user", user);
    // IF user, start app
    if (user) {
      console.log("start app here");
      this.makeApiCall();
    }
  };

  makeApiCall = () => {
    console.log("initiating API call");
    var params = {
      // The ID of the spreadsheet to retrieve data from.
      spreadsheetId: "1dlShpPk9R4DU8wkupSBG7j8QSiKL3XFWBTJPMACyOy8", // TODO: Update placeholder value.

      // The A1 notation of the values to retrieve.
      ranges: ["A:J"] // TODO: Update placeholder value. // TODO: Update placeholder value.
    };
    console.log("gapi client", gapi.client);
    var request = gapi.client.sheets.spreadsheets.values.batchGet(params);
    request.then(
      function(response) {
        // TODO: Change code below to process the `response` object:
        console.log(response.result);
      },
      function(reason) {
        console.error("error: " + reason.result.error.message);
      }
    );
  };

  updateLink = e => {
    this.props.updateLink(e.target.value);
  };

  linkUser = () => {
    var user = firebase.auth().currentUser;
    console.log("user from linkUser: ", user);

    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .then(function(result) {
        // Accounts successfully linked.

        console.log("result: ", result);
        // ...
      })
      .catch(function(error) {
        // Handle Errors here.
        // ...
      });
  };

  authGoogle = () => {
    console.log("auth Google");
    this.props.authGoogle();
  };

  unlink = () => {
    var fbUser = firebase.auth().currentUser;
    console.log("user to be unlinked", fbUser);

    this.props.unlink(fbUser);
  };

  linkSubmit = e => {
    e.preventDefault();
    this.props.linkSubmit();
    this.makeApiCall();
    document.getElementById("link-form").reset();
  };

  componentDidUpdate(prevProps) {
    if (this.props.profile !== prevProps.profile) {
      if (this.props.profile.user) {
        console.log("profile user", this.props.profile.user);
        this.notifySuccess();
      } else if (this.props.profile.userMessage === "unlinked") {
        this.notifyError();
      } else if (this.props.profile.updateError === "link success") {
        this.notifyLinkSuccess();
      }
    }
  }

  notifySuccess = () => toast.success("Account linked");
  notifyLinkSuccess = () => toast.success("Link submitted");
  notifyError = () => toast.error("Account disabled");
  notifyLinkError = () => toast.error("Link error");

  render() {
    const { profile, firebaseProfile } = this.props;
    console.log("profile.credential", profile.credential);
    console.log("firebaseProfile", firebaseProfile);

    return (
      <React.Fragment>
        {/* TEST BUTTONS <button onClick={this.checkUserData}>checkUserData</button>
        <button onClick={this.login}>login</button>
        <button onClick={this.makeApiCall}>makeApiCall</button> */}

        <h2 className="h4">
          <span className="d-flex mb-3">Add & update sheets</span>
        </h2>
        <div className="mb-3">
          <label>Step 1</label>
          {!profile.credential ? (
            <button
              onClick={this.authGoogle}
              className="btn btn-primary btn-lg btn-block"
              type="submit"
            >
              Authenticate with Google
            </button>
          ) : (
            <button
              onClick={this.unlink}
              className="btn btn-warning btn-md btn-block"
              type="submit"
            >
              Unlink Google
            </button>
          )}
          <button
            onClick={this.unlink}
            className="btn btn-warning btn-md btn-block"
            type="submit"
          >
            Unlink Google
          </button>
          <button
            onClick={this.checkUserData}
            className="btn btn-warning btn-md btn-block"
            type="submit"
          >
            Test Google
          </button>
        </div>
        <div className="mb-3">
          <form
            className="needs-validation"
            noValidate=""
            onSubmit={this.linkSubmit}
            id="link-form"
          >
            <label>Step 2: Input link to file</label>
            <div className="row">
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="copy your sheet url here"
                  onChange={this.updateLink}
                />
              </div>

              <div className="col-sm-2">
                <button
                  className="btn btn-primary btn-md btn-block"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="mb-3">
          <form
            className="needs-validation"
            noValidate=""
            onSubmit={this.profileSubmit}
            id="profile-form"
          >
            <label>Step 4: Start Scanning</label>
          </form>
        </div>
        <hr className="mb-4" />
        <div className="mb-3">
          <h4 className="h4">
            <span className="d-flex mb-3">Sheets uploaded</span>
          </h4>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="firstName">Sheet 1</label>
            </div>
            <div className="col-md-8 mb-3">
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder={profile.last}
                onChange={this.updateLast}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label htmlFor="firstName">Sheet 2</label>
            </div>
            <div className="col-md-8 mb-3">
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder={profile.last}
                onChange={this.updateLast}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    profile: state.profile,
    firebaseProfile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileSubmit: () => dispatch(profileSubmit()),
    updateLink: link => dispatch(updateLink(link)),
    authGoogle: () => dispatch(authGoogle()),
    unlink: user => dispatch(unlink(user)),
    linkSubmit: () => dispatch(linkSubmit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sheets);
