from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('promociones/', views.promociones, name='promociones'),
    path('contacto/', views.contacto, name='contacto'),
    path('carrito/', views.carrito, name='carrito'),
    path('productos/', views.productos, name='productos'),
    path('blog/', views.blog, name='blog'),
]
