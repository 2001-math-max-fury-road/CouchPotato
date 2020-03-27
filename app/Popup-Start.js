import React from 'react';
import axios from 'axios';
import Socket from './Socket'
import Chat from './Chat'

export default class StartPopup extends React.Component {
  constructor() {
    super();
    this.state = { couchId: '', username: '' };
    this.startCouch = this.startCouch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async startCouch(event) {
    event.preventDefault();
    const { data } = await axios.post('/api/');
    this.setState({ couchId: data.couchId });
    Socket.emit('new-user', this.state.couchId, this.state.username)
    // location.replace(`http://localhost:3000/${data.couchId}`);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const state = this.state
    return (
      <div className="popup">
        <div className="popup\_inner">
          <form id="popup-form" onChange={this.handleChange}>
            <label htmlFor="username">Your Name: </label>
            <input
              name="username"
              // value={this.state.username}
              // onChange={this.handleChange}
            ></input>
            <button onClick={this.startCouch}>Start New Couch</button>
            <Chat couchId={this.state.couchId} username={this.state.username}/> 
          </form>
        </div>
      </div>
    );
  }
}
