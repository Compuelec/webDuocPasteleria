from django.urls import path
from .views import login_view, logout_view
from . import views

app_name = 'adminPanel'

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('users/', views.users, name='users'),
    path('users/crear_usuario/', views.crear_usuario, name='crear_usuario'),
    path('users/editar_usuario/', views.editar_usuario, name='editar_usuario'),
    path('users/editar_usuario/<int:usuario_id>/', views.editar_usuario, name='editar_usuario'),
    path('users/eliminar_usuario/<int:usuario_id>/', views.eliminar_usuario, name='eliminar_usuario'),
    path('productos', views.productos, name='productos'),
]
