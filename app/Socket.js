import SocketIOClient from 'socket.io-client';

const socket = SocketIOClient('http://couch-potato-extension.herokuapp.com/');

export default socket;
