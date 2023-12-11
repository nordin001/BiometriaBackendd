function mostrarUsuarios() {
    fetch('../api/listausuarios.php') // Obtener usuarios
        .then(response => response.json())
        .then(data => {
            const listadoUsuarios = document.getElementById('listado-Usuarios');

            // Limpiar la tabla
            listadoUsuarios.innerHTML = '';

            // Iterar sobre los usuarios y agregarlos a la tabla
            data.forEach(usuario => {
                if(usuario.email!="admin@gmail.com")
                {
                    const fila = document.createElement('tr');
                    // Crear celdas para cada propiedad del usuario
                    const nombre = document.createElement('td');
                    nombre.textContent = usuario.nombreyapellidos;
                    fila.appendChild(nombre);
    
                    // Agregar una celda para el teléfono (se llenará después)
                    const telefono = document.createElement('td');
                    fila.appendChild(telefono);
    
                    const email = document.createElement('td');
                    email.textContent = usuario.email;
                    fila.appendChild(email);
    
                    const acciones = document.createElement('td');
                    const editar = document.createElement('a');
                    editar.href = '#';
                    editar.textContent = 'Editar';
    
                    const eliminar = document.createElement('a');
                    eliminar.href = '#';
                    eliminar.textContent = 'Eliminar';
                    eliminar.addEventListener('click', () => eliminarUsuario(usuario.email));
    
                    acciones.appendChild(editar);
                    acciones.appendChild(document.createTextNode(' | '));
                    acciones.appendChild(eliminar);
    
                    fila.appendChild(acciones);
    
                    listadoUsuarios.appendChild(fila);
    
    
                    obtenerTelefono(usuario.email, telefono);
                }
            });
        })
        .catch(error => console.error('Hubo un error:', error));
}

function obtenerTelefono(userId, telefonoElement) {
    fetch(`../api/recuperartelefono.php?email=${userId}`) // Obtener el teléfono para el usuario
        .then(response => response.json())
        .then(data => {
            // Mostrar el teléfono en la celda correspondiente
            telefonoElement.textContent = data.telefono;
        })
        .catch(error => console.error('Hubo un error obteniendo el teléfono:', error));
}

function eliminarUsuario(email) {
    if (confirm('¿Estás seguro de que quieres eliminar a ' + email + '?')) {
        fetch(`../api/eliminarusuario.php?email=${email}`, { method: 'DELETE' }) // Eliminar el usuario
            .then(() => {
                // Volver a cargar la lista de usuarios después de eliminar
                alert("El usuario se elimino correctamente")
                mostrarUsuarios();
            })
            .catch(error => alert('Error: ' + "Error al eliminar usuario"), error);
    }
}

function filtrarUsuarios() {
    const valorBusqueda = document.getElementById('buscador').value.toLowerCase();
    const filasUsuarios = document.querySelectorAll('#listado-Usuarios tr');

    filasUsuarios.forEach(fila => {
        const nombre = fila.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const email = fila.querySelector('td:nth-child(3)').textContent.toLowerCase();

        if (nombre.includes(valorBusqueda) || email.includes(valorBusqueda)) {
            fila.style.display = 'table-row';
        } else {
            fila.style.display = 'none';
        }
    });
}

mostrarUsuarios();
