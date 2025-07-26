#!/bin/bash
substreams build
sed -i "" "s/substreams = \"0.8\"/substreams = \"0.6.1\"/g" Cargo.toml
sed -i "" "s/substreams-ethereum = \"0.8\"/substreams-ethereum = \"0.10.5\"/g" Cargo.toml
cargo build --target wasm32-unknown-unknown --release
