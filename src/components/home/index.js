import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import config from "../../config/apiConfig";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";

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
      updated: 0,
      airtableId: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValue = this.getValue.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
    this.toggleSheetModal = this.toggleSheetModal.bind(this);
    this.updateAirtable = this.updateAirtable.bind(this);
  }

  // react on changes in form
  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value
    });

    // start searching as the user type
    if (event.target.value.length > 4) {
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
        console.log(batchRowValues);

        // format column number string as integer
        let kolVareNr = parseFloat(this.state.kolVareNr);
        console.log(batchRowValues[5][kolVareNr]);
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
        console.log("items found from fetch are: " + found);
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

  /* componentDidMount() {
    if (this.props.sheet) {
      var selectedSheet = this.props.sheet;

      this.setState({
        sheetName: selectedSheet.sheetName,
        sheetId: selectedSheet.sheetId,
        kolVareNr: selectedSheet.kolVareNr,
        kolVareBeskrivelse: selectedSheet.kolVareBeskrivelse,
        kolRabatPct: selectedSheet.kolRabatPct,
        kolBruttoEfterRabat: selectedSheet.kolBruttoEfterRabat,
        kolBrutto: selectedSheet.kolBrutto,
        kolAntalPris: selectedSheet.kolAntalPris,
        tabName: selectedSheet.tabName,
        airtableId: selectedSheet.airtableId
      });
      console.log("component state updated after sheet was found");
    }
    console.log("component updated without state");
  } */

  componentWillReceiveProps(nextProps) {
    var nextPage = nextProps.match.params.id;
    console.log("component will receive these next props:");
    console.log(nextProps);
    /* if (nextPage !== this.props.match.params.id) { */
    var selectedSheet = nextProps.sheet;
    console.log(nextPage);
    console.log(selectedSheet);

    this.setState({
      sheetName: selectedSheet.sheetName,
      sheetId: selectedSheet.sheetId,
      kolVareNr: selectedSheet.kolVareNr,
      kolVareBeskrivelse: selectedSheet.kolVareBeskrivelse,
      kolRabatPct: selectedSheet.kolRabatPct,
      kolBruttoEfterRabat: selectedSheet.kolBruttoEfterRabat,
      kolBrutto: selectedSheet.kolBrutto,
      kolAntalPris: selectedSheet.kolAntalPris,
      tabName: selectedSheet.tabName,
      airtableId: selectedSheet.airtableId
    });
    console.log("component state updated from componentWillReceiveProps");
    /* } */
  }

  updateAirtable() {
    console.log("airtable updating");
    this.setState((prev, props) => {
      const newState = !prev.airtableState;
      return { airtableState: newState };
    });
  }

  render() {
    if (this.props.airtableId === "") {
      return null;
    }

    const { sheet, sheets } = this.props;
    console.log("state & props from render()");
    console.log(this.state);
    console.log(this.props);
    if (sheet && sheet.airtableId) {
      return (
        <div>
          <section
            className="hero is-medium is-primary is-fullheight"
            id={sheet.id}
            style={{ minHeight: "92vh" }}
          >
            <nav
              className="navbar is-transparent is-fixed-top is-primary"
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
                        onClick={this.updateAirtable}
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
            <div className="hero-body" style={{ paddingTop: "45px" }}>
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
                  </div>
                </div>

                <div className="columns is-mobile" style={{ height: "50vh" }}>
                  <div className="column">
                    <AirtableEmbed
                      airtableState={this.state.airtableState}
                      airtableId={sheet.airtableId}
                    />
                    <p className="has-text-centered">
                      Test numbers - DZ: 5655005065 - CR: 14181681 - PS: 46620 -
                      SS: 444810
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

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
    } else {
      return <div>loading teams</div>;
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log("ownProps from mapStateToProps");
  console.log(ownProps);
  var id = ownProps.match.params.id;
  var sheets = state.firestore.ordered.sheets;
  /*   ? state.firestore.ordered.sheets
    : null; */

  var sheet = sheets ? sheets.filter(sheet => sheet.id === id) : null;
  sheet = sheet ? sheet[0] : null;
  console.log("sheet value from mapStateToProps");
  console.log(sheet);

  return {
    sheets: state.firestore.ordered.sheets,
    sheet: sheet
    /*     auth: state.firebase.auth,
    profile: state.firebase.profile */
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "sheets" }])
)(Home);
