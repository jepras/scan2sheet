import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "./Modal";

const API =
  "https://sheets.googleapis.com/v4/spreadsheets/1fMcBPX63LaF_DcdOraoPXVdJaYGii4-yd5F-Ho8J3NQ/values:batchGet?ranges=Danzafe&majorDimension=ROWS&key=AIzaSyC5wW3TbBAkP-rteoW3qsYtDmMZbOXdD0c";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      items: [],
      value: "",
      post: "",
      modalState: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValue = this.getValue.bind(this);

    this.toggleModal = this.toggleModal.bind(this);
  }

  componentDidMount() {
    /* fetch(API)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;
        console.log(batchRowValues);

        let found = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          if (batchRowValues[i][0] === "5655005044") {
            console.log("found!" + batchRowValues[i][0]);
            found.push(batchRowValues[i][0]);
          }
        }
        this.setState({ items: found });
      }); */
    /* .then(data => {
        console.log(data);
        let batchRowValues = data.valueRanges[0].values;

        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        this.setState({ items: rows });
        console.log(this.state.items);
      }); */
  }

  toggleModal() {
    this.setState((prev, props) => {
      const newState = !prev.modalState;

      return { modalState: newState };
    });
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
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
    /*     const itemFound = this.state.items;
     */ /* const itemFound = this.state.items.map(item => (
      <div>
        <li>Varenr: {item[0]}</li>
        <li>Beskrivelse: {item[1]}</li>
        <li>EAN: {item[2]}</li>
        <li>Lev. Varenr: {item[3]}</li>
        <li>Min antal: {item[4]}</li>
        <li>Brutto: {item[5]}</li>
        <li>Netto: {item[6]}</li>
        <li>Rabat %: {item[7]}</li>
        <li>Netto efter rabat: {item[8]}</li>
        <li>Rabatgruppe: {item[9]}</li>
      </div>
    )); */

    /*  const listItems = this.state.items.map(item => (
      <li>
        {item.Varenr} - {item.beskrivelse}
      </li>
    )); */

    return (
      <div className="has-text-centered">
        {/* <ul>{itemFound}</ul>  */}
        <hr />
        <p className="subtitle">Search</p>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Search" />
        </form>
        <p>multiple nr: 8348700009</p>
        <Modal
          closeModal={this.toggleModal}
          modalState={this.state.modalState}
          items={this.state.items}
          submitModal={this.submitModal}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export default connect(
  mapStateToProps,
  null
)(Home);
