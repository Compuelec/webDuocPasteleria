"""webDuocPasteleria URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

from homePage import views as homeViews
from adminPanel import views as adminViews

urlpatterns = [
    # urls de accedo
    path('admin/login/', adminViews.login_view, name='login'),
    path('admin/registro/', adminViews.registra_usuario, name='registrar_usuario'),

    # urls de la app
    path('admin/', include('adminPanel.urls')),
    path('admin/users/', adminViews.users, name='users'),
    path('admin/users/crear_usuario/', adminViews.crear_usuario, name='crear_usuario'),
    path('admin/users/editar_usuario/', adminViews.editar_usuario, name='editar_usuario'),
    path('admin/users/editar_usuario/<int:usuario_id>/', adminViews.editar_usuario, name='editar_usuario'),
    path('admin/users/eliminar_usuario/<int:usuario_id>/', adminViews.eliminar_usuario, name='eliminar_usuario'),
    path('admin/productos/', adminViews.productos, name='productos'),
    path('admin/productos/eliminar_producto/<int:producto_id>/', adminViews.eliminar_producto, name='eliminar_producto'),
    path('admin/productos/add-producto/', adminViews.agregar_producto, name='crear_producto'),
    path('admin/productos/editar_producto/<int:producto_id>/', adminViews.editar_producto, name='editar_producto'),
    path('admin/pedidos/', adminViews.lista_pedidos, name='pedidos'),
    path('admin/pedidos/actualizar_estado_pedido/<int:pedido_id>/', adminViews.actualizar_estado_pedido, name='actualizar_estado_pedido'),
    path('', homeViews.index, name='index'),
    path('promociones/', homeViews.promociones, name='promociones'),
    path('contacto/', homeViews.contacto, name='contacto'),
    path('carrito/', homeViews.carrito, name='carrito'),
    path('carrito/guardar_pedido/', homeViews.guardar_pedido, name='guardar_pedido'),
    path('productos/', homeViews.productos, name='productos'),
    path('productos/<int:producto_id>/', homeViews.ver_detalles_producto, name='ver_detalles_producto'),
    path('blog/', homeViews.blog, name='blog'),
    path('blog/alfajor/', homeViews.blogAlfajor, name='blogAlfajor'),
    path('blog/galleta_principe/', homeViews.blogGalletaPrincipe, name='blogGalletaPrincipe'),
    path('blog/galleta/', homeViews.blogGalleta, name='blogGalleta'),

]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
