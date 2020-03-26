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
    this.socket.on('couch-created', () => {
     const msg = `${this.state.username} started the couch!`
     this.setState({ messages: [...this.state.messages, msg] })
    });
    this.socket.on('receive message', msg => {
      addMessage(msg);
    });
    this.socket.on('user-connected', username => {
      const msg = `${username} connected`;
      this.setState({ messages: [...this.state.messages, msg] });
    });
    this.socket.on('user-disconnected', username => {
      const msg = `${username} disconnected`;
      this.setState({ messages: [...this.state.messages, msg] });
    });

    const addMessage = msg => {
      this.setState({ messages: [...this.state.messages, msg] });
    };

    this.sendMessage = event => {
      event.preventDefault();
      this.socket.emit('send-chat-message', this.state.couchId, this.state.message);
      this.setState({ message: '' });
    };
  }

  componentDidMount() {
    //axios.get
    if (this.props.location.state) {
      console.log('hit this')
      const joinCouch = { ...this.props.location.state };
      this.setState({ ...joinCouch });
    } else {
      console.log('hit THIS', this.props.location)
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
