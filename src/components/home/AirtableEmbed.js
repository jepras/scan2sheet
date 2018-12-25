import React, { Component } from "react";

class AirtableEmbed extends React.Component {
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

    return (
      <div style={{ height: "50vh" }}>
        <iframe
          className="airtable-embed"
          src="https://airtable.com/embed/shr2b8KNIwpQe81sM?backgroundColor=orange&viewControls=on"
          frameBorder="0"
          title="airtable"
          width="100%"
          height="100%"
          style={{
            background: "transparent",
            border: "1px solid #ccc"
          }}
        />
        <p>{String(this.props.airtableState)}</p>
      </div>
    );
  }
}

export default AirtableEmbed;
