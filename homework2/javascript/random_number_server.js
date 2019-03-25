const net = require('net');

const server = net.createServer((socket) => {
  let random = Math.floor(Math.random() * 100) + 1;
  socket.end(`${random}`);
});

server.listen(53211);