# Description: Archivo que contiene las vistas del panel de control

# Librerías Django
import jwt
import hashlib
import json
import os

from django.conf import settings
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.hashers import make_password
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.utils.crypto import get_random_string
from django.utils.timezone import now
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


#Mis importaciones
from adminPanel.models import Usuario, Producto
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
    productos = Producto.objects.all()
    return render(request, 'productos.html', {'productos': productos})

def logout_view(request):
    logout(request)
    return redirect('/')


# Importa las vistas de login_views.py
login = login_view
user_login = user_login

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
            # Utilizar tu propio método create_user definido en UsuarioManager
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

# Sección de productos
@login_required
def index(request):
    # Obtener el total de productos
    total_productos = Producto.objects.count()

    # Obtener el total de usuarios
    total_usuarios = Usuario.objects.count()

    # Pasar los totales al contexto de la plantilla
    context = {
        'total_productos': total_productos,
        'total_usuarios': total_usuarios,
    }

    return render(request, 'index.html', context)

@csrf_exempt
def agregar_producto(request):
    if request.method == 'POST':
        codigo = request.POST.get('codigo')
        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion')
        stock = request.POST.get('stock')
        valor = request.POST.get('valor')
        imagen = request.FILES.get('imagen')

        # Crea el objeto Producto con los datos proporcionados
        producto = Producto(
            codigo=codigo,
            nombre=nombre,
            descripcion=descripcion,
            stock=stock,
            valor=valor
        )

        # Verifica si se proporcionó una imagen
        if imagen is not None:
            producto.imagen = imagen

        # Guarda el producto en la base de datos
        producto.save()

        # Devuelve una respuesta JSON indicando que el producto se agregó exitosamente
        response_data = {
            'success': True,
            'producto': {
                'id': producto.id,
                'codigo': producto.codigo,
                'nombre': producto.nombre,
                'stock': producto.stock,
                'valor': producto.valor
            }
        }

        # Verifica si se proporcionó una imagen y agrega su URL a la respuesta
        if producto.imagen:
            response_data['producto']['imagen_url'] = producto.imagen.url

        return JsonResponse(response_data)

    # Si la solicitud no es de tipo POST, devuelve una respuesta de error
    return JsonResponse({'success': False, 'error': 'Método no permitido'})

@require_POST
def eliminar_producto(request, producto_id):
    try:
        # Obtener el producto a eliminar
        producto = Producto.objects.get(id=producto_id)

        # Eliminar el archivo de imagen si existe
        if producto.imagen and os.path.exists(producto.imagen.path):
            os.remove(producto.imagen.path)

        # Eliminar el producto
        producto.delete()

        # Devolver una respuesta exitosa
        return JsonResponse({'mensaje': 'Producto eliminado correctamente'})
    except Producto.DoesNotExist:
        # Devolver una respuesta de error si el producto no existe
        return JsonResponse({'error': 'El producto no existe'}, status=400)
    except Exception as e:
        # Devolver una respuesta de error si ocurre algún error inesperado
        return JsonResponse({'error': str(e)}, status=500)
    
def editar_producto(request, producto_id):
    if request.method == 'POST':
        producto = get_object_or_404(Producto, pk=producto_id)
        # Obtener los datos del formulario de edición
        codigo = request.POST['editProductCodigo']
        nombre = request.POST['editProductNombre']
        stock = request.POST['editProductStock']
        valor = request.POST['editProductValor']
        imagen = request.FILES.get('editProductImagen')  # Obtener la imagen del formulario

        # Eliminar la imagen antigua si se proporciona una nueva imagen
        if imagen:
            if producto.imagen:  # Verificar si hay una imagen antigua
                # Eliminar el archivo de la imagen antigua
                path_imagen_antigua = producto.imagen.path
                os.remove(path_imagen_antigua)

        # Actualizar los datos del producto
        producto.codigo = codigo
        producto.nombre = nombre
        producto.stock = stock
        producto.valor = valor
        producto.imagen = imagen

        # Guardar los cambios en la base de datos
        producto.save()

        # Devolver una respuesta JSON para indicar que la edición fue exitosa
        return JsonResponse({'success': True})

    else:
        # Si no se realiza una solicitud POST, mostrar la página de edición del producto
        producto = get_object_or_404(Producto, pk=producto_id)
        return render(request, 'editar_producto.html', {'producto': producto})