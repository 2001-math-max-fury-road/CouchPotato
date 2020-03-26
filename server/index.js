const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const port = process.env.PORT || 3000;
const volleyball = require('volleyball');
const io = require('socket.io')(server);
const router = require('express').Router();
const { randomizeRoomId, getUserRooms } = require('./utils');

app.set('view engine', 'html');

// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === 'test';
app.use(volleyball.custom({ debug }));

// static middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./server'))

const rooms = {};

// route for starting a new room
app.post('/api/', (req, res) => {
  const roomId = randomizeRoomId();
  if (!rooms[roomId]) {
    rooms[roomId] = { users: {} };
  } else {
    roomId = randomizeRoomId();
    rooms[roomId] = { users: {} };
  }
  res.redirect(roomId);
  // console.log('success!')
  // res.sendStatus(204).json()
});

// route for joining an existing room
app.get('/api/:room', (req, res) => {
  res.json({ roomId: req.params.room });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../public/index.html'));
});

server.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('new-user', (room, name) => {
    socket.join(room);
    rooms[room].users[socket.id] = name;
    socket.to(room).broadcast.emit('user-connected', name);
  });
  socket.on('send-chat-message', (room, message) => {
    socket.to(room).broadcast.emit('chat-message', {
      message: message,
      name: rooms[room].users[socket.id],
    });
    socket.on('disconnect', () => {
      getUserRooms(socket).forEach(room => {
        socket
          .to(room)
          .broadcast.emit('user-disconnected', rooms[room].users[socket.id]);
        delete rooms[room].users[socket.id];
      });
    });
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

module.exports = app;
