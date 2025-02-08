const WebSocket = require('ws');

const server = new WebSocket.Server({ port: process.env.PORT || 8080 });

server.on('connection', (socket) => {
  console.log('A user connected.');

  socket.on('message', (message) => {
    console.log(`Received: ${message}`);
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  socket.on('close', () => console.log('A user disconnected.'));
});
