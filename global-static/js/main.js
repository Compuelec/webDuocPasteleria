
// Funcion para alertas 'success' o 'error'
function MensajeAlerta(mensaje, tipo){
    Swal.fire({
        text: mensaje,
        icon: tipo,
    })
}

// Declaración de 'carrito' en el ámbito global
let carrito = [];

window.onload = cargarCarritoDesdeLocalStorage();

window.addEventListener('storage', cargarCarritoDesdeLocalStorage);

// Función para cargar el carrito desde el localStorage
function cargarCarritoDesdeLocalStorage() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        ActualizarCarritoIcono();
    }
}

// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para actualizar el carrito y guardar en el localStorage cuando se modifique
function actualizarCarritoYLocalStorage() {
    cargarCarritoDesdeLocalStorage();
    guardarCarritoEnLocalStorage();
    ActualizarCarritoIcono();
}

function AgregarCarrito(codigo, producto, precio, cantidad) {
    const itemExistente = carrito.find(item => item.codigo === codigo);
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            codigo: codigo,
            producto: producto,
            precio: precio,
            cantidad: cantidad
        });
    }
    guardarCarritoEnLocalStorage(); // Guardar el carrito en el localStorage
    const mensaje = `Se agregó el producto ${producto} al carrito`;
    MensajeAlerta(mensaje, 'success');
    ActualizarCarritoIcono();
}

function EliminarProductoCarrito(codigo) {
    const itemIndex = carrito.findIndex(item => item.codigo === codigo);
    if (itemIndex !== -1) {
        if (carrito[itemIndex].cantidad > 1) {
            carrito[itemIndex].cantidad--;
        } else {
            carrito.splice(itemIndex, 1);
        }
        MostrarCarrito();
        localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el estado del carrito en localStorage
        ActualizarCarritoIcono();
    }
}

function ActualizarCarritoIcono() {
    const carritoIcono = document.getElementById('carrito-icono');
    const carritoCantidad = document.getElementById('carrito-cantidad');
    const enlaceCarrito = document.getElementById('carrito-enlace');
    if (carrito.length > 0) {
        carritoCantidad.textContent = carrito.reduce((total, item) => total + item.cantidad, 0); // aqui acumulamos la cantidad de productos en el carrito
        enlaceCarrito.style.display = 'block'; 
        carritoIcono.style.display = 'block';  
    } else {
        carritoIcono.style.display = 'none'; 
        enlaceCarrito.style.display = 'none';
    }
}

// Simulamos una BD
const productos = [
    {
        codigo: 'ku-01',
        producto: 'Kuchen de nuez',
        descripcion: 'Disfruta de nuestro tradicional kuchen con nueces y caramelo. Es perfecto para la hora del té, sin embargo también es una buena opción como postre.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/1-2-300x300.jpg',
        url: 'kuchen-nuez.html',
    },
    {
        codigo: 'ku-man-02',
        producto: 'Kuchen de manzana',
        descripcion: 'Disfruta de nuestro tradicional kuchen manzana. Es perfecto para la hora del té, sin embargo también es una buena opción como postre. Una preparación para compartir con toda la familia.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/2-1-300x300.jpg',
        url: 'kuchen-manzana.html',
    },
    {
        codigo: 'ku-aran-03',
        producto: 'Kuchen de arándanos y frambuesa',
        descripcion: 'Disfruta de nuestro Kuchen de arándanos y frambuesa con miga, es una excelente eleccion para compartir con toda la familia.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/3-1-300x300.jpg',
        url: 'kuchen-arandanos-frambuesa.html',
    },
    {
        codigo: 'pie-04',
        producto: 'Pie de maracuyá y merengue',
        descripcion: 'La maracuyá es una fruta maravillosa. Es ácida pero también tiene un olor demasiado rico y característico. Este pie de maracuyá es una delicia, con la acidez perfecta para combinar con el merengue.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/5-1-300x300.jpg',
        url: 'pie-maracuya-merengue.html',
    },
    {
        codigo: 'chees-05',
        producto: 'Cheesecake de frambuesa',
        descripcion: 'Suave y cremoso cheesecake de frutos rojos con frescos arándanos y con salsa de frambuesa, su relleno es súper cremoso, con sabor y color natural de frambuesas frescas. La base de galletas tiene un toque salado, que siempre es excelente para un postre como este. El relleno es delicioso y cremoso con sabor a queso, frambuesa y no demasiado dulce. Simplemente perfecto.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/7-1-300x300.jpg',
        url: 'cheesecake-frambuesa.html',
    },
    {
        codigo: 'chees-mara-06',
        producto: 'Cheesecake de maracuyá',
        descripcion: 'El cheesecake de maracuyá es uno de los postres favoritos de grandes y chicos. Refrescante, aromático y tan dulce como ácida, el maracuyá es la clave de este exquisito cheesecake.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/8-1-300x300.jpg',
        url: 'cheesecake-maracuya.html',
    },
    {
        codigo: 'apple-07',
        producto: 'Apple Pie',
        descripcion: 'Apple Pie relleno de frescas manzanas laminadas con salsa de vainilla y cubierta de miga Streusel. Es una tarta de manzana muy popular en la cocina de Estados Unidos que se elabora horneando una masa rellena de manzanas. El resultado es una tarta de manzana muy aromática con un sabor característico en la que el interior queda tierno y la masa exterior crujiente.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/Apple-pie-2-300x300.jpg',
        url: 'apple-pie.html',
    },
    {
        codigo: 'chees-choc-08',
        producto: 'Cheesecake de chocolate',
        descripcion: 'Así que todo aquel ‘chocoadicto’ que se precie, está hoy de enhorabuena, pues esta tarta de Cheesecake de chocolate por los cuatro costados; hay chocolate en la base, toneladas de chocolate y por si todo eso fuera poco más chocolate en la cobertura para rematar. ¿Quién podría resistirse a semejante tentación y festín para nuestro paladar? No es que yo lo haya intentado demasiado; ya de entrada me parecía toda una hazaña contenerme.',
        precio: 10000,
        stock: 10,
        imagen: '/static/img/productos/cheesecake_chocolate_1-300x300.jpg',
        url: 'cheesecake-chocolate.html',
    }
]

// Aqui cargamnos los productos en el DOM (HTML)
function cargarProductos() {
    const container = document.getElementById('productos-container');

    productos.forEach((producto) => {
        const productoDiv = document.createElement('div');
        productoDiv.className = 'producto col-lg-3 col-md-4 col-sm-6';

        const cardDiv = document.createElement('div');
        cardDiv.className = 'card cardProducto';
        productoDiv.appendChild(cardDiv);

        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.className = 'card-img-top';
        cardDiv.appendChild(imagenProducto);

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        cardDiv.appendChild(cardBody);

        const nombreProducto = document.createElement('h5');
        nombreProducto.textContent = producto.producto;
        nombreProducto.className = 'card-title';
        cardBody.appendChild(nombreProducto);

        const descripcionProducto = document.createElement('p');
        descripcionProducto.textContent = producto.descripcion;
        descripcionProducto.className = 'card-text';
        cardBody.appendChild(descripcionProducto);

        const precioProducto = document.createElement('p');
        precioProducto.textContent = `Precio: $${producto.precio}`;
        precioProducto.className = 'card-text';
        cardBody.appendChild(precioProducto);

        const botonAgregar = document.createElement('a');
        botonAgregar.textContent = 'Agregar al carrito';
        botonAgregar.className = 'btn btn-primary';
        botonAgregar.addEventListener('click', () => AgregarCarrito(producto.codigo, producto.producto, producto.precio, 1));
        cardBody.appendChild(botonAgregar);

        const botonDetalle = document.createElement('a');
        botonDetalle.textContent = 'Ver detalles';
        botonDetalle.className = 'btn btn-secondary';
        botonDetalle.href = `${producto.url}`;
        cardBody.appendChild(botonDetalle);

        container.appendChild(productoDiv);
    });
}
// Llama a la función cuando la página termine de cargar y cargue los productos
window.onload = cargarProductos;

// Esto hace que el navbar se fije en la parte superior cuando se hace scroll
$(window).scroll(function() {
    if ($(window).scrollTop() >= 200) {   // puedes ajustar este valor
        $('.navbar').addClass('fixed-top');
    }
    else {
        $('.navbar').removeClass('fixed-top');
    }
});

// Funcion para mostrar el carrito en el DOM (HTML)
function MostrarCarrito() {
    const tablaCarrito = document.getElementById('tabla-carrito').getElementsByTagName('tbody')[0];
    const totales = document.getElementById('totales');
    tablaCarrito.innerHTML = '';
    totales.innerHTML = '';

    let subtotal = 0;
    let iva = 0;
    let total = 0;

    // verificamos si el carrito esta vacio
    if (carrito.length === 0) {
        const carritoVacioMensaje = document.createElement('p');
        carritoVacioMensaje.textContent = 'No hay productos en el carrito.';
        tablaCarrito.appendChild(carritoVacioMensaje);

        // Redirigir a la página de inicio cuando el carrito esté vacío y se encuentre en la página del carrito
        if (window.location.pathname.includes('carrito.html')) {
            window.location.href = 'index.html';
        }

        return;
    }

    // Recorremos el carrito y agregamos los productos si estos ya estan en el carrito sumamos la cantidad
    const productosAgrupados = carrito.reduce((acumulador, productoActual) => {
        const productoExistente = acumulador.find(producto => producto.codigo === productoActual.codigo);
        if (productoExistente) {
            productoExistente.cantidad += productoActual.cantidad;
        } else {
            acumulador.push({...productoActual});
        }
        return acumulador;
    }, []);

    // Recorremos los productos agrupados y los agregamos a la tabla del carrito en el html
    productosAgrupados.forEach((producto, index) => {
        const fila = tablaCarrito.insertRow();
        fila.insertCell().textContent = producto.codigo;
        fila.insertCell().textContent = producto.producto;
        fila.insertCell().textContent = `$${producto.precio}`;

        const cellCantidad = fila.insertCell();
        cellCantidad.classList.add('text-center');
        const botonIncrementar = document.createElement('button');
        botonIncrementar.textContent = '+';
        botonIncrementar.classList.add('btn');
        botonIncrementar.classList.add('btn-primary');
        botonIncrementar.addEventListener('click', () => {
            producto.cantidad++;
            AgregarCarrito(producto.codigo, producto.producto, producto.precio, 1);
            MostrarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carrito));  // Guarda el estado del carrito en localStorage
        });

        const botonDecrementar = document.createElement('button');
        botonDecrementar.textContent = '-';
        botonDecrementar.classList.add('btn');
        botonDecrementar.classList.add('btn-primary');
        botonDecrementar.addEventListener('click', () => {
            EliminarProductoCarrito(producto.codigo);
            MostrarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el estado del carrito en localStorage
        });

        cellCantidad.appendChild(botonDecrementar);
        cellCantidad.appendChild(document.createTextNode(producto.cantidad));
        cellCantidad.appendChild(botonIncrementar);

        const cellTotal = fila.insertCell();
        cellTotal.classList.add('text-center');
        cellTotal.textContent = `$${producto.precio * producto.cantidad}`;
        
        const cellAcciones = fila.insertCell();
        cellAcciones.classList.add('text-center');
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.classList.add('btn');
        botonEliminar.classList.add('btn-danger');
        botonEliminar.addEventListener('click', () => {
            // Eliminar producto del carrito
            carrito.splice(index, 1);
            ActualizarCarritoIcono();
            MostrarCarrito();
            localStorage.setItem('carrito', JSON.stringify(carrito));  // Guarda el estado del carrito en localStorage
        });
        cellAcciones.appendChild(botonEliminar);

        subtotal += producto.precio * producto.cantidad;
    });

    iva = subtotal * 0.19;
    total = subtotal + iva;

    totales.innerHTML = `
        <table class="table table-borderless">
            <tr>
                <td class="col-11"><strong>Subtotal:</strong></td>
                <td class="col-1">${formatCurrency(subtotal)}</td>
            </tr>
            <tr>
                <td class="col-11"><strong>IVA (19%):</strong></td>
                <td class="col-1">${formatCurrency(iva)}</td>
            </tr>
            <tr>
                <td class="col-11"><strong>Total:</strong></td>
                <td class="col-1">${formatCurrency(total)}</td>
            </tr>
        </table>
    `;

    function formatCurrency(amount) {
        return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
    }
}

// Función genérica para validar un campo de texto requerido
function validarRequerido(input) {
  if (input.value.trim() === '') {
    mostrarError(input, `Debe ingresar su ${input.id}`);
    return false;
  } else {
    mostrarExito(input);
    return true;
  }
}

// Función para validar teléfono
function validarTelefono(input) {
  if (input.value.trim() === '') {
    mostrarError(input, `Debe ingresar su ${input.id}`);
    return false;
  } else if (isNaN(input.value.trim())) {
    mostrarError(input, 'Solo números');
    return false;
  } else {
    mostrarExito(input);
    return true;
  }
}

// Agregar el evento de keydown al campo de teléfono
const telefonoInput = document.getElementById('telefono');
telefonoInput.addEventListener('keydown', soloNumeros);

// Función para validar el formulario
function validarFormulario(event) {
  event.preventDefault();

  const nombreInput = document.getElementById('nombre');
  const apellidoInput = document.getElementById('apellido');
  const telefonoInput = document.getElementById('telefono');
  const ciudadInput = document.getElementById('ciudad');
  const correoInput = document.getElementById('correo');
  const mensajeInput = document.getElementById('mensaje');
  const aceptarInput = document.getElementById('aceptar');

  // Validar solo números en el teléfono
  telefonoInput.addEventListener('keydown', soloNumeros);

  let esValido = true;

  // Validar campos requeridos
  esValido &= validarRequerido(nombreInput);
  esValido &= validarRequerido(apellidoInput);
  esValido &= validarTelefono(telefonoInput); // Validar teléfono
  esValido &= validarRequerido(correoInput);
  esValido &= validarRequerido(mensajeInput);

  // Validar ciudad seleccionada
  if (ciudadInput.selectedIndex === 0) {
    mostrarError(ciudadInput, 'Debe seleccionar una ciudad');
    esValido = false;
  } else {
    mostrarExito(ciudadInput);
  }

  // Validar correo
  if (correoInput.value.trim() !== '' && !validarCorreo(correoInput.value.trim())) {
    mostrarError(correoInput, 'Ingrese un correo electrónico válido');
    esValido = false;
  }

  // Validar aceptar condiciones
  if (!aceptarInput.checked) {
    const mensaje = 'Debe aceptar las condiciones';
    MensajeAlerta(mensaje, 'error');
    esValido = false;
  } 

  if (esValido) {
    const mensaje = 'Formulario enviado correctamente';
    MensajeAlerta(mensaje, 'success');
    // Redirigir a la página de inicio cuando el mensaje sea enviado correctamente
    if (window.location.pathname.includes('contacto.html')) {
        setTimeout(function() {
            window.location.href = 'index.html';
        }, 3000);
    }
  }
}

// Adjuntar el evento de submit al formulario
document.getElementById('formulario').addEventListener('submit', validarFormulario);

// Evento de entrada para validar los campos de entrada
const inputs = document.querySelectorAll('input, select, textarea'); // Agregado 'textarea'
inputs.forEach(input => input.addEventListener('input', function(event) {
  // Removido la funcionalidad de eliminar mensaje de error al teclear en aceptar condiciones
  if (event.target.id !== 'aceptar') {
    if (event.target.id === 'telefono') {
      validarTelefono(event.target);
    } else {
      validarRequerido(event.target);
    }
  }
}));

// Función para mostrar errores
function mostrarError(input, mensaje) {
  const feedback = input.nextElementSibling;
  feedback.innerText = mensaje;
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
}

// Función para mostrar éxito
function mostrarExito(input) {
  const feedback = input.nextElementSibling;
  feedback.innerText = '';
  input.classList.remove('is-invalid');
  input.classList.add('is-valid');
}

// Función para validar el correo
function validarCorreo(correo) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(correo);
}

// Función para permitir solo números
function soloNumeros(event) {
  if (!/^[0-9]$/.test(event.key) && event.key !== 'Backspace' && event.key !== 'Delete') {
    event.preventDefault();
  }
}
