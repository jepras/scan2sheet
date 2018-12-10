import React, { Component } from "react";
import "./App.css";
import Modal from "./Modal";
import firebase from "./config/config";
import withFirebaseAuth from "react-auth-firebase";

const API =
  "https://sheets.googleapis.com/v4/spreadsheets/1fMcBPX63LaF_DcdOraoPXVdJaYGii4-yd5F-Ho8J3NQ/values:batchGet?ranges=Danzafe&majorDimension=ROWS&key=AIzaSyC5wW3TbBAkP-rteoW3qsYtDmMZbOXdD0c";

const POSTAPI =
  "https://sheets.googleapis.com/v4/spreadsheets/1RaX62Sjrnf2nqOFVlJM7efjrONFG5q9ZOGWCaY4IPJM/values/input:append?valueInputOption=USER_ENTERED&alt=json&key=AIzaSyC5wW3TbBAkP-rteoW3qsYtDmMZbOXdD0c";

class App extends Component {
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
    this.submitModal = this.submitModal.bind(this);

    this.handleSheetChange = this.handleSheetChange.bind(this);
    this.handleSheetSubmit = this.handleSheetSubmit.bind(this);
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

  submitModal(data) {
    /* console.log(data);
    fetch(POSTAPI, {
      method: "post",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data)
    })
      .then(response => console.log(response))
      .then(response => response.json())
      .then(data => {
        console.log(data);
      }); */
  }

  handleSheetChange(event) {
    this.setState({ post: event.target.value });
  }

  handleSheetSubmit(event) {
    console.log("Posted to sheet is: " + this.state.post);

    var post = JSON.parse(this.state.post);
    console.log(post);

    event.preventDefault();
    fetch(POSTAPI, {
      method: "post",
      mode: "no-cors",
      cache: "no-cache",
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json; charset=utf-8"
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(this.state.post)
    })
      .then(response => console.log(response))
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }

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

    const {
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      googleAccessToken,
      signOut,
      user,
      error
    } = this.props;

    const { email, password } = this.state;

    return (
      <div className="has-text-centered">
        <h3>sign</h3>
        <form onSubmit={e => e.preventDefault()}>
          ...form input to take email and password for sign in
          <button
            type="submit"
            onClick={() => signInWithEmail(email, password)}
          >
            SignIn
          </button>
        </form>
        // For Sign Up
        <form onSubmit={e => e.preventDefault()}>
          ...form input to take email and password for sign up
          <button
            type="submit"
            onClick={() => signUpWithEmail(email, password)}
          >
            SignUp
          </button>
        </form>
        <button onClick={signInWithGoogle}>Signin with Google</button>
        <h1 className="title">title</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {/*         <hr />
        <ul>{itemFound}</ul> */}
        <hr />
        <p className="subtitle">Add to sheet</p>
        <form onSubmit={this.handleSheetSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.post}
              onChange={this.handleSheetChange}
            />
          </label>
          <input type="submit" value="Submit to sheet" />
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

const authConfig = {
  email: {
    verifyOnSignup: false, // Sends verification email to user upon sign up
    saveUserInDatabase: true // Saves user in database at /users ref
  },
  google: {
    // redirect: true, // Opens a pop up by default
    returnAccessToken: true, // Returns an access token as googleAccessToken prop
    saveUserInDatabase: true // Saves user in database at /users ref
  },
  facebook: {
    // redirect: true, // Opens a pop up by default
    returnAccessToken: true, // Returns an access token as googleAccessToken prop
    saveUserInDatabase: true // Saves user in database at /users ref
  },
  github: {
    // redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },
  twitter: {
    // redirect: true,
    returnAccessToken: true,
    returnSecret: true,
    saveUserInDatabase: true
  }
};

export default withFirebaseAuth(App, firebase, authConfig);
