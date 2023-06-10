# Generated by Django 3.0.6 on 2023-06-10 19:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Producto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=255, unique=True)),
                ('nombre', models.CharField(max_length=255)),
                ('descripcion', models.TextField()),
                ('imagen', models.ImageField(blank=True, null=True, upload_to='productos')),
                ('stock', models.PositiveIntegerField()),
                ('valor', models.DecimalField(decimal_places=2, max_digits=10)),
            ],
        ),
        migrations.CreateModel(
            name='Usuario',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=255)),
                ('correo', models.EmailField(max_length=254, unique=True)),
                ('tipo', models.CharField(choices=[('admin', 'Administrador'), ('normal', 'Normal')], default='normal', max_length=10)),
                ('imagen', models.CharField(blank=True, max_length=255, null=True)),
                ('token', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('fecha_modificacion', models.DateTimeField(auto_now=True)),
            ],
        ),
    ]
