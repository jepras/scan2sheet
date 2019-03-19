import React from "react";
import { NavLink, Link } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";

import {
  Collapse,
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem
} from "reactstrap";

class LoggedInHeader extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  signOut = () => {
    this.props.signOut();
  };

  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <Link to="/app" className="navbar-item is-vcentered">
            Scan2sheet
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={this.toggle}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <Collapse isOpen={this.state.isOpen} navbar>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink to="/scan" className="navbar-item" type="link">
                  Scan
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/dashboard" className="navbar-item" type="link">
                  Dashboard
                </NavLink>
              </li>
            </ul>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret className="navbar-item" type="link">
                {profile.username}
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem>
                  <NavLink
                    to="/app/profile"
                    className="navbar-item"
                    type="link"
                  >
                    Profile
                  </NavLink>
                </DropdownItem>
                <DropdownItem className="navbar-item">Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="navbar-item" onClick={this.signOut}>
                  Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect([{ collection: "users" }])
)(LoggedInHeader);
