import jwt
from django.conf import settings
import hashlib
from django.contrib.auth.hashers import check_password, make_password
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models
from django.utils.crypto import get_random_string
from django.utils.timezone import now
from django.conf import settings
from django.utils.timezone import now
import secrets

class UsuarioManager(BaseUserManager):
    def create_user(self, correo, password=None, **extra_fields):
        if not correo:
            raise ValueError('El correo electrónico debe ser proporcionado')
        
        user = self.model(correo=self.normalize_email(correo), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, correo, password=None, **extra_fields):
        extra_fields.setdefault('tipo', 'admin')
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(correo, password, **extra_fields)


class Usuario(AbstractBaseUser):
    TIPO_USUARIO_CHOICES = [
        ('admin', 'Administrador'),
        ('normal', 'Normal'),
    ]

    id = models.AutoField(primary_key=True)
    _id = models.CharField(max_length=255, unique=True)
    nombre = models.CharField(max_length=255)
    correo = models.EmailField(unique=True)
    tipo = models.CharField(max_length=10, choices=TIPO_USUARIO_CHOICES, default='normal')
    imagen = models.ImageField(upload_to='users/', null=True, blank=True)
    token = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
    last_login = models.DateTimeField(default=None)

    objects = UsuarioManager()

    USERNAME_FIELD = 'correo'

    def save(self, *args, **kwargs):
        if not self.pk:
            self.generate_token()
        return super(Usuario, self).save(*args, **kwargs)

    def generate_token(self, save_db=False):
        # Define la información del usuario que deseas incluir en el token
        payload = {
            'id': self.id,
            '_id': self._id,
            'nombre': self.nombre,
            'correo': self.correo,
            'tipo': self.tipo,
            'imagen': str(self.imagen),
        }
        clave_secreta = settings.JWT_SECRET_KEY
        # Genera el token con una clave secreta y una fecha de expiración de 1 hora
        token = jwt.encode(payload, clave_secreta, algorithm='HS256')

        if save_db:
            self.token = token
            self.save()

        return token


    def check_password(self, password):
        return check_password(password, self.password)

    def create_admin(self):
        password = 'admin'
        _id_generate = password + 'admin@example.com'
        _id = '_' + hashlib.md5(_id_generate.encode()).hexdigest()
        password_md5 = make_password(password)
        admin, created = Usuario.objects.get_or_create(
            _id=_id,
            defaults={
                'nombre': 'Admin',
                'correo': 'admin@example.com',
                'tipo': 'admin',
                'password': password_md5,
                'last_login': now(),  # Establece last_login al momento actual
            }
        )
        if created:
            admin.generate_token()
            admin.save()
        return admin


class Producto(models.Model):
    codigo = models.CharField(max_length=255, unique=True)
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()
    imagen = models.ImageField(upload_to='productos', null=True, blank=True)
    stock = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)


class Pedido(models.Model):
    ESTADO_PEDIDO_CHOICES = [
        ('pendiente', 'Pendiente'),
        ('pagado', 'Pagado'),
        ('enviado', 'Enviado'),
        ('cancelado', 'Cancelado'),
    ]

    id = models.AutoField(primary_key=True)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    estado = models.CharField(max_length=10, choices=ESTADO_PEDIDO_CHOICES, default='pendiente')
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)


class DetallePedido(models.Model):
    id = models.AutoField(primary_key=True)
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    valor = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    fecha_modificacion = models.DateTimeField(auto_now=True)
