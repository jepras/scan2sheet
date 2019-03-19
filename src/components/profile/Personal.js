import React, { Component } from "react";
import { connect } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  updateFirst,
  updateLast,
  updateUsername,
  updateEmail,
  updateCompany,
  profileSubmit
} from "../../store/actions/profileActions";

class Personal extends Component {
  updateFirst = e => {
    this.props.updateFirst(e.target.value);
  };

  updateLast = e => {
    console.log(e.target.value);
    this.props.updateLast(e.target.value);
  };

  updateUsername = e => {
    console.log(e.target.value);

    this.props.updateUsername(e.target.value);
  };

  updateEmail = e => {
    console.log(e.target.value);
    this.props.updateEmail(e.target.value);
  };

  updateCompany = e => {
    this.props.updateCompany(e.target.value);
  };

  profileSubmit = e => {
    e.preventDefault();
    this.props.profileSubmit();
    document.getElementById("profile-form").reset();
  };

  componentDidUpdate(prevProps) {
    if (
      this.props.profileError.updateError !== prevProps.profileError.updateError
    ) {
      if (this.props.profileError.updateError === "success") {
        this.notifySuccess();
        console.log("notify success!");
      } else if (this.props.profileError.updateError === "fail") {
        this.notifyError();
      }
    }
  }

  notifySuccess = () => toast.success("Profile updated");
  notifyError = () => toast.error("Error, please refresh");

  render() {
    const { profile } = this.props;
    console.log("profile", profile);

    return (
      <React.Fragment>
        <h2 className="h4">
          <span className="d-flex mb-3">Personal Information</span>
        </h2>
        <form
          className="needs-validation"
          noValidate=""
          onSubmit={this.profileSubmit}
          id="profile-form"
        >
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="firstName">First name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder={profile.first}
                onChange={this.updateFirst}
              />
              <div className="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="lastName">Last name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                placeholder={profile.last}
                onChange={this.updateLast}
              />
              <div className="invalid-feedback">
                Valid last name is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="username">Username</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input
                type="text"
                className="form-control"
                id="username"
                placeholder={profile.username}
                onChange={this.updateUsername}
              />
              <div className="invalid-feedback" style={{ width: "100%" }}>
                Your username is required.
              </div>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              className="form-control"
              id="email"
              placeholder={profile.mail}
              onChange={this.updateEmail}
            />
            <div className="invalid-feedback">
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="address">Company</label>
            <input
              type="text"
              className="form-control"
              id="company"
              placeholder={profile.company}
              onChange={this.updateCompany}
            />
            <div className="invalid-feedback">
              Please enter your company name
            </div>
          </div>

          <hr className="mb-4" />

          <button className="btn btn-primary btn-lg btn-block" type="submit">
            Update Profile
          </button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    profile: state.firebase.profile,
    profileError: state.profile
  };
};

const mapDispatchToProps = dispatch => {
  return {
    profileSubmit: () => dispatch(profileSubmit()),
    updateFirst: first => dispatch(updateFirst(first)),
    updateLast: last => dispatch(updateLast(last)),
    updateUsername: username => dispatch(updateUsername(username)),
    updateEmail: email => dispatch(updateEmail(email)),
    updateCompany: company => dispatch(updateCompany(company))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Personal);
