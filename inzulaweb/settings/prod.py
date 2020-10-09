'''Use this for production'''

from .base import *

# DEBUG = False
ALLOWED_HOSTS += ['localhost', '127.0.0.1', '15.188.83.142']
WSGI_APPLICATION = 'inzulaweb.wsgi.prod.application'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'build/static')
    ]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'inzuladb',
        'USER': 'inzula',
        'PASSWORD': 'inzula',
        'HOST': 'localhost',
        'PORT': '',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_WHITELIST = (
    'http://localhost:5000',
    'http://15.188.83.142:5000',
    'http://127.0.0.1:5000',
)
