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

    http://localhost:3000/plazo/2017-01-31T23:59:59.000Z

    Devuelve un objeto JSON con el formato:

    [{"text":"Nos separan unos 15km..."}]
*/
app.get("/distancia/:latitud//:longitud", function (req, res) {

    // Obtener la latitud y la longitud que llegan en la URL
    var latitud = new Date(req.params.latitud);
    var longitud = new Date(req.params.longitud);
	
   

    // Algo no ha ido bien
    if (!fecha_entrega) {
        return res.status(400).send();
    }

	// https://www.genbetadev.com/cnet/como-calcular-la-distancia-entre-dos-puntos-geograficos-en-c-formula-de-haversine
 //   var oneDay = 24 * 60 * 60 * 1000;
   // var dias = Math.round(Math.abs((ahora.getTime() - fecha_entrega.getTime()) / (oneDay)));
	var distancia = 33;
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
