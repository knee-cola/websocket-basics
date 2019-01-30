// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

const WebSocketServer = require('websocket').server;
const http = require('http');
const log = require('./logger');

const port = 1337;

const openConnections = [];

module.exports = function WsServer() {

    const httpServer = http.createServer(function(request, response) {
      // process HTTP request. Since we're writing just WebSockets
      // server we don't have to implement anything.
      log(`http: received request for ${request.url}`);
      response.writeHead(404);
      response.end();
    });
    
    httpServer.listen(port, function() {
        log(`ws: server listening on ws://localhost:${port}/`);
    });
    
    // create the server
    const wsServer = new WebSocketServer({ httpServer });
    
    // WebSocket server
    wsServer.on('request', function(request) {
    
        log('ws: new connection established');
    
        var connection = request.accept(null, request.origin);

        openConnections.push(connection);
    
        // This is the most important callback for us, we'll handle
        // all messages from users here.
        connection.on('message', function(message) {
    
            log('ws: new message received');
    
            if (message.type === 'utf8') {
                // process WebSocket message
                // connection.sendUTF( JSON.stringify({ type: 'history', data: "BLAH blah"}) );

                // broadcast message to all the clients except the one who sent the message
                openConnections.forEach(function(destination) {
                    if(destination !== connection) {
                        destination.sendUTF(message.utf8Data);
                    }
                });
            }
        });
    
        connection.on('close', function(connection) {
            // close user connection

            // remove connection from the list
            const ix = openConnections.indexOf(connection);
            openConnections.splice(ix, 1);

            log('ws: connection closed');
        });
    });
};