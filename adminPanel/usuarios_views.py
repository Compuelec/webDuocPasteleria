import os
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

from adminPanel.models import Usuario

@csrf_exempt
def crear_usuario(request):
    if request.method == 'POST':
        nombre = request.POST.get('nombre')
        correo = request.POST.get('correo')
        password = request.POST.get('password')
        tipo = request.POST.get('tipo')
        imagen = request.FILES.get('imagen')

        try:
            # Validar el correo electrónico
            validate_email(correo)
        except ValidationError:
            # Manejar el error de correo electrónico no válido
            return JsonResponse({'errorEv': 'Correo electrónico no válido'}, status=400)

        # Verificar si el correo ya está registrado
        if Usuario.objects.filter(correo=correo).exists():
            # Manejar el error de correo ya registrado
            return JsonResponse({'errorCr': 'Correo electrónico ya registrado'}, status=400)

        try:
            # Utilizar el método create_user_with_token definido en UsuarioManager
            usuario = Usuario.objects.create_user_with_token(
                correo=correo,
                password=password,
                nombre=nombre,
                tipo=tipo,
                imagen=imagen,
                last_login=timezone.now()  # Establecer last_login al momento actual
            )
            return JsonResponse({'success': 'Usuario creado exitosamente'})
     
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)


@require_POST
def eliminar_usuario(request, usuario_id):
    try:
        # Obtener el usuario a eliminar
        usuario = Usuario.objects.get(id=usuario_id)

        # Eliminar el archivo de imagen si existe
        if usuario.imagen and os.path.exists(usuario.imagen.path):
            os.remove(usuario.imagen.path)

        # Eliminar el usuario
        usuario.delete()

        # Devolver una respuesta exitosa
        return JsonResponse({'mensaje': 'Usuario eliminado correctamente'})
    except Usuario.DoesNotExist:
        # Devolver una respuesta de error si el usuario no existe
        return JsonResponse({'error': 'El usuario no existe'}, status=400)
    except Exception as e:
        # Devolver una respuesta de error si ocurre algún error inesperado
        return JsonResponse({'error': str(e)}, status=500)


def editar_usuario(request):
    if request.method == 'POST':
        # Obtener los datos del formulario de edición del usuario
        user_id = request.POST.get('editUserId')
        user_name = request.POST.get('editUserName')
        user_tipo = request.POST.get('editUserTipo')
        user_imagen = request.FILES.get('editUserImagen')

        # Buscar al usuario en la base de datos
        usuario = get_object_or_404(Usuario, id=user_id)

        # Actualizar los datos del usuario
        usuario.nombre = user_name
        usuario.tipo = user_tipo
        if user_imagen:
            usuario.imagen = user_imagen

        # Guardar los cambios en la base de datos
        usuario.save()

        # Puedes devolver una respuesta JSON indicando que la edición fue exitosa
        return JsonResponse({'success': True})

    # Si la solicitud no es de tipo POST, devolver una respuesta de error
    return JsonResponse({'success': False, 'error': 'Método no permitido'})
