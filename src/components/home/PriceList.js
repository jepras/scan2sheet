import React from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import AirtableEmbed from "./AirtableEmbed";

const PriceList = props => {
  const { sheet, airtableState, handleSubmit, handleChange } = props;

  if (sheet) {
    return (
      <section
        className="hero is-medium is-primary is-fullheight"
        id={sheet.id}
      >
        <div className="hero-body" style={{ paddingTop: "60px" }}>
          <div className="container">
            <div className="columns is-mobile">
              <div className="column is-half is-offset-one-quarter">
                <h1 className="title has-text-centered">{sheet.id}</h1>

                <form onSubmit={handleSubmit}>
                  <label>
                    <input
                      type="text"
                      className="input is-medium is-rounded"
                      placeholder="scan or search"
                      id="value"
                      onChange={handleChange}
                    />
                  </label>
                  <ul className="suggestions" id="list">
                    <li>Eksempel</li>
                  </ul>
                </form>
                <hr />
              </div>
            </div>

            <div className="columns is-mobile" style={{ height: "50vh" }}>
              <div className="column">
                <AirtableEmbed airtableState={airtableState} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <div className="container center">
        <p>loading teams</p>
      </div>
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  var id = ownProps.match.params.id;
  var sheets = state.firestore.ordered.sheets;
  var sheet = sheets ? sheets[id] : null;

  return {
    sheet: sheet
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "sheets" }])
)(PriceList);
