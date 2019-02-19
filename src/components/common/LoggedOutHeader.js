import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

import { Collapse } from "reactstrap";

class LoggedOutHeader extends React.Component {
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

  render() {
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
                <Link to="/features" className="navbar-item" type="link">
                  Features
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/pricing" className="navbar-item" type="link">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="navbar-item" type="link">
                  About
                </Link>
              </li>
            </ul>
            <Link to="/demo" className="navbar-item" type="link">
              Demo
            </Link>
            <Link to="/login" className="navbar-item" type="link">
              Login
            </Link>
            <Link to="/signup" className="navbar-item" type="link">
              Sign up
            </Link>
          </Collapse>
        </nav>
      </div>
    );
  }
}

/* const LoggedOutHeader = props => {
  return (
    <div>
      
      <nav
        className="navbar is-transparent is-fixed-top is-primary"
        role="navigation"
        aria-label="main navigation"
        style={{ opacity: 0.8, backgroundColor: "#00d1b2" }}
      >
        <div className="navbar-brand is-vcentered">
          

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
)(LoggedOutHeader);
