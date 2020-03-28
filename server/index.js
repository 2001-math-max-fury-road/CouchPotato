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

const couches = {};

// route for starting a new couch
app.post("/api/", (req, res) => {
  const couch = randomizeCouchId();
  if (!couches[couch]) {
    couches[couch] = true;
  } else {
    couch = randomizeCouchId();
    couches[couch] = true;
  }
  res.redirect(couch);
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
  socket.on("new-user", (couch, name) => {
    socket.join(couch);
    io.in(couch).emit("user-connected", name);
  });
  socket.on("send-chat-message", (message, username, couch) => {
    io.in(couch).emit(
      "receive-message",
      {
        message: message,
        username: username,
      }
    );
    socket.on("disconnect", (name, couch) => {
      // if/else statement to test for users in room??
      io.in(couch).emit("user-disconnected", name);
    });
  });
});

// error handling middleware
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error");
});

module.exports = app;
