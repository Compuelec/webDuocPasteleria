from decimal import Decimal, ROUND_DOWN
from adminPanel.models import Pedido

def total_pendientes_menu_processor(request):
    total_pendientes_menu = Pedido.objects.filter(estado='pendiente').count()
    return {
        'total_pendientes_menu': total_pendientes_menu,
    }

def lista_pedidos_pendientes_processor(request):
    # Obtener todos los pedidos
    pedidos_pendientes = Pedido.objects.filter(estado='pendiente').order_by('-fecha_creacion')[:5]

    for pedidoPendiente in pedidos_pendientes:
        subtotal = Decimal('0')
        for detalle in pedidoPendiente.detallepedido_set.all():
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

        pedidoPendiente.subtotal = subtotal_formatted
        pedidoPendiente.iva = iva_formatted
        pedidoPendiente.total = total_formatted

    return {
        'pedidosPendientes': pedidos_pendientes,
    }
