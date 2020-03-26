function randomizeCouchId() {
  return Math.floor(Math.random() * 1000000000000000);
}

function getUserCouches(socket) {
  return Object.entries(couches).reduce((names, [name, couch]) => {
    if (couch.users[socket.id] != null) names.push(name);
    return names;
  }, []);
}

module.exports = { randomizeCouchId, getUserCouches };
