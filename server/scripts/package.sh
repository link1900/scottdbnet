#!/bin/bash

set -e
trap "exit" INT

echo "Artifact packing in progress...."

echo "preparing artifact folder"
rm -rf artifact/
mkdir -p artifact

echo "copying src"
cp dist/index.js ./artifact/index.js

echo "copying config"
npm run config:download
mkdir -p ./artifact/resource
cp -r ./resource/config ./artifact/resource

echo "copying prisma files"
cp ./prisma/schema.prisma ./artifact/schema.prisma
cp ./node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node ./artifact/libquery_engine-rhel-openssl-3.0.x.so.node

echo "Artifact packing successful!"


