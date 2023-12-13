//AIzaSyADW33LRTXZSEmLMv8ebiwK8Dtb9gDsg5Y
//38.99610528500254, -0.16569078810570842
// 0-180    180-240 240<oo

// Definición de variables globales
let map;
var latlong = { lat: parseFloat(38.99610528500254), lng: parseFloat(-0.16569078810570842) };

async function centrarmapa() {
    $(document).ready(async function () {
        const userId = await obtenerUserId();
        if (userId !== null) {
            let data = await recuperarusuariomedicion(userId);
            let medicion = await recuperarmedicion(data);
            latlong = { lat: parseFloat(medicion.latitud), lng: parseFloat(medicion.longitud) };
            pintar();
        } else {
            pintar();
        }
    });
}

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById("map"), {
        center: latlong,
        zoom: 15,
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
    var heatmapData = [];
    var polyliena = [];
    $(document).ready(async function () {
        const userId = await obtenerUserId();
        if (userId !== null) {
            let data = await recuperartodasmedicionesusuario(userId);
            if (data.length < 20) {
                //data = await crearMediciones(data);
            }
            let datat = await rangoTiempousuario(data,userId);
            let datalert = await comprobarAlerta(datat);
            pintarCirculos(datalert);
            pintarLineas(datalert, polyliena);
        } else {
            let data = await recuperartodasmediciones();
            if (data.length < 20) {
                //data = await crearMediciones(data);
            }
            let datat = await rangoTiempo(data);
            let datalert = await comprobarAlerta(datat);
            pintarCirculos(datalert);
        }
    });
}

function pintarCirculos(data) {
    var color;
    data.forEach(medicion => {
        if (medicion.valor <= 180) {
            color = "#00FF1F";
        } else if (medicion.valor > 180 && medicion.valor <= 240) {
            color = "#D8FF00";
        } else if (medicion.valor > 240) {
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

    });
}

function pintarLineas(data, polyliena) {
    data.forEach(medicion => {
        polyliena.push(new google.maps.LatLng(parseFloat(medicion.latitud), parseFloat(medicion.longitud)));
    });
    const flightPath = new google.maps.Polyline({
        path: polyliena,
        geodesic: true,
        strokeColor: "#9033FF",
        strokeOpacity: 1.0,
        strokeWeight: 3,
    });
    flightPath.setMap(map);

}

function crearMediciones(array) {
    const nuevasMediciones = [];
    const rangoLatitud = { min: -0.01, max: 0.01 };
    const rangoLongitud = { min: -0.01, max: 0.01 };


    var resto = 40 - array.length;
    var medicion = array[array.length - 1];
    array.forEach(mediciones => {
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
            instante: sumarMinutos(medicion.instante, i * 5),
            latitud: (parseFloat(medicion.latitud) + incrementoLatitud).toFixed(20),
            longitud: (parseFloat(medicion.longitud) + incrementoLongitud).toFixed(20),
            valor: valorAleatorio
        });
    }

    return nuevasMediciones;


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

        if (bajaCheckbox.checked && medicion.valor <= 180) {
            nuevasMediciones.push(nuevaMedicion);
        } else if (mediaCheckbox.checked && medicion.valor > 180 && medicion.valor <= 240) {
            nuevasMediciones.push(nuevaMedicion);
        } else if (altaCheckbox.checked && medicion.valor > 240) {
            nuevasMediciones.push(nuevaMedicion);
        }
    });
    
    return nuevasMediciones;
}

async function rangoTiempo(data)
{
    const desde = document.getElementById('desde').value;
    const hasta = document.getElementById('hasta').value;
 
    if(!desde || !hasta)
    {
        return data;
    }
    let medicionestiempo = await recuperarmediciontiempo(desde,hasta);
    console.log(medicionestiempo);
    return medicionestiempo;

}


async function rangoTiempousuario(data,usuario)
{
    const desde = document.getElementById('desde').value;
    const hasta = document.getElementById('hasta').value;
 
    if(!desde || !hasta)
    {
        return data;
    }
    let medicionestiempo = await recuperarmediciontiempousuario(desde,hasta,usuario);
    console.log(medicionestiempo);
    return medicionestiempo;

}


