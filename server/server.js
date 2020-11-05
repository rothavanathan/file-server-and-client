const net = require('net');
const fs = require('fs');

const server = net.createServer();

// add this line after server is created, before listen is called
server.on('connection', (client) => {
  console.log('New client connected!');
  client.write('Hello there!');
  client.setEncoding('utf8'); // interpret data as text
  client.on('data', (data) => {
    console.log('Message from client: ', data);
    const fileRequested = data.split(' ').reverse()[0]
    // if file exists in directory
    if (searchForFile(fileRequested)) {
      //send file to client THIS PART ISN'T WORKING /////////
      let string = ""
      fs.open(fileRequested, (err, data) => {
        if (err) throw err;
        string = data;
      })
      client.write(data) 
    }
    /////////////////////////////////////////////////////////
  });

});


const searchForFile = (fileName) => fs.existsSync(fileName);

// const retrieveFile = (fileName) => 

server.listen(3000, () => {
  console.log('Server listening on port 3000!');
});
