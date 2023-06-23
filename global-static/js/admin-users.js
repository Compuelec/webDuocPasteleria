// Agregar usuarios

  var btnAddUser = document.getElementById('addUserBtn');
  btnAddUser.addEventListener('click', function() {
    setTimeout(function() {
        document.getElementById('nombre').value = '';
        document.getElementById('correo').value = '';
        document.getElementById('password').value = '';
        document.getElementById('nombre').focus();
    }, 500);
  });


function agregarUsuario() {
  var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  var nombre = document.getElementById('nombre').value;
  var correo = document.getElementById('correo').value;
  var password = document.getElementById('password').value;
  var tipo = document.getElementById('tipo').value;
  var imagenUser = document.getElementById('userImagen').files[0]; // Obtener el archivo de imagen seleccionado


  var formData = new FormData(); // Utilizar FormData para enviar datos y archivos

  // Agregar los campos al FormData
  formData.append('csrfmiddlewaretoken', csrfToken);
  formData.append('nombre', nombre);
  formData.append('correo', correo);
  formData.append('password', password);
  formData.append('tipo', tipo);
  formData.append('imagen', imagenUser);

  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'crear_usuario/', true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Cerrar el modal
          $('#modalCrearUsuario').modal('hide');
          const mensajeSuccess = `El usuario: ${nombre} se creó correctamente en el sistema`;
          MensajeAlerta(mensajeSuccess, 'success');
          // Redirigir a la ruta de usuarios
          setTimeout(function() {
            window.location.href = '/admin/users/';
          }, 2000);
        }
      } else {
        var response = JSON.parse(xhr.responseText);
        if (response.errorEv) {
            const mensajeError = `Ocurrió un error correo: ${correo} no es un correo electrónico válido`;
            MensajeAlerta(mensajeError, 'error');
        }
        if (response.errorCr) {
            const mensajeError = `Ocurrió un error correo: ${correo} ya está registrado en el sistema`;
            MensajeAlerta(mensajeError, 'error');
        }
      }
    }
  };

  xhr.send(formData);
}

  // Fin de agregar usuarios

  // Eliminar usuarios
  // Obtener todos los botones de eliminar usuarios
  var deleteButtons = document.getElementsByClassName('delete-user-btn');

  // Recorrer los botones y agregar el evento de clic
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function() {
      var userId = this.getAttribute('data-id');
      var userName = this.getAttribute('data-nombre');
      var deleteUrl = 'eliminar_usuario/' + userId + '/';

      // Obtener el token CSRF del formulario
      var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

      // Mostrar el mensaje de confirmación utilizando SweetAlert con el nombre del usuario
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción eliminará al usuario "' + userName + '"',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Realizar una solicitud AJAX para eliminar al usuario de la base de datos
          var xhr = new XMLHttpRequest();
          xhr.open('POST', deleteUrl, true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('X-CSRFToken', csrfToken); // Agregar el token CSRF en la cabecera de la solicitud

          xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
              // El usuario se eliminó correctamente
              // Aquí puedes realizar acciones adicionales, como actualizar el listado de usuarios
              // o mostrar un mensaje de éxito al usuario
              // Por ejemplo, puedes recargar la página después de la eliminación:
              location.reload();
            } else if (xhr.readyState === 4 && xhr.status !== 200) {
              // Ocurrió un error al eliminar el usuario
              // Aquí puedes mostrar un mensaje de error al usuario o realizar acciones adicionales
            }
          };
          xhr.send();
        }
      });
    });
  }
  // Fin de eliminar usuarios

  // Editar usuarios
  // Obtener todos los botones de editar usuarios
  var editButtons = document.getElementsByClassName('edit-user-btn');

  // Recorrer los botones y agregar el evento de clic
  for (var i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function() {
      var userId = this.getAttribute('data-id');
      var userName = this.getAttribute('data-nombre');
      var userTipo = this.getAttribute('data-tipo');
      var editUrl = 'editar_usuario/' + userId + '/';

      // Obtener los elementos del formulario de edición
      var editUserIdInput = document.getElementById('editUserId');
      var editUserNameInput = document.getElementById('editUserName');
      var editUserTipoInput = document.getElementById('editUserTipo');
      var editUserImagenInput = document.getElementById('editUserImagen');
      var editUserImagePreview = document.getElementById('editUserImagePreview');

      // Obtener la ruta de la imagen actual del usuario
      var imagenActual = this.getAttribute('data-imagen');
      // Mostrar la imagen actual del usuario en el elemento <img>
      editUserImagePreview.src = imagenActual;
     
      // Evento al cambiar el valor del campo de imagen
      editUserImagenInput.addEventListener('change', function(event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        // Cargar la imagen seleccionada en el elemento <img>
        reader.onload = function(e) {
            editUserImagePreview.src = e.target.result;
        };

        // Leer el contenido del archivo seleccionado como una URL de datos
        if (file) {
            reader.readAsDataURL(file);
        } else {
            // Mostrar la imagen base si no se selecciona ninguna imagen
            editUserImagePreview.src = "{% static 'img/user_base.png' %}";
        }
      });

      // Establecer los valores actuales del usuario en el formulario de edición
      editUserIdInput.value = userId;
      editUserNameInput.value = userName;
      editUserTipoInput.value = userTipo;
      // Aquí puedes establecer el valor actual del tipo de usuario y la imagen si tienes esa información disponible en la tabla

      // Limpiar el campo de archivo de imagen
      editUserImagenInput.value = '';

      // Abrir el modal de edición de usuario
      $('#editUserModal').modal('show');
    });
  }

  function editarUsuario() {
    // Obtener los elementos del formulario de edición
    var editUserIdInput = document.getElementById('editUserId');
    var editUserNameInput = document.getElementById('editUserName');
    var editUserTipoInput = document.getElementById('editUserTipo');
    var editUserImagenInput = document.getElementById('editUserImagen');

    // Obtener el token CSRF del formulario
    var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;

    // Obtener los valores del formulario
    var userId = editUserIdInput.value;
    var userName = editUserNameInput.value;
    var userType = editUserTipoInput.value;
    var userImage = editUserImagenInput.files[0];

    // Crear un objeto FormData para enviar los datos del usuario
    var formData = new FormData();
    formData.append('editUserId', userId);
    formData.append('editUserName', userName);
    formData.append('editUserTipo', userType);
    formData.append('editUserImagen', userImage);

    // Realizar una solicitud AJAX para editar al usuario en la base de datos
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'editar_usuario/', true);
    xhr.setRequestHeader('X-CSRFToken', csrfToken); // Agrega el token CSRF en la cabecera de la solicitud

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // El usuario se editó correctamente
        // Aquí puedes realizar acciones adicionales, como actualizar la tabla de usuarios
        // o mostrar un mensaje de éxito al usuario
        // Por ejemplo, puedes recargar la página después de la edición:
        location.reload();
      } else if (xhr.readyState === 4 && xhr.status !== 200) {
        // Ocurrió un error al editar el usuario
        // Aquí puedes mostrar un mensaje de error al usuario o realizar acciones adicionales
      }
    };

    xhr.send(formData);
  }
  // Fin de editar usuarios

// Función para validar el formato de correo electrónico
function validarCorreoElectronico(correo) {
  // Expresión regular para validar el formato de correo electrónico
  var correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!correoRegex.test(correo)) {
    const mensajeError = `El correo: ${correo} no es un correo electrónico válido`;
    MensajeAlerta(mensajeError, 'error');
    return false;
  }

  return true;
}

// Función para verificar si el correo electrónico ya está registrado
function correoRegistrado(correo) {
  var csrfToken = document.querySelector('input[name="csrfmiddlewaretoken"]').value;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'verificar_correo/', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('X-CSRFToken', csrfToken);

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.registrado) {
          const mensajeError = `El correo: ${correo} ya está registrado en el sistema`;
          MensajeAlerta(mensajeError, 'error');
          return true;
        }
      } else {
        // Manejar el error de la solicitud
      }
    }
  };

  var data = JSON.stringify({
    correo: correo
  });

  xhr.send(data);
}
