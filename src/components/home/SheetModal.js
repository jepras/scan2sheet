import React, { Component } from "react";
import { connect } from "react-redux";
import { createSheet } from "../../store/actions/sheetActions";

class SheetModal extends Component {
  constructor() {
    super();

    this.state = {
      sheetName: "",
      sheetId: "",
      tabName: "",
      kolVareNr: "0",
      kolVareBeskrivelse: "0",
      kolBrutto: "0",
      kolAntalPris: "0",
      kolRabatPct: "0",
      kolBruttoEfterRabat: "0",
      airtableId: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    console.log(event.target.id + "+" + event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createSheet(this.state);
    this.props.closeModal();
  }

  render() {
    if (!this.props.modalSheetState) {
      return null;
    }
    var closeModal = this.props.closeModal;

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Enter amount bought</p>
            <button className="delete" onClick={closeModal} />
          </header>
          <section className="modal-card-body">
            <div>
              <form onSubmit={this.handleSubmit}>
                <div class="field">
                  <label class="label">Name of sheet</label>
                  <div class="control">
                    <input
                      class="input"
                      id="sheetName"
                      type="text"
                      placeholder="Text input"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Name of tab</label>
                  <div class="control">
                    <input
                      class="input"
                      id="tabName"
                      type="text"
                      placeholder="Text input"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Sheet id</label>
                  <div class="control">
                    <input
                      class="input"
                      id="sheetId"
                      type="text"
                      placeholder="Text input"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <div class="field">
                  <label class="label">Airtable id</label>
                  <div class="control">
                    <input
                      class="input"
                      id="airtableId"
                      type="text"
                      placeholder="Text input"
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
                <p className="subtitle">Choose right columns</p>
                <div className="columns">
                  <div class="field column is-one-third">
                    <label class="label">Item number</label>
                    <div class="control">
                      <div class="select">
                        <select onChange={this.handleChange} id="kolVareNr">
                          <option value="0">A</option>
                          <option value="1">B</option>
                          <option value="2">C</option>
                          <option value="3">D</option>
                          <option value="4">E</option>
                          <option value="5">F</option>
                          <option value="6">G</option>
                          <option value="7">H</option>
                          <option value="8">I</option>
                          <option value="9">J</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div class="field column is-one-third">
                    <label class="label">Item description</label>
                    <div class="control">
                      <div class="select">
                        <select
                          onChange={this.handleChange}
                          id="kolVareBeskrivelse"
                        >
                          <option value="0">A</option>
                          <option value="1">B</option>
                          <option value="2">C</option>
                          <option value="3">D</option>
                          <option value="4">E</option>
                          <option value="5">F</option>
                          <option value="6">G</option>
                          <option value="7">H</option>
                          <option value="8">I</option>
                          <option value="9">J</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="field column is-one-third">
                    <label class="label">Brutto</label>
                    <div class="control">
                      <div class="select">
                        <select onChange={this.handleChange} id="kolBrutto">
                          <option value="0">A</option>
                          <option value="1">B</option>
                          <option value="2">C</option>
                          <option value="3">D</option>
                          <option value="4">E</option>
                          <option value="5">F</option>
                          <option value="6">G</option>
                          <option value="7">H</option>
                          <option value="8">I</option>
                          <option value="9">J</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="columns">
                  <div class="field column is-one-third">
                    <label class="label">Group Discount</label>
                    <div class="control">
                      <div class="select">
                        <select onChange={this.handleChange} id="kolAntalPris">
                          <option value="0">A</option>
                          <option value="1">B</option>
                          <option value="2">C</option>
                          <option value="3">D</option>
                          <option value="4">E</option>
                          <option value="5">F</option>
                          <option value="6">G</option>
                          <option value="7">H</option>
                          <option value="8">I</option>
                          <option value="9">J</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="field column is-one-third">
                    <label class="label">Discount Percentage</label>
                    <div class="control">
                      <div class="select">
                        <select onChange={this.handleChange} id="kolRabatPct">
                          <option value="0">A</option>
                          <option value="1">B</option>
                          <option value="2">C</option>
                          <option value="3">D</option>
                          <option value="4">E</option>
                          <option value="5">F</option>
                          <option value="6">G</option>
                          <option value="7">H</option>
                          <option value="8">I</option>
                          <option value="9">J</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="field column is-one-third">
                    <label class="label">Brutto after discount</label>
                    <div class="control">
                      <div class="select">
                        <select
                          onChange={this.handleChange}
                          id="kolBruttoEfterRabat"
                        >
                          <option value="0">A</option>
                          <option value="1">B</option>
                          <option value="2">C</option>
                          <option value="3">D</option>
                          <option value="4">E</option>
                          <option value="5">F</option>
                          <option value="6">G</option>
                          <option value="7">H</option>
                          <option value="8">I</option>
                          <option value="9">J</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <input type="submit" value="Send til sheet" />
              </form>
            </div>
          </section>
          <footer className="modal-card-foot">
            <p className="text-center">
              remember to love your little brother{" "}
              <span role="img" aria-label="emoji">
                ✌
              </span>
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

/* const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
}; */

const mapDispatchToProps = dispatch => {
  return {
    // passing in action createData imported in the top. Item is in the state. Dispatch as parameter.
    createSheet: item => dispatch(createSheet(item))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SheetModal);
