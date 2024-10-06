#!/bin/bash

set -e
trap "exit" INT

echo "Artifact packing in progress...."

echo "preparing artifact folder"
rm -rf artifact/
mkdir -p artifact

echo "copying src"
cp -r dist ./artifact/src
cp ./package.json artifact/package.json
cp ./package-lock.json artifact/package-lock.json
cp ./.npmrc artifact/.npmrc

echo "copying config"
npm run config:download
mkdir -p ./artifact/resource
cp -r ./resource/config ./artifact/resource

echo "copying prisma"
mkdir -p ./artifact
cp -r ./prisma ./artifact

echo "installing dependencies"
cd artifact
npm ci
rm -f ./node_modules/.prisma/client/libquery_engine-debian-openssl-3.0.x.so.node
rm -rf ./node_modules/@prisma/engines

echo "Artifact packing successful!"


