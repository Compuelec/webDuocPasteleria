import os
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from decimal import Decimal, ROUND_DOWN
from django.db.models import Case, When

from .models import Producto, Usuario, Pedido


@login_required
def countItems(request):
    # Obtener el total de productos
    total_productos = Producto.objects.count()

    # Obtener el total de usuarios
    total_usuarios = Usuario.objects.count()

    total_pendientes = Pedido.objects.filter(estado='pendiente').count()

    # Obtener el total de pedidos procesados
    total_procesados = Pedido.objects.filter(estado='pagado').count()

    # Obtener el total de pedidos terminados
    total_terminados = Pedido.objects.filter(estado='enviado').count()
    
    ultimos_usuarios = Usuario.objects.order_by('-id')[:6]

    # Pasar los totales al contexto de la plantilla
    context = {
        'total_productos': total_productos,
        'total_usuarios': total_usuarios,
        'total_pendientes': total_pendientes,
        'total_procesados': total_procesados,
        'total_terminados': total_terminados,
        'ultimos_usuarios': ultimos_usuarios,
    }

    return render(request, 'index.html', context)

@login_required
def lista_pedidos(request):
    # Obtener todos los pedidos
    pedidos = Pedido.objects.all().order_by(
            Case(
                When(estado='pendiente', then=0),
                When(estado='pagado', then=1),
                When(estado='enviado', then=2),
                When(estado='cancelado', then=3),
                default=4,
            ),
            '-fecha_creacion',
        )

    for pedido in pedidos:
        subtotal = Decimal('0')
        for detalle in pedido.detallepedido_set.all():
            detalle.precio_total = detalle.valor * Decimal(str(detalle.cantidad))
            subtotal += detalle.precio_total

        iva = subtotal * Decimal('0.19')
        total = subtotal + iva

        # Redondear los valores sin decimales
        subtotal = subtotal.quantize(Decimal('0'), rounding=ROUND_DOWN)
        iva = iva.quantize(Decimal('0'), rounding=ROUND_DOWN)
        total = total.quantize(Decimal('0'), rounding=ROUND_DOWN)

        # Formatear los valores como moneda chilena
        subtotal_formatted = f"${subtotal:,.0f}".replace(',', '.')
        iva_formatted = f"${iva:,.0f}".replace(',', '.')
        total_formatted = f"${total:,.0f}".replace(',', '.')

        pedido.subtotal = subtotal_formatted
        pedido.iva = iva_formatted
        pedido.total = total_formatted

    context = {
        'pedidos': pedidos,
    }
    return render(request, 'lista_pedidos.html', context)

@login_required
def actualizar_estado_pedido(request, pedido_id):
    if request.method == 'POST':
        pedido = Pedido.objects.get(id=pedido_id)
        nuevo_estado = request.POST.get('estado')
        pedido.estado = nuevo_estado
        pedido.save()
        return redirect('/admin/pedidos')


@csrf_exempt
def agregar_producto(request):
    if request.method == 'POST':
        codigo = request.POST.get('codigo')
        nombre = request.POST.get('nombre')
        descripcion = request.POST.get('descripcion')
        stock = request.POST.get('stock')
        valor = int(request.POST.get('valor'))
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

@login_required
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
        if imagen:
            producto.imagen = imagen

        # Guardar los cambios en la base de datos
        producto.save()

        # Devolver una respuesta JSON para indicar que la edición fue exitosa
        return JsonResponse({'success': True})

    else:
        # Si no se realiza una solicitud POST, mostrar la página de edición del producto
        producto = get_object_or_404(Producto, pk=producto_id)
        return render(request, 'editar_producto.html', {'producto': producto})
