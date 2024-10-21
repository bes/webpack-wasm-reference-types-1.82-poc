# POC

This proof-of-concept is supposed to show that webpack 5.95.0 in combination
with Rust 1.82.0 and `reference types` can't build / start the dev server.

# Prerequisites

## Tools

* [wasm-pack](https://rustwasm.github.io/wasm-pack/installer/)
* `rustup target add wasm32-unknown-unknown`

## Install

```shell
# Build wasm library
$ ./build debug
# Install npm packages (including wasm library)
$ npm install
```

## Run

```shell
npm run app
```

On my computer running results in

```shell
% npm run app                                                                                                                                                                                                                             141 ↵

> app
> TS_NODE_PROJECT="tsconfig-for-scripts.json" ts-node app/webpack-server.ts prod

<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8101/, http://[::1]:8101/
<i> [webpack-dev-server] Content not from webpack is served from '/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/public' directory
<i> [webpack-dev-server] 404s will fallback to '/index.html'
app
asset main.js 1.18 MiB [emitted] (name: main) 1 related asset
asset 85cf84f3318b4921a4a7.module.wasm 1.66 KiB [emitted] [immutable] (auxiliary name: main)
asset index.html 320 bytes [emitted]
runtime modules 30.4 KiB 14 modules
modules by path ./node_modules/ 1.1 MiB
  modules by path ./node_modules/webpack-dev-server/client/ 81.9 KiB 17 modules
  modules by path ./node_modules/webpack/hot/*.js 5.17 KiB 4 modules
  modules by path ./node_modules/html-entities/lib/*.js 78.7 KiB 4 modules
  modules by path ./node_modules/scheduler/ 32.4 KiB 4 modules
  modules by path ./node_modules/prop-types/ 4.15 KiB 3 modules
  modules by path ./node_modules/react/ 59.4 KiB 2 modules
  modules by path ./node_modules/react-dom/ 840 KiB 2 modules
  + 3 modules
modules by path ./wasm-lib/pkg/ 7.17 KiB (javascript) 144 KiB (webassembly)
  ./wasm-lib/pkg/wasm_lib.js 160 bytes [built] [code generated]
  ./wasm-lib/pkg/wasm_lib_bg.wasm 40 bytes (javascript) 144 KiB (webassembly) [built] [code generated] [1 error]
  ./wasm-lib/pkg/wasm_lib_bg.js 6.97 KiB [built] [code generated]
./app/src/main/js/main.tsx 257 bytes [built] [code generated]

ERROR in ./wasm-lib/pkg/wasm_lib_bg.wasm
Module parse failed: Internal failure: parseVec could not cast the value
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
Error: Internal failure: parseVec could not cast the value
    at parseVec (/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/@webassemblyjs/wasm-parser/lib/decoder.js:343:15)
    at parseTypeSection (/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/@webassemblyjs/wasm-parser/lib/decoder.js:375:22)
    at parseSection (/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/@webassemblyjs/wasm-parser/lib/decoder.js:1379:23)
    at Object.decode (/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/@webassemblyjs/wasm-parser/lib/decoder.js:1740:25)
    at decode (/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/@webassemblyjs/wasm-parser/lib/index.js:253:21)
    at WebAssemblyParser.parse (/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/webpack/lib/wasm-async/AsyncWebAssemblyParser.js:61:19)
    at /Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/webpack/lib/NormalModule.js:1303:19
    at processResult (/Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/webpack/lib/NormalModule.js:937:11)
    at /Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/webpack/lib/NormalModule.js:1030:5
    at /Users/myuser/repos/github/webpack-wasm-reference-types-1.82-poc/node_modules/loader-runner/lib/LoaderRunner.js:407:3
 @ ./wasm-lib/pkg/wasm_lib.js 1:0-40 1:130-134 1:136-157
 @ ./app/src/main/js/main.tsx 1:57-95 1:109-114

webpack 5.95.0 compiled with 1 error in 494 ms
Type-checking in progress...
No errors found.
```
