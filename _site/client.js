// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

let logOutput;

document.addEventListener('DOMContentLoaded', () => {

    let wsServer = initServer();

    const tbxMsg = document.getElementById("tbxMsg");
    const cmdSend = document.getElementById("cmdSend");
    logOutput = document.getElementById('logOutput');

    cmdSend.addEventListener('click', () => {
        wsServer.send(tbxMsg.value);
    });

});

const log = msg => {
    const now = new Date();
    const padLeft = value => value<10 ? "0"+value : value;

    logOutput.innerHTML += `<br/>${padLeft(now.getHours())}:${padLeft(now.getMinutes())}:${padLeft(now.getSeconds())} ${msg}`
}

const initServer = () => {
    
    const wsServer = new WebSocket('ws://localhost:1337');

    wsServer.onopen = function () {
        // connection is opened and ready to use
        log('on open');
    };

    wsServer.onerror = function (error) {
        // an error occurred when sending/receiving data
        log('on error');
    };
    
    wsServer.onmessage = function (message) {
        log('received message: ' + message.data);
    };

    return(wsServer);
}