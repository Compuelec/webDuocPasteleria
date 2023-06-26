from django import template

register = template.Library()

@register.filter
def formato_moneda(valor):
    valor = int(valor)
    return '${:,.0f}'.format(valor).replace(',', '.')

@register.filter
def to_int(value):
    return int(value)