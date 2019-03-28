const WebSocket = require("ws");
const http = require("http");
const server = new WebSocket.Server({ port: 58901 });

let name = new Set();
let writers = new Set();

server.broadcast = function broadcast(data) {
  server.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

(() => {
  server.on("connection", (socket, req) => {
    console.log("Connection from", req.connection.remoteAddress);
    writers.push(socket);
  });
  console.log("The chat server is running...");
})();
