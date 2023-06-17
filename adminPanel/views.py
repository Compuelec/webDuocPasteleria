import jwt
from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth.hashers import make_password, check_password
from adminPanel.models import Usuario
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from django.contrib.auth import login, authenticate, logout



@login_required
def index(request):
    return render(request, 'index.html', {'request': request})
@login_required
def users(request):
    return render(request, 'users.html', {'request': request})
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

def user_login(username, password):
    try:
        usuario = Usuario.objects.get(correo=username)
        if usuario.verificar_password(password):
            # Credenciales válidas
            token = usuario.generate_token()
            usuario.save()
            return token
        else:
            print('Credenciales inválidas')
            # Credenciales inválidas
            return None
    except Usuario.DoesNotExist:
        # El usuario no existe
        return None


def login_view(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        
        try:
            usuario = Usuario.objects.get(correo=email)
            if usuario.check_password(password):
                # Credenciales válidas
                user = authenticate(request, correo=email, password=password)
                if user is not None:
                    login(request, user)
                    # Generar y guardar un nuevo token en la base de datos
                    token = usuario.generate_token(save_db=True)
                    
                    # Establecer variables de sesión
                    request.session['user_id'] = usuario.id
                    request.session['nombre'] = usuario.nombre
                    request.session['token'] = token
                    request.session['correo'] = usuario.correo
                    request.session.modified = True
                    
                    return redirect('/admin')  # Redireccionar al panel de control
                else:
                    error_message = 'Error al autenticar el usuario'
            else:
                error_message = 'Contraseña incorrecta'
        except Usuario.DoesNotExist:
            error_message = 'Correo electrónico incorrecto'
        
        return render(request, 'adminPanel/login.html', {'error_message': error_message})
    
    return render(request, 'adminPanel/login.html')
