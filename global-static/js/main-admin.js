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