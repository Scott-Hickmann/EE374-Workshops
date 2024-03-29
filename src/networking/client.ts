import net from 'net';

const SERVER_PORT = 18018;
const SERVER_HOST = '0.0.0.0';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const client = new net.Socket();
client.connect(SERVER_PORT, SERVER_HOST, async () => {
  console.log(`Connected to server ${SERVER_HOST}:${SERVER_PORT}`);
  client.write(
    `Hello server, I am the client.\nHey server, here's a second message.\n`
  );
  client.write(`And server, here's a third incomplete message `);
  await delay(1000);
  client.write(`which is now complete.\n`);
});

let buffer = '';
client.on('data', (data) => {
  buffer += data;
  const messages = buffer.split('\n');
  if (messages.length > 1) {
    for (const message of messages.slice(0, -1)) {
      console.log(`Received from server: ${message}`);
    }
    buffer = messages[messages.length - 1];
  }
});

client.on('error', (error) => {
  console.error(`Error from server: ${error}`);
});

client.on('close', () => {
  console.error('Connection to server closed');
});
