import React, { Component } from "react";
import base from "../../config/airtableConfig";
var total;

class TotalPrice extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      total: ""
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
    console.log(this.state.total);
    const varenr = this.props.vareNr;
    const ekstra = this.props.ekstra;
    console.log("varenr: " + varenr);
    const beskrivelse = this.props.beskrivelse;
    const brutto = this.props.brutto.replace(".", ",");
    const sheet = this.props.sheetName;
    const lager = this.state.value;
    const nettostk = this.props.efterRabat.replace(".", ",");
    const arr = [];
    console.log("går igang med at søge .. ");

    if (this.props.efterRabat) {
      if (!this.props.efterRabat.includes(",")) {
        console.log("no comma");
        var total = this.props.efterRabat
          ? String(
              this.state.value * parseFloat(this.props.efterRabat)
            ).replace(".", ",")
          : null;
      } else {
        console.log("med tegn");
        total = this.props.efterRabat
          ? String(
              this.state.value *
                parseFloat(this.props.efterRabat.replace(",", "."))
            ).replace(".", ",")
          : null;
      }
      console.log(total);
      console.log(typeof total);
    }
    console.log("total in searchRecords is: " + total);

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
                totalnetto: total,
                lager: lager
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
                    record.get("totalnetto")
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
        console.log(total);
        console.log(typeof total);
        base(sheet).create(
          {
            varenr: varenr,
            ekstra: ekstra,
            beskrivelse: beskrivelse,
            bruttostk: brutto,
            nettostk: nettostk,
            lager: lager,
            totalnetto: total
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
    if (this.props.efterRabat) {
      if (!this.props.efterRabat.includes(",")) {
        var total = this.props.efterRabat
          ? String(
              this.state.value * parseFloat(this.props.efterRabat)
            ).replace(".", ",")
          : null;
      } else {
        total = this.props.efterRabat
          ? String(
              this.state.value *
                parseFloat(this.props.efterRabat.replace(",", "."))
            ).replace(".", ",")
          : null;
      }
    }

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
                  name={total}
                  key={total}
                  onChange={this.handleChange}
                  ref={input => input && input.focus()}
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
