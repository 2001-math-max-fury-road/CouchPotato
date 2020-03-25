const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const port = process.env.PORT || 3000;
const volleyball = require("volleyball")
const io = require("socket.io")(server);
const router = require('express').Router()
const randomizeRoomId = require('./utils')

app.set("view engine", "html");

// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === 'test'
app.use(volleyball.custom({ debug }))

// static middleware
app.use(express.static("public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./server'))

const rooms = {};

// route for starting a new room
app.post('/api/', (req, res) => {
  const roomId = randomizeRoomId()
  if(!rooms[roomId]) {
      rooms[roomId] = { users: {} }
  } else {
      roomId = randomizeRoomId()
      rooms[roomId] = { users: {} }
  }
  res.redirect(roomId)
  // console.log('success!')
  // res.sendStatus(204).json()
})

// route for joining an existing room
app.get("/api/:room", (req, res) => {
  res.json({ roomId: req.params.room });

});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});

server.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    io.emit("receive message", msg);
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})

module.exports = app;
