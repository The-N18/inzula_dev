'''Use this for development'''

from .base import *

ALLOWED_HOSTS += ['127.0.0.1', 'localhost', '15.188.83.142', '172.26.15.28', 'https://homologation-webpayment.payline.com']
DEBUG = True
# STATIC_ROOT = os.path.join(BASE_DIR, 'static')

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'public'),
    os.path.join(BASE_DIR, 'static')
    ]

WSGI_APPLICATION = 'inzulaweb.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}

# CORS_ORIGIN_WHITELIST = (
#     'http://localhost:3000',
#     'http://127.0.0.1:3000',
#     'http://15.188.83.142:3000',
#     'http://172.26.15.28:3000',
#     'http://localhost:5000',
#     'http://127.0.0.1:5000',
#     'http://15.188.83.142:5000',
#     'http://172.26.15.28:5000',
# )
