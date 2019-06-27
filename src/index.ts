const configPath = process.env.BROKER_CONFIG || '../config.json';
const config = require(configPath);
const io = require('socket.io-client')
const socket = io(config.server_url);
import fetch from 'node-fetch';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

socket.on('connect', function () {
    console.log('Connected to broker server');
});

socket.on('request', function({ requestId, path }) {
    fetch(`${config.internal_host}${path}`).then(res => res.json()).then(response => {
        socket.emit('response', {
            requestId,
            response,
        });
    }).catch(response => {
        socket.emit('response', {
            requestId,
            response,
        });
    });
});