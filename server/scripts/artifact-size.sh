#!/bin/bash

set -e
trap "exit" INT

echo "Check artifact size..."
echo "zipping artifact"
rm -rf ./artifact.zip
zip -r ./artifact.zip ./artifact
stat -c%s "./artifact.zip" | awk '{ split("B KB MB GB TB", units); for (i=1; $1>=1024 && i<5; i++) $1/=1024; printf "%.2f %s\n", $1, units[i] }'



