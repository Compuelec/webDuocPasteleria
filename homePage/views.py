import json
from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse

from adminPanel.models import Producto, Pedido, DetallePedido, Usuario

# Create your views here.
def index(request):
    productos = Producto.objects.all()
    return render(request, 'homePage/home.html', {'productos': productos})

def promociones(request):
    return render(request, 'homePage/promociones.html', {'request': request})

def contacto(request):
    return render(request, 'homePage/contacto.html', {'request': request})

def carrito(request):
    return render(request, 'homePage/carrito.html', {'request': request})

def productos(request):
    productos = Producto.objects.all()
    return render(request, 'homePage/home.html', {'productos': productos})

def ver_detalles_producto(request, producto_id):
    producto = get_object_or_404(Producto, id=producto_id)
    return render(request, 'homePage/detalle_producto.html', {'producto': producto})

def blog(request):
    productos = Producto.objects.all()
    return render(request, 'homePage/home.html', {'productos': productos})

def blogAlfajor(request):
    return render(request, 'homePage/blog_alfajor.html', {'request': request})

def blogGalletaPrincipe(request):
    return render(request, 'homePage/blog_galleta_principe.html', {'request': request})

def blogGalleta(request):
    return render(request, 'homePage/blog_galleta.html', {'request': request})


def guardar_pedido(request):
    if request.method == 'POST':
        try:
            # Obtener los datos del pedido desde la solicitud JSON
            data = json.loads(request.body)
            usuario_id = request.session.get('user_id')
            productos = data['productos']

            # Obtener la instancia de usuario
            usuario = Usuario.objects.get(id=usuario_id)

            # Crear un nuevo pedido
            pedido = Pedido.objects.create(usuario=usuario)

            # Guardar los detalles del pedido
            for producto in productos:
                detalle_pedido = DetallePedido.objects.create(
                    pedido=pedido,
                    producto_id=producto['id'],
                    cantidad=producto['cantidad'],
                    valor=producto['precio']
                )

            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})

    return JsonResponse({'success': False, 'error': 'Método no permitido'})

