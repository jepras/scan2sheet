import * as types from "../constants/ActionTypes";

const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_ERROR":
      // send to own auth state, not firebase auth state
      return {
        ...state,
        authError: "Login failed"
      };
    case "LOGIN_SUCCESS":
      console.log("login success");
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_SUCCESS":
      console.log("sign out success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("signup success");
      console.log(state);
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    case types.HANDLE_CHANGE_USERNAME:
      return Object.assign({}, state, {
        username: action.username
      });
    case types.HANDLE_CHANGE_MAIL:
      return Object.assign({}, state, {
        mail: action.mail
      });
    case types.HANDLE_CHANGE_PASSWORD:
      return Object.assign({}, state, {
        password: action.password
      });
    default:
      return state;
  }
};

export default authReducer;
