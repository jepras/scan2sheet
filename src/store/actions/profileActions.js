import * as types from "../constants/ActionTypes";
import firebase from "../../config/fbConfig";

// PERSONAL PROFILE ACTIONS
export function updateFirst(first) {
  return { type: types.UPDATE_FIRSTNAME, first };
}

export function updateLast(last) {
  return { type: types.UPDATE_LASTNAME, last };
}

export function updateUsername(username) {
  return { type: types.UPDATE_USERNAME, username };
}

export function updateEmail(email) {
  return { type: types.UPDATE_EMAIL, email };
}

export function updateCompany(company) {
  return { type: types.UPDATE_COMPANY, company };
}

export const profileSubmit = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    console.log(getState());
    const { first, last, username, email, company } = getState().profile;
    console.log(first, last, email);
    var userid = firebase.auth().currentUser.uid;
    console.log(getState().firebase.profile);
    const firebaseState = getState().firebase.profile;

    firestore
      .collection("users")
      // create new document with userId
      .doc(userid)
      .update({
        first: first ? first : firebaseState.first,
        last: last ? last : firebaseState.last,
        username: username ? username : firebaseState.username,
        email: email ? email : firebaseState.email,
        company: company ? company : firebaseState.company
      })
      .then(() => {
        dispatch({ type: "UPDATE_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_ERROR", err });
      });
  };
};

// ACCOUNT ACTIONS
export const authGoogle = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // Initiate Google Provider
    var provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider);
    // Add scope (optionally)
    provider.addScope("https://www.googleapis.com/auth/spreadsheets");

    firebase
      .auth()
      .currentUser.linkWithPopup(provider)
      .then(function(result) {
        // Accounts successfully linked.
        var credential = result.credential;
        var user = result.user;
        console.log("result from redux: ", result);
        // ...
        dispatch(accountSuccess(credential, user));
      })
      .then(function(result) {
        window.gapi.auth2
          .getAuthInstance()
          .signIn({
            scope: "https://www.googleapis.com/auth/spreadsheets"
          })
          .then(
            function(success) {
              // Login API call is successful
              console.log("success from login", success);
              /* dispatch(clientSuccess()); */
            },
            function(error) {
              // Error occurred
              console.log(error);
            }
          );
      })
      .catch(function(error) {
        // Handle Errors here.
        // ...
      });
  };
};

export function accountSuccess(credential, user) {
  return { type: types.ACCOUNT_SUCCESS, credential, user };
}

export function clientSuccess() {
  return { type: types.CLIENT_SUCCESS };
}

export const unlink = user => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    user
      .unlink("google.com")
      .then(function() {
        // Auth provider unlinked from account
        console.log("user unlinked");
        dispatch(unlinkSuccess());
        window.gapi.auth2.getAuthInstance().signOut();
      })
      .catch(function(error) {
        // An error happened
      });
  };
};

export function unlinkSuccess() {
  return { type: types.UNLINK_SUCCESS };
}

export function updateLink(link) {
  return { type: types.UPDATE_LINK, link };
}

export const linkSubmit = () => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    console.log(getState());
    const { link } = getState().profile;

    var userid = firebase.auth().currentUser.uid;

    const firebaseState = getState().firebase.profile;

    // TODO: ERASE FIRST PART AND END OF https://docs.google.com/spreadsheets/d/1dlShpPk9R4DU8wkupSBG7j8QSiKL3XFWBTJPMACyOy8/edit#gid=872166141
    // Remove beginning of url
    var startRemoved = link
      .split("https://docs.google.com/spreadsheets/d/")
      .join("");
    // Find index of seperator between id and junk
    var n = startRemoved.indexOf("/");
    // Remote everything after
    var linkId = startRemoved
      .split("")
      .splice(0, n)
      .join("");
    console.log(linkId);

    firestore
      .collection("users")
      // create new document with userId
      .doc(userid)
      .update({
        link: link ? link : firebaseState.link
      })
      .then(() => {
        dispatch({ type: "UPDATE_LINK_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "UPDATE_LINK_ERROR", err });
      });
  };
};
