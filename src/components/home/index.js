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

  componentDidMount() {
    /* load saves pricelists in firebase */
  }

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
  }

  handleSubmit(event) {
    /*     alert("A name was submitted: " + this.state.value); */
    this.getValue();
    event.preventDefault();
  }

  getValue = () => {
    const API =
      "https://sheets.googleapis.com/v4/spreadsheets/" +
      this.state.sheetId +
      "/values:batchGet?ranges=Danzafe&majorDimension=ROWS&key=" +
      config.apiKey;

    fetch(API)
      .then(response => response.json())

      .then(data => {
        console.log(data);
        let batchRowValues = data.valueRanges[0].values;
        console.log("test batch: " + batchRowValues[1]);
        let kolVareNr = parseFloat(this.state.kolVareNr);
        console.log(kolVareNr);

        let found = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          if (batchRowValues[i][kolVareNr] === this.state.value) {
            console.log("found!" + batchRowValues[i]);
            found.push(batchRowValues[i]);
          }
        }
        this.setState({ items: found });
      })
      .then(this.toggleModal());
  };

  handleSheetSubmit(event) {
    console.log(this.props.sheets);
    console.log(this.props.sheets[event.target.value]);
    var selectedSheet = this.props.sheets[event.target.value];
    console.log(selectedSheet.sheetId);

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

    console.log(this.state.sheetId);
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
    const { profile, sheets } = this.props;

    return (
      <div className="has-text-centered">
        <section class="hero is-medium is-primary is-bold">
          <div class="hero-body">
            <div className="columns is-mobile">
              <div className="column is-half is-offset-one-quarter">
                <h1 class="title">Search</h1>
                <button
                  type="submit"
                  className="button"
                  onClick={this.toggleSheetModal}
                >
                  Set up pricelist
                </button>
                <form onChange={this.handleSheetSubmit}>
                  <label>
                    Choose pricelist
                    <select>
                      {sheets &&
                        sheets.map((sheet, index) => {
                          return (
                            <option key={index} value={index}>
                              {sheet.id} - {index}
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
                      type="number"
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
        <p>multiple nr: 8348700009</p>
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
