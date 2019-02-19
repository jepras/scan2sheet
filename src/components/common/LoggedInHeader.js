import React from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const LoggedOutHeader = props => {
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
            to="/dashboard"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Dashboard
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
};

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
)(LoggedOutHeader);
