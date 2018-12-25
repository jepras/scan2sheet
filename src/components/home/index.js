import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import config from "../../config/apiConfig";
import { firestoreConnect } from "react-redux-firebase";

import Modal from "./Modal";
import SheetModal from "./SheetModal";
import AirtableEmbed from "./AirtableEmbed";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      value: "",
      post: "",
      modalState: false,
      airtableState: false,
      modalSheetState: false,
      sheetName: "",
      sheetId: "",
      kolVareNr: "0",
      kolVareBeskrivelse: "",
      kolRabatPct: "",
      kolBruttoEfterRabat: "",
      kolBrutto: "",
      kolAntalPris: "",
      tabName: "",
      updated: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSheetSubmit = this.handleSheetSubmit.bind(this);
    this.getValue = this.getValue.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSheetModal = this.toggleSheetModal.bind(this);
    this.updateAirtable = this.updateAirtable.bind(this);
  }

  /*   shouldComponentUpdate(nextProps, nextState) {}
   */
  // react on changes in form
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

    // start searching as the user type
    if (event.target.value.length > 5) {
      console.log("..starting to fetch data..");
      this.getValue();
    }
  }

  // log state, open modal & reset form
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    this.toggleModal();
    event.target.reset();
  }

  // function for searching pricelist
  getValue = () => {
    // initiate API with state variables
    const API =
      "https://sheets.googleapis.com/v4/spreadsheets/" +
      this.state.sheetId +
      "/values:batchGet?ranges=" +
      this.state.tabName +
      "&majorDimension=ROWS&key=" +
      config.apiKey;

    // initiate fetch
    fetch(API)
      .then(response => response.json())
      .then(data => {
        // search variables in right place
        let batchRowValues = data.valueRanges[0].values;
        // format column number string as integer
        let kolVareNr = parseFloat(this.state.kolVareNr);
        // minify column description
        let kolVareBeskrivelse = this.state.kolVareBeskrivelse;

        // Initiate variable for setting state
        let found = [];

        // Check if string is digits
        var isnum = /^\d+$/.test(this.state.value);

        if (isnum) {
          // loop through pricelist for number
          for (let i = 1, len = batchRowValues.length; i < len; i++) {
            if (batchRowValues[i][kolVareNr].includes(this.state.value)) {
              console.log("found! " + batchRowValues[i]);
              found.push(batchRowValues[i]);
            }
          }
        } else {
          // loop through pricelist for description
          console.log("this.state.value is text: " + this.state.value);
          for (let i = 1, len = batchRowValues.length; i < len; i++) {
            if (
              batchRowValues[i][kolVareBeskrivelse].includes(this.state.value)
            ) {
              console.log("found! " + batchRowValues[i]);
              found.push(batchRowValues[i]);
            }
          }
        }
        // update state with found items
        this.setState({ items: found });
      })
      .catch(function(err) {
        alert("didn't find item");
        console.log("Error in fetch", err);
      });
  };

  // For opening search modal
  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;
      const newAirtableState = !prev.airtableState;
      return { modalState: newState, airtableState: newAirtableState };
    });
  }

  // For opening pricelist modal
  toggleSheetModal(e) {
    e.preventDefault();
    this.setState((prev, props) => {
      const newState = !prev.modalSheetState;
      return { modalSheetState: newState };
    });
  }

  // update state when sheet is chosen
  handleSheetSubmit(event) {
    // do not update if start pricelist is chosen
    if (event.target.value !== "choose") {
      var selectedSheet = this.props.sheets[event.target.value];

      this.setState({
        sheetName: selectedSheet.sheetName,
        sheetId: selectedSheet.sheetId,
        kolVareNr: selectedSheet.kolVareNr,
        kolVareBeskrivelse: selectedSheet.kolVareBeskrivelse,
        kolRabatPct: selectedSheet.kolRabatPct,
        kolBruttoEfterRabat: selectedSheet.kolBruttoEfterRabat,
        kolBrutto: selectedSheet.kolBrutto,
        kolAntalPris: selectedSheet.kolAntalPris,
        tabName: selectedSheet.tabName
      });
    }
  }

  updateAirtable() {
    console.log("airtable updating");
    this.setState((prev, props) => {
      const newState = !prev.airtableState;
      return { airtableState: newState };
    });
  }

  render() {
    const { sheets } = this.props;
    console.log("logging state from render(): " + JSON.stringify(this.state));

    return (
      <div>
        <nav
          className="navbar is-transparent is-fixed-top"
          role="navigation"
          aria-label="main navigation"
          style={{ opacity: 0.8 }}
        >
          <div className="navbar-brand is-vcentered">
            <a className="navbar-item" href="/">
              Scan2sheet
            </a>

            {sheets &&
              sheets.map((sheet, index) => {
                return (
                  <a href={"#" + sheet.id}>
                    <button
                      className="navbar-item button"
                      type="link"
                      key={index}
                      value={index}
                      onClick={this.handleSheetSubmit}
                    >
                      {sheet.id}
                    </button>
                  </a>
                );
              })}

            <a
              type="submit"
              className="navbar-item"
              onClick={this.toggleSheetModal}
              href="/"
            >
              Set up pricelist
            </a>
          </div>

          <div className="navbar-menu" />
        </nav>
        {sheets &&
          sheets.map((sheet, index) => {
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

                        <form onSubmit={this.handleSubmit}>
                          <label>
                            <input
                              type="text"
                              className="input is-medium is-rounded"
                              placeholder="scan or search"
                              id="value"
                              onChange={this.handleChange}
                            />
                          </label>
                        </form>
                        <hr />
                      </div>
                    </div>

                    <div
                      className="columns is-mobile"
                      style={{ height: "50vh" }}
                    >
                      <div className="column">
                        <AirtableEmbed
                          airtableState={this.state.airtableState}
                          sheetId={sheet.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}

        <hr />

        <p>test numbers</p>
        <p>Danzafe: 5655005065</p>
        <p>Carl Ras: 14181681</p>
        <p>Pro-Sec: 46620</p>
        <p>Sanistaal: 444810</p>
        <p>Danzafe: </p>
        <p>Danzafe: </p>
        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          items={this.state.items}
          submitModal={this.submitModal}
          kolVareNr={this.state.kolVareNr}
          kolVareBeskrivelse={this.state.kolVareBeskrivelse}
          kolRabatPct={this.state.kolRabatPct}
          kolBruttoEfterRabat={this.state.kolBruttoEfterRabat}
          kolBrutto={this.state.kolBrutto}
          kolAntalPris={this.state.kolAntalPris}
          sheetName={this.state.sheetName}
        />
        <SheetModal
          closeModal={this.toggleSheetModal}
          modalSheetState={this.state.modalSheetState}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  var sheets = state.firestore.ordered.sheets
    ? state.firestore.ordered.sheets
    : null;
  return {
    sheets: sheets,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "sheets" }])
)(Home);
