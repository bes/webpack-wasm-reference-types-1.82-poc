#!/bin/bash

set -e

# Make the script run in its own directory instead of the caller's directory.
cd "$(cd -P -- "$(dirname -- "$0")" && pwd -P)" || exit 1

# Build to ./pkg
case $1 in
  release)
    set -x
    wasm-pack build \
      --release \
      --weak-refs \
      --reference-types \
      --target bundler \
      --scope "wasm-lib" .
    ;;
  debug)
    set -x
    wasm-pack build \
      --dev \
      --weak-refs \
      --reference-types \
      --target bundler \
      --scope "wasm-lib" .
    ;;
  nightly)
    rustup run nightly wasm-pack build \
      --release \
      --weak-refs \
      --reference-types \
      --target bundler \
      --scope "wasm-lib" \
      --manifest-path ./Cargo.toml \
      -Z build-std=panic_abort,std \
      -Z build-std-features=panic_immediate_abort
    ;;
  *)
    echo "Must select a mode <debug  | release | nightly>"
    exit 1
    ;;
esac
