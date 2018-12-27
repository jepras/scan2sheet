import React, { Component } from "react";

class AirtableEmbed extends Component {
  shouldComponentUpdate(nextProps) {
    const newAirtableState =
      this.props.airtableState !== nextProps.airtableState;
    return newAirtableState;
  }
  render() {
    /* if (this.props.airtableState === true) {
      return null;
    } */
    console.log(
      "rendering airtableEmbed, as state is changed to " +
        this.props.airtableState
    );
    console.log(this.props);

    if (this.props.airtableId) {
      return (
        <div style={{ height: "50vh" }}>
          <iframe
            className="airtable-embed"
            src={
              "https://airtable.com/embed/" +
              this.props.airtableId +
              "?backgroundColor=orange&viewControls=on"
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
