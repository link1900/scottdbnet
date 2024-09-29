#!/bin/bash

set -e
trap "exit" INT

echo "Artifact packing in progress...."

echo "building source"
rm -rf dist/
mkdir -p dist
npm run build

echo "preparing artifact folder"
rm -rf artifact/
mkdir -p artifact

echo "moving files"
cp -r dist build/src
npm run config:download
cp -r ./src/config ./artifact/src/config
cp ./package.json artifact/package.json
cp ./package-lock.json artifact/package-lock.json
cp ./.npmrc artifact/.npmrc

echo "installing dependencies"
cd artifact
npm ci

echo "Artifact packing successful!"


