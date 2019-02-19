import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { connect } from "react-redux";
import { signOut } from "./store/actions/authActions";

import HomePage from "./components/landing/HomePage";
import Features from "./components/landing/Features";
import Pricing from "./components/landing/Pricing";
import About from "./components/landing/About";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";

import Footer from "./components/common/Footer";
import LoggedOutHeader from "./components/common/LoggedInHeader";

class Landing extends Component {
  render() {
    console.log(this.props.signOut);
    return (
      <main>
        <p>Landing Page</p>
        <LoggedOutHeader signOut={this.props.signOut} />
        <Route exact path="/" component={HomePage} />
        <Route path="/features" component={Features} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Footer />
      </main>
    );
  }
}

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
)(Landing);
