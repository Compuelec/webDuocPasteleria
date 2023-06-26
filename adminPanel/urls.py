from django.urls import path
from .views import login_view, logout_view
from . import views

app_name = 'adminPanel'

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', login_view, name='login'),
    path('registro/', views.registra_usuario, name='registrar_usuario'),
    path('logout/', logout_view, name='logout'),
    path('users/', views.users, name='users'),
    path('users/crear_usuario/', views.crear_usuario, name='crear_usuario'),
    path('users/editar_usuario/', views.editar_usuario, name='editar_usuario'),
    path('users/editar_usuario/<int:usuario_id>/', views.editar_usuario, name='editar_usuario'),
    path('users/eliminar_usuario/<int:usuario_id>/', views.eliminar_usuario, name='eliminar_usuario'),
    path('productos', views.productos, name='productos'),
    path('productos/eliminar_producto/<int:producto_id>/', views.eliminar_producto, name='eliminar_producto'),
    path('productos/add-producto/', views.agregar_producto, name='crear_producto'),
    path('productos/editar_producto/<int:producto_id>/', views.editar_producto, name='editar_producto'),
    path('pedidos/', views.lista_pedidos, name='pedidos'),
    path('pedidos/actualizar_estado_pedido/<int:pedido_id>/', views.actualizar_estado_pedido, name='actualizar_estado_pedido'),
    
]
