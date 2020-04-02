import React from 'react';
import axios from 'axios';
import images from '../public/avatars/images';

export default class StartPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      couchId: '',
      username: '',
      avatar: '',
      usernameWarning: 'Name cannot be empty'
    };
    this.startCouch = this.startCouch.bind(this);
    this.chooseAvatar = this.chooseAvatar.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async startCouch(event) {
    event.preventDefault();
    const { data } = await axios.post('/api/');
    this.setState({ couchId: data.couchId });
    localStorage.setItem('couchId', this.state.couchId);
    localStorage.setItem('username', this.state.username);
    location.replace(`http://localhost:3000/${this.state.couchId}`);
    // location.replace(`http://couch-potato-extension.herokuapp.com/${this.state.couchId}`);
  }

  chooseAvatar(event) {
    event.preventDefault();
    this.setState({
      // avatar: {
      //   key: event.target.key,
      //   src: event.target.src,
      //   alt: event.target.alt
      // }
      avatar: event.target.src
    });
    localStorage.setItem('avatar', this.state.avatar);
    console.log('avatar chosen!');
    console.log(localStorage);
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
                    key={id}
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
