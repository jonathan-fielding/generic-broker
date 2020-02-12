const io = require('socket.io-client');
const socket = io(process.env.SERVER_URL);
import fetch from 'node-fetch';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

socket.on('connect', function () {
    console.log('Connected to broker server');
});

socket.on('request', function({ requestId, path }) {
    fetch(`${process.env.INTERNAL_HOST}${path}`).then((res: { json: () => void; }) => res.json()).then((response: any) => {
        socket.emit('response', {
            requestId,
            response,
        });
    }).catch((response: any) => {
        socket.emit('response', {
            requestId,
            response,
        });
    });
});