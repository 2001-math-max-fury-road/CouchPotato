import React from "react";
import axios from "axios";
import images from "../public/images";

export default class StartPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      couchId: "",
      username: "",
      avatar:
        "https://cdn.clipart.email/ded3c97537d29ccd7b35f61defe0b8ae_potato-clipart-kawaii-pencil-and-in-color-potato-clipart-kawaii_1024-1264.png",
      usernameWarning: "Name cannot be empty",
    };
    this.startCouch = this.startCouch.bind(this);
    this.chooseAvatar = this.chooseAvatar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async startCouch(event) {
    event.preventDefault();
    const { data } = await axios.post("/api/");
    this.setState({ couchId: data.couchId });
    localStorage.setItem("couchId", this.state.couchId);
    localStorage.setItem("username", this.state.username);
    localStorage.setItem("avatar", this.state.avatar);
    location.replace(
      `http://couch-potato-extension.herokuapp.com/${this.state.couchId}`
    );
  }

  async chooseAvatar(event) {
    event.preventDefault();
    this.setState({
      avatar: event.target.src,
    });
    const allAvatars = document.getElementsByClassName("avatar");
    const avatarArray = Array.from(allAvatars);
    avatarArray.map((img) => {
      img.style["border"] = "black";
    });
    const selectedAvatar = document.getElementById(event.target.id);
    selectedAvatar.style["border"] = "1.5pt solid #119da4";
    selectedAvatar.style["border-radius"] = "10px";
    this.clickedAvatar = selectedAvatar;
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <form id="popup-form" onChange={this.handleChange}>
            <label htmlFor="username">
              {!this.state.username && this.state.usernameWarning && (
                <span className="warning"> {this.state.usernameWarning}</span>
              )}
            </label>
            <input name="username" placeholder="Your name" />
            <div id="avatar-options-container">
              <p>
                <strong>Choose an avatar:</strong>
              </p>
              <div id="avatar-options">
                {images.map(({ id, src, title }) => (
                  <img
                    className="avatar"
                    key={id}
                    id={id}
                    src={src}
                    alt={title}
                    onClick={this.chooseAvatar}
                  />
                ))}
              </div>
            </div>
            <button
              type="submit"
              id="couch-submit"
              disabled={!this.state.username}
              onClick={this.startCouch}
            >
              Start!
            </button>
          </form>
        </div>
      </div>
    );
  }
}
