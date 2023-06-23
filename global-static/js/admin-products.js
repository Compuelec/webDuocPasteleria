$(document).ready(function() {
$('#productTable').DataTable({
    paging: true,
    lengthChange: false,
    searching: false,
    ordering: true,
    info: true,
    autoWidth: false,
    responsive: true,
    language: {
    paginate: {
        next: 'Siguiente',
        previous: 'Anterior',
        last: 'Último',
        first: 'Primero'
    },
    info: 'Mostrando _START_ a _END_ de _TOTAL_ resultados',
    emptyTable: 'No hay datos disponibles',
    }
});
});
// Función para agregar un producto
function agregarProducto() {
  // Obtener los valores del formulario de agregar producto
  var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  var codigo = $("#codigo").val();
  var nombre = $("#nombre").val();
  var descripcion = $("#descripcion").val();
  var stock = $("#stock").val();
  var valor = $("#valor").val();
  var imagen = $("#productImagen")[0].files[0];

  // Crear un objeto FormData para enviar los datos del formulario
  var formData = new FormData();
  formData.append('csrfmiddlewaretoken', csrfToken);
  formData.append("codigo", codigo);
  formData.append("nombre", nombre);
  formData.append("descripcion", descripcion);
  formData.append("stock", stock);
  formData.append("valor", valor);
  formData.append("imagen", imagen);

  // Realizar la solicitud AJAX para agregar el producto
  $.ajax({
    url: "add-producto/",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      // Cerrar el modal de agregar producto
      $("#addProductModal").modal("hide");
          const mensajeSuccess = `El producto: ${nombre} se creó correctamente en el sistema`;
          MensajeAlerta(mensajeSuccess, 'success', false);
          // Redirigir a la ruta de usuarios
          setTimeout(function() {
            window.location.href = '/admin/productos/';
          }, 2000);
      // Mostrar un mensaje de éxito o realizar otras acciones
    },
    error: function (xhr, status, error) {
      const mensajeSuccess = 'Error al crear el producto ' + xhr.responseText;
      MensajeAlerta(mensajeSuccess, 'error');
    },
  });
}

$("#addProductBtn").click(function () {
  // Limpiar los campos del formulario
  $("#codigo").val("");
  $("#nombre").val("");
  $("#descripcion").val("");
  $("#stock").val("");
  $("#valor").val("");
  $("#userImagen").val("");

  // Mostrar el modal de agregar producto
  $("#addProductModal").modal("show");
});

// Eliminar productos
// Obtener todos los botones de eliminar productos
var deleteButtons = document.getElementsByClassName('delete-product-btn');

// Recorrer los botones y agregar el evento de clic
for (var i = 0; i < deleteButtons.length; i++) {
  deleteButtons[i].addEventListener('click', function() {
    var productId = this.getAttribute('data-id');
    var productName = this.getAttribute('data-nombre');
    var deleteUrl = 'eliminar_producto/' + productId + '/';

    // Obtener el token CSRF del formulario
    var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    // Mostrar el mensaje de confirmación utilizando SweetAlert con el nombre del producto
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el producto "' + productName + '"',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Realizar una solicitud AJAX para eliminar el producto de la base de datos
        var xhr = new XMLHttpRequest();
        xhr.open('POST', deleteUrl, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('X-CSRFToken', csrfToken); // Agregar el token CSRF en la cabecera de la solicitud

        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            // El producto se eliminó correctamente
            location.reload();
          } else if (xhr.readyState === 4 && xhr.status !== 200) {
            // Ocurrió un error al eliminar el producto
          }
        };
        xhr.send();
      }
    });
  });
}
// Fin de eliminar productos

// Editar productos
// Obtener todos los botones de editar productos
var editButtons = document.getElementsByClassName('edit-product-btn');

// Recorrer los botones y agregar el evento de clic
for (var i = 0; i < editButtons.length; i++) {
  editButtons[i].addEventListener('click', function() {
    var productId = this.getAttribute('data-id');
    var productCodigo = this.getAttribute('data-codigo');
    var productNombre = this.getAttribute('data-nombre');
    var productDescripcion = this.getAttribute('data-descripcion');
    var productStock = this.getAttribute('data-stock');
    var productValor = this.getAttribute('data-precio');
    var productImagen = this.getAttribute('data-imagen');

    // Obtener los elementos del formulario de edición
    var editProductIdInput = document.getElementById('editProductId');
    var editProductCodigoInput = document.getElementById('editProductCodigo');
    var editProductNombreInput = document.getElementById('editProductNombre');
    var editProductDescripcionInput = document.getElementById('editProductDescripcion');
    var editProductStockInput = document.getElementById('editProductStock');
    var editProductValorInput = document.getElementById('editProductValor');
    var editProductImagenInput = document.getElementById('editProductImagen');
    var editProductImagePreview = document.getElementById('editProductImagePreview');

    // Obtener la ruta de la imagen actual del producto
    var imagenActual = productImagen ? productImagen : "{% static 'img/product_base.jpeg' %}";
    // Mostrar la imagen actual del producto en el elemento <img>
    editProductImagePreview.src = imagenActual;

    // Evento al cambiar el valor del campo de imagen
    editProductImagenInput.addEventListener('change', function(event) {
      var file = event.target.files[0];
      var reader = new FileReader();

      // Cargar la imagen seleccionada en el elemento <img>
      reader.onload = function(e) {
          editProductImagePreview.src = e.target.result;
      };

      // Leer el contenido del archivo seleccionado como una URL de datos
      if (file) {
          reader.readAsDataURL(file);
      } else {
          // Mostrar la imagen base si no se selecciona ninguna imagen
          editProductImagePreview.src = "{% static 'img/product_base.jpeg' %}";
      }
    });

    // Establecer los valores actuales del producto en el formulario de edición
    editProductIdInput.value = productId;
    editProductCodigoInput.value = productCodigo;
    editProductNombreInput.value = productNombre;
    editProductDescripcionInput.value = productDescripcion;
    editProductStockInput.value = productStock;
    editProductValorInput.value = productValor;
    // Aquí puedes establecer el valor actual de otros campos si tienes esa información disponible en la tabla

    // Limpiar el campo de archivo de imagen
    editProductImagenInput.value = '';

    // Abrir el modal de edición de producto
    $('#editProductModal').modal('show');
  });
}

function editarProducto() {
  // Obtener los elementos del formulario de edición
  var editProductIdInput = document.getElementById('editProductId');
  var editProductCodigoInput = document.getElementById('editProductCodigo');
  var editProductNombreInput = document.getElementById('editProductNombre');
  var editProductDescripcionInput = document.getElementById('editProductDescripcion');
  var editProductStockInput = document.getElementById('editProductStock');
  var editProductValorInput = document.getElementById('editProductValor');
  var editProductImagenInput = document.getElementById('editProductImagen');

  var editUrl = 'editar_producto/' + editProductIdInput.value + '/';
 
  // Obtener el token CSRF del formulario
  var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

  // Obtener los valores del formulario
  var productId = editProductIdInput.value;
  var productCodigo = editProductCodigoInput.value;
  var productNombre = editProductNombreInput.value;
  var productDescripcion = editProductDescripcionInput.value;
  var productStock = editProductStockInput.value;
  var productValor = editProductValorInput.value;
  var productImagen = editProductImagenInput.files[0];

  // Crear un objeto FormData para enviar los datos del producto
  var formData = new FormData();
  formData.append('editProductId', productId);
  formData.append('editProductCodigo', productCodigo);
  formData.append('editProductNombre', productNombre);
  formData.append('editProductDescripcion', productDescripcion);
  formData.append('editProductStock', productStock);
  formData.append('editProductValor', productValor);
  formData.append('editProductImagen', productImagen);

  // Realizar una solicitud AJAX para editar el producto en la base de datos
  var xhr = new XMLHttpRequest();
  xhr.open('POST', editUrl, true);
  xhr.setRequestHeader('X-CSRFToken', csrfToken); // Agrega el token CSRF en la cabecera de la solicitud

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // El producto se editó correctamente

      location.reload();
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      // Ocurrió un error al editar el producto
    }
  };

  xhr.send(formData);
}
// Fin de editar productos


