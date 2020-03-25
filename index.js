const cool = require("cool-ascii-faces");
const express = require("express");
var path = require("path");
const bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 80; //Se pone la variable y si no, pues toma el valor 80, el puerto 80 vaya.

app.use(bodyParser.json());
app.use("/", express.static("./public"));

const BASE_API_URL = "/api/v1";

// ----------------------- API ADRI -----------------------

var sales = [];

// GET LOADINITIALDATA
app.get(BASE_API_URL + "/lottery-sales/loadInitialData", (req,res) => {
    
    
    var initial_sales = [
        {"province" : "Madrid",
         "year" : "2014",
         "total" : "730521147",
         "xmas" : "417308840",
         "kid" : "86507800"},
        
        {"province" : "Madrid",
         "year" : "2015",
         "total" : "75257689",
         "xmas" : "36017220",
         "kid" : "9462560"},
		
		{"province" : "Madrid",
         "year" : "2016",
         "total" : "67775712",
         "xmas" : "35883580",
         "kid" : "10604720"},
		
		{"province" : "Madrid",
         "year" : "2017",
         "total" : "487375563",
         "xmas" : "258886720",
         "kid" : "62538100"},
		
		{"province" : "Barcelona",
         "year" : "2016",
         "total" : "32939883",
         "xmas" : "17450480",
         "kid" : "4320280"},
		
		{"province" : "Barcelona",
         "year" : "2017",
         "total" : "48928673",
         "xmas" : "27397980",
         "kid" : "6577720"},
		
		{"province" : "Barcelona",
         "year" : "2014",
         "total" : "110488505",
         "xmas" : "64734400",
         "kid" : "14060360"},
		
		{"province" : "Valencia",
         "year" : "2016",
         "total" : "38849889",
         "xmas" : "21415900",
         "kid" : "6027160"},
		
		{"province" : "Barcelona",
         "year" : "2015",
         "total" : "330575503",
         "xmas" : "158246960",
         "kid" : "48486140"},
		
		{"province" : "Valencia",
         "year" : "2017",
         "total" : "802036655",
         "xmas" : "468028440",
         "kid" : "99264960"}
    ];
    
    if(sales.length >=1){
        res.status(400).send("There is already data created");
    }else{
        sales = initial_sales;
        res.send(JSON.stringify(sales, null, 2));
    }
});


// GET COLECCION
app.get(BASE_API_URL + "/lottery-sales", (req,res) =>{
	if(sales.length == 0){
		res.status(400).send("There is no data stored")
	}else{
		res.send(JSON.stringify(sales,null,2));
	}
//    console.log("Data sent:"+JSON.stringify(contacts,null,2));
});


// GET RECURSO PROVINCE/YEAR
app.get(BASE_API_URL+"/lottery-sales/:province/:year", (req,res)=>{
    
    var province = req.params.province;
    var year = req.params.year;
    
    var filteredSales = sales.filter((c) => {
        return (c.province == province && c.year == year);
    });
    
    
    if(filteredSales.length >= 1){
        res.send(filteredSales[0]);
    }else{
        res.status(404).send("Sale not found");
    }
});


//GET RECURSO PROVINCE o YEAR
app.get(BASE_API_URL + "/lottery-sales/:param", (req,res)=>{
	var param = req.params.param;
	
	var filteredSales = sales.filter((c)=>{
		return (c.province==param || c.year == param);
	});
	
	if(filteredSales.length >= 1){
		res.send(JSON.stringify(filteredSales,null,2));
	}else{
		res.status(404).send("No data in this year o province")
	}
	
	
});


// POST COLECCION
app.post(BASE_API_URL + "/lottery-sales",(req,res) =>{
    
	//Objeto a crear
    var newSale = req.body;
	
	//Array de las keys del objeto que se quiere crear. Ex: {"province","year","total","xmas","kid"}
	var keysSale = Object.keys(newSale);
	
	//Array de las keys que debe tener el objeto.
	var keysObject = ["province","year","total","xmas","kid"];
	
	//True: Las claves son correctas || False:Las claves son incorrectas
	var keysTrue = false;
	
	//Comprobamos que las keys son correctas
	if(JSON.stringify(keysSale)==JSON.stringify(keysObject)){
		keysTrue = true;
	}
	
	//filteredSales almacenara si hay algun dato ya con la provincia y el año que queremos añadir
    var filteredSales = sales.filter((c)=>{
        return (c.province == newSale.province && c.year == newSale.year);
    });
	
    if(keysSale.length==0){ // Si el body está vacio
        res.status(400).send("Must enter the object to create"); 
    }else if(keysTrue==false){ // Si los campos no son correctos
		res.status(400).send("Does not have the expected fields");
	}else if(newSale.province==null || newSale.year==null || newSale.total==null ||
			newSale.xmas==null || newSale.kid==null){ // Algun valor null
		res.status(400).send("Values cannot be null");
	}else if(filteredSales.length>=1){ // Ya existe un dato para esa provincia y ese año
        res.status(400).send("This sale already exist");
    }
    else { // Crea el dato
        sales.push(newSale);     
        res.status(201).send("Sale created");
    }
});


// POST RECURSO

app.post(BASE_API_URL + "/lottery-sales/:p", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y/:t", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y/:t/:x", (req,res)=>{
    res.status(405).send("Method not allowed");
});
app.post(BASE_API_URL + "/lottery-sales/:p/:y/:t/:x/:k", (req,res)=>{
    res.status(405).send("Method not allowed");
});


// PUT RECURSO
app.put(BASE_API_URL +"/lottery-sales/:province/:year",(req,res)=>{
    var province=req.params.province;
    var year=req.params.year;
    
    var data=req.body;
    
    if(province!=data.province||year!=data.year){
        res.status(400).send("Data does not mach");
    }else{
        var filteredSales = sales.filter((c) => {
        return (c.province != province || c.year != year);
        });      
        sales = filteredSales;
        sales.push(data);
        res.status(200).send("Sale updated");
    }
});

app.put(BASE_API_URL + "/lottery-sales/:province", (req,res)=>{
	res.status(400).send("URL invalid")
});


// PUT COLECCION
app.put(BASE_API_URL+"/lottery-sales", (req,res)=>{
    res.status(405).send("Method not allowed");
});


// DELETE COLECCION
app.delete(BASE_API_URL + "/lottery-sales", (req,res)=>{
    sales = [];
    res.send(JSON.stringify(sales,null,2));
    
});


// DELETE RECURSO
app.delete(BASE_API_URL+"/lottery-sales/:province/:year", (req,res)=>{
    
    var province = req.params.province;
    var year = req.params.year;
    
    var filteredSales = sales.filter((c) => {
        return (c.province != province || c.year != year);
    });
    
    if(filteredSales.length < sales.length){
        sales = filteredSales;
        res.status(200).send("Sale deleted");
    }else{
        res.status(404).send("Sale not found");
    }
    
    
});


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
	console.log("Server ready");
});

console.log("Starting server . . . ");
