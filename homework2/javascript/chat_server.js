const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(50901, () => {
  console.log("Listening on port 50901");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/chat.html");
});

let users = [];

io.on("connection", socket => {
  console.log("A new user has joined the chat!");

  socket.on("username", data => {
    console.log(data);
    if (users.includes(data)) {
      socket.emit("taken username", true);
      console.log("Username" + data + "is taken");
    } else {
      console.log("Username" + data + "was accepted");
      socket.emit("taken username", false);
      users.push(data);
      socket.username = data;
      console.log(users);
    }
  });
  socket.on("message", msg => {
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    users = users.filter(e => e !== socket.username);
    console.log("A user has disconnected. :(");
    console.log(users);
  });
});
