const net = require('net');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const conn = net.createConnection({
  host: 'localhost', // change to IP address of computer or ngrok host if tunneling
  port: 3000 // or change to the ngrok port if tunneling
});

conn.setEncoding('utf8'); // interpret data as text



conn.on('data', (data) => {
  console.log('Server says: ', data);
});

conn.on('connect', () => {
  console.log(`connected to server`);
});

const askForFile = (filename) => {
  //literally ask for the file
  console.log(`i asked i swear`)
  conn.write(`Can I has this file? ${filename}`)
}

setTimeout(() => askForFile('./file1.txt'), 4000);