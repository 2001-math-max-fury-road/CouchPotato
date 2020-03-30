import React from "react";

export default class JoinPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      couchId: "",
      username: "",
      couchWarning: "Please enter a valid Couch ID",
      usernameWarning: "Username cannot be empty"
    };

    this.joinCouch = this.joinCouch.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkCouchNum = this.checkCouchNum.bind(this);
  }

  joinCouch(event) {
    event.preventDefault();
    localStorage.setItem("couchId", this.state.couchId);
    localStorage.setItem("username", this.state.username);
    location.replace(
      `http://couch-potato-extension.herokuapp.com/${this.state.couchId}`
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  checkCouchNum(couchId) {
    let couchIdNum = parseInt(couchId);
    if (couchIdNum && couchIdNum.toString().length === 15) {
      return true;
    } else return false;
  }

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <form id="popup-form" onChange={this.handleChange}>
            <label htmlFor="couchId">Couch ID: 
            {!this.state.couchId && this.state.couchWarning && (
                <span className="warning"> {this.state.couchWarning}</span>
              )}</label>
            <input name="couchId"></input>
            <label htmlFor="username">
              Your Name:
              {!this.state.username && this.state.usernameWarning && (
                <span className="warning"> {this.state.usernameWarning}</span>
              )}
            </label>
            <input name="username"></input>
            <button
              type="submit"
              disabled={!this.checkCouchNum(this.state.couchId) || !this.state.username}
              onClick={this.joinCouch}
            >
              Join Couch
            </button>
          </form>
        </div>
      </div>
    );
  }
}
