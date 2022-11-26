import net from 'net';

const PORT = 18018;
const HOST = '0.0.0.0';

const server = net.createServer((socket) => {
  const address = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`Client ${address} discovered`);
  socket.write('Hello client, I am the server.');

  socket.on('data', (data) => {
    console.log(`Received from client ${address}: ${data}`);
  });

  socket.on('error', (error) => {
    console.error(`Error from client ${address}: ${error}`);
  });

  socket.on('close', () => {
    console.error(`Connection to client ${address} closed`);
  });
});

server.listen(PORT, HOST);
console.log(`Server started on ${HOST}:${PORT}`);
