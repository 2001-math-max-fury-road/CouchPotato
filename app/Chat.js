import React from 'react';
import socketIOClient from 'socket.io-client';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      couchId: '',
      username: '',
      message: '',
      messages: [],
    };
    this.socket = socketIOClient('http://localhost:3000');
    this.socket.on('receive message', msg => {
      addMessage(msg);
    });
    this.socket.on('user-connected', name => {
      const msg = `${name} connected`;
      this.setState({ messages: [...this.state.messages, msg] });
    });
    this.socket.on('user-disconnected', name => {
      const msg = `${name} disconnected`;
      this.setState({ messages: [...this.state.messages, msg] });
    });

    const addMessage = msg => {
      console.log('data_________', msg);
      this.setState({ messages: [...this.state.messages, msg] });
      console.log('state_________', this.state);
    };

    this.sendMessage = event => {
      event.preventDefault();
      this.socket.emit('send-chat-message', {
        username: this.state.username,
        message: this.state.message,
      });
      this.setState({ message: '' });
    };
  }

  componentDidMount() {
    if (this.props.location.state) {
      const joinCouch = { ...this.props.location.state };
      this.setState({ ...joinCouch });
    } else {
      const url = window.location.href;
      const splitURL = url.split('/');
      const couchId = splitURL[3];
      this.setState({ couchId: couchId });
    }
  }

  render() {
    console.log('this.state__________', this.state);
    return (
      <div>
        <h3>Share this Couch ID: {this.state.couchId}</h3>
        <ul id="messages">
          {this.state.messages.map(message => {
            return (
              <li>
                {message.username}: {message.message}
              </li>
            );
          })}
        </ul>
        <form id="chat-form" action="">
          <input
            type="text"
            placeholder="Message"
            value={this.state.message}
            onChange={ev => this.setState({ message: ev.target.value })}
            className="form-control"
          />
          <button onClick={this.sendMessage}>Send</button>
        </form>
      </div>
    );
  }
}
