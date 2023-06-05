// Datos de autenticación de Payku
const publicKey = "tkpu0db1bc64984cff827371070338d2";
const privateKey = "tkpi7488e824bc3d39a82a0b223a789c";
const endpoint = "https://des.payku.cl/api/transaction"; // desarrollo
// const endpoint = "https://app.payku.cl/api/transaction"; // producción

// Función para obtener los datos de transacción desde tu carrito de compras
function obtenerDatosDeTransaccion() {
  // Obténemos los elementos del carrito de compras desde la tabla
  const tablaCarrito = document.getElementById("tabla-carrito");
  const filas = tablaCarrito.getElementsByTagName("tbody")[0].getElementsByTagName("tr");

  // Variables para almacenar los detalles de los productos y el total
  const detallesProductos = [];
  let total = 0;
  let totalSubtotal = 0;

  // Recorre las filas de la tabla para obtener los datos de cada producto
  for (let i = 0; i < filas.length; i++) {
    const fila = filas[i];
    const codigo = fila.getElementsByTagName("td")[0].innerText;
    const producto = fila.getElementsByTagName("td")[1].innerText;
    const precioUnitario = parseFloat(fila.getElementsByTagName("td")[2].innerText.replace("$", ""));
    const cantidad = parseInt(fila.getElementsByTagName("td")[3].innerText);
    const subtotal = precioUnitario * cantidad;

    // Agrega los detalles del producto al arreglo
    detallesProductos.push({
      codigo: codigo,
      producto: producto,
      precioUnitario: precioUnitario,
      cantidad: cantidad,
      subtotal: subtotal
    });

    // Calcula el total acumulando los subtotales de cada producto
    totalSubtotal += subtotal;
  }

  // Obtiene el email del usuario desde tu carrito de compras
  const email = 'losbar@gmail.com'; //obtenerEmailDelCarrito(); ESTO TENEMOS QUE IMPLEMENTARLO

  let iva = totalSubtotal * 0.19;

  total = totalSubtotal + iva;

  let totalPagar = total.toString().replace(/\D/g, '');

  // Retorna los datos de la transacción
  return {
    email: email,
    order: Math.floor(10000000 + Math.random() * 90000000),
    payment: 1, // pago con webpay
    subject: 'Venta Pasteleria',
    total: totalPagar,
    amount: parseInt(totalPagar),
    details: detallesProductos,
    expired: '',
    currency: "CLP",
    // urlConfirmation: "http://127.0.0.1:5500/carrito.html",
    // urlReturn: "http://127.0.0.1:5500/carrito.html",
  };
}

// Generar un número de transacción único
function generarNumeroTransaccion() {
  // Genera un número aleatorio de 8 dígitos
  const numeroAleatorio = Math.floor(10000000 + Math.random() * 90000000);

  // Combina el número aleatorio con una cadena fija para formar el número de transacción
  const numeroTransaccion = numeroAleatorio;

  return numeroTransaccion;
}

// Función para enviar la transacción a Payku
function enviarTransaccionPayku() {
  // Obtén los datos de transacción desde tu carrito de compras
  const data = obtenerDatosDeTransaccion();

  // Ordena los parámetros alfabéticamente
  const orderedData = {};
  Object.keys(data)
    .sort()
    .forEach(function (key) {
      orderedData[key] = data[key];
    });

  // Transforma los parámetros a formato URL
  const params = new URLSearchParams(orderedData).toString();

  // Construye la cadena a firmar
  const stringToSign = endpoint + "&" + params;

  // Genera la firma usando HMAC-SHA256
  const signature = CryptoJS.HmacSHA256(stringToSign, privateKey).toString();

  // Realiza la solicitud a la API de Payku
  fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + publicKey,
      Firma: signature,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
      if(responseData.url){
        window.location.href = responseData.url;
      }
    })
    .catch((error) => {
      console.error(error);
      // Maneja cualquier error en la solicitud
    });
}

// Ejemplo de cómo usar la función para enviar la transacción a Payku
document.getElementById("botonPagar").addEventListener("click", function () {
  enviarTransaccionPayku();
});


