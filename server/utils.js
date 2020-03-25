function randomizeRoomId() { 
    return Math.floor(Math.random() * 1000000000000000) 
}

module.exports = randomizeRoomId; 