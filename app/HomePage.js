import React, { Component } from 'react';
import JoinPopup from './Popup-Join';
import StartPopup from './Popup-Start';
import Instructions from './Instructions';

export default class HomePage extends Component {
  constructor() {
    super();
    this.state = {
      showJoin: false,
      showStart: false,
      showInstructions: false
    };
    this.toggleJoinPopup = this.toggleJoinPopup.bind(this);
    this.toggleStartPopup = this.toggleStartPopup.bind(this);
    this.toggleInstructions = this.toggleInstructions.bind(this);
  }

  toggleJoinPopup() {
    this.setState({
      showStart: false,
      showJoin: !this.state.showJoin
    });
  }

  toggleStartPopup() {
    this.setState({
      showJoin: false,
      showStart: !this.state.showStart
    });
  }

  toggleInstructions() {
    this.setState({
      showInstructions: !this.state.showInstructions
    });
  }

  render() {
    return (
      <div id="homepage">
        <div id="home-h1-container">
          <h1>Hey Couch Potato!</h1>
        </div>
        <div id="intro">
          <p>
            Joining a friend's couch? Click “Join a Couch” and use the Couch ID
            they sent you!
          </p>
          <p>Otherwise, click “Start a Couch” to get the party started!</p>
          {/* <div id="help-button-container">
            <button id="help-button" onClick={this.toggleInstructions}>I need more help!</button>
          </div> */}
        </div>
        {/* {this.state.showInstructions ? <Instructions /> : null} */}
        <div id="button-container">
          <button onClick={this.toggleJoinPopup}>Join a Couch</button>
          <button onClick={this.toggleStartPopup}>Start a New Couch</button>
        </div>
        {this.state.showJoin ? <JoinPopup /> : null}
        {this.state.showStart ? <StartPopup /> : null}
        <div id="help-button-container">
          <button id="help-button" onClick={this.toggleInstructions}>
            I need more help!
          </button>
          {this.state.showInstructions ? <Instructions /> : null}
        </div>
      </div>
    );
  }
}
