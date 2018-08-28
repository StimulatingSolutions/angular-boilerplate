#!/usr/bin/env bash
set -e


###############################################################
# Should be run from within `npm run`, you may not get the
# expected results otherwise
###############################################################

MONGOD="true"
BUILD="--build"
CLEAN="--clean"

while [[ "$#" > "0" ]]
do
  if [[ "$1" == "--bare" ]]
  then
    BARE="true"
  fi

  if [[ "$1" == "--prod" ]]
  then
    PROD="--prod"
    export NODE_ENV=production
  fi

  if [[ "$1" == "--no-clean" ]]
  then
    CLEAN=""
  fi

  if [[ "$1" == "--no-build" ]]
  then
    BUILD=""
  fi

  if [[ "$1" == "--no-mongod" ]]
  then
    MONGOD=""
  fi

  if [[ "$1" == "--port" ]]
  then
    shift
    PORT="$1"
  fi

  shift
done


if [[ "$BARE" != "" ]]
then
  node dist/server/server.js
  exit $?
fi


if [[ "$BUILD" != "" ]]
then
  npm run build -- "$CLEAN" "$PROD"
fi

NAMES="server"
COLORS="white.bold.bgYellow"

if [[ "$PROD" != "" ]]
then
  COMMANDS=('node dist/server/server.js')
  export PORT=${PORT:-4200}
else
  if [[ "$PORT" != "" ]]
  then
    USE_PORT="--port $PORT"
  fi
  COMMANDS=('nodemon dist/server/server.js' "ng serve --proxy-config proxy.conf.json --open $USE_PORT" 'tsc -w -p server/tsconfig.server.json')
  NAMES="${NAMES},client,compile"
  COLORS="${COLORS},white.bold.bgRed,white.bold.bgMagenta"
fi

if [[ "$MONGOD" != "" ]]
then
  COMMANDS+=('mongod')
  NAMES="${NAMES},db"
  COLORS="${COLORS},white.bold.bgBlue"
fi

concurrently --kill-others --names "$NAMES" --prefix-colors "$COLORS" "${COMMANDS[@]}"
