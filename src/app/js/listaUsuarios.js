// 
//      mostrarUsuarios()
//

function mostrarUsuarios() {

    const thEstado = document.getElementById('Estado');

    thEstado.addEventListener('click', () => {
        ordenarUsuariosPorEstado();
    });

    const thNombre = document.getElementById('Nombre');
    thNombre.addEventListener('click', () => {
        ordenarUsuariosPorNombre();
    });

    const thCorreo = document.getElementById('Correo');
    thCorreo.addEventListener('click', () => {
        ordenarUsuariosPorCorreo();
    });

    const thSondas = document.getElementById('Sondas'); // Suponiendo que se use este ID
    thSondas.addEventListener('click', () => {
        ordenarUsuariosPorSondas();
    });

    const thFecha = document.getElementById('Fecha'); // Suponiendo que se use este ID
    thFecha.addEventListener('click', () => {
        ordenarUsuariosPorFecha();
    });

    fetch('../api/listausuarios.php')
        .then(response => response.json())
        .then(data => {
            const listadoUsuarios = document.getElementById('listado-Usuarios');


            listadoUsuarios.innerHTML = '';


            data.forEach(usuario => {
                if (usuario.email != "admin@gmail.com") {
                    const fila = document.createElement('tr');

                    const nombre = document.createElement('td');
                    nombre.textContent = usuario.nombreyapellidos;
                    fila.appendChild(nombre);


                    const telefono = document.createElement('td');
                    fila.appendChild(telefono);

                    const email = document.createElement('td');
                    email.textContent = usuario.email;
                    fila.appendChild(email);

                    const sondas = document.createElement('td');
                    fila.appendChild(sondas);

                    const ultimamemdicion = document.createElement('td');
                    fila.appendChild(ultimamemdicion);

                    const estado = document.createElement('td');
                    fila.appendChild(estado);


                    const acciones = document.createElement('td');
                    const editar = document.createElement('a');
                    editar.href = '#';
                    editar.textContent = 'Editar';

                    const eliminar = document.createElement('a');
                    eliminar.href = '#';
                    eliminar.textContent = 'Eliminar';
                    eliminar.addEventListener('click', () => eliminarUsuario(usuario.email));
                    acciones.appendChild(eliminar);

                    fila.appendChild(acciones);

                    listadoUsuarios.appendChild(fila);


                    obtenerTelefono(usuario.email, telefono);
                    obtenerSondasUsuario(usuario.email, sondas);
                    obtenerUltimaMedidicon(usuario.email, ultimamemdicion, estado);
                }
            });
        })
        .catch(error => console.error('Hubo un error:', error));
}


// 
//      obtenerTelefono()
//
function obtenerTelefono(userId, telefonoElement) {
    fetch(`../api/recuperartelefono.php?email=${userId}`)
        .then(response => response.json())
        .then(data => {

            telefonoElement.textContent = data.telefono;
        })
        .catch(error => console.error('Hubo un error obteniendo el teléfono:', error));
}


// 
//      obtenerSondasUsuario()
//
function obtenerSondasUsuario(userId, sondaElement) {
    fetch(`../api/recuperarsondasusuario.php?email=${userId}`)
        .then(response => response.json())
        .then(data => {

            sondaElement.textContent = data;
        })
        .catch(error => console.error('Hubo un error obteniendo el numero de sondas:', error));
}


// 
//      obtenerUltimaMedidicon()
//
function obtenerUltimaMedidicon(userId, ultimamemdicionElment, estadoelemnt) {
    fetch(`../api/recuperarusuariomedicion.php?email=${userId}`)
        .then(response => response.json())
        .then(data => {
            if (data != "Fallo") {
                fetch(`../api/recuperarmedicion.php?idmedicion=${data.idmedicion}`)
                    .then(response => response.json())
                    .then(data => {
                        const fechaMedicion = new Date(data.instante);
                        const fechaActual = new Date();
                        const diferenciaHoras = (fechaActual - fechaMedicion) / (1000 * 60 * 60);

                        ultimamemdicionElment.textContent = data.instante;

                        if (diferenciaHoras < 24) {
                            estadoelemnt.textContent = "Activo";
                            estadoelemnt.style.color = "green";
                        } else {
                            estadoelemnt.textContent = "Inactivo";
                            estadoelemnt.style.color = "red";
                        }

                    })
                    .catch(error => console.error('Hubo un error obteniendo el instante:', error));
            }
            else {
                ultimamemdicionElment.textContent = "0000-00-00 00:00:00";
                estadoelemnt.textContent = "Inactivo";
                estadoelemnt.style.color = "red";
            }
        })
        .catch(error => console.error('Hubo un error obteniendo la ultima medidicion:', error));
}



// 
//      String:email --> eliminarUsuario()
//
function eliminarUsuario(email) {
    if (confirm('¿Estás seguro de que quieres eliminar a ' + email + '?')) {
        fetch(`../api/eliminarusuario.php?email=${email}`, { method: 'DELETE' })
            .then(() => {

                alert("El usuario se elimino correctamente")
                mostrarUsuarios();
            })
            .catch(error => alert('Error: ' + "Error al eliminar usuario"), error);
    }
}


// 
//      filtrarUsuarios()
//
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


let estadoOrdenActual = 'ascendente';
function ordenarUsuariosPorEstado() {
    const filasUsuarios = Array.from(document.querySelectorAll('#listado-Usuarios tr'));

    filasUsuarios.sort((filaA, filaB) => {
        const estadoA = filaA.querySelector('td:nth-child(6)').textContent.toLowerCase();
        const estadoB = filaB.querySelector('td:nth-child(6)').textContent.toLowerCase();

        if (estadoA === estadoB) {
            return 0;
        } else if (estadoOrdenActual === 'ascendente') {
            if (estadoA === 'activo') {
                return -1;
            } else {
                return 1;
            }
        } else {
            if (estadoA === 'activo') {
                return 1;
            } else {
                return -1;
            }
        }
    });

    const listadoUsuarios = document.getElementById('listado-Usuarios');
    filasUsuarios.forEach(fila => {
        listadoUsuarios.appendChild(fila);
    });

    // Cambiar el estado de orden actual
    estadoOrdenActual = estadoOrdenActual === 'ascendente' ? 'descendente' : 'ascendente';
}

let estadoOrdenNombre = 'ascendente'; // Estado actual del orden de nombre

function ordenarUsuariosPorNombre() {
    const filasUsuarios = Array.from(document.querySelectorAll('#listado-Usuarios tr'));

    filasUsuarios.sort((filaA, filaB) => {
        const nombreA = filaA.querySelector('td:nth-child(1)').textContent.toLowerCase();
        const nombreB = filaB.querySelector('td:nth-child(1)').textContent.toLowerCase();

        if (nombreA === nombreB) {
            return 0;
        } else if (estadoOrdenNombre === 'ascendente') {
            return nombreA < nombreB ? -1 : 1;
        } else {
            return nombreA > nombreB ? -1 : 1;
        }
    });

    const listadoUsuarios = document.getElementById('listado-Usuarios');
    filasUsuarios.forEach(fila => {
        listadoUsuarios.appendChild(fila);
    });

    // Cambiar el estado de orden actual de nombre
    estadoOrdenNombre = estadoOrdenNombre === 'ascendente' ? 'descendente' : 'ascendente';
}


let estadoOrdenCorreo = 'ascendente'; // Estado actual del orden de correo

function ordenarUsuariosPorCorreo() {
    const filasUsuarios = Array.from(document.querySelectorAll('#listado-Usuarios tr'));

    filasUsuarios.sort((filaA, filaB) => {
        const correoA = filaA.querySelector('td:nth-child(3)').textContent.toLowerCase();
        const correoB = filaB.querySelector('td:nth-child(3)').textContent.toLowerCase();

        if (correoA === correoB) {
            return 0;
        } else if (estadoOrdenCorreo === 'ascendente') {
            return correoA < correoB ? -1 : 1;
        } else {
            return correoA > correoB ? -1 : 1;
        }
    });

    const listadoUsuarios = document.getElementById('listado-Usuarios');
    filasUsuarios.forEach(fila => {
        listadoUsuarios.appendChild(fila);
    });

    // Cambiar el estado de orden actual de correo
    estadoOrdenCorreo = estadoOrdenCorreo === 'ascendente' ? 'descendente' : 'ascendente';
}

let estadoOrdenSondas = 'descendente'; // Cambiado a 'descendente' para empezar con el mayor número de sondas

function ordenarUsuariosPorSondas() {
    const filasUsuarios = Array.from(document.querySelectorAll('#listado-Usuarios tr'));

    filasUsuarios.sort((filaA, filaB) => {
        const numSondasA = parseInt(filaA.querySelector('td:nth-child(4)').textContent);
        const numSondasB = parseInt(filaB.querySelector('td:nth-child(4)').textContent);

        if (numSondasA === numSondasB) {
            return 0;
        } else if (estadoOrdenSondas === 'descendente') {
            return numSondasB - numSondasA; // Invertimos el orden aquí para mostrar primero los mayores
        } else {
            return numSondasA - numSondasB;
        }
    });

    const listadoUsuarios = document.getElementById('listado-Usuarios');
    filasUsuarios.forEach(fila => {
        listadoUsuarios.appendChild(fila);
    });

    // Cambiar el estado de orden actual de sondas
    estadoOrdenSondas = estadoOrdenSondas === 'ascendente' ? 'descendente' : 'ascendente';
}


let estadoOrdenFecha = 'descendente'; // Comenzar con la fecha más reciente

function ordenarUsuariosPorFecha() {
    const filasUsuarios = Array.from(document.querySelectorAll('#listado-Usuarios tr'));

    filasUsuarios.sort((filaA, filaB) => {
        const fechaTextoA = filaA.querySelector('td:nth-child(5)').textContent;
        const fechaTextoB = filaB.querySelector('td:nth-child(5)').textContent;

        if (fechaTextoA === fechaTextoB) {
            return 0;
        } else if (estadoOrdenFecha === 'ascendente') {
            return fechaTextoA.localeCompare(fechaTextoB); // Ordenar como cadena de texto ascendente
        } else {
            return fechaTextoB.localeCompare(fechaTextoA); // Ordenar como cadena de texto descendente
        }
    });

    const listadoUsuarios = document.getElementById('listado-Usuarios');
    filasUsuarios.forEach(fila => {
        listadoUsuarios.appendChild(fila);
    });

    // Cambiar el estado de orden actual de fecha
    estadoOrdenFecha = estadoOrdenFecha === 'ascendente' ? 'descendente' : 'ascendente';
}





mostrarUsuarios();
