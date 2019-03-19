import * as types from "../constants/ActionTypes";

const initState = {
  updateError: null
};

const profileReducer = (state = initState, action) => {
  switch (action.type) {
    case "UPDATE_ERROR":
      // send to own auth state, not firebase auth state
      return {
        ...state,
        updateError: "fail"
      };
    case "UPDATE_SUCCESS":
      console.log("UPDATE success");
      return {
        ...state,
        updateError: "success"
      };
    case "UPDATE_LINK_SUCCESS":
      console.log("UPDATE success");
      return {
        ...state,
        updateError: "link success"
      };

    case types.ACCOUNT_SUCCESS:
      console.log("ACCOUNT success");

      return Object.assign({}, state, {
        user: action.user,
        credential: action.credential
      });

    case types.CLIENT_SUCCESS:
      console.log("CLIENT success");

      return Object.assign({}, state, {});

    case types.UNLINK_SUCCESS:
      console.log("UNLINK success");

      return Object.assign({}, state, {
        user: null,
        credential: null,
        userMessage: "unlinked"
      });
    case types.UPDATE_FIRSTNAME:
      return Object.assign({}, state, {
        first: action.first
      });
    case types.UPDATE_LINK:
      return Object.assign({}, state, {
        link: action.link
      });
    case types.UPDATE_LASTNAME:
      return Object.assign({}, state, {
        last: action.last
      });
    case types.UPDATE_USERNAME:
      return Object.assign({}, state, {
        username: action.username
      });
    case types.UPDATE_EMAIL:
      return Object.assign({}, state, {
        email: action.email
      });
    case types.UPDATE_COMPANY:
      return Object.assign({}, state, {
        company: action.company
      });

    case types.GOOGLE_POPUP:
      return Object.assign({}, state, {
        credential: action.credential,
        user: action.user
      });
    case types.GOOGLE_AUTH_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        authError: "success",
        userMessage: "linked"
      });
    case types.GOOGLE_AUTH_FAIL:
      return Object.assign({}, state, {
        ...state,
        authError: "fail"
      });
    default:
      return state;
  }
};

export default profileReducer;
