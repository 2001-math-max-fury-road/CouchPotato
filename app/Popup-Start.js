import React from 'react';
import axios from 'axios';
import socketIOClient from 'socket.io-client';
import { Link } from 'react-router-dom';

export default class StartPopup extends React.Component {
  constructor() {
    super();
    this.state = { couchId: '', username: '' };
    this.socket = socketIOClient('http://localhost:3000');
    this.startCouch = this.startCouch.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async startCouch(event) {
    event.preventDefault();
    console.log(event.target)
    const { data } = await axios.post('/api/');
    this.setState({ couchId: data.roomId });
    this.socket.on('room-created', room => {});
    console.log('data_______', data.roomId);
    location.replace(`http://localhost:3000/${data.roomId}`);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <form id="popup-form">
            <label htmlFor="username">Your Name: </label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            ></input>
            <Link
              to={{
                pathname: `${this.state.couchId}`,
                state: { ...this.state },
              }}
            >
              <button onClick={this.startCouch}>Start New Couch</button>
            </Link>
          </form>
        </div>
      </div>
    );
  }
}
