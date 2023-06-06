from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'homePage/home.html', {'request': request})

def promociones(request):
    return render(request, 'homePage/promociones.html', {'request': request})

def contacto(request):
    return render(request, 'homePage/contacto.html', {'request': request})

def carrito(request):
    return render(request, 'homePage/carrito.html', {'request': request})

def productos(request):
    return render(request, 'homePage/home.html', {'request': request})

def blog(request):
    return render(request, 'homePage/home.html', {'request': request})

