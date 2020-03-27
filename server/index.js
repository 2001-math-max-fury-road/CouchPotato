const express = require("express");
const app = express();
const server = require("http").Server(app);
const path = require("path");
const port = process.env.PORT || 3000;
const volleyball = require("volleyball");
const io = require("socket.io")(server);
const router = require("express").Router();
const randomizeCouchId = require("./utils");

app.set("view engine", "html");

// Only use logging middleware when not running tests
const debug = process.env.NODE_ENV === "test";
app.use(volleyball.custom({ debug }));

// static middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use('/', require('./server'))
const couches = {};

// route for starting a new couch
app.post("/api/", (req, res) => {
  const couch = randomizeCouchId();
  if (!couches[couch]) {
    couches[couch] = { users: {} };
  } else {
    couch = randomizeCouchId();
    couches[couch] = { users: {} };
  }
  console.log(
    "1. couches",
    couches,
    "users",
    couches[couch].users,
    "couchId",
    couch
  );
  res.redirect(couch);
  // console.log('success!')
  // res.sendStatus(204).json()
});

// route for joining an existing couch
app.get("/api/:couch", (req, res) => {
  res.json({ couchId: req.params.couch });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/../public/index.html"));
});

server.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

io.on("connection", socket => {
  console.log("2.a user connected");
  console.log("3.couches", couches);
  socket.on("new-user", (couch, name) => {
    console.log("4. new-user-socket: couch, name", couch, name);
    socket.join(couch);
    couches[couch].users[socket.id] = name;
    console.log("5. new-user socket.id", socket.id, name);
    socket.to(couch).emit("user-connected", name);
  });
  socket.on("send-chat-message", (couch, name, message) => {
    console.log("6. send-chat-message couch", couch);
    console.log("7. send-chat-message name", name);
    console.log("8. send-chat-message, socket.id", socket.id);
    console.log(message);
    socket.to(couch).emit(
      "receive-message",
      message
      // {
      //   message: message,
      //   // name: couches[couch].users[socket.id],
      // }
    );
    socket.on("disconnect", (couch, name) => {
      socket.to(couch).emit("user-disconnected", name);
      // delete couches[couch].users[socket.id];
    });
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
