const http = require('http');
const WebSocketServer = require('websocket').server;

const server = http.createServer();
server.listen(9001);

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', request => {
    const conn = request.accept(null, request.origin);

    conn.on('message', data => {
        console.log('server message', data);
        conn.sendBytes(data);
    });

    conn.on('close', (code, desc) => {
        console.log('closed', code, desc);
    })

    conn.on('open', () => {
        console.log('connection started');
    })
});