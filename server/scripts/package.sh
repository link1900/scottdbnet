#!/bin/bash

set -e
trap "exit" INT

echo "Artifact packing in progress...."

echo "preparing artifact folder"
rm -rf artifact/
mkdir -p artifact


echo "preparing api artifact"
mkdir -p artifact/api

echo "copying src"
cp dist/index.js ./artifact/api/index.js

echo "copying config"
npm run config:download
mkdir -p ./artifact/api/resource
cp -r ./resource/config ./artifact/api/resource

echo "copying prisma files"
cp ./prisma/schema.prisma ./artifact/api/schema.prisma
cp ./node_modules/.prisma/client/libquery_engine-rhel-openssl-3.0.x.so.node ./artifact/api/libquery_engine-rhel-openssl-3.0.x.so.node

echo "preparing migrator artifact folder"
mkdir -p artifact/migrator
cp -r ./migrator/* ./artifact/migrator
cp -r ./prisma ./artifact/migrator
cp ./resource/config/.env.prod ./artifact/migrator/.env
cd artifact/migrator
PRISMA_CLI_BINARY_TARGETS=rhel-openssl-3.0.x npm install
npm run build
cd ..

echo "Artifact packing successful!"


