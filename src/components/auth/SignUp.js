import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  signUp,
  handleChangeMail,
  handleChangePassword,
  handleChangeUsername
} from "../../store/actions/authActions";

class SignUp extends Component {
  handleChangeUsername = e => {
    console.log(this.props);
    this.props.handleChangeUsername(e.target.value);
  };
  handleChangeMail = e => {
    this.props.handleChangeMail(e.target.value);
  };
  handleChangePassword = e => {
    this.props.handleChangePassword(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signUp();
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/app" />;

    return (
      <section className="">
        <div className="margin-top" />
        <div className="hero-inner columns is-mobile">
          <div className="hero-copy text-center column is-half is-offset-one-quarter">
            <form className="white" onSubmit={this.handleSubmit}>
              <h1 className="hero-title mt-0 is-revealing">Sign Up</h1>

              <div className="field">
                <input
                  placeholder="Username"
                  className="control input"
                  type="text"
                  id="username"
                  onChange={this.handleChangeUsername}
                />
              </div>
              <div className="field">
                <div className="control">
                  <input
                    placeholder="Email"
                    className="input"
                    type="email"
                    id="email"
                    onChange={this.handleChangeMail}
                  />
                </div>
              </div>

              <div className="field">
                <input
                  placeholder="Password"
                  className="control input"
                  type="password"
                  id="password"
                  onChange={this.handleChangePassword}
                />
              </div>

              <div className="field">
                <button className="button button-primary button-shadow">
                  Sign Up
                </button>
                <div className="red-text center">
                  {authError ? <p>{authError}</p> : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // set signUp props to response to signUp action from authActions
    signUp: creds => dispatch(signUp(creds)),
    handleChangeUsername: username => dispatch(handleChangeUsername(username)),
    handleChangeMail: mail => dispatch(handleChangeMail(mail)),
    handleChangePassword: password => dispatch(handleChangePassword(password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
