// https://medium.com/@martin.sikora/node-js-websocket-simple-chat-tutorial-2def3a841b61

let logOutput;

document.addEventListener('DOMContentLoaded', () => {

    let wsClient = initClient();

    const tbxMsg = document.getElementById("tbxMsg");
    const cmdSend = document.getElementById("cmdSend");
    logOutput = document.getElementById('logOutput');

    cmdSend.addEventListener('click', () => {
        wsClient.send(tbxMsg.value);
    });

});

const log = msg => {
    const now = new Date();
    const padLeft = value => value<10 ? "0"+value : value;

    logOutput.innerHTML += `<br/>${padLeft(now.getHours())}:${padLeft(now.getMinutes())}:${padLeft(now.getSeconds())} ${msg}`
}

const initClient = () => {
    
    const wsClient = new WebSocket('ws://localhost:1337');

    wsClient.onopen = function () {
        // connection is opened and ready to use
        log('on open');
    };

    wsClient.onerror = function (error) {
        // an error occurred when sending/receiving data
        log('on error');
    };
    
    wsClient.onmessage = function (message) {
        log('received message: ' + message.data);
    };

    return(wsClient);
}