#!/usr/bin/env bash
set -e


###############################################################
# Should be run from within `npm run`, you may not get the
# expected results otherwise
###############################################################

while [[ "$#" > "0" ]]
do
  if [[ "$1" == "--clean" ]]
  then
    CLEAN="true"
  fi

  if [[ "$1" == "--prod" ]]
  then
    PROD="true"
  fi

  shift
done


if [[ "$CLEAN" != "" ]]
then
  rm -rf dist/*
fi

if [[ "$PROD" != "" ]]
then
  ng build --aot --prod
fi

tsc -p server/tsconfig.server.json
