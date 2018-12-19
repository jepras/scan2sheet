import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import config from "../../config/apiConfig";
import { firestoreConnect } from "react-redux-firebase";

import Modal from "./Modal";
import SheetModal from "./SheetModal";

const API =
  "https://sheets.googleapis.com/v4/spreadsheets/" +
  config.danzafeSheet +
  "/values:batchGet?ranges=Danzafe&majorDimension=ROWS&key=" +
  config.apiKey;

class Home extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      value: "",
      post: "",
      modalState: false,
      modalSheetState: false,
      sheetName: "",
      sheetId: "",
      kolVareNr: "0",
      kolVareBeskrivelse: "",
      kolRabatPct: "",
      kolBruttoEfterRabat: "",
      kolBrutto: "",
      kolAntalPris: "",
      tabName: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSheetSubmit = this.handleSheetSubmit.bind(this);
    this.getValue = this.getValue.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSheetModal = this.toggleSheetModal.bind(this);
  }

  /* componentDidMount(event) {
    /* load saves pricelists in firebase 
    this.setState({
      sheetName: this.state.sheets[0].sheetName,
      sheetId: this.state.sheets.sheetId
      kolVareNr: selectedSheet.kolVareNr,
      kolVareBeskrivelse: selectedSheet.kolVareBeskrivelse,
      kolRabatPct: selectedSheet.kolRabatPct,
      kolBruttoEfterRabat: selectedSheet.kolBruttoEfterRabat,
      kolBrutto: selectedSheet.kolBrutto,
      kolAntalPris: selectedSheet.kolAntalPris,
      tabName: selectedSheet.tabName
    });
  } */

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState };
    });
  }

  toggleSheetModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalSheetState;
      return { modalSheetState: newState };
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

    if (event.target.value.length > 5) {
      console.log("..starting to fetch data..");
      this.getValue();
    }
  }

  handleSubmit(event) {
    console.log(this.state);
    this.toggleModal();
    event.preventDefault();
  }

  getValue = () => {
    const API =
      "https://sheets.googleapis.com/v4/spreadsheets/" +
      this.state.sheetId +
      "/values:batchGet?ranges=" +
      this.state.tabName +
      "&majorDimension=ROWS&key=" +
      config.apiKey;

    /* const fastAPI =
      "https://sheets.googleapis.com/v4/spreadsheets/1fMcBPX63LaF_DcdOraoPXVdJaYGii4-yd5F-Ho8J3NQ/values:batchGet?ranges=Danzafe&majorDimension=ROWS&key=AIzaSyC_GCcVWD414IcUAMu2lG1aToCk7n2x9m4";
    fetch(fastAPI).then(response => console.log(response)); */

    fetch(API)
      .then(response => response.json())
      .then(data => {
        console.log("found data!");

        // Initiate variables
        let batchRowValues = data.valueRanges[0].values;
        let kolVareNr = parseFloat(this.state.kolVareNr);
        let kolVareBeskrivelse = this.state.kolVareBeskrivelse;

        // Initiate variable for setting state
        let found = [];

        // Check if string is digits
        var isnum = /^\d+$/.test(this.state.value);

        if (isnum) {
          console.log("this.state.value is a number! " + this.state.value);
          for (let i = 1, len = batchRowValues.length; i < len; i++) {
            if (batchRowValues[i][kolVareNr].includes(this.state.value)) {
              /* if (batchRowValues[i][kolVareNr] === this.state.value) { */
              /* let found = []; */
              console.log("found! " + batchRowValues[i]);
              found.push(batchRowValues[i]);
              this.setState({ items: found });
            }
          }
        } else {
          console.log("this.state.value is text: " + this.state.value);
          for (let i = 1, len = batchRowValues.length; i < len; i++) {
            if (
              batchRowValues[i][kolVareBeskrivelse].includes(this.state.value)
            ) {
              console.log("found! " + batchRowValues[i]);
              found.push(batchRowValues[i]);
              this.setState({ items: found });
            }
          }
        }
      })
      .catch(function(err) {
        alert("didn't find item");
        console.log("Error in fetch", err);
      });
  };

  handleSheetSubmit(event) {
    event.preventDefault();
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

  render() {
    /*  <li>Varenr: {item[0]}</li>
        <li>Beskrivelse: {item[1]}</li>
        <li>EAN: {item[2]}</li>
        <li>Lev. Varenr: {item[3]}</li>
        <li>Min antal: {item[4]}</li>
        <li>Brutto: {item[5]}</li>
        <li>Netto: {item[6]}</li>
        <li>Rabat %: {item[7]}</li>
        <li>Netto efter rabat: {item[8]}</li>
        <li>Rabatgruppe: {item[9]}</li> */
    const { sheets } = this.props;
    console.log("logging state from render(): " + JSON.stringify(this.state));

    return (
      <div className="has-text-centered">
        <section className="hero is-medium is-primary is-bold">
          <div className="hero-body">
            <div className="columns is-mobile">
              <div className="column is-half is-offset-one-quarter">
                <h1 className="title">Search</h1>
                <button
                  type="submit"
                  className="button"
                  onClick={this.toggleSheetModal}
                >
                  Set up pricelist
                </button>
                <form onChange={this.handleSheetSubmit}>
                  <label>
                    <select>
                      <option>-- Choose Pricelist --</option>
                      {sheets &&
                        sheets.map((sheet, index) => {
                          return (
                            <option key={index} value={index}>
                              {sheet.id}
                            </option>
                          );
                        })}
                    </select>
                  </label>
                  {/* <button type="submit" className="button">
                    Choose pricelist
                  </button> */}
                </form>
                <form onSubmit={this.handleSubmit}>
                  <label>
                    <input
                      type="text"
                      className="input is-medium is-rounded"
                      placeholder="scan yo shit"
                      id="value"
                      /* value={this.state.value} can maybe be avoided */
                      onChange={this.handleChange}
                      autoFocus
                    />
                  </label>
                </form>
              </div>
            </div>
          </div>
        </section>
        {/* <ul>{itemFound}</ul>  */}
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
    // take in data from state,firestore,ordered,data
    /*     sheets: state.firestore.sheets
     */
    sheets: sheets,
    auth: state.firebase.auth,
    profile: state.firebase.profile
  };
};

/* export default connect(
  mapStateToProps
)(Home); */
export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "sheets" }])
)(Home);
