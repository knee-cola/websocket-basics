# What't this?
This is a basic websocket example made based on the example found at https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

# What does it do?
In this example a web client connects to the WebSocket broadcasting server.

Each message the WebSocket server receives from a client is sent sent to all other connected (the client which sent the message does not receive it).

# How to run it
First make sure to install all the dependencies by running `npm i`

Then just run `npm start` ()

In your web browser visit address http://localhost:1337