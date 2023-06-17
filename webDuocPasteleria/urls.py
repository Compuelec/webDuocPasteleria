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

from homePage import views as homeViews
from adminPanel import views as adminViews

urlpatterns = [
    # urls de accedo
    path('admin/login/', adminViews.login_view, name='login'),

    # urls de la app
    path('admin/', include('adminPanel.urls')),
    path('admin/users/', adminViews.users, name='users'),
    path('admin/productos/', adminViews.productos, name='productos'),
    path('', homeViews.index, name='index'),
    path('promociones/', homeViews.promociones, name='promociones'),
    path('contacto/', homeViews.contacto, name='contacto'),
    path('carrito/', homeViews.carrito, name='carrito'),
    path('productos/', homeViews.productos, name='productos'),
    path('blog/', homeViews.blog, name='blog'),

]
