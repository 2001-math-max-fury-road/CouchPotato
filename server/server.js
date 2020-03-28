// const router = require('express').Router()
// const io = require('./index')
// const server = require("http").Server(router);
// const randomizeRoomId = require('./utils')

// const rooms = {};

// // route for starting a new room
// router.post('/', (req, res) => {
//     const roomId = randomizeRoomId()
//     if(!rooms[roomId]) {
//         rooms[roomId] = { users: {} }
//     } else {
//         roomId = randomizeRoomId()
//         rooms[roomId] = { users: {} }
//     }
//     res.redirect(`/${roomId}`)
// })

// // route for joining an existing room
// router.get("/:room", (req, res) => {
//     res.json({ roomId: req.params.room });

//   });

// io.on("connection", function(socket) {
//     console.log("a user connected");
//     socket.on("chat message", function(msg) {
//       io.emit("receive message", msg);
//     });
//   });

// module.exports = io;
