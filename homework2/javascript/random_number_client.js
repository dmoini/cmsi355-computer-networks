const net = require('net');

const client = new net.Socket();
client.connect({ port: 53211, host: process.argv[2] });
client.on('data', (data) => {
  console.log(data.toString('utf-8'));
});