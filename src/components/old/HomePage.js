import React, { Component } from "react";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";
import { Link } from "react-router-dom";

class Front extends Component {
  render() {
    const { sheets } = this.props;
    return (
      <div>
        <section
          className="hero is-medium is-primary is-fullheight"
          style={{ minHeight: "92vh" }}
        >
          <nav
            className="navbar is-transparent is-primary"
            role="navigation"
            aria-label="main navigation"
            style={{ opacity: 0.8, backgroundColor: "#00d1b2" }}
          >
            <div className="navbar-brand is-vcentered">
              <a className="navbar-item" href="/">
                Scan2sheet
              </a>

              {sheets &&
                sheets.map((sheet, index) => {
                  return (
                    <Link
                      to={"/pricelist/" + sheet.id}
                      className="navbar-item"
                      type="link"
                      style={{ fontWeight: "bold", color: "black" }}
                      key={index}
                      value={index}
                      /* onClick={this.handleSheetSubmit} */
                    >
                      {sheet.id}
                    </Link>
                  );
                })}
            </div>
            <div className="navbar-end">
              <a
                type="submit"
                className="navbar-item"
                onClick={this.toggleSheetModal}
                href="/"
              >
                Set up pricelist
              </a>
            </div>
          </nav>
          <div className="hero-body" style={{ paddingTop: "60px" }}>
            <div className="container">
              <div className="columns is-mobile">
                <div className="column is-half is-offset-one-quarter">
                  <h1 className="title has-text-centered">
                    Press the pricelist in the menu to get started
                  </h1>

                  <hr />
                  <img src="img/undraw_security_svg.svg" alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  var sheets = state.firestore.ordered.sheets
    ? state.firestore.ordered.sheets
    : null;
  return {
    sheets: sheets
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "sheets" }])
)(Front);
