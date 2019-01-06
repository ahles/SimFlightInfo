var dgram = require('dgram');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const updHost = '127.0.0.1';
const udpPort = 49000;

var udpClient = dgram.createSocket('udp4');

io.on('connection', (socket) => {
  console.log('connection established');
  udpClient.on('message', (msg, rinfo) => {
    const position = readMessage(msg);
    // console.log('rinfo', rinfo);
    io.emit('position', position);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
    io.emit('user disconnected');
  });
});

udpClient.bind(udpPort, updHost);

const socketPort = process.env.PORT || 3000;

server.listen(socketPort);


























function readMessage(msg) {
  // console.log('msg', msg);

  const data = msg.slice(0, 4).toString();
  // console.log('data', data);

  const index = msg.readInt8(5);
  // console.log('index', index);

  const values = msg.slice(9);
  // console.log('values', values);

  const latitude = msg.slice(9, 13).readFloatLE();
  // console.log('latitude', latitude);

  const longitude = msg.slice(13, 17).readFloatLE();
  // console.log('longitude', longitude);

  const altitude = msg.slice(17, 21).readFloatLE();
  // console.log('altitude', altitude);

/*   const value4 = msg.slice(21, 25).readFloatLE();
  console.log('value4', value4);

  const value5 = msg.slice(21, 25).readFloatLE();
  console.log('value5', value5);

  const value6 = msg.slice(25, 29).readFloatLE();
  console.log('value6', value6);

  const value7 = msg.slice(29, 33).readFloatLE();
  console.log('value7', value7);

  const value8 = msg.slice(33, 37).readFloatLE();
  console.log('value8', value8); */

  console.log(latitude + ' | ' + longitude + ' | ' + altitude);

  const result = {
    latitude,
    longitude,
    altitude,
  };

  // console.log('result', result);

  return result;
}