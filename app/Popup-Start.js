import React from 'react';
import axios from 'axios';

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
    localStorage.setItem('couchId', this.state.couchId)
    localStorage.setItem('username', this.state.username)
    location.replace(`http://localhost:3000/${this.state.couchId}`)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <div className="popup">
        <div className="popup\_inner">
          <form id="popup-form" onChange={this.handleChange}>
            <label htmlFor="username">Your Name: </label>
            <input
              name="username"
            ></input>
            <button onClick={this.startCouch}>Start New Couch</button>
          </form>
        </div>
      </div>
    );
  }
}
