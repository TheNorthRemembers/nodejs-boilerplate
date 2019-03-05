#!/bin/sh
[ "$1" ] && mode="$1" && shift;

# snarfed from https://github.com/damianmr/heroku-node-settings/blob/master/heroku-node-settings.sh
if [ ! "$WEB_MEMORY" = "" ]; then
  if [ $WEB_MEMORY -le 512 ]; then
    NODE_FLAGS="--max_semi_space_size=2 --max_old_space_size=256"
  elif [ $WEB_MEMORY -le 768 ]; then
    NODE_FLAGS="--max_semi_space_size=8 --max_old_space_size=512"
  elif [ $WEB_MEMORY -le 1024 ]; then
    NODE_FLAGS="--max_semi_space_size=16 --max_old_space_size=1024"
  fi
fi

node $NODE_FLAGS dist/index.js "$mode";
