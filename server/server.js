const net = require('net');
const fs = require('fs');

const server = net.createServer();

//this event triggers on connection by client
server.on('connection', (client) => {
  console.log('New client connected!');
  client.write('Hello there!');
  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    const fileRequested = data.split(' ').reverse()[0]
    // if file exists in directory
    if (searchForFile(fileRequested)) {
      console.log(`${fileRequested} is in directory`)
      //send file to client THIS PART ISN'T WORKING /////////
      client.write(`I do have ${fileRequested} over here.`) 
      fs.readFile(fileRequested, "UTF-8", (err, text) => {
        if (err) throw err;

        client.write(`The file you requested reads:\n`)
        client.write(text)
      })
    }
    /////////////////////////////////////////////////////////
  });

});


const searchForFile = (fileName) => fs.existsSync(fileName);

// const retrieveFile = (fileName) => 

server.listen({
  port: 3000,
  readableAll: true
}, () => {
  console.log('Server listening on port 3000!');
});
