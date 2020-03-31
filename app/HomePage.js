import React, { Component } from 'react';
import JoinPopup from './Popup-Join';
import StartPopup from './Popup-Start';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = { showJoin: false, showStart: false };
    this.toggleJoinPopup = this.toggleJoinPopup.bind(this);
    this.toggleStartPopup = this.toggleStartPopup.bind(this);
  }

  toggleJoinPopup() {
    this.setState({ showStart: false, showJoin: !this.state.showJoin });
  }

  toggleStartPopup() {
    this.setState({ showJoin: false, showStart: !this.state.showStart });
  }

  render() {
    return (
      <div id="homepage">
        <div id="home-h1-container">
          <h1>Hey Couch Potato!</h1>
        </div>
        <div id="intro">
          <p>Have a couch already? Click “Join a Couch”!</p>
          <p>Otherwise, click “Start a Couch” to get the party started!</p>
        </div>
        <div id="button-container">
          <button onClick={this.toggleJoinPopup}>Join a Couch</button>
          <button onClick={this.toggleStartPopup}>Start a New Couch</button>
        </div>
        {this.state.showJoin ? <JoinPopup /> : null}
        {this.state.showStart ? <StartPopup /> : null}
      </div>
    );
  }
}
