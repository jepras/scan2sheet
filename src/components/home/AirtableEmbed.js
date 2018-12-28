import React, { Component } from "react";

class AirtableEmbed extends Component {
  /* shouldComponentUpdate(nextProps) {
    const newAirtableState =
      this.props.airtableState !== nextProps.airtableState;
    return newAirtableState;
  } */
  render() {
    console.log(
      "rendering airtableEmbed, as state is changed to " +
        this.props.airtableState
    );
    console.log(this.props);

    if (this.props.airtableId) {
      return (
        <div
          style={{
            height: "50vh",
            display: this.props.airtableState === true ? "block" : "block"
          }}
        >
          <iframe
            className="airtable-embed"
            src={
              "https://airtable.com/embed/" +
              this.props.airtableId +
              "?backgroundColor=orange"
            }
            frameBorder="0"
            title="airtable"
            width="100%"
            height="100%"
            style={{
              background: "transparent",
              border: "1px solid #ccc"
            }}
          />
        </div>
      );
    } else {
      return <div>loading airtable</div>;
    }
  }
}

export default AirtableEmbed;
