// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
  // process HTTP request. Since we're writing just WebSockets
  // server we don't have to implement anything.
});

server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
  httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    console.log('on request');

    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        console.log('on message');
        console.dir(message);
        if (message.type === 'utf8') {
            // process WebSocket message
            connection.sendUTF( JSON.stringify({ type: 'history', data: "BLAH blah"}) );
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log('on close');
    });
});

console.log('websocket accepting connections on port 1337');