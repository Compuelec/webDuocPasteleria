# Generated by Django 3.0.6 on 2023-06-16 14:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('adminPanel', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuario',
            name='last_login',
            field=models.DateTimeField(default=None),
        ),
    ]
