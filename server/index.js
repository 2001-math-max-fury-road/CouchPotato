const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(server);
const port = process.env.PORT || 3000;

app.set("view engine", "html");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const rooms = {};

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});

// route for joining an existing room 
app.get("/:room", (req, res) => {
  res.render('room', { roomId: req.params.room });
});


io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    io.emit("receive message", msg);
  });
});

server.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

module.exports = io;
