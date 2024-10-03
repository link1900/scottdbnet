#!/bin/bash

set -e
trap "exit" INT

echo "Artifact packing in progress...."

echo "preparing artifact folder"
rm -rf artifact/
mkdir -p artifact

echo "moving files"
cp -r dist ./artifact/src
npm run config:download
mkdir -p ./artifact/resource/config
cp -r ./resource/config ./artifact/resource/config
cp ./package.json artifact/package.json
cp ./package-lock.json artifact/package-lock.json
cp ./.npmrc artifact/.npmrc

echo "installing dependencies"
cd artifact
npm ci

echo "Artifact packing successful!"


