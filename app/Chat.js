import React from 'react';
import Socket from './Socket';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    };

    Socket.on('user-connected', username => {
      const message = `${username} joined the Couch`;
      this.setState({ messages: [...this.state.messages, message] });
    });

    Socket.on('user-disconnected', username => {
      const message = `${username} has left the Couch`;
      this.setState({ messages: [...this.state.messages, message] });
    });

    Socket.on('receive-message', msgObj => {
      this.setState({ messages: [...this.state.messages, msgObj] });
    });

    this.sendMessage = event => {
      event.preventDefault();
      Socket.emit(
        'send-chat-message',
        this.state.message,
        localStorage.username,
        localStorage.couchId
      );
      this.setState({ message: '' });
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    const couchId = localStorage.getItem('couchId');
    Socket.emit('new-user', couchId, username);
  }

  componentWillUnmount() {
    Socket.emit('disconnect');
  }

  render() {
    return (
      <div id="outer-container">
        <div id="chat-container">
          <h3>Share this Couch ID: {localStorage.couchId}</h3>
          <div>
            <ul id="messages">
                {this.state.messages.map(message => {
                  if (message.username) {
                    return (
                      <li>
                        {message.username}: {message.message}
                      </li>
                    );
                  } else {
                    return <li>{message}</li>;
                  }
                })}
            </ul>
          </div>
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
      </div>
    );
  }
}
