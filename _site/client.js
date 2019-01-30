// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

document.addEventListener('DOMContentLoaded', () => {

    let wsServer = initServer();

    const tbxMsg = document.getElementById("tbxMsg");
    const cmdSend = document.getElementById("cmdSend");

    cmdSend.addEventListener('click', () => {
        wsServer.send(tbxMsg.value);
    });

});


const initServer = () => {
    
    const wsServer = new WebSocket('ws://localhost:1337');

    wsServer.onopen = function () {
        // connection is opened and ready to use
        console.log('on open');
    };

    wsServer.onerror = function (error) {
        // an error occurred when sending/receiving data
        console.log('on error');
    };
    
    wsServer.onmessage = function (message) {
        console.log('on message');
        console.dir(message);
 //       try {
 //           var json = JSON.parse(message.data);
 //       } catch (e) {
 //           console.log('This doesn\'t look like a valid JSON: ', message.data);
 //           return;
 //       }
    };

    return(wsServer);
}