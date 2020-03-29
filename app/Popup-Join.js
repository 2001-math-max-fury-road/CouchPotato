import React from 'react';

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
            <label htmlFor="couchId">Couch ID: </label>
            <input
              name="couchId"
            ></input>
            <label htmlFor="username">Your Name: </label>
            <input
              name="username"
            ></input>
            <button onClick={this.joinCouch}>Join Couch</button>
          </form>
        </div>
      </div>
    );
  }
}
