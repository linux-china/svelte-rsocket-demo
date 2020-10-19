Svelte RSocket Demo
===================

# Features

* RSocket DSL for request/response, request/stream and fireAndForget
* RxJS integration for Svelte and RSocket-JS

# Requirements

* Only Webpack bundle: some issue with Rollup.js
* Webpack: 4.x. Not compatible with Webpack 5.x https://github.com/sveltejs/svelte-loader/issues/139

# How to run demo?

* Start RSocket server to supply request/response service

```
$ rsocket-cli -i "pong" --server --debug ws://localhost:8080/rsocket
```

* Start Svelte app to test

```
$ npm run dev
```

# References

* RSocket-JS composite metadata: https://github.com/rsocket/rsocket-js/blob/master/packages/rsocket-examples/src/CompositeMetadataExample.js
* svelte-webpack-template: https://github.com/sveltejs/template-webpack
