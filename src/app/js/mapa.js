//AIzaSyADW33LRTXZSEmLMv8ebiwK8Dtb9gDsg5Y
//38.99610528500254, -0.16569078810570842
// 0-180    180-240 240<oo


// Definición de variables globales
let map;
var latlong = { lat: parseFloat(38.99610528500254), lng: parseFloat(-0.16569078810570842) };
var radius=100;
var boton;
let datalerta;


async function centrarmapa() {

    $(document).ready(async function () {
        boton = document.getElementById("descargar");
        const userId = await obtenerUserId();
        
        if (userId !== null && userId !== "admin@gmail.com") {
            boton.style.display = "none";
            let data = await recuperarusuariomedicion(userId);
            let medicion = await recuperarmedicion(data);
            latlong = { lat: parseFloat(medicion.latitud), lng: parseFloat(medicion.longitud) };
            pintar();
        } else if (userId !== "admin@gmail.com") {
            boton.style.display = "none";
            pintar();
        } else {
            boton.style.display = "block";
            pintar();
        }
    });
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: latlong,
        zoom: 15,
        maxZoom: 17,
        disableDefaultUI: true,
        styles: [
            {
                featureType: 'poi',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

}

async function pintar() {
    initMap();

    $(document).ready(async function () {
        const userId = await obtenerUserId();
        if (userId !== null && userId!="admin@gmail.com") {
            let data = await recuperartodasmedicionesusuario(userId);
            if (data.length < 40) {
                //data = await crearMediciones(data);
                //await crearMediciones(data);
            }
            let datat = await rangoTiempousuario(data, userId);
            let datac = await comprobarContaminante(datat);
            let datalert = await comprobarAlerta(datac);
            pintarMapaDeCalor(datalert);
        } else if (userId !== "admin@gmail.com"){
            let data = await recuperartodasmediciones();
            if (data.length < 40) {
                //data = await crearMediciones(data);
                //await crearMediciones(data);
            }
            let datat = await rangoTiempo(data);
            let datac = await comprobarContaminante(datat);
            let datalert = await comprobarAlerta(datac);
            pintarMapaDeCalor(datalert);
        }else {
            let data = await recuperartodasmediciones();
            if (data.length < 40) {
                //data = await crearMediciones(data);
                //await crearMediciones(data);
            }
            let datat = await rangoTiempo(data);
            let datac = await comprobarContaminante(datat);
            datalerta = await comprobarAlerta(datac);
            console.log(datalerta);
            pintarCirculos(datalerta);
        }
    });
}

function pintarCirculos(data) {
    var color;
    data.forEach(medicion => {
        if (medicion.valor <= 121) {
            color = "#00FF1F";
        } else if (medicion.valor > 121 && medicion.valor <= 180) {
            color = "#D8FF00";
        } else if (medicion.valor > 180) {
            color = "#FF0000";
        }
        const cityCircle = new google.maps.Circle({
            strokeColor: color,
            strokeOpacity: 1,
            strokeWeight: 2,
            fillColor: color,
            fillOpacity: 0.35,
            map,
            center: { lat: parseFloat(medicion.latitud), lng: parseFloat(medicion.longitud) },
            radius: 100,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `Hora: ${medicion.instante+",  valor: " +medicion.valor}`,
        });
    
        // Agregar un evento de clic al círculo para mostrar el InfoWindow
        google.maps.event.addListener(cityCircle, 'click', function(event) {
            infoWindow.setPosition(event.latLng);
            infoWindow.open(map);
        });

    });


   
}

function pintarMapaDeCalor(data) {
    var heatmapDataGreen = [];
    var heatmapDataYellow = [];
    var heatmapDataRed = [];

    var gradientGreen = [
        'rgba(0, 255, 0, 0)',
        'rgba(0, 255, 0, 1)',
        // Otros tonos de verde que desees
    ];
    var gradientYellow = [
        'rgba(255, 255, 0, 0)',
        'rgba(255, 255, 0, 1)',
        // Otros tonos de amarillo que desees
    ];
    
    var gradientRed = [
        'rgba(255, 0, 0, 0)',
        'rgba(255, 0, 0, 1)',
        // Otros tonos de rojo que desees
    ];
    data.forEach(medicion => {
        const latLng = new google.maps.LatLng(medicion.latitud,medicion.longitud);
        if(medicion.valor<=121)
        {
            heatmapDataGreen.push(latLng);
        } else if (medicion.valor > 121 && medicion.valor <= 180) {
            heatmapDataYellow.push(latLng);
        } else if (medicion.valor > 180) {
            heatmapDataRed.push(latLng);
        }
    });
    var heatmapGreen = new google.maps.visualization.HeatmapLayer({
        data: heatmapDataGreen,
        gradient: gradientGreen,
        radius: radius
    });
    var heatmapYellow = new google.maps.visualization.HeatmapLayer({
        data: heatmapDataYellow,
        gradient: gradientYellow,
        radius: radius
    });
    var heatmapRed = new google.maps.visualization.HeatmapLayer({
        data: heatmapDataRed,
        gradient: gradientRed,
        radius: radius
    });

    heatmapGreen.setMap(map);
    heatmapYellow.setMap(map);
    heatmapRed.setMap(map);

    google.maps.event.addListener(map, 'zoom_changed', function() {
        var zoomLevel = map.getZoom();
        var nuevoRadio = calcularNuevoRadio(zoomLevel);
        heatmapGreen.set('radius',nuevoRadio);
        heatmapYellow.set('radius',nuevoRadio);
        heatmapRed.set('radius',nuevoRadio);
    });
    

}



function calcularNuevoRadio(zoomLevel) {

    return 2.8* Math.pow(2, zoomLevel - 10);
    //return 30 * Math.log(zoomLevel + 1);
}


function pintarLineas(data, polyliena) {
    data.forEach(medicion => {
        polyliena.push(new google.maps.LatLng(parseFloat(medicion.latitud), parseFloat(medicion.longitud)));
    });
    const flightPath = new google.maps.Polyline({
        path: polyliena,
        geodesic: true,
        strokeColor: "#9033FF",
        strokeOpacity: 0.3,
        strokeWeight: 2,
    });
    flightPath.setMap(map);

}

async function crearMediciones(array) {
    const userId = await obtenerUserId();
    let idsonda = await recuperarUsuarioSonda(userId);
    const nuevasMediciones = [];
    const rangoLatitud = { min: -0.01, max: 0.01 };
    const rangoLongitud = { min: -0.01, max: 0.01 };
    var idmedicionfinal;
    console.log(array);



    var resto = 40 - array.length;
    var medicion = array[array.length - 1];
    for (let i = 1; i <= resto; i++) {
        const incrementoLatitud = crearNumeroAleatorio(rangoLatitud.min, rangoLatitud.max);
        const incrementoLongitud = crearNumeroAleatorio(rangoLongitud.min, rangoLongitud.max);
        var valorAleatorio = crearNumeroAleatorio(0, 300);
        var instante = sumarMinutos(medicion.instante, i * 60);
        var latitud = (parseFloat(medicion.latitud) + incrementoLatitud).toFixed(20);
        var longitud = (parseFloat(medicion.longitud) + incrementoLongitud).toFixed(20);
        var idcontaminante = 1;
        if (i % 2 === 0) {
            idcontaminante = 2;
        }
        await guardarMedicion(instante, latitud, longitud, valorAleatorio, idcontaminante);
        idmedicionfinal = parseInt(medicion.idmedicion) + i;

        await guardarSondaMedicion(idsonda.idsonda, idmedicionfinal);

    }
    //actualizarUsuarioMedicion(userId, idmedicionfinal);

    /*array.forEach(mediciones => {
        nuevasMediciones.push({
            idmedicion: (parseInt(mediciones.idmedicion)).toString(),
            instante: (mediciones.instante),
            latitud: (parseFloat(mediciones.latitud)).toFixed(20),
            longitud: (parseFloat(mediciones.longitud)).toFixed(20),
            valor: mediciones.valor
        });
    });
    for (let i = 1; i <= resto; i++) {
        const incrementoLatitud = crearNumeroAleatorio(rangoLatitud.min, rangoLatitud.max);
        const incrementoLongitud = crearNumeroAleatorio(rangoLongitud.min, rangoLongitud.max);
        const valorAleatorio = crearNumeroAleatorio(0, 300);

        nuevasMediciones.push({
            idmedicion: (parseInt(medicion.idmedicion) + i).toString(),
            instante: sumarMinutos(medicion.instante, i * 60),
            latitud: (parseFloat(medicion.latitud) + incrementoLatitud).toFixed(20),
            longitud: (parseFloat(medicion.longitud) + incrementoLongitud).toFixed(20),
            valor: valorAleatorio
        });
    }
    console.log(nuevasMediciones);*/

    //return nuevasMediciones;

}

function crearNumeroAleatorio(min, max) {
    return Math.random() * (max - min) + min;
}

function sumarMinutos(fecha, minutos) {
    const date = new Date(fecha);
    date.setMinutes(date.getMinutes() + minutos);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

function comprobarAlerta(array) {
    const nuevasMediciones = [];
    const bajaCheckbox = document.getElementById('baja');
    const mediaCheckbox = document.getElementById('media');
    const altaCheckbox = document.getElementById('alta');
    const ningunoMarcado = !bajaCheckbox.checked && !mediaCheckbox.checked && !altaCheckbox.checked;

    if (ningunoMarcado) {
        return array;
    }

    array.forEach(medicion => {
        const nuevaMedicion = {
            idmedicion: parseInt(medicion.idmedicion).toString(),
            instante: medicion.instante,
            latitud: parseFloat(medicion.latitud).toFixed(20),
            longitud: parseFloat(medicion.longitud).toFixed(20),
            valor: medicion.valor
        };

        if (bajaCheckbox.checked && medicion.valor <= 121) {
            nuevasMediciones.push(nuevaMedicion);
        } else if (mediaCheckbox.checked && medicion.valor > 121 && medicion.valor <= 180) {
            nuevasMediciones.push(nuevaMedicion);
        } else if (altaCheckbox.checked && medicion.valor > 180) {
            nuevasMediciones.push(nuevaMedicion);
        }
    });

    return nuevasMediciones;
}

async function rangoTiempo(data) {
    const desde = document.getElementById('datetimepickerStart').value;
    const hasta = document.getElementById('datetimepickerEnd').value;

    if (!desde || !hasta) {
        return data;
    }
    let medicionestiempo = await recuperarmediciontiempo(desde, hasta);
    return medicionestiempo;

}

async function rangoTiempousuario(data, usuario) {
    const desde = document.getElementById('datetimepickerStart').value;
    const hasta = document.getElementById('datetimepickerEnd').value;

    if (!desde || !hasta) {
        return data;
    }
    let medicionestiempo = await recuperarmediciontiempousuario(desde, hasta, usuario);
    //console.log(medicionestiempo);
    return medicionestiempo;

}

function comporbarTiempo() {
    const desde = document.getElementById('desde').value;
    const hasta = document.getElementById('hasta').value;

    if (!desde || !hasta) {
        return false;
    } else {
        return true;
    }


}

function comporbarAlertaMarcada() {
    const bajaCheckbox = document.getElementById('baja');
    const mediaCheckbox = document.getElementById('media');
    const altaCheckbox = document.getElementById('alta');
    const algunoMarcado = bajaCheckbox.checked || mediaCheckbox.checked || altaCheckbox.checked;

    if (!algunoMarcado) {
        return false;
    } else {
        return true;
    }


}


function comprobarContaminante(array) {
    const nuevasMediciones = [];
    var selectContaminante = document.getElementById("contaminante");
    var valorContaminante = selectContaminante.value;
    array.forEach(medicion => {
        const nuevaMedicion = {
            idmedicion: parseInt(medicion.idmedicion).toString(),
            instante: medicion.instante,
            latitud: parseFloat(medicion.latitud).toFixed(20),
            longitud: parseFloat(medicion.longitud).toFixed(20),
            valor: medicion.valor,
            idcontaminate: parseInt(medicion.idcontaminante).toString()
        };
        if (valorContaminante == medicion.idcontaminante) {
            nuevasMediciones.push(nuevaMedicion);
        }
    });
    return nuevasMediciones;
}

function interpolar(array,n)
{
    const nuevasMediciones = [];


}


function descargarMapa()
{
    const mapContainer = document.getElementById('map-container');

    console.log(datalerta);

    html2canvas(mapContainer).then(function (canvas) {
        var link = document.createElement('a');
        link.href = canvas.toDataURL();
        link.download = 'mapa.png';
        link.click();
    });

    // Convertir el array a formato JSON
    var arrayJSON = JSON.stringify(datalerta, null, 2); // null y 2 son opciones para dar formato legible

    // Crear un nuevo Blob con el contenido JSON
    var blob = new Blob([arrayJSON], { type: 'application/json' });

    // Crear un enlace de descarga
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Establecer el nombre del archivo
    link.download = 'Mapa.json';

    // Agregar el enlace al DOM y simular un clic para iniciar la descarga
    document.body.appendChild(link);
    link.click();

    // Limpiar el enlace y el Blob después de la descarga
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
}