#!/usr/bin/env bash
set -e


###############################################################
# Should be run from within `npm run`, you may not get the
# expected results otherwise
###############################################################

if [[ "$#" == "0" ]]
then
  SERVER="true"
  CLIENT="true"
fi
while [[ "$#" > "0" ]]
do
  if [[ "$1" == "--server" ]]
  then
    SERVER="true"
  fi

  if [[ "$1" == "--client" ]]
  then
    CLIENT="true"
  fi

  shift
done


if [[ "$SERVER" != "" ]]
then
  tslint "server/**/**.ts{,x}"
fi

if [[ "$CLIENT" != "" ]]
then
  ng lint
fi
