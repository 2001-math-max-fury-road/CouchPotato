function randomizeCouchId() {
  const id = Math.floor(Math.random() * 1000000000000000);
  return id.toString()
}

module.exports = randomizeCouchId;
