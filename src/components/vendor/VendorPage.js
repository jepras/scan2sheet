// react
import React, { Component, PropTypes } from "react";

// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

// actions & tree
import * as courseActions from "../../actions/courseActions";
import VendorSearchModal from "./VendorSearchModal";

/* CONTAINER COMPONENT */
class VendorPage extends Component {
  /* add functions */

  render() {
    /* Import state from props - const { x } = this.props; */

    /* Render values based on sheet in state */
    return (
      <div className="jumbotron">
        <h1>Vendor name</h1>
        <p>input field</p>
        <p>
          airtable embed presentional component based on state airtableId &
          updatedState
        </p>
        {/* modals */}
      </div>
    );
  }
}

/* VendorPage.propTypes = {
  x: PropTypes.array.isRequired,
  y: PropTypes.object.isRequired
}; */

function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  return {
    /* take name from courseReducer */
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    /* bindActionCreators will look through all courseActions with the name dispatched */
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VendorPage);

// For connecting to Firebase sheets.
/* export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([{ collection: "sheets" }])
  )(VendorPage); */
