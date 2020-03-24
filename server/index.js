const express = require('express');
const app = express();
const server = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(server);
const port = process.env.PORT || 3000;

// app.set('views', '../views');
// app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const rooms = {};

app.get('/', (req, res) => {
  // res.render('index', { rooms: rooms });
  res.sendFile(path.join(__dirname, '/../public/index.html'));
  // res.sendFile(path.join(__dirname, "/popup.html"));
});

app.get('/:room', (req, res) => {
  res.render('room', { roomName: req.params.room });
});

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});

server.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

module.exports = io;
