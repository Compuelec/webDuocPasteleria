
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from adminPanel.models import Usuario

from django.contrib import messages
from django.shortcuts import render, redirect

@csrf_exempt
def registra_usuario(request):
    error_message = None

    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        correo = request.POST.get('correo')
        password = request.POST.get('password')
        imagen = request.FILES.get('imagen')

        try:
            # Validar el correo electrónico
            validate_email(correo)
        except ValidationError:
            # Manejar el error de correo electrónico no válido
            error_message = 'Correo electrónico no válido'
            return render(request, 'adminPanel/registro.html', {'error_message': error_message})

        # Verificar si el correo ya está registrado
        if Usuario.objects.filter(correo=correo).exists():
            # Manejar el error de correo ya registrado
            error_message = 'Correo electrónico ya registrado'
            return render(request, 'adminPanel/registro.html', {'error_message': error_message})

        try:
            # Utilizar el método create_user_with_token definido en UsuarioManager
            usuario = Usuario.objects.create_user_with_token(
                correo=correo,
                password=password,
                nombre=nombre,
                imagen=imagen,
                last_login=timezone.now()  # Establecer last_login al momento actual
            )
            messages.success(request, 'Usuario creado exitosamente')
            return redirect('/admin/login/')  # Reemplaza 'login' con el nombre de la URL a la que deseas redirigir luego del registro
     
        except ValueError as e:
            error_message = str(e)
            return render(request, 'adminPanel/registro.html', {'error_message': error_message})

    return render(request, 'adminPanel/registro.html', {'error_message': error_message})
