from django.urls import path
from .views import login_view, logout_view
from . import views

app_name = 'adminPanel'

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('users/', views.users, name='users'),
    path('productos', views.productos, name='productos'),
]
