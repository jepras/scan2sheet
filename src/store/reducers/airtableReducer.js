import {
  INVALIDATE_ROW,
  REQUEST_RECORD,
  RECEIVE_RECORD,
  NEW_ROW
} from "../actions/airtableActions";

function posts(
  state = {
    isFetching: false,
    didInvalidate: false,
    items: []
  },
  action
) {
  switch (action.type) {
    case NEW_ROW:
      return {
        ...state,
        items: action.posts
      };
    case INVALIDATE_ROW:
      return {
        didInvalidate: true
      };
    /* return Object.assign({}, state, {
        didInvalidate: true
      }); */
    case REQUEST_RECORD:
      /* return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      }); */
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_RECORD:
      /* var tis = Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
        id: action.id
      });
      return tis; */
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt,
        id: action.id
      };
    default:
      return state;
  }
}

export default posts;
