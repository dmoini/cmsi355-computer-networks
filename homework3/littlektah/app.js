/* eslint-disable no-console */
/* eslint-disable no-undef */

// const path = require("path");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const game = require("./game/game");

server.listen(50000, () =>
  console.log("Little K'tah server is running on port 50000")
);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/littlektah.html");
});

io.on("connection", socket => {
  const nameListener = (name) => {
    const trimmedName = name.trim();
    if (game.addPlayer(trimmedName)) {
      console.log("NAMES:", game.getUsedNames());
      io.to(socket.id).emit("welcome");
      io.emit("state", game.state());
      socket.removeListener("name", nameListener);
      
      socket.on("move", mousePosition => {
        console.log("Mouse position", mousePosition);
        game.move(mousePosition, trimmedName);
        io.emit("state", game.state());
      });
    } else {
      io.to(socket.id).emit("badname", trimmedName);
    }
  };
  socket.on("name", nameListener);
});
