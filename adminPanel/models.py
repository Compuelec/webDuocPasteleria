from django.db import models

class Usuario(models.Model):
    TIPO_USUARIO_CHOICES = [
        ('admin', 'Administrador'),
        ('normal', 'Normal'),
    ]

    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=255)
    correo = models.EmailField(unique=True)
    tipo = models.CharField(max_length=10, choices=TIPO_USUARIO_CHOICES, default='normal')
    imagen = models.ImageField(upload_to='usuarios', null=True, blank=True)
    token = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)


class Producto(models.Model):
    codigo = models.CharField(max_length=255, unique=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos', null=True, blank=True)
    stock = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
