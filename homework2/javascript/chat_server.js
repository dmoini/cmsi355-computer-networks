const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(50901, () => {
  console.log("Listening on port 50901");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/chat.html");
  // res.send('<h1>IAN SUCKS</h1>')
});

const users = [];

io.on("connection", socket => {
  console.log("A new user has joined the chat!");

  socket.on("username", data => {
    console.log("username received");
    console.log(data);
    if (users.includes(data)) {
      io.emit("taken username", true);
      console.log("username taken");
    } else {
      console.log("username accepted");
      io.emit("taken username", false);
      users.push(data);
      socket.username = data;
      console.log(users);
    }
  });

  // socket.on('message', data => {
  //   console.log('data' + data);
  //   io.sockets.emit('message', {
  //     username: socket.username,
  //     message: data.message,
  //   });
  // });
  socket.on("message", msg => {
    io.emit("message", msg);
  });
  socket.on("disconnect", () => {
    console.log("A user has disconnected. :(");
  });
});
