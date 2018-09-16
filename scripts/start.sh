#!/usr/bin/env bash
set -e


###############################################################
# Should be run from within `npm run`, you may not get the
# expected results otherwise
###############################################################

BUILD="--build"
CLEAN="--clean"

while [[ "$#" > "0" ]]
do
  if [[ "$1" == "--prod" ]]
  then
    PROD="--prod"
  fi

  if [[ "$1" == "--no-clean" ]]
  then
    CLEAN=""
  fi

  if [[ "$1" == "--no-build" ]]
  then
    BUILD=""
  fi

  if [[ "$1" == "--port" ]]
  then
    shift
    PORT="$1"
  fi

  shift
done


if [[ "$BUILD" != "" ]]
then
  npm run build -- "$CLEAN" "$PROD"
fi

# not sure what needs to happen here to run electron, but the angular build files are somewhere in /dist
