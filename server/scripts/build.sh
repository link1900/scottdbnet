#!/bin/bash

set -e
trap "exit" INT

echo "Building in progress..."

echo "building source"
rm -rf dist/
mkdir -p dist
yarn build

echo "preparing build folder"
rm -rf build/
mkdir -p build

echo "moving files"
cp -r dist build/src
yarn config:download
cp -r ./src/config ./build/src/config
cp ./package.json build/package.json
cp ./yarn.lock build/yarn.lock
cp ./.npmrc build/.npmrc

echo "installing dependencies"
cd build
yarn install --frozen-lockfile --non-interactive --production --cache-folder ~/.cache/yarn

echo "Build successful!"


