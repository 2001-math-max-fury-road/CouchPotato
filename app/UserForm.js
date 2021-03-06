import React, { Component } from "react";
import images from "../public/images";

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      avatar: this.props.avatar, 
    };

    this.changeUser = this.changeUser.bind(this);
    this.changeAvatar = this.changeAvatar.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
  }

  changeUser() {
    localStorage.setItem("avatar", this.state.avatar);
    localStorage.setItem("username", this.state.username);
    this.props.close()
  }

  changeAvatar(event) { 
      this.setState({ avatar: event.target.src })
  }

  changeUsername(event) {
    this.setState({ username: event.target.value });
  }

  render() {
    return (
      <div>
        <form id="edit-user-form">
          <div className="user-form-header"> Edit User </div>
          <div id="username-container">
            <label htmlFor="username" />
            <input
              onChange={this.changeUsername}
              name="username"
              placeholder={this.state.username}
            ></input>
          </div>
        </form>
        <div id="user-avatar-options-container">
            <img id="current-avatar" src={this.state.avatar}></img>
          <div id="user-avatar-options">
            {images.map(({ id, src, title }) => (
              <a id="user-avatar-button">
                <img
                  key={id}
                  id="user-avatar"
                  src={src}
                  alt={title}
                  onClick={this.changeAvatar}
                />
              </a>
            ))}
          </div>
        </div>
        <button
              type="submit"
              id="user-edit-save"
              onClick={this.changeUser}
            >Save & Close</button>
      </div>
    );
  }
}
