import os

from django.core.wsgi import get_wsgi_application
# from whitenoise.django import DjangoWhiteNoise

# python_home='/opt/bitnami/projects/inzula_env'
# activate_this=python_home+'/bin/activate'
# with open(activate_this) as file_:
#         exec(file_.read(), dict(__file__=activate_this))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "inzulaweb.settings.prod")

application = get_wsgi_application()
# application = DjangoWhiteNoise(application)
