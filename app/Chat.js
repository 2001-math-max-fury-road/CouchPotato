import React from 'react';
import Socket from './Socket';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Notifications, { notify } from 'react-notify-toast';
import '../public/emoji-mart.css';
import { Picker } from 'emoji-mart';
import UserForm from './UserForm';
import Popup from 'reactjs-popup';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messages: [],
      users: []
    };

    this.copiedToClipboard = this.copiedToClipboard.bind(this);
    this.showEmojis = this.showEmojis.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.addEmoji = this.addEmoji.bind(this);

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
      console.log('received message');
      this.setState({ messages: [...this.state.messages, msgObj] });
      window.scrollTo(0, document.body.scrollHeight);
    });

    Socket.on('player', (huluID, message) => {
      window.top.postMessage(`play-pause ${huluID}`, '*');
      this.setState({ messages: [...this.state.messages, message] });
    });

    this.sendMessage = event => {
      event.preventDefault();
      Socket.emit(
        'send-chat-message',
        this.state.message,
        localStorage.username,
        localStorage.avatar,
        localStorage.couchId
      );
      const allMessages = document.getElementsByClassName('message');
      const messageArray = Array.from(allMessages);
      messageArray.map(msg => {
        msg.removeAttribute('tab blink');
      });
      this.setState({ message: '' });
      window.scrollTo(0, document.body.scrollHeight);
    };

    this.sendShot = event => {
      event.preventDefault();
      Socket.emit(
        'send-shot',
        localStorage.username,
        localStorage.avatar,
        localStorage.couchId
      );
      window.scrollTo(0, document.body.scrollHeight);
    };
  }

  componentDidMount() {
    const username = localStorage.getItem('username');
    const couchId = localStorage.getItem('couchId');
    window.top.postMessage(`couchID ${couchId} ${username}`, '*');
    Socket.emit('new-user', couchId, username);
  }

  componentWillUnmount() {
    Socket.emit('disconnect');
  }

  copiedToClipboard() {
    const alertColor = { background: '#119da4', text: '#c8c8c8' };
    notify.show(
      'Copied Couch ID to clipboard! Now share it with your friends.',
      'custom',
      5000,
      alertColor
    );
  }

  showEmojis(e) {
    this.setState(
      {
        showEmojis: true
      },
      () => document.addEventListener('click', this.closeMenu)
    );
  }

  closeMenu(e) {
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false
        },
        () => document.removeEventListener('click', this.closeMenu)
      );
    }
  }

  addEmoji(e) {
    let emoji = e.native;
    this.setState({
      message: this.state.message + emoji
    });
  }

  render() {
    const users = this.state.users.join(', ');
    return (
      <div id="outer-container">
        <Notifications />
        <div id="chat-container">
          <div id="chat-header">
          <div id="popup-chat">
            <Popup
              modal
              trigger={<img src='https://cdn4.iconfinder.com/data/icons/dashboard-icons/46/icon-edit-512.png' title='Edit User'></img>}
            >
              {close => <UserForm 
                close={close}
                username={localStorage.username}
                avatar={localStorage.avatar}
              />}
            </Popup>
          </div>
            <h3>
              Click to Copy and Share this Couch ID:
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
            <p>
              <strong>Who's on the Couch:</strong> {users}
            </p>
          </div>
          
          <div>
            <ul id="messages">
              {this.state.messages.map(message => {
                if (message.username && !message.message) {
                  return (
                    <li className="message" class="tab blink">
                      <img src={message.avatar} />{' '}
                      <div id="drinking-game">
                        <div id="take-a-drink">
                          {message.username} says take a drink!{' '}
                          <img src="https://images.vexels.com/media/users/3/143358/isolated/preview/0fb2d717f3362970778533776849ec50-tequila-shot-icon-by-vexels.png" />{' '}
                          Cheers!
                        </div>
                      </div>
                    </li>
                  );
                } else if (message.username) {
                  return (
                    <li>
                      <img src={message.avatar} />{' '}
                      <div id="message-content">
                        {message.username}: {message.message}{' '}
                      </div>
                    </li>
                  );
                } else {
                  return <li className="message'">{message}</li>;
                }
              })}
            </ul>
          </div>
          <div id="flex-container">
            <div id="emoji">
              {this.state.showEmojis ? (
                <span id="emoji-span" ref={el => (this.emojiPicker = el)}>
                  <Picker onSelect={this.addEmoji} emojiTooltip={true} />
                </span>
              ) : (
                <img
                  id="emoji-img"
                  src={
                    'https://github.com/2001-math-max-fury-road/CouchPotato/blob/avatar-images/public/avatar-images/cowboy.png?raw=true'
                  }
                  onClick={this.showEmojis}
                ></img>
              )}
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
              <img
                id="drink-icon"
                src={
                  'https://github.com/2001-math-max-fury-road/CouchPotato/blob/avatar-images/public/avatar-images/drink-icon.png?raw=true'
                }
                onClick={this.sendShot}
              ></img>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
