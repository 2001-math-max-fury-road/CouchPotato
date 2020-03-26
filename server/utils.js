function randomizeRoomId() {
  return Math.floor(Math.random() * 1000000000000000);
}

function getUserRooms(socket) {
  return Object.entries(rooms).reduce((names, [name, room]) => {
    if (room.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

module.exports = { randomizeRoomId, getUserRooms };
