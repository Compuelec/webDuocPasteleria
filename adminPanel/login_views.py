# Description: Views for login and logout

# Django libraries
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.templatetags.static import static
from adminPanel.models import Usuario

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
                    
                    if usuario.imagen and usuario.imagen.name:
                        ruta_imagen = usuario.imagen.url
                    else:
                        ruta_imagen = static('img/user_base.png')  # Ruta de imagen por defecto
                    
                    # Establecer variables de sesión
                    request.session['user_id'] = usuario.id
                    request.session['nombre'] = usuario.nombre
                    request.session['token'] = token
                    request.session['correo'] = usuario.correo
                    request.session['foto'] = ruta_imagen
                    request.session['tipo'] = usuario.tipo
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
