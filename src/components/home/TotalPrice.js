import React, { Component } from "react";
import base from "../../config/airtableConfig";
var total;

class TotalPrice extends Component {
  constructor() {
    super();

    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    base("Table 1").create(
      {
        varenr: this.props.vareNr,
        beskrivelse: this.props.beskrivelse,
        brutto: this.props.brutto,
        netto: total
      },
      function(err, record) {
        if (err) {
          console.error(err);
          return;
        }
        console.log(record.getId());
      }
    );
    this.props.closeModal();
  }

  render() {
    console.log(this.props.efterRabat);
    var efterRabat = parseFloat(this.props.efterRabat.replace(/,/, "."));
    console.log(efterRabat);
    total = this.state.value * efterRabat;

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
              autoFocus
            />
          </label>
          <input type="submit" value="Send til sheet" />
        </form>
        <strong>Totalpris: </strong>
        {total}
      </div>
    );
  }
}
export default TotalPrice;
