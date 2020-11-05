#!/bin/bash
# Name of the application
NAME="inzula"
# Django project directory
DJANGODIR=/opt/bitnami/projects/inzula_env/inzula
# we will communicte using this unix socket
SOCKFILE=/opt/bitnami/projects/inzula_env/run/gunicorn.sock
# the user to run as
USER=bitnami
# the group to run as
GROUP=bitnami
# how many worker processes should Gunicorn spawn
NUM_WORKERS=3
# which settings file should Django use
DJANGO_SETTINGS_MODULE=inzulaweb.settings.prod
# WSGI module name
DJANGO_WSGI_MODULE=inzulaweb.wsgi.prod
echo "Starting $NAME as `whoami`"
# Activate the virtual environment
cd $DJANGODIR
source ../bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH
# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR
# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec ../bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
--name $NAME \
--workers $NUM_WORKERS \
--user=$USER --group=$GROUP \
--bind=unix:$SOCKFILE \
--log-level=debug \
--log-file=-
