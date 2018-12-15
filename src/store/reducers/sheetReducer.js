const initState = {};

// eslint-disable-next-line
const sheetReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_DATA":
      console.log("create data", action.item);
      return state;
    case "CREATE_DATA_ERROR":
      console.log("create data error,", action.err);
      return state;
    case "DELETE_DATA":
      console.log("delete data", action.task);
      return state;
    case "DELETE_DATA_ERROR":
      console.log("delete data error,", action.err);
      return state;
    default:
      return state;
  }
};

export default sheetReducer;
