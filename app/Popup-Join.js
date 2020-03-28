import React from 'react';
import Socket from './Socket'
import Chat from './Chat'
import axios from 'axios';

export default class JoinPopup extends React.Component {
  constructor() {
    super();
    this.state = {
      couchId: '',
      username: '',
    };
    this.joinCouch = this.joinCouch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  joinCouch(event) {
    event.preventDefault();
    Socket.emit('new-user', this.state.couchId, this.state.username)
    // location.replace(`http://localhost:3000/${this.state.couchId}`)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <form id="popup-form" onChange={this.handleChange}>
            <label htmlFor="couchId">Couch ID: </label>
            <input
              name="couchId"
              // value={this.state.couchId}
              // onChange={this.handleChange}
            ></input>
            <label htmlFor="username">Your Name: </label>
            <input
              name="username"
              // value={this.state.username}
              // onChange={this.handleChange}
            ></input>
            <button onClick={this.joinCouch}>Join Couch</button>
          </form>
        </div>
        <Chat couchId={this.state.couchId} username={this.state.username}/>
      </div>
    );
  }
}
