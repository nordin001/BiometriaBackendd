//AIzaSyADW33LRTXZSEmLMv8ebiwK8Dtb9gDsg5Y


// Definición de variables globales
let map;
let latlong = { lat: 1, lng: 2 }; // Coordenadas predeterminadas

async function recuperarcoordenadas() {
    $(document).ready(async function () {
        const userId = await obtenerUserId();
        if (userId !== null) {
            $.ajax({
                url: '../api/recuperarusuariomedicion.php',
                type: 'GET',
                data: { email: userId },
                dataType: 'json',
                success: async function (data) {
                    $.ajax({
                        url: '../api/recuperarmedicion.php',
                        type: 'GET',
                        data: { idmedicion: data.idmedicion },
                        dataType: 'json',
                        success: async function (data) {
                            latlong = { lat: data.latitud, lng: data.longitud };
                            console.log(latlong);
                            //initMap();
                        },
                        error: function () {
                            console.log('Error al obtener el valor.');
                            console.log(arguments);
                        }
                    });
                },
                error: function () {
                    console.log('Error al obtener el valor.');
                    console.log(arguments);
                }
            });
        }
    });
}

// Llamada inicial para recuperar las coordenadas
recuperarcoordenadas();

// Función para inicializar el mapa
async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: latlong,
        zoom: 15,
    });
    console.log(latlong);
}
 
