import React, { Component } from "react";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

/* import * as x from "actions"; */
import VendorForm from "./VendorForm";

/* CONTAINER COMPONENT */
export class ManageVendorPage extends Component {
  render() {
    return (
      <div>
        <h1>Manage vendors</h1>
        <p>Vendorlist - on click open & change values</p>
      </div>
    );
  }
}

/* ManageVendorPage.propTypes = {
  x: PropTypes.object.isRequired,
  y: PropTypes.array.isRequired,

};
*/

function mapStateToProps(state, ownProps) {
  const vendorId = ownProps.params.id;
  /* get vendorId */
  return {};
}
function mapDispatchToProps(dispatch) {
  /* return {
    actions: bindActionCreators(ACTIONNAME, dispatch)
  }; */
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageVendorPage);
