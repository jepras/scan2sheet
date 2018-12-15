import airtableRecord from "./airtableReducer";
import sheetReducer from "./sheetReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

const rootReducer = combineReducers({
  // firestoreReducer syncs data in database to firestore
  firestore: firestoreReducer,
  // for login
  firebase: firebaseReducer,
  airtableRecord,
  sheetReducer
});

export default rootReducer;

// the key name will be the data property on the state object
