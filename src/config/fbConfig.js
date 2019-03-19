import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

/* Client ID: 865616064235-ba4eh0l1799okm9fvngfancr6o7a9lft.apps.googleusercontent.com
Client secret: Z2GrGX9D5eh8WlICmPOnwnXj */

var config = {
  apiKey: "AIzaSyC_GCcVWD414IcUAMu2lG1aToCk7n2x9m4",
  authDomain: "scan2sheet-1543863118125.firebaseapp.com",
  databaseURL: "https://scan2sheet-1543863118125.firebaseio.com",
  projectId: "scan2sheet-1543863118125",
  storageBucket: "scan2sheet-1543863118125.appspot.com",
  messagingSenderId: "865616064235",
  discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
  spreadsheetId: "1KTArYwDWrn52fnc7B12KvjRb6nmcEaU6gXYehWfsZSo"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();

export default firebase;
