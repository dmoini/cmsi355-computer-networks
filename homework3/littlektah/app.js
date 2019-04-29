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

// TODO: fix issue where server crashes when use reloads page

function randomColor() {
  const [r, g, b] = Array(3).fill(0).map(() => Math.floor(Math.random() * 200));
  return `rgb(${r}, ${g}, ${b})`;
};

const state = new Map();
const usernames = new Set();

new WebSocket.Server({ port: 50001 }).on('connection', (socket) => {
  console.log('Connection from socket');

  state.set(socket, { location: [0, 0], color: randomColor() });
  socket.on('message', (data) => {
    console.log(`RECEIVED MESSAGE: ${data}`);
    state.get(socket).location = JSON.parse(data);
    const renderData = JSON.stringify(Array.from(state.values()));
    Array.from(state.keys()).forEach(sock => sock.send(renderData));
  });

  socket.on('submitted username', (username) => {
    console.log(`RECEIVED USERNAME: ${username}`);
    if (usernames.has(username)) {
      socket.emit('username-taken');
    } else {
      usernames.add(username);
      socket.emit('welcome')
    }
  });

  socket.on('error', (e)=> {
    console.log(e);
  })
});