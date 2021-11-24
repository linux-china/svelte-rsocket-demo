Svelte RSocket Demo
===================

# Features

* RSocket DSL for request/response, request/stream and fireAndForget
* RxJS integration for Svelte and RSocket-JS

# Requirements

* Only Webpack bundle: some issue with Rollup.js

# How to run demo?

* Start RSocket server to supply request/response service

```
$ node rsocket-ws-server.js
```

* Start Svelte app to test

```
$ npm run dev
```

# Use cases

* RPC call
* Data Stream Display
* Data Collection from the Browser
* Distributed State Management: Svelte store + RSocket metadataPush + CloudEvents spec

# References

* RSocket-JS composite metadata: https://github.com/rsocket/rsocket-js/blob/master/packages/rsocket-examples/src/CompositeMetadataExample.js
* svelte-webpack-template: https://github.com/sveltejs/template-webpack
* svelte-observable: https://github.com/timhall/svelte-observable
* RSocket Chrome Dev Tools: https://github.com/rsocket/rsocket-chrome-devtools
