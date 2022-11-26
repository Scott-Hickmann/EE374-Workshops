import net from 'net';

const SERVER_PORT = 18018;
const SERVER_HOST = '0.0.0.0';

const client = new net.Socket();
client.connect(SERVER_PORT, SERVER_HOST, () => {
  console.log(`Connected to server ${SERVER_HOST}:${SERVER_PORT}`);
  client.write('Hello server, I am the client.');
});

client.on('data', (data) => {
  console.log(`Received from server: ${data}`);
});

client.on('error', (error) => {
  console.log(`Error from server: ${error}`);
});

client.on('close', () => {
  console.log('Connection to server closed');
});
