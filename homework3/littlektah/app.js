const path = require('path');
const express = require('express');
const WebSocket = require('ws');

const app = express();
app.use(express.static('public'));
app.get('/', (req, res) => {
  // TODO: check for unique username
  res.sendFile(path.join(__dirname, 'public', 'littlektah.html'));

  // If unique username, then send to game
  // res.sendFile(path.join(__dirname, 'public', 'littlektah.html'))
});
app.listen(50000, () => console.log("Little K'tah server is running"));

const state = new Map();

// app.get("/game", function(req, res) {
//   let random = Math.floor(Math.random() * 100) + 1;
//   res.send(`${random}`);
// });

// TODO: fix issue where server crashes when use reloads page

function randomColor() {
  const [r, g, b] = Array(3).fill(0).map(() => Math.floor(Math.random() * 200));
  return `rgb(${r}, ${g}, ${b})`;
}

new WebSocket.Server({ port: 50001 }).on('connection', (socket) => {

  state.set(socket, { location: [0, 0], color: randomColor() });
  socket.on('message', (data) => {
    state.get(socket).location = JSON.parse(data);
    const renderData = JSON.stringify(Array.from(state.values()));
    Array.from(state.keys()).forEach(sock => sock.send(renderData));
  });

  socket.on('error', (e)=> {
    console.log(e);
  })
});