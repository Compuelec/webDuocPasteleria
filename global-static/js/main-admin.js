// Funcion para alertas 'success' o 'error'
function MensajeAlerta(mensaje, tipo){
    Swal.fire({
        text: mensaje,
        icon: tipo,
    })
}