'use strict';

const Deferred = require('fbjs/lib/Deferred');
const {Single} = require('rsocket-flowable');
const {RSocketServer} = require('rsocket-core');
const RSocketWebSocketServer = require('rsocket-websocket-server').default;

async function receive() {
    const server = new RSocketServer({
        getRequestHandler(socket, payload) {
            return {
                requestResponse: (payload) => {
                    console.log('request: ' + payload.data.toString());
                    return Single.of({
                        data: "Pong",
                        metadata: null
                    })
                }
            };
        },
        transport: new RSocketWebSocketServer({
            host: '127.0.0.1',
            port: 8080,
            path: "/rsocket"
        }),
    });
    return server.start();
}

async function run() {
    const rsocket = await receive();
    const deferred = new Deferred();
    return deferred.getPromise();
}

Promise.resolve(run()).then(
    () => process.exit(0),
    error => {
        console.error(error.stack);
        process.exit(1);
    },
);

