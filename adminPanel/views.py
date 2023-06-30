import jwt
import hashlib
import json

from django.conf import settings
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout

from adminPanel.models import Usuario, Producto
from .login_views import login_view, user_login
from .productos_views import countItems,agregar_producto, eliminar_producto, editar_producto, lista_pedidos, actualizar_estado_pedido
from .usuarios_views import crear_usuario, eliminar_usuario, editar_usuario
from .registro_views import registra_usuario


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

# Importa las vistas de registro_views.py
registra_usuario = registra_usuario

# Importa las vistas de productos_views.py
index = countItems
agregar_producto = agregar_producto
eliminar_producto = eliminar_producto
editar_producto = editar_producto
lista_pedidos = lista_pedidos
actualizar_estado_pedido = actualizar_estado_pedido

# Importa las vistas de usuarios_views.py
crear_usuario = crear_usuario
eliminar_usuario = eliminar_usuario
editar_usuario = editar_usuario


