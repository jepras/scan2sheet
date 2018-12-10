import React, { Component } from "react";

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
    this.getValue();
  }

  render() {
    console.log(this.props.efterRabat);
    var efterRabat = parseFloat(this.props.efterRabat.replace(/,/, "."));
    console.log(efterRabat);

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              type="number"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Udregn" />
        </form>
        <strong>Totalpris: </strong>
        {this.state.value * efterRabat}
      </div>
    );
  }
}
export default TotalPrice;
