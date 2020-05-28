const cool = require("cool-ascii-faces");
const express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");



var app = express();
app.use(cors());

var port = process.env.PORT || 1111; //Se pone la variable y si no, pues toma el valor 80, el puerto 80 vaya.



app.use(bodyParser.json());
app.use("/", express.static("./public"));


const BASE_API_URL = "/api/v1";
const BASE_PATH = "/api";


// API ADRI
var lotteryApi = require("./src/back/lottery-sales");
lotteryApi(app,BASE_PATH);
//------------------------------------------

//Modularizaciรณn alvaro----------
var statsApi = require("./src/back/nhsApi");
statsApi(app);
//-------------------------------

// API LEANDRO
var accstats = require("./src/back/acc-stats");
accstats(app, BASE_PATH);

 
// ----------------------- FIN CODIGO ------------------------
app.listen(port, () => { //No es recomendable poner el puerto 80, en heroku habrรก que especificarle el puerto.
	console.log("Server ready");
});

console.log("Starting server . . . ");
