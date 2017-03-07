#!/bin/sh

docker run \
  -e EDUMATE_HOST=$EDUMATE_HOST \
  -e EDUMATE_PORT=$EDUMATE_PORT \
  -e EDUMATE_PATH=$EDUMATE_PATH \
  -e EDUMATE_USERNAME=$EDUMATE_USERNAME \
  -e EDUMATE_PASSWORD=$EDUMATE_PASSWORD \
  -e CANVAS_API_KEY=$CANVAS_API_KEY \
  -e CANVAS_API_DOMAIN=$CANVAS_API_DOMAIN \
  -e CANVAS_API_VERSION=$CANVAS_API_VERSION \
  -e CANVAS_API_THROTTLE=$CANVAS_API_THROTTLE \
  --name canvas_maintenance \
  --log-driver=json-file \
  --log-opt max-size=50m \
  --log-opt max-file=4 \
  --restart=on-failure:3 \
  --memory "512M" \
  -d canvas_maintenance
