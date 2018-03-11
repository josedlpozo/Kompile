#! /bin/bash

docker cp api:/usr/src/app/db.production.sqlite ./api/

docker-compose build
docker-compose up -d