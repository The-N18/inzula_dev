#!/bin/bash

# replace server url in config file
config_file='/home/ubuntu/projects/inzula/src/configurations.js'
settings_file='/home/ubuntu/projects/inzula/inzula/settings.py'

sed -i 's/dkx1b8wlo613w.cloudfront.net/d1g0ix8w0r103u.cloudfront.net/' config_file
sed -i 's/INZ_DB_NAME/INZ_TEST_DB_NAME/' settings_file

#execute build command for the frontend
PUBLIC_URL=https://d1g0ix8w0r103u.cloudfront.net npm run build && ./gunicorn_start.sh
