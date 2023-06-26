
// Funcion para alertas 'success' o 'error'
function MensajeAlerta(mensaje, tipo, mostrarBoton = true) {
  var config = {
    text: mensaje,
    icon: tipo,
    showConfirmButton: mostrarBoton, 
    confirmButtonText: 'Aceptar'
  };

  Swal.fire(config);
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

function AgregarCarrito(id, codigo, producto, precio, cantidad) {
    const itemExistente = carrito.find(item => item.codigo === codigo);
    if (itemExistente) {
        itemExistente.cantidad += cantidad;
    } else {
        carrito.push({
            id: id,
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

window.addEventListener('load', function() {
var productosElementProductos = document.getElementById('productos');
var productosElementBlog = document.getElementById('blog');

    if (window.location.pathname === '/productos/' ) {
        if (productosElementProductos) {
            productosElementProductos.scrollIntoView();
        }
    }

    if (window.location.pathname === '/blog/' ) {
        if (productosElementBlog) {
            productosElementBlog.scrollIntoView();
        }
    }
});

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
        if (window.location.pathname === '/carrito/') {
            window.location.href = '/';
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
            AgregarCarrito(producto.id, producto.codigo, producto.producto, producto.precio, 1);
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

window.addEventListener('load', function() {
    if (window.location.pathname === '/carrito/') {
        ActualizarCarritoIcono();
        MostrarCarrito();
    }
});


// Función para crear un nuevo pedido
function CrearPedido() {
   
   var user_id = document.getElementById('user-id').getAttribute('data-user-id');
  
   if (!user_id) {
     // Redirigir al usuario a la página de inicio de sesión
     window.location.href = '../admin/login';
     return;
   }

  // Obtener el token CSRF del input hidden
  const csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  // Crear objeto de pedido
  const pedido = {
    productos: carrito, // Obtener los productos del carrito
  };

  // Realizar la petición para guardar el pedido en el servidor
  fetch('guardar_pedido/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRFToken': csrfToken, // Incluir el token CSRF en los headers
    },
    body: JSON.stringify(pedido),
  })
    .then(response => response.json())
    .then(data => {
      // Verificar si el pedido se guardó correctamente
      if (data.success) {
        carrito = [];
        localStorage.removeItem('carrito');
        ActualizarCarritoIcono();
        const mensajeSuccess = 'El pedido se proceso correctamente en el sistema, nos pondremos en contacto con usted a la brevedad';
          MensajeAlerta(mensajeSuccess, 'success', false);
          // Redirigir a la ruta de usuarios
          setTimeout(function() {
            window.location.href = '';
          }, 3000);
      } else {
        // Mostrar un mensaje de error en caso de fallo en la creación del pedido
        console.error('Error al crear el pedido:', data.error);
        // Aquí puedes mostrar un mensaje de error al usuario
      }
    })
    .catch(error => {
      console.error('Error al realizar la petición:', error);
      // Aquí puedes mostrar un mensaje de error al usuario
    });
}

// Evento clic en el botón de "Pagar"
document.addEventListener('DOMContentLoaded', function() {
  var botonPagar = document.getElementById('botonPagarCarrito');
  if (botonPagar) {
    botonPagar.addEventListener('click', CrearPedido);
  }
});



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
document.addEventListener('DOMContentLoaded', function() {
  const telefonoInput = document.getElementById('telefono');
  if (telefonoInput) {
    telefonoInput.addEventListener('keydown', soloNumeros);
  }
});


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
    MensajeAlerta(mensaje, 'success', false);
    // Redirigir a la página de inicio cuando el mensaje sea enviado correctamente
    if (window.location.pathname === '/contacto/') {
        setTimeout(function() {
            window.location.href = '/';
        }, 3000);
    }
  }
}

// Adjuntar el evento de submit al formulario
document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.getElementById('formulario');
  if (formulario) {
    formulario.addEventListener('submit', validarFormulario);
  }
});

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
