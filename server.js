/**
 * Servicio basado en Node.js para crear contenido dinámico para un el bot Camalebot.
 *
 */

// Puerto en el que escucha el servidor Node.js (lo obtiene de una variable de entorno y si no existe, el 3000)
const PORT = process.env.PORT || 3000;

// Importamos el framework Express y lo inicializamos
var express = require("express");
var app = express();

// El contenido de la carpeta public se muestra en la raíz del servidor
app.use(express.static(__dirname + "/public"));

/*
    GET /distancia/:latitud/:longitud

    Ruta que calcula los kilómetros entre Mendizorroza
	y las cordenadas que se pasan como parámetro

    Si el servidor se está ejecutando localmente:

    http://localhost:3000/distancia/43.2585907//-2.9217443000000003

    Devuelve un objeto JSON con el formato:
	
    [{"text":"Nos separan unos 15km..."}]
*/
	app.get("/distancia/:latitud//:longitud", function (req, res) {
    // Obtener la latitud y la longitud que llegan en la URL
    var latitud = parseFloat(req.params.latitud);
    var longitud = parseFloat(req.params.longitud); 
	  
    // Algo no ha ido bien
    if (!latitud || !longitud) {
        return res.status(400).send();
    }
	
	/*
	 DISTANCIA ENTRE DOS PUNTOS - FÓRMULA DE HAVERSINE
	 
	https://www.genbetadev.com/cnet/como-calcular-la-distancia-entre-dos-puntos-geograficos-en-c-formula-de-haversine
    
	R = radio de la Tierra
    Δlat = lat2− lat1
    Δlong = long2− long1
    a = sin^2(Δlat/2) + cos(lat1) · cos(lat2) · sin^2(Δlong/2)
    c = 2 · atan2(√a, √(1−a))
	d = R · c
    */
	
	// COORDENADAS MENDIZORROTZA
    var LONG_MENDI = -2.686193;
    var LATI_MENDI = 42.837425;
    // RADIO ECUATORIAL
    var R = 6371; // KM
	
	// DIFERENCIAS EN RADIANES	
	var dif_lati = toRad(latitud - LATI_MENDI);
	var dif_long = toRad(longitud - LONG_MENDI);

	var seno_lati = Math.sin(dif_lati/2);
    var seno_long = Math.sin(dif_long/2);
    var cos_lat_mendi = Math.cos(LATI_MENDI);
    var cos_latitud = Math.cos(latitud);
	
	var a = Math.pow(seno_lati, 2) + cos_lat_mendi * cos_latitud * Math.pow(seno_long, 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt((1-a)));
	
	var distancia = Math.round(R * c);

    // Crear el objeto con la respuesta
    var respuesta = [
        {
          text: "Nos separan unos " + distancia + "km...",
        }
    ];

    // Devolver el objeto en formato JSON
    res.json(respuesta);
});

// Arrancar el servidor y dejarlo a la espera
app.listen(PORT, function () {
    console.log("Servidor Express escuchando en el puerto " + PORT + "...");
});

/* Converts numeric degrees to radians */
// http://stackoverflow.com/questions/5260423/torad-javascript-function-throwing-error
function toRad(Value) {
    return Value * Math.PI / 180;
}
