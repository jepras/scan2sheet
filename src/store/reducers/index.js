import airtableRecord from "./airtableReducer";
import sheetReducer from "./sheetReducer";
import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";

const rootReducer = combineReducers({
  // firestoreReducer syncs data in database to firestore
  firestore: firestoreReducer,
  // for login
  firebase: firebaseReducer,
  airtableRecord: airtableRecord,
  sheetReducer: sheetReducer,
  auth: authReducer
});

export default rootReducer;

// the key name will be the data property on the state object
