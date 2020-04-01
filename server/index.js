const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const port = process.env.PORT || 3000;
const volleyball = require("volleyball");
const io = require("socket.io")(server);
// const huluIO = require("socket.io")();
const { couches, randomizeCouchId, getUserCouches } = require("./utils");

app.set("view engine", "html");

// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === "test";
app.use(volleyball.custom({ debug }));

// static middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route for starting a new couch
app.post("/api/", (req, res) => {
  const couch = randomizeCouchId();
  couches[couch] = { users: {} };
  res.redirect(couch);
});

// route for joining an existing couch
app.get("/api/:couch", (req, res) => {
  res.json({ couchId: req.params.couch });
});

// '/api/:couch/:action'
// add event listener to play/pause, send request to that route,

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});

server.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

io.on("connection", socket => {
  socket.on("new-user", (couch, name) => {
    const error = "Not the right Couch";
    if (couches[couch]) {
      socket.join(couch);
      couches[couch].users[socket.id] = name;
      const users = Object.values(couches[couch].users)
      io.in(couch).emit("user-connected", name, users);
    } else {
      socket.emit(error);
    }
  });
  socket.on("send-chat-message", (message, username, couch) => {
    io.in(couch).emit("receive-message", {
      message: message,
      username: username
    });
  });
  socket.on("disconnect", () => {
    getUserCouches(socket).forEach(couch => {
      socket
        .to(couch)
        .broadcast.emit("user-disconnected", socket.id, couches[couch].users);
      delete couches[couch].users[socket.id];
    });
  });
  socket.on("play-pause", couch => {
    const message = 'Is anyone out there?'
    // io.in(couch).emit("player", message)
    io.emit("player", message)
  })
});

// huluIO.on("connection", socket => {
//   socket.on("play-pause", () => {
//     const message = 'Is anyone out there?'
//     huluIO.emit("player", message)
//   })
// })

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
