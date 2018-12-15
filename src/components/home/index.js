import React, { Component } from "react";
import { connect } from "react-redux";
import config from "../../config/apiConfig";

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
      sheet: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    let state = event.target.id;

    switch (state) {
      case "varenr":
        console.log(event.target.value);
        this.setState({ kolVareNr: event.target.value });
        break;
      case "value":
        this.setState({ value: event.target.value });
        console.log("found value in switch statement");
        break;

      default:
        break;
    }
  }

  handleSubmit(event) {
    /*     alert("A name was submitted: " + this.state.value); */
    this.getValue();
    event.preventDefault();
  }

  getValue = () => {
    fetch(API)
      .then(response => response.json())

      .then(data => {
        console.log(data);
        let batchRowValues = data.valueRanges[0].values;
        console.log(batchRowValues[1]);
        /*         console.log(this.state.kolVareNr);
        let kolVareNr = parseFloat(this.state.kolVareNr);
        console.log(kolVareNr); */

        let found = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          if (batchRowValues[i][0] === this.state.value) {
            console.log("found!" + batchRowValues[i]);
            found.push(batchRowValues[i]);
          }
        }
        this.setState({ items: found });
      })
      .then(this.toggleModal());
  };

  render() {
    console.log(config);
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
                <form onSubmit={this.handleSubmit}>
                  <label>
                    Choose pricelist
                    <select onChange={this.handleChange} id="varenr">
                      <option value="0">A</option>
                      <option value="1">B</option>
                      <option value="2">C</option>
                      <option value="3">D</option>
                    </select>
                  </label>
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
  console.log(state);
  return {
    // take in data from state,firestore,ordered,data
    /*     sheets: state.firestore.sheets
     */
    /* auth: state.firebase.auth,
    profile: state.firebase.profile */
  };
};

export default connect(
  mapStateToProps,
  null
)(Home);
