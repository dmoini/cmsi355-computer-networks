// const path = require("path");
const express = require("express");
const app = express();
const WebSocket = require("ws");
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(50000, () => console.log("Little K'tah server is running on port 50000"));

app.use(express.static("public"));
app.get("/", (req, res) => {
  // TODO: check for unique username
  // res.sendFile(path.join(__dirname, "public", "littlektah.html"));
  res.sendFile(__dirname + "/public/littlektah.html");

  // If unique username, then send to game
  // res.sendFile(path.join(__dirname, "public", "littlektah.html"))
});
// app.listen(50000, () => console.log("Little K'tah server is running"));

// TODO: fix issue where server crashes when use reloads page

function randomColor() {
  const [r, g, b] = Array(3).fill(0).map(() => Math.floor(Math.random() * 200));
  return `rgb(${r}, ${g}, ${b})`;
};

const state = new Map();
const usernames = new Set();

// new WebSocket.Server({ port: 50001 }).on("connection", (socket) => {
io.on("connection", (socket) => {
  console.log("New connection");

  state.set(socket, { location: [0, 0], color: randomColor() });
  // TODO: change event from "message" to something else
  socket.on("message", (data) => {
    console.log(`RECEIVED MESSAGE: ${data}`);
    state.get(socket).location = JSON.parse(data);
    const renderData = JSON.stringify(Array.from(state.values()));
    Array.from(state.keys()).forEach(sock => sock.send(renderData));
  });

  socket.on("submitted username", (username) => {
    console.log(`RECEIVED USERNAME: ${username}`);
    if (usernames.has(username)) {
      console.log("SERVER Username taken")
      socket.emit("username-taken");
    } else {
      console.log("SERVER Untaken username")
      usernames.add(username);
      socket.emit("accepted username")
    }
    console.log("USERNAMES:", usernames);
  });

  socket.on("error", (e)=> {
    console.log(e);
  })
});