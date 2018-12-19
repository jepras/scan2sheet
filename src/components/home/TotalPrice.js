import React, { Component } from "react";
import base from "../../config/airtableConfig";
var total;

class TotalPrice extends Component {
  constructor() {
    super();

    this.state = {
      value: "",
      found: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.searchRecord = this.searchRecord.bind(this);
    this.createRecord = this.createRecord.bind(this);
    this.update = this.createRecord.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchRecord();
    if (this.state.found === false) {
      console.log("will begin to create record");
      this.createRecord();
    }
    this.props.closeModal();
  }

  createRecord() {
    //
    base(this.props.sheetName).create(
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
        console.log("vare sendt afsted er: " + record.fields.beskrivelse);
      }
    );
  }

  update = records => {
    console.log("updated " + records);
  };

  searchRecord() {
    const varenr = this.props.vareNr;
    const sheet = this.props.sheetName;
    var emptyArr = [];
    console.log("går igang med at søge .. ");
    base(sheet)
      .select({
        // Selecting the first 3 records in Grid view:
        view: "Grid view",
        maxRecords: 3,
        filterByFormula: "{varenr} = varenr"
      })
      .eachPage(
        function page(records, fetchNextPage) {
          // This function (`page`) will get called for each page of records.
          if (records) {
            records.forEach(function(record) {
              console.log("Retrieved", record.get("beskrivelse"));
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
          } else {
            console.log("nul records, du!");
            base(sheet).create(
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
                console.log(
                  "vare sendt afsted er: " + record.fields.beskrivelse
                );
              }
            );
          }

          // To fetch the next page of records, call `fetchNextPage`.
          // If there are more records, `page` will get called again.
          // If there are no more records, `done` will get called.
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            console.error(err);
            return;
          }
        }
      );
  }

  render() {
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
