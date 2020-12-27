upstream inzula_server {
# fail_timeout=0 means we always retry an upstream even if it failed
# to return a good HTTP response (in case the Unicorn master nukes a
# single worker for timing out).
server unix:/home/ubuntu/projects/env/run/gunicorn.sock fail_timeout=0;
}
server {
listen 80;

#listen 443 ssl;
#ssl_certificate /opt/bitnami/apache/conf/bitnami/certs/server.crt;
#ssl_certificate_key /opt/bitnami/apache/conf/bitnami/certs/server.key;
server_name dkx1b8wlo613w.cloudfront.net inzula.app;
server_name_in_redirect off;
client_max_body_size 4G;
access_log /home/ubuntu/projects/logs/inzula/logs/nginx-access.log;
error_log /home/ubuntu/projects/logs/inzula/logs/nginx-error.log;
location /staticfiles/ {
alias   /home/ubuntu/projects/inzula/static/;
}
location /media/ {
alias   /home/ubuntu/projects/inzula/media/;
}
location / {
# an HTTP header important enough to have its own Wikipedia entry:
#   http://en.wikipedia.org/wiki/X-Forwarded-For
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
# enable this if and only if you use HTTPS, this helps Rack
# set the proper protocol for doing redirects:
# proxy_set_header X-Forwarded-Proto https;
# pass the Host: header from the client right along so redirects
# can be set properly within the Rack application
proxy_set_header Host $http_host;
# we don't want nginx trying to do something clever with
# redirects, we set the Host: header above already.
proxy_redirect off;
# set "proxy_buffering off" *only* for Rainbows! when doing
# Comet/long-poll stuff.  It's also safe to set if you're
# using only serving fast clients with Unicorn + nginx.
# Otherwise you _want_ nginx to buffer responses to slow
# clients, really.
# proxy_buffering off;
# Try to serve static files from nginx, no point in making an
# *application* server like Unicorn/Rainbows! serve static files.
if (!-f $request_filename) {
proxy_pass http://inzula_server;
break;
}
# Error pages
error_page 500 502 503 504 /500.html;
location = /500.html {
root /home/ubuntu/projects/inzula/static/;
}
}
}
