import React from 'react';
import Socket from './Socket';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      users: []
    };
    this.copiedToClipboard = this.copiedToClipboard.bind(this);

    Socket.on('user-connected', (username, users) => {
      const message = `${username} joined the Couch`;
      this.setState({ messages: [...this.state.messages, message], users });
    });

    Socket.on('user-disconnected', (socket, couch) => {
      const username = couch[socket];
      const message = `${username} has left the Couch`;
      delete couch[socket];
      const updatedUsers = Object.values(couch);
      this.setState({
        messages: [...this.state.messages, message],
        users: updatedUsers
      });
    });

    Socket.on('receive-message', msgObj => {
      this.setState({ messages: [...this.state.messages, msgObj] });    
      window.scrollTo(0, document.body.scrollHeight);
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
      window.scrollTo(0, document.body.scrollHeight);
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

  copiedToClipboard() {
    alert('Copied Couch ID to clipboard!');
  }

  render() {
    const users = this.state.users.join(', ');
    return (
      <div id="outer-container">
        <div id="chat-container">
          <div id="chat-header">
            <h3>
              Share this Couch ID:
              <CopyToClipboard text={localStorage.couchId}>
                <button
                  onClick={this.copiedToClipboard}
                  id="copy-to-clipboard"
                  variant="outline-primary"
                >
                  {localStorage.couchId}
                </button>
              </CopyToClipboard>
            </h3>
            <p>Current Seatmates: {users}</p>
          </div>
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
