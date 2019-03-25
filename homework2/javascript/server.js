var express = require('express');
var app = express();

app.get('/', function (req, res) {
   res.send(`Please click button to get random number`);
})

app.get('/random', function (req, res) {
   let random = Math.floor(Math.random() * 100) + 1;
   res.send(`${random}`);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})