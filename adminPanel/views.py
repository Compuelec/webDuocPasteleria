from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html', {'request': request})

def users(request):
    return render(request, 'users.html', {'request': request})

def productos(request):
    return render(request, 'productos.html', {'request': request})