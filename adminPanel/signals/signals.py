from django.db.models.signals import post_migrate
from django.dispatch import receiver
from ..models import Usuario


@receiver(post_migrate)
def create_admin_user(sender, **kwargs):
    if sender.name == 'adminPanel':
        Usuario.create_admin()
