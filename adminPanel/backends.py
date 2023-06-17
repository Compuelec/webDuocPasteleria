from django.contrib.auth.backends import BaseBackend
from adminPanel.models import Usuario

class MyCustomAuthBackend(BaseBackend):
    def authenticate(self, request, correo=None, password=None):
        try:
            usuario = Usuario.objects.get(correo=correo)
            if usuario.check_password(password):
                return usuario
        except Usuario.DoesNotExist:
            return None
    
    def get_user(self, user_id):
        try:
            return Usuario.objects.get(pk=user_id)
        except Usuario.DoesNotExist:
            return None

