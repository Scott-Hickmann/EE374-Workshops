import net from 'net';

const PORT = 18018;
const HOST = '0.0.0.0';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const server = net.createServer(async (socket) => {
  const address = `${socket.remoteAddress}:${socket.remotePort}`;
  console.log(`Client ${address} discovered`);

  let buffer = '';
  socket.on('data', (data) => {
    buffer += data;
    const messages = buffer.split('\n');
    if (messages.length > 1) {
      for (const message of messages.slice(0, -1)) {
        console.log(`Received from client ${address}: ${message}`);
      }
      buffer = messages[messages.length - 1];
    }
  });

  socket.on('error', (error) => {
    console.error(`Error from client ${address}: ${error}`);
  });

  socket.on('close', () => {
    console.error(`Connection to client ${address} closed`);
  });

  socket.write(
    `Hello client, I am the server.\nHey client, here's a second message.\n`
  );
  socket.write(`And client, here's a third incomplete message `);
  await delay(1000);
  socket.write(`which is now complete.\n`);
});

server.listen(PORT, HOST);
console.log(`Server started on ${HOST}:${PORT}`);
