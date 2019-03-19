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

class Account extends Component {
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
      } else if (this.props.profileError.updateError === "fail") {
        this.notifyError();
      }
    }
  }

  notifySuccess = () => toast.success("Account updated");
  notifyError = () => toast.error("Error, please refresh");

  render() {
    return (
      <React.Fragment>
        <h4 className="h4">
          <span className="d-flex mb-3">Account information</span>
        </h4>

        <div className="row">
          <div className="col-md-12">
            <label>
              Your <strong>Personal</strong> plan is set to <strong>$48</strong>{" "}
              per year and will renew on <strong>March 4th 2020</strong>.
            </label>
            <form
              className="needs-validation"
              noValidate=""
              onSubmit={this.profileSubmit}
              id="profile-form"
            >
              <button
                className="btn btn-primary btn-lg btn-block"
                type="submit"
              >
                Change plan
              </button>
            </form>
            <hr className="mb-4" />
            <div className="mb-3">
              <h4 className="h4">
                <span className="d-flex mb-3">Billing history</span>
              </h4>
              <ul>
                <li>An invoice for $43 is available March 4th, 2019</li>
                <li>A payment for $43 succeeded March 4th, 2019</li>
              </ul>
            </div>

            <div>
              <form
                className="needs-validation"
                noValidate=""
                onSubmit={this.profileSubmit}
                id="profile-form"
              >
                <button
                  className="btn btn-primary btn-lg btn-block"
                  type="submit"
                >
                  Change payment method
                </button>
              </form>
            </div>
          </div>
        </div>
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
)(Account);
