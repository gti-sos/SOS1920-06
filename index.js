const express = require("express");
var path = require("path");
const bodyParser = require("body-parser");


var app = express();
var port = process.env.PORT || 80; //Se pone la variable y si no, pues toma el valor 80, el puerto 80 vaya.

app.use(bodyParser.json());
app.use("/", express.static("./public"));

const BASE_API_URL = "/api/v1";



// API ADRI
const BASE_PATH = "/api";
var lotteryApi = require("./lottery-sales");
lotteryApi(app,BASE_PATH);




// ----------------------- API ALVARO -----------------------
var stats = [
	{ 
		province: "Madrid",
		year: 2014,
		total: 18412,
		interurban: 4068,
		urban: 14344	
	},
	{ 
		province: "Sevilla",
		year: 2014,
		total: 6100,
		interurban: 1994,
		urban: 4106	
	},
	{
		province: "Soria",
		year: 2014,
		total: 149,
		interurban: 128,
		urban: 21	
	},
	{ 
		province: "Tarragona",
		year: 2014,
		total: 2381,
		interurban: 1377,
		urban: 1004	
	},
	{ 
		province: "Teruel",
		year: 2014,
		total: 229,
		interurban: 174,
		urban: 55	
	},
	{ 
		province: "Teruel",
		year: 2015,
		total: 2381,
		interurban: 1377,
		urban: 1004	
	}
];

// GET a la ruta base /not-hospitalized-stats
app.get(BASE_API_URL+"/not-hospitalized-stats", (req,res) =>{
	res.send(JSON.stringify(stats,null,2));
});
// GET a varios recursos con provincia /not-hospitalized-stats/Sevilla
app.get(BASE_API_URL+"/not-hospitalized-stats/:province", (req,res)=>{
	var province = req.params.province;
	var filteredStats = stats.filter((c) => {
		return (c.province == province);
	});
	if(filteredStats.length >= 1){
		res.send(filteredStats);
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});
// GET a un recurso concreto /not-hospitalized-stats/Sevilla/2015
app.get(BASE_API_URL+"/not-hospitalized-stats/:province/:year", (req,res) =>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredStats = stats.filter((c) => {
		return (c.province == province && c.year == year);
	});
	if(filteredStats.length == 1){
		res.send(filteredStats[0]);
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});
// POST a la ruta base /not-hospitalized-stats
app.post(BASE_API_URL+"/not-hospitalized-stats",(req,res) =>{
	var newStat = req.body;
	var provinceNewStat = req.body.province;
	var yearNewStat = req.body.year;
	var filteredStats = stats.filter((c) => {
		return (c.province == provinceNewStat && c.year == yearNewStat);
	});
	if((newStat == "") || (newStat.province == null) || (newStat.year == null) || (newStat.total == null) || (newStat.interurban == null) || (newStat.urban == null)){
		res.sendStatus(400,"BAD REQUEST");
	} else if(filteredStats.length >= 1){
		res.sendStatus(409,"CONFLICT");
	} else {
		stats.push(newStat);
		res.sendStatus(201,"CREATED");
	}
});
// POST a varios recursos con provincia /not-hospitalized-stats/Sevilla debe dar "Method Not Allowed"
app.post(BASE_API_URL+"/not-hospitalized-stats/:province",(req,res) =>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});
// POST a un recurso concreto /not-hospitalized-stats/Sevilla/2015 debe dar "Method Not Allowed"
app.post(BASE_API_URL+"/not-hospitalized-stats/:province/:year",(req,res) =>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});
// DELETE a la ruta base /not-hospitalized-stats
app.delete(BASE_API_URL+"/not-hospitalized-stats", (req,res)=>{
	stats = [];
	res.sendStatus(200,"OK");
});
// DELETE a varios recursos concretos /not-hospitalized-stats/Sevilla
app.delete(BASE_API_URL+"/not-hospitalized-stats/:province", (req,res)=>{
	var province = req.params.province;
	var filteredStats = stats.filter((c) => {
		return (c.province != province);
	});
	if(filteredStats.length < stats.length){
		stats = filteredStats;
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});
// DELETE a un recurso concreto /not-hospitalized-stats/Sevilla/2015
app.delete(BASE_API_URL+"/not-hospitalized-stats/:province/:year", (req,res)=>{
	var province = req.params.province;
	var year = req.params.year;
	var filteredStats = stats.filter((c) => {
		return (c.province != province || c.year != year);
	});
	if(filteredStats.length < stats.length){
		stats = filteredStats;
		res.sendStatus(200,"OK");
	}else{
		res.sendStatus(404,"NOT FOUND");
	}
});
// PUT a la ruta base /not-hospitalized-stats debe dar "Method Not Allowed"
app.put(BASE_API_URL+"/not-hospitalized-stats",(req,res) =>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});
// PUT a varios recursos con provincia /not-hospitalized-stats/Sevilla debe dar "Method Not Allowed"
app.put(BASE_API_URL+"/not-hospitalized-stats/:province",(req,res) =>{
	res.sendStatus(405,"METHOD NOT ALLOWED");
});
// PUT a un recurso concreto
app.put(BASE_API_URL +"/not-hospitalized-stats/:province/:year",(req,res)=>{
    var province=req.params.province;
    var year=req.params.year;
    var updatedStat=req.body;
    if((province != updatedStat.province) || (year!=updatedStat.year)){
        res.sendStatus(400,"BAD REQUEST");
    }else{
        var filteredStats = stats.filter((c) => {
        	return (c.province != province || c.year != year);
        });      
        stats = filteredStats;
        stats.push(updatedStat);
        res.sendStatus(200,"OK");
    }
});

// ----------------------- API LEANDRO -----------------------

var accstats = [
	{ 
		province: "Madrid",
		year: 2014,
		accvictotal: 19942,
		accvicinter: 4324,
		accfall: 114
	},
	{ 
		province: "Sevilla",
		year: 2018,
		accvictotal: 6515,
		accvicinter: 1945,
		accfall: 58	
	}
];


//const BASE_API_URL = "/api/v1"; //Tendremos aqui la URL Base, la api el path...


/**************************************************/
// Load Initial Data . . .
/**************************************************/


app.get(BASE_API_URL + "/accstats/loadInitialData", (req, res) => {
	
	var accstats = [
	{ 
		province: "Madrid",
		year: 2014,
		accvictotal: 19942,
		accvicinter: 4324,
		accfall: 114
	},
	{ 
		province: "Sevilla",
		year: 2018,
		accvictotal: 6515,
		accvicinter: 1945,
		accfall: 58	
	}
];
	console.log(". . . Loading initial data");
	res.send(JSON.stringify(accstats,null,2));	
});


////////////////////////////////////////////////////
// GET accstats   
////////////////////////////////////////////////////

app.get(BASE_API_URL+"/accstats", (req,res) =>{ //En req vienen los datos de la petición.
	res.send(JSON.stringify(accstats,null,2)); //En JSON devuelvo todos los contactos
	console.log("Data sent: "+JSON.stringify(accstats, null, 2));
});


////////////////////////////////////////////////////
// POST accstats   
////////////////////////////////////////////////////

app.post(BASE_API_URL+"/accstats",(req,res) =>{
	//accstats.push(req.body);  //En req me vienen los datos de la petición, cojo el body también
	//Verificaremos ahora que es un contacto
	var newAccstats = req.body;
	if((newAccstats == "") || (newAccstats.province == null)){  //Si está vacío o es nulo
		res.sendStatus(400, "BAD REQUEST");
	}else{
		accstats.push(newAccstats);
		res.sendStatus(201,"CREATED"); 
	}
});

////////////////////////////////////////////////////
// PUT accstats
////////////////////////////////////////////////////

app.put(BASE_API_URL+"/accstats/", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});

////////////////////////////////////////////////////
// DELETE accstats   
////////////////////////////////////////////////////


app.delete(BASE_API_URL+ "/accstats", (req,res) =>{
	accstats = ["YOU DON'T HAVE ANY accstats"];
	res.sendStatus(200, "accstats DELETED");
});



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//  ========> AHORA SOBRE ELEMENTOS EN CONCRETO...

////////////////////////////////////////////////////
// GET accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////


app.get(BASE_API_URL+"/accstats/:province", (req,res)=>{ //El :province lo que hace es como que crea una variable que puede tener cualquier valor, yo puedo tener /:org /:loquesea yo puedo tener los que yo quiera
	//¿Cómo accedería al valor concreto de lo que me ha llegado? Pues así con el params el nombre que yo le haya puesto en el : con param me lo pilla
	var province = req.params.province;
	
	var filteredAccstats = accstats.filter((p) => {
		//Le digo que solo me deje pasar en el caso de que el contacto tenga el mismo nombre que el que me están pasando
		return (p.province == province);
	});
	
	if(filteredAccstats.length >= 1){
		res.send(filteredAccstats[0]); //Devolvería el primer elemento de ese array
	}else{
		res.sendStatus(404, "ACCSTAT NOT FOUND");
	}
});



////////////////////////////////////////////////////
// POST accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.post(BASE_API_URL+"/accstats/:province", (req,res)=>{
	res.sendStatus(405, "METHOD NOT ALLOWED");
});


////////////////////////////////////////////////////
// PUT accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.put(BASE_API_URL+"/accstats/:province", (req,res)=>{
	var province = req.params.province;
	var body = req.body;
	
	var updatedAccstats = accstats.map((c) => {
		var updatedC = c;
		
		if (c.province == province) {
			for (var p in body) {
				updatedC[p] = body[p];
			}	
		}
		return (updatedC);
	});
	
	if (updatedAccstats.length == 0) {
		res.sendStatus(404, "ACCSTAT NOT FOUND");
	} else {
		accstats = updatedAccstats;
		res.sendStatus(200, "OK");
	}
});


////////////////////////////////////////////////////
// DELETE accstats/XXX Es decir, a un recurso en concreto   
////////////////////////////////////////////////////

app.delete(BASE_API_URL+"/accstats/:province", (req,res)=>{ //Para el delete podría usar un filter pero quitando el que me llega
	var province = req.params.province;
	
	var filteredAccstats = accstats.filter((c) => {
		return (c.province != province);
	});
	
	
	if(filteredAccstats.length < accstats.length){
		accstats = filteredAccstats;
		res.sendStatus(200);
	}else{
		res.sendStatus(404,"ACCSTAT NOT FOUND");
	}	
});
 
// ----------------------- FIN CODIGO ------------------------
app.listen(port, () => { //No es recomendable poner el puerto 80, en heroku habrá que especificarle el puerto.
	console.log("Server ready !");
});

console.log("Starting server . . . ");
