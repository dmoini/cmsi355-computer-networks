const app = require('express')();
const server = require('http').Server(app);
const io = require('socket.io')(server);

server.listen(53211);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/random', function (req, res) {
  let random = Math.floor(Math.random() * 100) + 1;
  res.send(`${random}`);
})

io.on('connection', function (socket) {
  let random = Math.floor(Math.random() * 100) + 1;
  socket.emit('news', random);
  socket.on('my other event', function (data) {
    console.log(data);
  });
});