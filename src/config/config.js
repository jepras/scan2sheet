import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var config = {
  apiKey: "AIzaSyC_GCcVWD414IcUAMu2lG1aToCk7n2x9m4",
  authDomain: "scan2sheet-1543863118125.firebaseapp.com",
  databaseURL: "https://scan2sheet-1543863118125.firebaseio.com",
  projectId: "scan2sheet-1543863118125",
  storageBucket: "scan2sheet-1543863118125.appspot.com",
  messagingSenderId: "865616064235"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
