import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";

import authReducer from "./authReducer";
import profileReducer from "./profileReducer";

const rootReducer = combineReducers({
  // firestoreReducer syncs data in database to firestore
  firestore: firestoreReducer,
  // for login
  firebase: firebaseReducer,
  auth: authReducer,
  profile: profileReducer
});

export default rootReducer;

// the key name will be the data property on the state object
