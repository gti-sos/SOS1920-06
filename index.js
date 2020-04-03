const cool = require("cool-ascii-faces");
const express = require("express");
var path = require("path");
const bodyParser = require("body-parser");


var app = express();
var port = process.env.PORT || 80; //Se pone la variable y si no, pues toma el valor 80, el puerto 80 vaya.

app.use(bodyParser.json());
app.use("/", express.static("./public"));

const BASE_API_URL = "/api/v1";


const BASE_PATH = "/api";


// API ADRI
var lotteryApi = require("./lottery-sales");
lotteryApi(app,BASE_PATH);
//------------------------------------------

//Modularización alvaro----------
var statsApi = require("./api");
statsApi(app, BASE_PATH);
//-------------------------------

// API LEANDRO
var accstats = require("./acc-stats");
accstats(app, BASE_PATH);

 
// ----------------------- FIN CODIGO ------------------------
app.listen(port, () => { //No es recomendable poner el puerto 80, en heroku habrá que especificarle el puerto.
	console.log("Server ready");
});

console.log("Starting server . . . ");
