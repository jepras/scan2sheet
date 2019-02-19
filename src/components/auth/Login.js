import React, { Component } from "react";
import { connect } from "react-redux";
import {
  signIn,
  handleChangeMail,
  handleChangePassword
} from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class Login extends Component {
  handleChangeMail = e => {
    console.log(this.props);
    this.props.handleChangeMail(e.target.value);
  };
  handleChangePassword = e => {
    this.props.handleChangePassword(e.target.value);
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.signIn();
  };

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to="/app" />;

    return (
      <section>
        <div className="hero-inner columns is-mobile">
          <div className="hero-copy text-center column is-half is-offset-one-quarter">
            <form className="white" onSubmit={this.handleSubmit}>
              <h1 className="grey-text text-darken-3">Sign In</h1>
              <div className="field">
                <input
                  placeholder="Email"
                  className="control input"
                  type="email"
                  id="email"
                  onChange={this.handleChangeMail}
                />
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
                  Login
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
    authError: state.auth.authError,
    auth: state.firebase.auth
  };
};

// map dispatch to props, to get access to sign in action from auth actions
const mapDispatchToProps = dispatch => {
  return {
    // creds is equal to credentials in signIn action in authActions
    signIn: creds => dispatch(signIn(creds)),
    handleChangeMail: mail => dispatch(handleChangeMail(mail)),
    handleChangePassword: password => dispatch(handleChangePassword(password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
