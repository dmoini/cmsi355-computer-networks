const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(53211);
// WARNING: app.listen(80) will NOT work here!

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/random", function(req, res) {
  let random = Math.floor(Math.random() * 100) + 1;
  res.send(`${random}`);
});

io.on("connection", function(socket) {
  socket.emit("random", "Hello client!");
  socket.on("Connected", function(data) {
    console.log(data);
  });
});
