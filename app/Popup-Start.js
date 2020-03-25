import React from "react";
import axios from "axios";

export default class StartPopup extends React.Component {
  constructor() {
    super();
    this.state = { username: "" };
    this.startCouch = this.startCouch.bind(this);
  }

  async startCouch(event) {
    event.preventDefault();
    this.setState({ username: event.target.value });
    const { data } = await axios.post("/api/");
    console.log("data_______", data.roomId);
    location.replace(`http://localhost:3000/${data.roomId}`);
  }

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <form id="popup-form">
            <label htmlFor="username">Your Name: </label>
            <input name="username"></input>
            <button onClick={this.startCouch}>Start New Couch</button>
          </form>
        </div>
      </div>
    );
  }
}
