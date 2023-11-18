
//-----------------------------------------------------------------------------------------------------------
//              recuperarprueba()!!
//-----------------------------------------------------------------------------------------------------------

function recuperarprueba() {
    $(document).ready(function () {
        // Hacer la solicitud al servidor
        $.ajax({
            url: '../api/recuperarprueba.php', // Ruta al script PHP
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                // Manejar la respuesta del servidor
                console.log(data);
                var valor = data.co2;
                var valo2 = data.temp;
                document.getElementById('resultado').innerHTML = valor + " " + valo2;
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments)
            }
        });
    });
    setTimeout(function () {
        location.reload(true);
    }, 2000);
}

//-------------------------------------------------------------------------------------------------------
//         email:text -> recuperarusuario()-> email:text, nombreyapellidos:text, telefono:text
//-------------------------------------------------------------------------------------------------------
async function recuperarusuario() {
    $(document).ready(async function () {
        // Hacer la solicitud al servidor
        const userId = await obtenerUserId();
        if (userId !== null) {
            $.ajax({
                url: '../api/recuperarusuario.php', // Ruta al script PHP
                type: 'GET',
                data: { email: userId },
                dataType: 'json',
                success: async function (data) {
                    // Manejar la respuesta del servidor
                    console.log(data);
                    document.getElementById('nombre').value = data.nombreyapellidos;
                    document.getElementById('email').value = data.email;
                },
                error: function () {
                    console.log('Error al obtener el valor.');
                    console.log(arguments);
                }
            });

            $.ajax({
                url: '../api/recuperartelefono.php', // Ruta al script PHP
                type: 'GET',
                data: { email: userId },
                dataType: 'json',
                success: async function (data) {
                    // Manejar la respuesta del servidor
                    console.log(data);
                    document.getElementById('telefono').value = data.telefono;
                },
                error: function () {
                    console.log('Error al obtener el valor.');
                    console.log(arguments);
                }
            });
        } else {
            // Hacer algo si userId es null
        }
    });
}


//-------------------------------------------------------------------------------------------------------
//       email:text, nombreyapellidos:text, telefono:text -> actualizarusuario()
//-------------------------------------------------------------------------------------------------------
function actualizarusuario() {
    $(document).ready(async function () {
        var email = document.getElementById('email').value;
        var nombre = document.getElementById('nombre').value;
        var telefono = document.getElementById('telefono').value;
        const userId = await obtenerUserId();
        if (userId !== null) {
            $.ajax({
                url: '../api/actualizarusuario.php', // Ruta al script PHP
                type: 'POST',
                data: { email: email, nombreyapellidos: nombre, emailantiguo:userId},
                dataType: 'json',
                success: async function (data) {
                    console.log(data);
                },
                error: function () {
                    console.log('Error al obtener el valor.');
                    console.log(arguments)
                }
            });
    
            $.ajax({
                url: '../api/actualizartelefono.php', // Ruta al script PHP
                type: 'POST',
                data: { email: email, telefono: telefono },
                dataType: 'json',
                success: async function (data) {
                    console.log(data);
                    alert("El usuario se a editado correctamente");
                },
                error: function () {
                    console.log('Error al obtener el valor.');
                    console.log(arguments)
                }
            });
        }
        else
        {
            console.log("No has inciado sesion");
        }

        // Hacer la solicitud al servidor
    });

}

//-------------------------------------------------------------------------------------------------------
//        email:text, contrasenya:text -> login()
//-------------------------------------------------------------------------------------------------------
function login() {
    $(document).ready(function () {

        const email = $('#email').val();
        const contrasenya = $('#contrasenya').val();

        $.ajax({
            url: '../api/login.php', // Ruta al script PHP que maneja el inicio de sesión
            type: 'POST',
            data: {
                email: email,
                contrasenya: contrasenya
            },
            success: async function (data) {
                if (!data.error) {
                    //alert(data.message); // Display the success message
                    window.location.href="landing.html";
                } else {
                    alert('Error: ' + data.message); // Display the error message
                }
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments);
            }
        });
    });
}

//-------------------------------------------------------------------------------------------------------
//        email:text, nombreyapellidos:text, telefono:text, contrasenya:text -> registro()
//-------------------------------------------------------------------------------------------------------
function registro() {
    $(document).ready(function () {
        var email = document.getElementById('email').value;
        var nombre = document.getElementById('nombre').value;
        var contrasenya = document.getElementById('contrasenya').value;
        var telefono = document.getElementById('telefono').value;
        var confirmarcontrasenya = document.getElementById('confirmarcontrasenya').value;
            // Validación del lado del cliente
            if (email === "" || nombre === "" || contrasenya === "" || telefono === "" || confirmarcontrasenya === "") {
                alert("Por favor, complete todos los campos.");
                return;
            }
    
            if (contrasenya !== confirmarcontrasenya) {
                alert("La confirmación de la contraseña no coincide.");
                return;
            }
                $.ajax({
                    url: '../api/registro.php', // Ruta al script PHP
                    type: 'POST',
                    data: { email: email, nombreyapellidos: nombre, contrasenya: contrasenya , telefono: telefono},
                    dataType: 'json',
                    success: async function (data) {
                        alert("El usuario se creo correctamente")
                        window.location.href="login.html";
                    },
                    error: function () {
                        console.log('Error al obtener el valor.');
                        console.log(arguments)
                    }
                });
    });

}

//-------------------------------------------------------------------------------------------------------
//         obtenerUserId()!!
//-------------------------------------------------------------------------------------------------------
async function obtenerUserId() {
    const response = await fetch('../api/userid.php'); // Ruta al script PHP que obtiene $_SESSION['user_id']
    
    if (response.ok) {
        const userId = await response.text();
        
        if (userId !== 'null') {
            // El valor de $_SESSION['user_id'] se ha recuperado con éxito
            return userId;
        } else {
            // No se encontró $_SESSION['user_id']
            return null;
        }
    } else {
        // Error en la solicitud AJAX
        console.error('Error al obtener $_SESSION[\'user_id\'].');
        return null;
    }
}

//-------------------------------------------------------------------------------------------------------
//         hola()!!
//-------------------------------------------------------------------------------------------------------
async function hola()
{
    $(document).ready(async function () {

        // Hacer la solicitud al servidor
        const userId = await obtenerUserId();
        if (userId !== null) {
            document.getElementById('hola').innerHTML = "Hola " + userId;
            document.getElementById('logout').textContent ="LogOut";
        }
        else{
            document.getElementById('hola').innerHTML = "Hola, no has iniciado sesion";
            document.getElementById('editu').textContent = "";
            document.getElementById('logout').textContent ="IniciarSesion";


        }   
    });
}

//-------------------------------------------------------------------------------------------------------
//        contrasenyaactual:text, nuevacontrasenya:text, confirmarcontrasenya:text -> cambiarContrasenya()
//-------------------------------------------------------------------------------------------------------
async function cambiarContrasenya() {
    $(document).ready(async function () {
        var contrasenyaactual = document.getElementById('contrasenyaactual').value;
        var nuevacontrasenya = document.getElementById('nuevacontrasenya').value;
        var confirmarcontrasenya = document.getElementById('confirmarcontrasenya').value;
        
        $.ajax({
            url: '../api/cambiarcontrasenya.php', // Ruta al script PHP
            type: 'POST',
            data: { contrasenyaactual: contrasenyaactual, nuevacontrasenya: nuevacontrasenya, confirmarcontrasenya: confirmarcontrasenya },
            dataType: 'json',
            success: async function (data) {
                if (!data.error) {
                    alert(data.message); // Display the success message
                    window.location.href="landing.html";
                } else {
                    alert('Error: ' + data.message); // Display the error message
                }
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments);
            }
        });
    });
}


//-------------------------------------------------------------------------------------------------------
//        email:text, nuevacontrasenya:text, confirmarcontrasenya:text -> cambiarContrasenya()
//-------------------------------------------------------------------------------------------------------
async function recuperarcontrasenya()
{
    $(document).ready(async function () {
        var email = document.getElementById('email').value;
        var nuevacontrasenya = document.getElementById('nuevacontrasenya').value;
        var confirmarcontrasenya = document.getElementById('confirmarcontrasenya').value;
        
        $.ajax({
            url: '../api/recuperarcontrasenya.php', // Ruta al script PHP
            type: 'POST',
            data: { email: email, nuevacontrasenya: nuevacontrasenya, confirmarcontrasenya: confirmarcontrasenya },
            dataType: 'json',
            success: async function (data) {
                if (!data.error) {
                    alert(data.message); // Display the success message
                    window.location.href="landing.html";
                } else {
                    alert('Error: ' + data.message); // Display the error message
                }
            },
            error: function () {
                console.log('Error al obtener el valor.');
                console.log(arguments);
            }
        });
    });
}

//-------------------------------------------------------------------------------------------------------
//        comprobarsesion()
//-------------------------------------------------------------------------------------------------------

async function comprobarsesion()
{
    $(document).ready(async function () {

        // Hacer la solicitud al servidor
        const userId = await obtenerUserId();
        if (userId !== null) {  
            window.location.href="landing.html";
        }
        else{
            return;
        }   
    });
}
//---------------------------------------------------------------------------------------------------------------------
//       Tallal:we have to separate functions to smallee portions , in order to test them easly 
//---------------------------------------------------------------------------------------------------------------------

//Dom interaction
function getFormData() {
    return {
      email: document.getElementById('email').value,
      nombre: document.getElementById('nombre').value,
      contrasenya: document.getElementById('contrasenya').value,
      telefono: document.getElementById('telefono').value,
      confirmarcontrasenya: document.getElementById('confirmarcontrasenya').value
    };
  }

//validation function
function validateForm(formData) {
    if (formData.email === "" || formData.nombre === "" || formData.contrasenya === "" || formData.telefono === "" || formData.confirmarcontrasenya === "") {
      alert("Por favor, complete todos los campos.");
      return false;
    }
  
    if (formData.contrasenya !== formData.confirmarcontrasenya) {
      alert("La confirmación de la contraseña no coincide.");
      return false;
    }
  
    return true;
  }

  //Api call function
  async function makeApiCall(formData) {
    try {
      const response = await $.ajax({
        url: '../api/registro.php',
        type: 'POST',
        data: { email: formData.email, nombreyapellidos: formData.nombre, contrasenya: formData.contrasenya, telefono: formData.telefono },
        dataType: 'json'
      });
  
      alert("El usuario se creo correctamente");
      window.location.href = "login.html";
    } catch (error) {
      console.error('Error al obtener el valor.', error);
    }
  }
  //registro2
  function registro2() {
    $(document).ready(function () {
      const formData = getFormData();
  
      if (!validateForm(formData)) {
        return;
      }
  
      makeApiCall(formData);
    });
  }
  
  

  
  


//---------------------------------------------------------------------------------------------------------------------
//       a simple function for testing the tests :)
//---------------------------------------------------------------------------------------------------------------------

const addNumbers = (a, b) => {
    return a + b;
  };

  //es importante meter las funciones que vamos a usar aqui
  module.exports = {
    addNumbers,
    registro,
    getFormData,
    validateForm,
    makeApiCall,
    registro2

  };