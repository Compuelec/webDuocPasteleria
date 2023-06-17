import sys
sys.stdout = sys.stderr

from django.apps import AppConfig
from django.apps import apps

class HomepageConfig(AppConfig):
    name = 'homePage'

    def ready(self):
        print("La aplicación se ha cargado correctamente.", file=sys.stdout)
        if apps.is_installed('adminPanel'):
            from adminPanel.models import Usuario
            admin = Usuario()
            admin.create_admin()


