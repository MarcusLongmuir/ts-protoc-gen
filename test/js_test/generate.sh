#!/bin/bash

rm -rf generated/
mkdir -p generated/

protoc \
  --plugin=protoc-gen-js_grpc=../../bin/protoc-gen-ts \
  --js_out=import_style=commonjs,binary:generated \
  --js_grpc_out=grpc=true:generated \
  -I ../proto \
  ../proto/othercom/*.proto \
  ../proto/examplecom/*.proto
