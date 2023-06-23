from django.contrib import admin

# Register your models here.
from django.template.defaultfilters import register

@register.filter
def floatformat(value, arg=-1):
    try:
        value = float(value)
        return str(int(value))
    except (ValueError, TypeError):
        return ''