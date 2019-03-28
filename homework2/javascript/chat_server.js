const app = require("express")();
const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(53211);

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/chat.html");
});

io.on("connection", socket => {
  console.log("A new player has joined!");
  socket.on("username", data => {
    socket.username = data.username;
  });
  socket.on("message", data => {
    io.sockets.emit("message", {
      username: socket.username,
      message: data.message,
    });
  });
});
