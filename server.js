const http = require('http');

const app = require('./app');

const port = process.env.port || 3000;

const server = http.createServer(app);

server.listen(port); // server, port'u dinleyerek createServer'a gönderdiğin şeyleri yapmaya başlar
