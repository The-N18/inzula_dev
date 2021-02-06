#!/bin/bash

# replace server url in config file
config_file='/home/ubuntu/projects/inzula/src/configurations.js'
sed -i 's/dkx1b8wlo613w.cloudfront.net/d1g0ix8w0r103u.cloudfront.net/' config_file

#execute build command for the frontend
PUBLIC_URL=https://d1g0ix8w0r103u.cloudfront.net npm run build && ./gunicorn_start.sh
