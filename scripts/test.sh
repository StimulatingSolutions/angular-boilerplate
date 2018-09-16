#!/usr/bin/env bash
set -e


###############################################################
# Should be run from within `npm run`, you may not get the
# expected results otherwise
###############################################################

if [[ "$#" == "0" ]]
then
  CLIENT="true"
  E2E="true"
fi
while [[ "$#" > "0" ]]
do
  if [[ "$1" == "--client" ]]
  then
    CLIENT="true"
  fi

  if [[ "$1" == "--e2e" ]]
  then
    E2E="true"
  fi

  shift
done


if [[ "$CLIENT" != "" ]]
then
  ng test
fi

if [[ "$E2E" != "" ]]
then
  ng e2e
fi
