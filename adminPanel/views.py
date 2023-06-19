# Description: Archivo que contiene las vistas del panel de control

# Librerías Django
import jwt
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

#Mis importaciones
from adminPanel.models import Usuario
from .login_views import login_view, user_login


@login_required
def index(request):
    return render(request, 'index.html', {'request': request})
@login_required
def users(request):
    usuarios = Usuario.objects.all()
    return render(request, 'users.html', {'usuarios': usuarios})
@login_required
def productos(request):
    return render(request, 'productos.html', {'request': request})

def logout_view(request):
    logout(request)
    return redirect('/')

def register_view(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        # Encriptar la contraseña
        password_encriptada = make_password(password)
        
        # Crear un nuevo usuario con la contraseña encriptada
        usuario = Usuario(nombre_de_usuario=username, password=password_encriptada)
        
        # Guardar el usuario en la base de datos
        usuario.save()
        
        return redirect('login')  # Redireccionar al formulario de inicio de sesión
    
    return render(request, 'register.html')

# Importa las vistas de login_views.py
login = login_view
user_login = user_login