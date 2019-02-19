import * as types from "../constants/ActionTypes";

export const signIn = () => {
  return (dispatch, getState, { getFirebase }) => {
    // communicate with database
    const firebase = getFirebase();
    console.log(getState());
    const { mail, password } = getState().auth;
    console.log(mail);

    firebase
      .auth()
      .signInWithEmailAndPassword(mail, password)
      .then(() => {
        dispatch({ type: "LOGIN_SUCCESS" });
      })
      .then(() => {
        this.props.history.push("/app");
        console.log("pushing to app");
      })
      .catch(err => {
        dispatch({ type: "LOGIN_ERROR", err });
      });
  };
};

/* export const updateProfile = (authId, state) => {
  return (dispatch, getState { getFirebase } ) => {
    const firebase = getFirebase();   

    firebase
    .collection("users")
    .doc(authId)
    .set("type": state.fields)
  }
} */

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: "SIGNOUT_SUCCESS" });
      });
  };
};

// newUser to store newUser
export const signUp = () => {
  // need firebase for auth, firestore for collections
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    console.log(getState());
    const { username, mail, password } = getState().auth;
    console.log(username);
    // firebase method to authenticate and create newUser
    firebase
      .auth()
      .createUserWithEmailAndPassword(mail, password)
      .then(resp => {
        console.log(resp);
        // from response we can get user id
        // if collection doesnt exist, firestore will create. Here we create it in firestore.
        return (
          firestore
            .collection("users")
            // create new document with userId
            .doc(resp.user.uid)
            .set({
              username: username,
              mail: mail
            })
        );
      })
      .then(() => {
        dispatch({ type: "SIGNUP_SUCCESS" });
      })
      .catch(err => {
        dispatch({ type: "SIGNUP_ERROR", err });
      });
  };
};

// handle login change
export function handleChangeUsername(username) {
  return { type: types.HANDLE_CHANGE_USERNAME, username };
}

export function handleChangeMail(mail) {
  return {
    type: types.HANDLE_CHANGE_MAIL,
    mail
  };
}

export function handleChangePassword(password) {
  return { type: types.HANDLE_CHANGE_PASSWORD, password };
}
