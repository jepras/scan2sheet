export const createSheet = item => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // store database in firestore
    const firestore = getFirestore();
    console.log(item.kolVareBeskrivelse);

    // redux state
    // getState gives us state object where we can fetch
    /* const profile = getState().firebase.profile;
    // get id attached to user profile -- IMPORTANT
    const authorId = getState().firebase.auth.uid; */

    // get collection
    firestore
      .collection("sheets")
      .doc(item.sheetName)
      .set({
        // use data from parameter item (where title is from createData component)
        ...item,
        name: item.sheetName,
        createdAt: new Date()
      })
      .then(() => {
        dispatch({ type: "CREATE_DATA", item });
      })
      .catch(err => {
        dispatch({ type: "CREATE_DATA_ERROR", err });
      });
  };
};

export const deleteData = (id, task) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection("tasks")
      .doc(task.title)
      .delete()
      .then(() => {
        dispatch({ type: "DELETE_DATA", task });
      })
      .catch(err => {
        dispatch({ type: "DELETE_DATA_ERROR", err });
      });
  };
};
