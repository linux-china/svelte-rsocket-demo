'use strict';

const {Single} = require('rsocket-flowable');
const {RSocketServer} = require('rsocket-core');
const RSocketWebSocketServer = require('rsocket-websocket-server');

//=== rsocket handler
const requestHandler = (requestingRSocket, setupPayload) => {
    return {
        requestResponse: (payload) => {
            return new Single((subscriber) => {
                subscriber.onSubscribe(() => {
                });
                console.log('request: ' + payload.data.toString());
                try {
                    subscriber.onComplete({
                        data: 'Pong',
                        metadata: ''
                    });
                } catch (e) {
                    subscriber.onError(e);
                }
            });
        }
    };
};

const WebSocketTransport = RSocketWebSocketServer.default;
const transport = new WebSocketTransport({host: "127.0.0.1", port: 8080, path:"/rsocket"});
const rsocketServer = new RSocketServer({transport: transport, getRequestHandler: requestHandler});
rsocketServer.start();
console.log("RSocket server started on http://localhost:8080/rsocket");


