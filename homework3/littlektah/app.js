/* eslint-disable no-console */
/* eslint-disable no-undef */

// const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const game = require("./game/game");

const FRAMES_PER_SECOND = 24;
const ONE_SECOND = 1000;

server.listen(50000, () =>
  console.log("Little K'tah server is running on port 50000")
);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/littlektah.html");
});

const initializeZombies = () => {
  for (let i = 1; i <= 5; i++) {
    game.addZombie("zombie" + i);
  }
};

// NOTE:  io = server
//        socket = client
io.on("connection", socket => {
  const nameListener = name => {
    const trimmedName = name.trim();
    if (game.addPlayer(trimmedName, socket)) {
      console.log("NAMES:", game.getUsedNames());
      io.to(socket.id).emit("welcome");
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
  game.updateZombies(game.state());
  const deadSockets = game.checkIfDead();
  if (deadSockets.size > 0) {
    deadSockets.forEach(s => {
      io.to(s).emit("ded");
      io.emit("playerDead");
    });
  }
  io.emit("state", game.state());
};

const updateScores = () => {
  console.log("SERVE UPDATE SCORE");
  game.updateScores(game.state());
  io.emit("state", game.state());
};

// const updateHealth = () => {
//   game.updateHealth();
//   // io.emit("state", game.state());
// };

// TODO: divide 1000 by FRAMES_PER_SECOND
setInterval(updateZombies, ONE_SECOND / FRAMES_PER_SECOND);
setInterval(updateScores, ONE_SECOND);
// setInterval(updateHealth, ONE_SECOND);

initializeZombies();
