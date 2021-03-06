import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import "./index.css";
import App from "./App";

/* import promise from "redux-promise";
import logger from "redux-logger"; */
import thunk from "redux-thunk";

import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import rootReducer from "./store/reducers";
import fbConfig from "./config/fbConfig";

/* let middleware = applyMiddleware(
  thunk.withExtraArgument({ getFirebase, getFirestore }),
  promise,
  logger
); */

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reactReduxFirebase(fbConfig, {
      userProfile: "users",
      useFirestoreForProfile: true,
      attachAuthIsReady: true
    }), // redux binding for firebase
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

/* let store = createStore(
  rootReducer,
  compose(
    middleware,
    reduxFirestore(fbConfig),
    // retrieve profile info from firebase
    reactReduxFirebase(fbConfig, {
      useFirestoreForProfile: true,
      userProfile: "users",
      attachAuthIsReady: true
    })
    /*     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
     
  )
); */

store.firebaseAuthIsReady.then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.getElementById("root")
  );
});
