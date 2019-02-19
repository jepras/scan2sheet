import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const LoggedInHeader = props => {
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
          <Link to="/" className="navbar-item">
            Scan2sheet
          </Link>

          <Link
            to="/features"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Features
          </Link>
          <Link
            to="/pricing"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Pricing
          </Link>
          <Link
            to="/about"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            About
          </Link>
          <Link
            to="/demo"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Demo
          </Link>
          <Link
            to="/login"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="navbar-item"
            type="link"
            style={{ fontWeight: "bold", color: "black" }}
          >
            Sign up
          </Link>
          <Link
            style={{ fontWeight: "bold", color: "black" }}
            className="navbar-item"
            to="/"
            onClick={props.signOut}
          >
            Logout
          </Link>
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
)(LoggedInHeader);
