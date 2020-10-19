import {
    RSocketClient,
    BufferEncoders,
    encodeAndAddCustomMetadata,
    encodeAndAddWellKnownMetadata,
    MESSAGE_RSOCKET_COMPOSITE_METADATA,
    APPLICATION_JSON,
    MESSAGE_RSOCKET_ROUTING
} from 'rsocket-core';
import {ReactiveSocket} from 'rsocket-types';
import RSocketWebSocketClient from 'rsocket-websocket-client';
import {Observable} from "rxjs";

/**
 * connect to RSocket Server
 * @param wsUrl websocket URL
 * @return {Promise<ReactiveSocket>}
 */
function connect(wsUrl) {
    const client = new RSocketClient({
        setup: {
            keepAlive: 1000000, // avoid sending during test
            lifetime: 100000,
            dataMimeType: APPLICATION_JSON.string,
            metadataMimeType: MESSAGE_RSOCKET_COMPOSITE_METADATA.string,
        },
        transport: new RSocketWebSocketClient({url: wsUrl, debug: true}, BufferEncoders)
    });
    return client.connect();
}

/**
 * RSocket instance with extra methods
 * @type {Promise<ReactiveSocket>}
 */
const rsocket = connect("ws://localhost:8080/rsocket")

/**
 * rsocket request/response
 * @param routing {string} routing key
 * @param data {string|Buffer|Object} text/json data or json data
 * @return {Promise<string>}
 */
rsocket.requestResponse = async (routing, data) => {
    return new Promise((resolve, reject) => {
        rsocket.then(r => {
            r.requestResponse({
                data: convertToBuffer(data),
                metadata: encodeAndAddWellKnownMetadata(
                    Buffer.alloc(0),
                    MESSAGE_RSOCKET_ROUTING,
                    Buffer.from(String.fromCharCode(routing.length) + routing)
                )
            }).subscribe({
                onComplete: (payload) => {
                    resolve(payload.data)
                },
                onError: (error) => {
                    reject(error)
                }
            });
        });
    });
}

/**
 * rsocket fireAndForget
 * @param routing {string} routing key
 * @param data {string|Buffer|Object} text/json data or json data
 * @return {Promise}
 */
rsocket.fireAndForget = async (routing, data) => {
    return new Promise((resolve, reject) => {
        rsocket.then(r => {
            r.fireAndForget({
                data: convertToBuffer(data),
                metadata: encodeAndAddWellKnownMetadata(
                    Buffer.alloc(0),
                    MESSAGE_RSOCKET_ROUTING,
                    Buffer.from(String.fromCharCode(routing.length) + routing)
                )
            }).subscribe({
                onComplete: () => {
                    resolve()
                },
                onError: (error) => {
                    reject(error)
                }
            });
        });
    });
}


/**
 * rsocket request/stream
 * @param routing {string} routing key
 * @param data {string|Buffer|Object} text/json data or json data
 * @return {Observable<string>}
 */
rsocket.requestStream = async (routing, data) => {
    return new Observable(observer => {
        rsocket.then(r => {
            r.requestStream({
                data: convertToBuffer(data),
                metadata: encodeAndAddWellKnownMetadata(
                    Buffer.alloc(0),
                    MESSAGE_RSOCKET_ROUTING,
                    Buffer.from(String.fromCharCode(routing.length) + routing)
                )
            }).subscribe({
                onComplete: () => observer.complete(),
                onError: error => observer.error(error),
                onNext: payload => observer.next(payload.data)
            });
        });
    });
}


/**
 * @param data {string|Buffer|Object} text/json data or json data
 * @return {Buffer|null}
 */
function convertToBuffer(data) {
    if (data === null) {
        return null;
    } else if (Buffer.isBuffer(data)) {
        return data;
    } else if (typeof data === 'string' || data instanceof String) {
        return new Buffer(data);
    } else {
        return new Buffer(JSON.stringify(data));
    }

}

export {rsocket}
