#!/bin/bash

NAME="inzula"                                  # Name of the application
VENVDIR=/opt/bitnami/projects/inzula_env             # Django project directory
DJANGODIR=$VENVDIR/inzula
SOCKFILE=$VENVDIR/inzula/run/gunicorn.sock  # we will communicte using this unix socket
USER=bitnami                                        # the user to run as
GROUP=projects                                     # the group to run as
NUM_WORKERS=3                                     # how many worker processes should Gunicorn spawn
DJANGO_SETTINGS_MODULE=inzulaweb.settings.prod             # which settings file should Django use
DJANGO_WSGI_MODULE=inzulaweb.wsgi.prod                     # WSGI module name
HOST=127.0.0.1
PORT=8001

echo "Starting $NAME as `whoami`"

# Activate the virtual environment
cd $DJANGODIR
source $VENVDIR/bin/activate
export DJANGO_SETTINGS_MODULE=$DJANGO_SETTINGS_MODULE
export PYTHONPATH=$DJANGODIR:$PYTHONPATH

# Create the run directory if it doesn't exist
RUNDIR=$(dirname $SOCKFILE)
test -d $RUNDIR || mkdir -p $RUNDIR

# Start your Django Unicorn
# Programs meant to be run under supervisor should not daemonize themselves (do not use --daemon)
exec $VENVDIR/bin/gunicorn ${DJANGO_WSGI_MODULE}:application \
  --name $NAME \
  --workers $NUM_WORKERS \
  --user=$USER --group=$GROUP \
  --bind=unix:$SOCKFILE \
  --log-level=debug \
  --log-file=-
