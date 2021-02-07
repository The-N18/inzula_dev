#!/bin/sh

# replace server url in config file
config_file='/home/ubuntu/projects/inzula/src/configurations.js';
settings_file='/home/ubuntu/projects/inzula/inzula/settings.py';

sed -i 's/dkx1b8wlo613w.cloudfront.net/d1g0ix8w0r103u.cloudfront.net/' $config_file;
sed -i 's/INZ_DB_NAME/INZ_TEST_DB_NAME/' $settings_file;

rm -rf /home/ubuntu/projects/inzula/build/;
rm -rf /home/ubuntu/projects/inzula/staticfiles/;
PUBLIC_URL='https://d1g0ix8w0r103u.cloudfront.net';
source ~/.nvm/nvm.sh;
npm run build;
python3 /home/ubuntu/projects/inzula/manage.py collectstatic --noinput;
/home/ubuntu/projects/inzula/bin/gunicorn_start.sh;

