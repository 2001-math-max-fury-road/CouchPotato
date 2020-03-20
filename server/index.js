const app = require("express")();
const server = require("http").Server(app);
const path = require("path");
const io = require("socket.io")(server);
const port = process.env.PORT || 3000

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "/../extension/popup.html"));
  //res.sendFile(path.join(__dirname, "/popup.html"));
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("chat message", function(msg) {
    io.emit("chat message", msg);
  });
});

server.listen(port, function() {
  console.log(`listening on *: ${port}`);
});

module.exports = io;
