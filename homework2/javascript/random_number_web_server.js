const app = require("express")();
const server = require("http").Server(app);
const io = require("socket.io")(server);

server.listen(53211);
console.log("Listening on port 53211...");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/random.html");
});

app.get("/random", function(req, res) {
  let random = Math.floor(Math.random() * 100) + 1;
  res.send(`${random}`);
});

io.on("connection", function(socket) {
  socket.emit("random", "Hello client!");
  socket.on("connected", function(data) {
    console.log(data);
  });
});
