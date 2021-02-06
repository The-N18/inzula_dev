#!/bin/bash
index_file='/home/ubuntu/projects/inzula/build/index.html'
service_worker_file='/home/ubuntu/projects/inzula/build/service-worker.js'
config_file='/home/ubuntu/projects/inzula/src/configurations.js'
settings_file='/home/ubuntu/projects/inzula/inzula/settings.py'

for filename in /home/ubuntu/projects/inzula/build/static/js/* ; do
    sed -i 's/d1g0ix8w0r103u.cloudfront.net/dkx1b8wlo613w.cloudfront.net/' filename
done

sed -i 's/d1g0ix8w0r103u.cloudfront.net/dkx1b8wlo613w.cloudfront.net/' index_file
sed -i 's/d1g0ix8w0r103u.cloudfront.net/dkx1b8wlo613w.cloudfront.net/' config_file
sed -i 's/d1g0ix8w0r103u.cloudfront.net/dkx1b8wlo613w.cloudfront.net/' service_worker_file
sed -i 's/INZ_TEST_DB_NAME/INZ_DB_NAME/' settings_file

