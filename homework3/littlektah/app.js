/* eslint-disable no-console */
/* eslint-disable no-undef */

// const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const game = require("./game/game");
const framesPerSecond = 24;

server.listen(50000, () =>
  console.log("Little K'tah server is running on port 50000")
);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/littlektah.html");
});

// NOTE: creates 5 zombie players
// TODO: use addZombie function
// for (let i = 1; i <= 5; i += 1) {
//   let name = "ZOMBIE" + i;
//   game.addPlayer(name);
// }
const initializeZombies = () => {
  for (let i = 1; i <= 5; i++) {
    game.addZombie("zombie" + i);
  }
}

// NOTE:  io = server
//        socket = client
io.on("connection", socket => {
  const nameListener = (name) => {
    const trimmedName = name.trim();
    if (game.addPlayer(trimmedName)) {
      console.log("NAMES:", game.getUsedNames());
      socket.emit("welcome");
      io.emit("state", game.state());
      socket.removeListener("name", nameListener);
      
      socket.on("move", mousePosition => {
        console.log("Mouse position", mousePosition);
        game.move(mousePosition, trimmedName);
        io.emit("state", game.state());
        // io.emit("test");
      });
    } else {
      socket.emit("badname", trimmedName);
    }
  };
  socket.on("name", nameListener);
});

const updateZombies = () => {
  io.emit("update zombies");
}

setInterval(updateZombies, 1000 / 1);

initializeZombies();