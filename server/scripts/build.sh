#!/bin/bash

set -e
trap "exit" INT

echo "Building in progress...."

echo "building source"
rm -rf dist/
mkdir -p dist
npm run build

echo "preparing build folder"
rm -rf build/
mkdir -p build

echo "moving files"
cp -r dist build/src
npm run config:download
cp -r ./src/config ./build/src/config
cp ./package.json build/package.json
cp ./package-lock.json build/package-lock.json
cp ./.npmrc build/.npmrc

echo "installing dependencies"
cd build
npm install --omit=dev

echo "Build successful!"


