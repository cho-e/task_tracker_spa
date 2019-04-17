#!/bin/bash

export MIX_ENV=prod
export PORT=4797
export NODEBIN=`pwd`/assets/node_modules/.bin
export PATH="$PATH:$NODEBIN"

echo "Building..."

mkdir -p ~/.config
mkdir -p priv/static

mix deps.get
mix compile
(cd assets && npm install)
(cd assets && webpack --mode production)
mix phx.digest

MIX_ENV=prod mix ecto.migrate

echo "Generating release..."
mix release

echo "Stopping old copy of app, if any..."
_build/prod/rel/task_tracker_spa/bin/task_tracker_spa stop || true

echo "Starting app..."

_build/prod/rel/task_tracker_spa/bin/task_tracker_spa foreground
