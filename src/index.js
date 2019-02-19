// react
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// redux
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// firebase
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";

// import from tree
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import Wrapper from "./Wrapper";
import rootReducer from "./store/reducers";
import fbConfig from "./config/fbConfig";

// devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// create store
const store = createStore(
  rootReducer,
  composeEnhancers(
    // enhance with Firebase
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    // enable profile
    reactReduxFirebase(fbConfig, {
      userProfile: "users",
      useFirestoreForProfile: true,
      attachAuthIsReady: true
    }),
    // redux binding for firebase
    reduxFirestore(fbConfig) // app data from https://console.firebase.google.com/project/scan2sheet-1543863118125/overview
  )
);

// when auth is ready, router & app with store wrapped.
store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <Wrapper />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});
