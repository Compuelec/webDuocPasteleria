from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('promociones/', views.promociones, name='promociones'),
    path('contacto/', views.contacto, name='contacto'),
    path('carrito/', views.carrito, name='carrito'),
    path('carrito/guardar_pedido/', views.guardar_pedido, name='guardar_pedido'),
    path('productos/', views.productos, name='productos'),
    path('productos/<int:producto_id>/', views.ver_detalles_producto, name='ver_detalles_producto'),
    path('blog/', views.blog, name='blog'),
]
