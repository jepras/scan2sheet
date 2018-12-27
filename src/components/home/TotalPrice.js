import React, { Component } from "react";
import base from "../../config/airtableConfig";
var total;

class TotalPrice extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      total: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchRecord = this.searchRecord.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    // overwrite if exists or create new
    this.searchRecord();
    this.props.closeModal();
    // functionality to re render airtable embed
    this.setState({ total: total });
  }

  searchRecord() {
    const varenr = this.props.vareNr;
    console.log(varenr);
    const beskrivelse = this.props.beskrivelse;
    const brutto = this.props.brutto;
    const sheet = this.props.sheetName;
    const arr = [];
    console.log("går igang med at søge .. ");

    var total = this.props.efterRabat
      ? this.state.value * parseFloat(this.props.efterRabat.replace(/,/, "."))
      : null;
    console.log("total in searchRecords is: " + this.state.total);

    var filter = "IF(varenr = " + varenr + ", TRUE(), FALSE())";

    base(sheet)
      .select({
        view: "Grid view",
        maxRecords: 100,
        filterByFormula: filter
      })
      .eachPage(function page(records, fetchNextPage) {
        console.log(records);
        if (records.length > 0) {
          console.log("found");
          arr.push("found");
          records.forEach(function(record) {
            console.log("allerede eksisterende! " + record.fields.varenr);
            console.log(record);

            base(sheet).update(
              record.get("recordId"),
              {
                netto: total
              },
              function(err, record) {
                if (err) {
                  console.error(err);
                  return;
                }
                console.log(
                  "varenr: " +
                    record.get("varenr") +
                    " er opdateret til: " +
                    record.get("netto")
                );
              }
            );
          });
        }

        // To fetch the next page of records, call `fetchNextPage`.
        // If there are more records, `page` will get called again.
        // If there are no more records, `done` will get called.
        fetchNextPage();
      });

    var promise1 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        resolve("foo");
      }, 1000);
    });

    promise1.then(function(value) {
      console.log(value);
      console.log("total = " + total);
      console.log("arr length = " + arr.length);
      console.log("arr = " + arr);

      if (arr.length === 0) {
        console.log("lets create a new! " + arr);
        base(sheet).create(
          {
            varenr: varenr,
            beskrivelse: beskrivelse,
            brutto: brutto,
            netto: total
          },
          function(err, record) {
            if (err) {
              console.error(err);
              return;
            }
            console.log("vare sendt afsted er: " + record.fields.beskrivelse);
          }
        );
      }
    });

    console.log(promise1);
  }

  render() {
    var total = this.props.efterRabat
      ? this.state.value * parseFloat(this.props.efterRabat.replace(/,/, "."))
      : null;
    console.log(total);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="columns">
            <div className="column">
              <label>
                <input
                  type="number"
                  className="input"
                  value={this.state.value}
                  onChange={this.handleChange}
                  autoFocus
                />
              </label>
            </div>
            <div className="column">
              <input
                type="submit"
                className="button is-primary"
                value="Send2Sheet"
              />
            </div>
          </div>
        </form>

        <p value={total}>
          <strong>Total: </strong>
          {total}
        </p>
      </div>
    );
  }
}
export default TotalPrice;
