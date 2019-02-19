import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

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
    console.log(this.props);
    this.props.signOut();
  };

  render() {
    const { authError, auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;

    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
          <Link to="/" className="navbar-item is-vcentered">
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
              <DropdownToggle nav caret>
                Name
              </DropdownToggle>

              <DropdownMenu>
                <DropdownItem>Profile</DropdownItem>
                <DropdownItem>Settings</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.signOut}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Collapse>
        </nav>
      </div>
    );
  }
}

/* const LoggedOutHeader = props => {
  console.log(props);

  return (
    <div>
      <nav
        className="navbar is-transparent is-fixed-top is-primary"
        role="navigation"
        aria-label="main navigation"
        style={{ opacity: 0.8, backgroundColor: "#00d1b2" }}
      >
        <div className="navbar-brand is-vcentered">
          <NavLink to="/" className="navbar-item">
            Scan2sheet
          </NavLink>

          <NavLink
            to="/scan"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Scan
          </NavLink>

          <NavLink
            to="/profile"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Profil
          </NavLink>
          <NavLink to="/" className="btn btn-floating pink lighten-1">
            JR
          </NavLink>

          <NavLink
            style={{ fontWeight: "bold", color: "black" }}
            className="navbar-item"
            to="/"
            onClick={props.signOut}
          >
            Logout
          </NavLink>
        </div>
      </nav>
    </div>
  );
}; */

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => dispatch(signOut())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInHeader);
