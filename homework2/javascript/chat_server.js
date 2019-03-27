const WebSocket = require("ws");
const http = require("http");
const server = new WebSocket.Server({ port: 58901 });

let name = Set();
let writers = Set();
(() => {
  server.on("connection", (socket, req) => {
    console.log("Connection from", req.connection.remoteAddress);
    writers.push(socket);
  });
  console.log("The Chat server is running...");
})();
