const app = require('express')();
const server = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(server)

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/../extension/popup.html'));
});

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
      });
  });
  
  server.listen(3000, function(){
    console.log('listening on *:3000');
  });

module.exports = io; 